const PC_VERSION = "0.0.1";

console.log("版本 :>> ", PC_VERSION);

/**
 * 当前环境：dev、test、prod
 */
let ENV = "dev";

const href_url = window.location.href;

if (href_url.indexOf("reserved") > -1) {
    ENV = "prod";
} else if (href_url.indexOf("lastTest") > -1) {
    ENV = "test";
} else {
    ENV = "dev";
}

console.log("ENV :>> ", ENV);

/**
 * 配置信息
 */
const CONFIG = {
    dev: {
        // baseUrl: 'http://192.168.80.39:8091',
        // baseUrl: 'http://192.168.5.155:8091', // 高垒垒本地
        // baseUrl: 'http://192.168.5.243:8091', // 叶华飞本地
        baseUrl: "http://192.168.1.197:8091",
        // baseUrl: 'https://zjqyzx.zjamr.zj.gov.cn',
        logoutUrl: "http://223.4.70.227",
        staticUrl: "",
    },
    test: {
        // baseUrl: 'http://192.168.1.197:8091',
        baseUrl: "https://zjqyzx.zjamr.zj.gov.cn",
        // logoutUrl: 'http://223.4.70.227',
        logoutUrl: "http://223.4.71.57",
        staticUrl: "/web/mgop/gov-open/zj/2002238351/lastTest",
    },
    prod: {
        // baseUrl: 'http://223.4.72.86:83',
        baseUrl: "https://zjqyzx.zjamr.zj.gov.cn",
        logoutUrl: "http://223.4.71.57",
        staticUrl: "/web/mgop/gov-open/zj/2002238351/reserved",
    },
};

/**
 * 当前基础配置
 */
const BASE_CONFIG = CONFIG[ENV];

window.CONFIG = CONFIG;

/**
 * 环境变量
 */
window.ENV = ENV;

/**
 * 基础配置信息
 */
window.BASE_CONFIG = BASE_CONFIG;
/**
 * 请求地址
 */
window.BASE_URL = BASE_CONFIG["baseUrl"];

// console.log('window.BASE_CONFIG :>> ', BASE_CONFIG)

// console.log('window.BASE_URL :>> ', BASE_URL)

/** 去掉域名剩余的路径 */
const PATH_NAME = window.document.location.pathname;
console.log("CONFIG_PATH_NAME :>> ", PATH_NAME);

/** 基础路径 */
const BASE_PATH =
    PATH_NAME.indexOf("page") > -1
        ? PATH_NAME.split("page")[0]
        : PATH_NAME.split("index")[0];
console.log("CONFIG_BASE_PATH :>> ", BASE_PATH);
