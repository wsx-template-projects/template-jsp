/**
 * 工具集
 */
define(["jquery"], function () {
    return {
        /**
         * 事件绑定
         * @param bindings [{el:x,event:y,handler:z}]
         * el为页面元素 event为绑定事件 handler为事件响应函数
         */
        bindEvents: function (bindings) {
            $.each(bindings, function (i, v) {
                if (typeof v.el == "string") {
                    $(document).on(v.event, v.el, v.handler);
                } else {
                    $(v.el).on(v.event, v.handler);
                }
            });
        },
        /**
         * 动态加载 - script
         */
        loadScript(src) {
            const scriptEl = document.createElement("script");
            scriptEl.setAttribute("async", "");
            scriptEl.setAttribute("defer", "");
            scriptEl.src = src;
            scriptEl.type = "text/javascript";
            document.body.append(scriptEl);
        },
        /**
         * 文件预览
         */
        // filePreview(fileUrl) {
        //     console.log('fileUrl :>> ', fileUrl)
        //     if (!fileUrl) return ''
        //     return window.BASE_URL + `/qyzx/file/getFileLearn?fileUrl=${fileUrl}`
        // },
        /**
         * 跳转路径
         */
        jumpPath(url, query, isEncode = false) {
            console.log("跳转地址-url :>> ", url);
            console.log("传参-query :>> ", query);
            console.log("是否编码-isEncode :>> ", isEncode);
            if (!url) return "";
            console.log("window.CONFIG :>> ", window.CONFIG);
            // const prefix = window.CONFIG['test'].staticUrl
            console.log("window.BASE_CONFIG :>> ", window.BASE_CONFIG);
            const prefix = window.BASE_CONFIG.staticUrl;
            const raw = url.split("?");
            console.log("raw :>> ", raw);
            let path = raw[0];

            if (raw[0].indexOf("http") === -1) {
                path = prefix + path;

                // if (raw[0].indexOf('.html') === -1) {
                //     path = path + '.html'
                // }
            }

            if (raw.length > 1) {
                path = path + "?" + raw[1];
            }

            return this.queryJoin(path, query, isEncode);
        },
        /**
         * 参数拼接
         */
        queryJoin(url, query, isEncode = false) {
            if (!query || JSON.stringify(query) === "{}") return url;
            let ident = url.indexOf("?") > -1 ? "&" : "?";
            return url + ident + this.param(query, isEncode);
        },
        /**
         * 跳转页面
         * @param {string} url 地址
         * @param {object} query 参数对象 {a: 1, b: 2}
         * @param {boolean} isOpen 是否重新打开一个浏览器窗口，默认false
         * @param {boolean} isEncode 是否需要参数编码
         * @param {boolean} isTest 是否测试，默认false
         */
        jumpPage({
            url,
            query,
            isOpen = false,
            isEncode = false,
            isTest = false,
        }) {
            const path = this.jumpPath(url, query, isEncode);
            console.log("path :>> ", path);
            if (isTest) return;
            if (isOpen) {
                window.open(path, "_blank");
                return;
            }
            window.location.href = path;
        },
        /**
         * @param {Object} query 参数对象
         * @param {boolean} isEncode 是否需要参数编码
         * @returns {string} 示例: a=1&b=2
         */
        param(query, isEncode = false) {
            if (!query) return "";
            const arr = Object.keys(query).map((key) => {
                if (query[key] === undefined) return "";
                if (!isEncode) {
                    return key + "=" + query[key];
                }
                return (
                    encodeURIComponent(key) +
                    "=" +
                    encodeURIComponent(query[key])
                );
            });
            return this.cleanArray(arr).join("&");
        },
        /**
         * @param {Array} actual
         * @returns {Array}
         */
        cleanArray(actual) {
            const newArray = [];
            for (let i = 0; i < actual.length; i++) {
                if (actual[i]) {
                    newArray.push(actual[i]);
                }
            }
            return newArray;
        },

        /**
         * 获取Url参数
         * @param url url地址
         */
        getUrlParams: function (url) {
            // 需要返回的参数集合
            var rtnParams = {},
                // 参数键值对
                paramPair = [];
            if (!url || url.indexOf("?") === -1) {
                return rtnParams;
            }

            $.each(
                url.substr(url.indexOf("?") + 1).split("&"),
                function (i, v) {
                    paramPair = v.split("=");
                    rtnParams[paramPair[0]] = paramPair[1];
                }
            );

            return rtnParams;
        },
        /**
         * 获取地址栏参数
         * @param url url地址
         */
        getQueryObject(url) {
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
        },
        /**
         * 获取某些属性值所在的节点
         * @param {string} target 目标节点值
         * @param {string} nodeName 作比较的属性名
         * @param {string} node 当前节点
         * */
        findNode(list, target, nodeName, node) {
            let stack = [...list],
                result = [];
            while (stack.length) {
                const pop = stack.shift();
                if (pop[nodeName] === target) {
                    const c = pop.children;
                    if (c?.length) {
                        const findIdx = c.findIndex(
                            (v) => v[nodeName] === node
                        );
                        if (findIdx > -1) {
                            result = c[findIdx]?.children || [];
                            return result;
                        }
                    }
                }
            }
            return result;
        },
        /**
         * 查找树节点 (深度优先)
         * @param {*} tree 树
         * @param {*} target 目标节点值
         * @param {*} nodeName 节点名称
         * @param {*} node 当前节点
         * @returns node 目标节点
         */
        fromTreeFindNode(tree, target, nodeName, node = null) {
            const stack = [];
            for (const item of tree) {
                if (item) {
                    stack.push(item);
                    while (stack.length) {
                        const temp = stack.pop();

                        if (temp[nodeName] === target) {
                            node = temp;
                            break;
                        }

                        const children = temp.children || [];
                        for (let i = children.length - 1; i >= 0; i--) {
                            stack.push(children[i]);
                        }
                    }
                }
            }
            return node;
        },

        /**
         * 去除空格
         * @param array
         * @returns {Array}
         */
        trims: function (array) {
            var newArr = [],
                ele;
            $.each(array, function (i, v) {
                ele = v.replace(/ /g, "");
                ele != "" && newArr.push(ele);
            });
            return newArr;
        },
        /**
         * 注意ios中会有兼容性的问题
         * import { Toast } from 'vant'
         * 日期时间格式化
         * @param {date} time js的date类型或时间戳
         * @param {string} format 自定义时间格式，选填，默认为'{y}-{m}-{d} {h}:{i}:{s}'
         * @return {string} 默认格式 2018-09-01 10:55:00
         */
        formatDate(time, format) {
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
            const timeStr = format.replace(
                /{(y|m|d|h|i|s|a)+}/g,
                (result, key) => {
                    let value = formatObj[key];
                    if (key === "a")
                        return ["一", "二", "三", "四", "五", "六", "日"][
                            value - 1
                        ];
                    if (result.length > 0 && value < 10) {
                        value = "0" + value;
                    }
                    return value || 0;
                }
            );
            return timeStr;
        },
        /**
         * 获取数据类型
         * @param {any} data 数据
         * @return {string} 'array'
         */
        getDataType(data) {
            const str = Object.prototype.toString.call(data);
            return str.match(/\s(\w*)\]/)[1].toLowerCase();
        },
        /**
         * 日期格式转时间戳
         * @param {date} date date类型 2019-05-24 14:22:17
         * @return {string} 1558678937000
         */
        getTimestamp(date) {
            if (!date) {
                return new Date().getTime();
            }
            if (typeof date === "string") {
                date = date.replace(/-/g, "/");
            }
            return new Date(date).getTime();
        },

        /**
         *
         * @param path
         * @param tableName
         */
        /*tabBank: function (path, tableName) {
            if(tableName == $('.J_menuTab.active', window.parent.document).attr('title')){
                return false;
            }
            var p = '<a href="javascript:;" class="active J_menuTab" data-id="' + path + '" title="'+ tableName +'"><em>' + tableName + ' </em><i class="fa close xbt-icon"></i><i class="fa refresh active js-refresh"></i></a>';

            $(".J_menuTab", window.parent.document).removeClass("active");
            $(".J_menuTab", window.parent.document).find('.js-refresh').removeClass('active');

            var n = '<iframe class="J_iframe" name="iframe' +  '" width="100%" height="100%" src="' + path + '" frameborder="0" data-id="' + path + '" seamless></iframe>';

            $(".J_mainContent", window.parent.document).find("iframe.J_iframe").hide().parents(".J_mainContent").find('iframe.J_iframe:last').after(n);
            $(".J_menuTabs .page-tabs-content .J_menuTab:last", window.parent.document).after(p);
            // $(".J_mainContent", window.parent.document).append(n);
        },*/

        /**
         * iframe中增加新tab
         * @param path iframe路径
         * @param tableName 新tab名称
         * @param tabName 新tab添加的位置，默认在首页的后面
         * */
        //tableBank: function (path, tableName, tabName) {
        //    debugger;
        //    var k = true;
        //    if (!tabName) {
        //        tabName = '首页';
        //    }
        //
        //    $(".J_menuTab", window.parent.document).each(function (j) {
        //        if ($(this).attr("title") == tableName) {
        //             k = false;
        //            if (!$(this).hasClass("active")) {
        //                $(this).addClass("active").siblings(".J_menuTab").removeClass("active");
        //                $(this).siblings(".J_menuTab").find('.js-refresh').removeClass('active')
        //                $(this).find('.js-refresh').addClass('active');
        //            }
        //            var o = $(this).data("id")
        //            $(".J_mainContent .J_iframe", window.parent.document).each(function (i) {
        //
        //                if ($(this).data("id") == o) {
        //                    $(this).show().siblings(".J_iframe").hide();
        //                    this.contentWindow.location.reload(true);
        //                    return false
        //                }
        //                else if($(this).data("id") != o){
        //                    var k = $('.J_menuTab', window.parent.document).length-1;
        //                    var n = '<iframe class="J_iframe" name="iframe' + k + '" width="100%" height="100%" src="' + path + '" frameborder="0" data-id="' + path + '" seamless></iframe>';
        //                    $(".J_mainContent", window.parent.document).find("iframe.J_iframe").eq(j).remove();
        //                    var c = j-1;
        //                    $(".J_mainContent", window.parent.document).find("iframe.J_iframe").eq(c).after(n);
        //                    return false
        //                }
        //            })
        //            return false
        //        }
        //    });
        //
        //    if (k && $('.J_menuTab', window.parent.document).length > 6) {
        //        debugger
        //        k = true;
        //        try {
        //            var iframe = $(".J_mainContent", window.parent.document).find('iframe.J_iframe:last')[0];
        //            if (iframe) {
        //                iframe.contentWindow.document.write('');
        //                iframe.contentWindow.document.clear();
        //                iframe.contentWindow.close();
        //                var p = iframe.parentNode;
        //                p.removeChild(iframe);
        //            }
        //        } catch (e) {
        //        }
        //        $(".J_menuTabs .page-tabs-content .J_menuTab:last", window.parent.document).remove();
        //    }
        //
        //    if (k) {
        //        debugger
        //        var p = '<a href="javascript:;" class="active J_menuTab" data-id="' + path + '" title="' + tableName + '"><em>' + tableName + ' </em><i class="fa close xbt-icon"></i><i class="fa refresh active js-refresh"></i></a>';
        //
        //        $(".J_menuTab", window.parent.document).removeClass("active");
        //        $(".J_menuTab", window.parent.document).find('.js-refresh').removeClass('active');
        //
        //        var k = $('.J_menuTab', window.parent.document).length;
        //
        //        var n = '<iframe class="J_iframe" name="iframe' + k + '" width="100%" height="100%" src="' + path + '" frameborder="0" data-id="' + path + '" seamless></iframe>';
        //
        //        //$(".J_mainContent", window.parent.document).find("iframe.J_iframe").hide().parents(".J_mainContent").find('iframe.J_iframe:last').after(n);
        //        if (tabName != '首页') {
        //            $(".J_menuTab", window.parent.document).each(function () {
        //                if ($(this).attr("title") == tabName) {
        //                    $(this).after(p);
        //                    var o = $(this).data("id");
        //                    $(".J_mainContent .J_iframe", window.parent.document).each(function () {
        //                        if ($(this).data("id") == o) {
        //                            $(this).after(n);
        //                            return false
        //                        }
        //                    })
        //                    return false;
        //                }
        //            });
        //        } else {
        //            $(".J_mainContent", window.parent.document).find("iframe.J_iframe").hide().parents(".J_mainContent").find('iframe.J_iframe:first').after(n);
        //            $(".J_menuTabs .page-tabs-content .J_menuTab:first", window.parent.document).after(p);
        //        }
        //    }
        //},

        tableBank: function (path, tableName) {
            if (
                tableName ==
                $(".J_menuTab.active", window.parent.document).attr("title")
            ) {
                return false;
            }

            var p =
                '<a href="javascript:;" class="active J_menuTab" data-id="' +
                path +
                '" title="' +
                tableName +
                '"><em>' +
                tableName +
                ' </em><i class="fa close xbt-icon"></i><i class="fa refresh active js-refresh"></i></a>';

            var n =
                '<iframe class="J_iframe" name="iframe' +
                '" width="100%" height="100%" src="' +
                path +
                '" frameborder="0" data-id="' +
                path +
                '" seamless></iframe>';

            for (
                var i = 0;
                i < $(".J_menuTab", window.parent.document).length;
                i++
            ) {
                if (
                    $(".J_menuTab", window.parent.document)
                        .eq(i)
                        .attr("title") == tableName
                ) {
                    $(".J_menuTab", window.parent.document).removeClass(
                        "active"
                    );
                    $(".J_menuTab", window.parent.document)
                        .eq(i)
                        .addClass("active")
                        .attr("data-id", path);
                    $(".J_mainContent", window.parent.document)
                        .find("iframe.J_iframe")
                        .hide()
                        .parents(".J_mainContent")
                        .find("iframe.J_iframe")
                        .eq(i)
                        .after(n)
                        .remove();
                    return false;
                }
            }
            $(".J_menuTab", window.parent.document).removeClass("active");
            $(".J_menuTab", window.parent.document)
                .find(".js-refresh")
                .removeClass("active");

            $(".J_mainContent", window.parent.document)
                .find("iframe.J_iframe")
                .hide()
                .parents(".J_mainContent")
                .find("iframe.J_iframe:first")
                .after(n);
            $(
                ".J_menuTabs .page-tabs-content .J_menuTab:first",
                window.parent.document
            ).after(p);
            // $(".J_mainContent", window.parent.document).append(n);
        },

        /**
         *  时间间隔计算工具
         * @param strInterval
         * @param num
         * @returns {string}
         */
        timeInterval: function (strInterval, num) {
            var date = arguments[2] || new Date();
            switch (strInterval) {
                case "s":
                    date = new Date(date.getTime() + 1000 * num);
                    break;
                case "n":
                    date = new Date(date.getTime() + 60000 * num);
                    break;
                case "h":
                    date = new Date(date.getTime() + 3600000 * num);
                    break;
                case "d":
                    date = new Date(date.getTime() + 86400000 * num);
                    break;
                case "w":
                    date = new Date(date.getTime() + 86400000 * 7 * num);
                    break;
                case "m":
                    date = new Date(
                        date.getFullYear(),
                        date.getMonth() + num,
                        date.getDate(),
                        date.getHours(),
                        date.getMinutes(),
                        date.getSeconds()
                    );
                    break;
                default:
                    date = new Date(
                        date.getFullYear() + num,
                        date.getMonth(),
                        date.getDate(),
                        date.getHours(),
                        date.getMinutes(),
                        date.getSeconds()
                    );
            }
            date = date.getTime() >= new Date().getTime() ? new Date() : date;
            return [
                date.getFullYear(),
                date.getMonth() + 1,
                date.getDate(),
            ].join("/");
        },

        /**
         * 格式化日期  /yy/MM/dd/hh/mm/ss
         * @param date
         * @param formatStr
         * @returns {*}
         */
        dateFormat: function (date, formatStr) {
            var str = formatStr;
            var Week = ["日", "一", "二", "三", "四", "五", "六"];
            str = str.replace(/yy/, date.getFullYear());
            str = str.replace(
                /y/,
                date.getYear() % 100 > 9
                    ? (date.getYear() % 100).toString()
                    : "0" + (date.getYear() % 100)
            );
            str = str.replace(
                /MM/,
                date.getMonth() >= 9
                    ? (date.getMonth() + 1).toString()
                    : "0" + (date.getMonth() + 1)
            );
            str = str.replace(/M/, date.getMonth() + 1);
            str = str.replace(/w|W/, Week[date.getDay()]);
            str = str.replace(
                /dd/,
                date.getDate() > 9
                    ? date.getDate().toString()
                    : "0" + date.getDate()
            );
            str = str.replace(/d/, date.getDate());
            str = str.replace(
                /hh/,
                date.getHours() > 9
                    ? date.getHours().toString()
                    : "0" + date.getHours()
            );
            str = str.replace(/h/, date.getHours());
            str = str.replace(
                /mm/,
                date.getMinutes() > 9
                    ? date.getMinutes().toString()
                    : "0" + date.getMinutes()
            );
            str = str.replace(/m/, date.getMinutes());
            str = str.replace(
                /ss/,
                date.getSeconds() > 9
                    ? date.getSeconds().toString()
                    : "0" + date.getSeconds()
            );
            str = str.replace(/s/, date.getSeconds());
            return str;
        },

        /**
         * 毫秒转日期格式化字符串
         *
         * @param time 时间毫秒数
         * @param formatStr 格式
         * @author jiangsen
         */
        timeFormat: function (time, formatStr) {
            let date = new Date(time);
            let o = {
                "M+": date.getMonth() + 1, //月份
                "d+": date.getDate(), //日
                "h+": date.getHours(), //小时
                "m+": date.getMinutes(), //分
                "s+": date.getSeconds(), //秒
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                S: date.getMilliseconds(), //毫秒
            };
            if (/(y+)/.test(formatStr))
                formatStr = formatStr.replace(
                    RegExp.$1,
                    (date.getFullYear() + "").substr(4 - RegExp.$1.length)
                );
            for (let k in o)
                if (new RegExp("(" + k + ")").test(formatStr))
                    formatStr = formatStr.replace(
                        RegExp.$1,
                        RegExp.$1.length == 1
                            ? o[k]
                            : ("00" + o[k]).substr(("" + o[k]).length)
                    );

            return formatStr;
        },

        /**
         * ajax请求
         *
         * @param url 接口地址
         * @param method 方法
         * @author jiangsen
         */
        queryData: function (url, data, callback, error, method) {
            method = method == undefined ? "post" : method;
            $.ajax({
                url: url,
                type: method,
                dataType: "JSON",
                data: data,
                success: function (res) {
                    callback(res);
                },
                error: function (res) {
                    error(res);
                },
            });
            /*return new Promise(function(callback, error) {
                $.ajax({
                    url: "http://192.168.5.114:8080/" + url,
                    type: method,
                    dataType: 'JSON',
                    data: data,
                    success: function(res) {
                        callback(res)
                    },
                    error: function(res) {
                        error(res)
                    }
                });
            });
*/
        },
    };
});
