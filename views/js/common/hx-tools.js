/** 工具模块 */
define(["jquery"], function () {
    /**
     * 创建唯一的字符串
     * @return {string} ojgdvbvaua40
     */
    function createUniqueString() {
        const timestamp = +new Date() + "";
        const randomNum = parseInt((1 + Math.random()) * 65536) + "";
        return (+(randomNum + timestamp)).toString(32);
    }
    return {
        createUniqueString,
    };
});
