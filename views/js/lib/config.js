require.config({
  baseUrl: "/js",
  paths: {
    jquery: "lib/jquery/jQuery-3.2.1",
    handlebars: "lib/handlebars-1.0.0",
    layer1: "lib/layer/layer",
    laydate: "lib/laydate/laydate",
    "laydate-v5.0.9": "lib/laydate-v5.0.9/laydate",
    pagination: "lib/pagination/jquery.pagination",
    "jquery.validate": "lib/validate/jquery.validate.min",
    "jquery.layout": "lib/layout/jquery.layout-latest",
    "jquery.dataTables": "lib/datatable/jquery.dataTables.min",
    "dataTables.bootstrap": "lib/datatable/dataTables.bootstrap.min",
    ztree: "lib/ztree/jquery.ztree.core.min",
    ztreeCheck: "lib/ztree/jquery.ztree.excheck.min",
    "dataTables.fixedHeader": "lib/datatable/dataTables.fixedHeader.min",
    "dataTables.select": "lib/datatable/dataTables.select.min",
    "dataTables.buttons": "lib/datatable/dataTables.buttons.min",
    "buttons.print": "lib/datatable/buttons.print.min",
    "buttons.flash": "lib/datatable/buttons.flash.min",
    "buttons.html5": "lib/datatable/buttons.html5.min",
    jszip: "lib/datatable/jszip.min",
    bootstrap: "lib/bootstrap/js/bootstrap.min",
    "html5shiv.min": "lib/bootstrap/js/html5shiv.min",
    "respond.min": "lib/bootstrap/js/respond.min",
    "jquery.serialize": "lib/jquery/jquery.serialize-object.min",
    metisMenu: "lib/metisMenu",
    contabs: "lib/contabs.min",
    pace: "lib/pace/pace.min",
    select2: "lib/select2/select2.min",
    "jquery.nanoscroller": "lib/jquery/jquery.nanoscroller.min",
    echarts: "lib/echarts/echarts.min",
    worldcloud: "lib/echarts/worldcloud",
    jsencrypt: "lib/jsencrypt/jsencrypt.min",
    poshytip: "lib/poshytip-1.2/src/jquery.poshytip",
    "jquery.marquee": "lib/jquery/jquery.marquee",

    ELEMENT: "lib/element-ui/2.13.2/index",
    element: "lib/element",
    // http: "core/common/http", // 请求封装，基于 jquery、layer 模块
    // request: "core/common/request", // 请求再封装，基于 http 模块
    // util: "core/common/util",
    // storage: "core/common/storage", // localStorage 封装
    // vue: "core/lib/vue/vue.min",
    // $api: "api/common", // 公共 api
    // global: "core/global/index", // 全局变量模块
  },
  shim: {
    bootstrap: {
      deps: ["jquery"],
    },
    layer1: {
      deps: ["jquery"],
    },
    pagination: {
      deps: ["jquery"],
    },
    laydate: {
      deps: ["jquery"],
    },
    "jquery.layout": {
      deps: ["jquery"],
    },
    "dataTables.fixedHeader": {
      deps: ["jquery.dataTables"],
    },
    "dataTables.bootstrap": {
      deps: ["jquery.dataTables"],
    },
    "dataTables.buttons": {
      deps: ["jquery.dataTables"],
    },
    "buttons.print": {
      deps: ["jquery.dataTables", "dataTables.buttons"],
    },
    "buttons.flash": {
      deps: ["jquery.dataTables", "dataTables.buttons"],
    },
    "buttons.html5": {
      deps: ["jquery.dataTables", "dataTables.buttons"],
    },
    ztree: {
      deps: ["jquery"],
    },
    ztreeCheck: {
      deps: ["jquery", "ztree"],
    },
    metisMenu: {
      deps: ["jquery"],
    },
    contabs: {
      deps: ["jquery"],
    },
    select2: {
      deps: ["jquery"],
    },
    echarts: {
      deps: ["jquery"],
    },
    poshytip: {
      deps: ["jquery"],
    },
  },
  waitSeconds: 0,
});
