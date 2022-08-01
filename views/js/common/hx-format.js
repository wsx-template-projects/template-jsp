define("format", function () {
    /**
     * 数字千分化
     * @param {number} num 数字
     * @return {number} 10,000
     */
    function toThousands(num) {
        return (+num || 0)
            .toString()
            .replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ","));
    }
    /**
     * 数字存储大小格式化
     * @param {number} num 存储大小 单位：Byte
     * @param {number} digits 保留几位小数
     * @return {string} 2MB
     */
    function toStorage(num, digits) {
        digits = digits || 2;
        if (num < 1024) {
            return num + "B";
        }
        num = (num * 1000) / 1024;
        const si = [
            { value: 1e18, symbol: "E" },
            { value: 1e15, symbol: "P" },
            { value: 1e12, symbol: "T" },
            { value: 1e9, symbol: "G" },
            { value: 1e6, symbol: "M" },
            { value: 1e3, symbol: "K" },
        ];
        for (let i = 0; i < si.length; i++) {
            if (num >= si[i].value) {
                return (
                    (num / (si[i].value * 1.024))
                        .toFixed(digits)
                        .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") +
                    si[i].symbol +
                    "B"
                );
            }
        }
    }
    return {
        // 数字千分化
        toThousands,
        // 数字存储大小格式化
        toStorage,
    };
});
