import { Toast } from "vant";
import { Encrypt, Decrypt } from "./encry";
/**
 * 公共工具函数
 */

// import { getURLParameters } from 'sharegood-cloud-utils'

/**
 * 加密url参数
 * @param {string} url 网址:域名?id=123
 * @returns {string} 域名?id=49D59D1FB03D39860EE2
 */
export function encryptParams(url) {
    const baseUrl = url.split("?")[0];
    // let params = getURLParameters(url) // todo: json字符串转化成对象，getURLParameters方法需要自己实现
    let params = { id: "49D59D1FB03D39860EE2" };
    console.log("params:", params);
    let changeParams = {};
    Object.keys(params).map((key) => {
        changeParams[key] = Encrypt(params[key]);
    });
    // console.log('change:', changeParams)
    const paramsStr = objToUrlParams(changeParams, {});
    // console.log('str:', paramsStr, `${baseUrl}?${paramsStr}`)
    return `${baseUrl}?${paramsStr}`;
}

/**
 * 解密url参数
 * @param {string} searchData ?id=49D59D1FB03D39860EE2
 * @returns {object} {id:123}
 */
export function decryptParams(searchData) {
    // searchData =
    //     'http://192.168.2.57:8083/real-auth?taskCode=372db3cb324511eca0930050568f59cb&pripid=1008603&phone=18919068046&username=杨玉平&idCard=622701199311042017'
    let params = getQueryObject(searchData);
    // console.log('params:', params)
    let changeParams = {};
    Object.keys(params).map((key) => {
        changeParams[key] = Decrypt(params[key]);
    });
    // console.log('changeParams:', changeParams)
    return changeParams;
}

/**
 * 注意ios中会有兼容性的问题
 * import { Toast } from 'vant'
 * 日期时间格式化
 * @param {date} time js的date类型或时间戳
 * @param {string} format 自定义时间格式，选填，默认为'{y}-{m}-{d} {h}:{i}:{s}'
 * @return {string} 默认格式 2018-09-01 10:55:00
 */
function formatDate(time, format) {
    // console.log(time)
    // console.log(typeof time)
    // if (typeof time === 'string') {
    //   console.log('-string-')
    //   time = time.replace(/-/g, '/')
    // }
    // console.log('-time-', time)
    time = time || new Date();
    format = format || "{y}-{m}-{d} {h}:{i}:{s}";
    let date = time;
    if (typeof time !== "object") {
        if (("" + time).length === 10) time = +time * 1000;
        date = new Date(time);
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay(),
    };
    const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key];
        if (key === "a")
            return ["一", "二", "三", "四", "五", "六", "日"][value - 1];
        if (result.length > 0 && value < 10) {
            value = "0" + value;
        }
        return value || 0;
    });
    return timeStr;
}

/**
 * 日期格式转时间戳
 * @param {date} date date类型 2019-05-24 14:22:17
 * @return {string} 1558678937000
 */
function getTimestamp(date) {
    if (!date) {
        return new Date().getTime();
    }
    if (typeof date === "string") {
        date = date.replace(/-/g, "/");
    }
    return new Date(date).getTime();
}

/**
 * 日期时间文字化
 * 比较传入时间与当前本地时间，文字化显示日期时间
 * @param {date} time js的date类型或时间戳
 * @param {string} cFormat 自定义两天前的时间格式，选填
 * @return {string} 刚刚 n分钟前 n小时前 1天前
 */
function txtFormatTime(time, format) {
    if (!time) {
        return "null";
    }
    const d = new Date(time);
    const now = Date.now();

    const diff = (now - d) / 1000;
    if (diff < 30) {
        return Math.ceil(diff) + "秒前";
        // return '刚刚'
    } else if (diff < 3600) {
        // less 1 hour
        return Math.ceil(diff / 60) + "分钟前";
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + "小时前";
    } else if (diff < 3600 * 24 * 2) {
        return "1天前";
    } else {
        return formatDate(time, format);
    }
}

/**
 * 对象参数序列化(并转码)
 * @param {object} obj 对象参数
 * @return {string} a=1&b=2&c=3
 */
function objToUrlParams(obj) {
    let str = "";
    Object.keys(obj).forEach((v) => {
        if (obj[v] !== undefined) {
            str += `${encodeURIComponent(v)}=${encodeURIComponent(obj[v])}&`;
        }
    });
    return str.slice(0, -1);
}

/**
 * 获取地址参数
 * @param {string} url 指定地址，默认取当前页地址
 * @return {string} { a: 1, b: 2, c: 3 }
 */
function getQueryObject(url) {
    url = url || window.location.href;
    const search = url.substring(url.lastIndexOf("?") + 1);
    const obj = {};
    const reg = /([^?&=]+)=([^?&=]*)/g;
    search.replace(reg, (rs, $1, $2) => {
        const name = decodeURIComponent($1);
        let val = decodeURIComponent($2);
        val = String(val);
        obj[name] = val;
        return rs;
    });
    return obj;
}

/**
 * 创建唯一的字符串
 * @return {string} ojgdvbvaua40
 */
function createUniqueString() {
    const timestamp = +new Date() + "";
    const randomNum = parseInt((1 + Math.random()) * 65536) + "";
    return (+(randomNum + timestamp)).toString(32);
}

/**
 * 文件下载
 * @param {string} url 文件下载链接url，带上接口参数
 * @param {string} name 前端自定义的下载文件名，带上文件后缀名，选填
 * chrome会优先使用接口返回的命名，edge会优先使用此name
 */
function downloadFile(url, name) {
    const ele = document.createElement("a");
    ele.target = "_blank";
    ele.href = url || "";
    ele.download = name || "";
    document.body.appendChild(ele);
    ele.click();
    document.body.removeChild(ele);
}

/**
 * 获取字符串的字节长度
 * @param {String} str 字符串
 * @returns {number} 字节长度
 */
function getByteLength(str) {
    let len = 0;
    for (let i = 0; i < str.length; i++) {
        // eslint-disable-next-line
        if (str[i].match(/[^\x00-\xff]/gi) != null) {
            len += 2;
        } else {
            len += 1;
        }
    }
    return len;
}

/**
 * 函数防抖
 * @param {function} fn 函数
 * @param {number} t 等待时间（毫秒）
 * @return {function}
 */
function debounce(fn, t) {
    let timeId;
    let delay = t || 500;
    return function () {
        let args = arguments;
        if (timeId) {
            clearTimeout(timeId);
        }
        timeId = setTimeout(() => {
            timeId = null;
            fn.apply(this, args);
        }, delay);
    };
}

/**
 * 函数节流
 * @param {function} fn 函数
 * @param {number} t 间隔时间（毫秒）
 * @return {function}
 */
function throttle(fn, t) {
    let flag = true;
    let interval = t || 500;
    return function () {
        let args = arguments;
        if (flag) {
            fn.apply(this, args);
            flag = false;
            setTimeout(() => {
                flag = true;
            }, interval);
        }
    };
}

/**
 * 深克隆(深拷贝)
 * @param {object|array} 源数据
 * @return {object|array}
 */
function deepClone(source) {
    return JSON.parse(JSON.stringify(source));
}

/**
 * 获取数据类型
 * @param {any} data 数据
 * @return {string} 'array'
 */
function getDataType(data) {
    const str = Object.prototype.toString.call(data);
    return str.match(/\s(\w*)\]/)[1].toLowerCase();
}

/**
 * 排序函数封装
 * @param {array} list 数据源
 * @param {string} type 排序状态(升序 = 'asc',降序 = 'desc')
 * @param {boolean} isObj 是否是对象数组，默认为false,
 * @param {string} attr 对象数组指定排序的属性，isObj为true时，才传递该参数
 */
function sortFunc(list, type, isObj, attr) {
    isObj = isObj || false;
    let func = function (attr, type) {
        return function (m, n) {
            let a = isObj ? m[attr] : m;
            let b = isObj ? n[attr] : n;
            return type === "asc" ? a - b : b - a;
        };
    };
    list.sort(func(attr, type));
}

/**
 * 对象结构转数组对象
 * @param {object} source 源对象 例如： {b:1,a:6,c:9}
 * @param {array} strList 字典数组 例如: ['a','b','c']
 * @return [{type:'a',value:6},{type:'b',value:1},{type:'c',value:9}]
 */
function objConvertArr(source, strList) {
    // TODO: strList 若该数组中有值为null的话，该方法会有问题，后面再优化
    let result = strList.map((val) => ({ type: val, value: 0 }));
    Object.keys(source).map((key) => {
        // console.log(key, obj[key])
        let currIdx = strList.indexOf(key);
        result[currIdx].value = source[key];
    });
    return result;
}

/**
 * 将对象序列化成参数
 * @param {object} data
 * @param {Parameters<qs.stringify>[1]} [options]
 */
// export const qsStringify = function(data, options) {
//     options = { arrayFormat: 'repeat', ...options }
//     return stringify(data, options)
// }

export default {
    // 日期时间格式化
    formatDate,
    // 日期格式转时间戳
    getTimestamp,
    // 日期时间文字化
    txtFormatTime,
    // 对象参数序列化
    objToUrlParams,
    // 获取地址参数
    getQueryObject,
    // 创建唯一的字符串
    createUniqueString,
    // 文件下载
    downloadFile,
    // 获取字符串的字节长度
    getByteLength,
    // 函数防抖
    debounce,
    // 函数节流
    throttle,
    // 深克隆
    deepClone,
    // 获取数据类型
    getDataType,
    // 排序
    sortFunc,
    // 对象结构转数组对象
    objConvertArr,
};
