var time = 6000;
/**
 * echart配置
 */
function chart(options) {
    var myChart = echarts.init(document.getElementById(options.el));
    myChart.showLoading();
    var opt;
    $.get(options.url + "?timestamp="+ new Date().getTime(), function (data) {
            myChart.hideLoading();
            if (options.el == "main8") {
	            $('.source .num').text(data.source);
	            $('.person .num').text(data.person);
	            $('.change-number .num').text(data.count);
                opt = {
                    title: {
                        text: '每日上转数据监控图',
                        left: 'center',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 14
                        }
                    },
                    tooltip: {
                        trigger: 'axis', //折线上的点显示对应的数据
                        axisPointer: {
                            type: 'cross',
                            animation: false,
                            label: {
                                backgroundColor: '#ccc',
                                borderColor: '#aaa',
                                borderWidth: 1,
                                shadowBlur: 0,
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                textStyle: {
                                    color: '#222'
                                }
                            }
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        data: data.control.categories,
                        axisLabel: {},
                        splitLine: {
                            show: false
                        },
                        boundaryGap: false
                    },
                    yAxis: {},
                    series: [{
                        type: 'line',
                        showSymbol: false,
                        hoverAnimation: false,
                        name: '销量',
                        markLine: {
                            data: [
                                {
                                    type: 'average', name: '平均值', lineStyle: {
                                    normal: {
                                        color: "blue"
                                    }
                                }
                                },
                                {
                                    type: 'max', name: '最大', lineStyle: {
                                    normal: {
                                        color: "blue"
                                    }
                                }
                                },
                                {
                                    type: 'min', name: '最小', lineStyle: {
                                    normal: {
                                        color: "blue"
                                    }
                                }
                                }
                            ]
                        },
                        data: data.control.data
                    }]
                };
            }
            else if (options.el == "main7") {
                opt = {
                    title: {
                        text: '处理任务条数统计',
                        left: 'center'
                    },
                    tooltip: {},
                    color: ['green'],
                    xAxis: {
                        data: data.categories,
                        axisLabel: {  //坐标轴刻度标签的显示间隔
                            interval: 1
                        }
                    },
                    yAxis: {},
                    series: [{
                        // 根据名字对应到相应的系列
                        name: '任务数',
                        type: 'bar',
                        label: {
                            normal: { //柱形图上方的文字
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: '#333'
                                }
                            }
                        },
                        markLine: {
                            data: [
                                {
                                    type: 'average', name: '平均值', lineStyle: {
                                    normal: {
                                        color: "blue"
                                    }
                                }
                                }
                            ],
                            symbol: ['circle', 'triangle']//symbol标线两端的标记类型
                        },
                        data: data.data
                    }]
                }
            }
            else if (options.el == "main6") {
                opt = {
                    title: {
                        text: '每周新增法人数量',
                        left: 'center'
                    },
                    tooltip: {
//                formatter: function (params) {
//                    var data = params.data || [0, 0];
//                    return data[0].toFixed(2) + ', ' + data[1].toFixed(2);
//                }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {},
                    yAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: data.map(function (item) {
                            return item[0];
                        }),
                        axisLine: {onZero: false}
                    },
                    series: [
                        {
                            type: 'line',
                            smooth: true,
                            data: data.map(function (item) {
                                return item[1];
                            })
                        }
                    ]
                }
            }
            else if (options.el == "main5") {
                opt = {
                    title: {
                        text: '当月新增企业类型分布',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },

                    legend: {
                        orient: 'vertical',
                        right: '0',
                        top: '40%',
                        data: data.map(function (item) {
                            return item.name
                        }),
                    },
                    calculable: false,
                    series: [
                        {
                            name: '访问来源',
                            label: {
                                normal: {
                                    position: 'inner'
                                }
                            },
                            type: 'pie',
                            radius: '50%',
                            center: ['30%', '60%'],
                            data: data.map(function (item) {
                                return item
                            }),
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                }
            }
            else if (options.el == "main4") {
                opt = {
                    title: {
                        text: '企业类型总体分布',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },

                    legend: {
                        orient: 'vertical',
                        right: '0',
                        top: '40%',
                        data: data.map(function (item) {
                            return item.name
                        }),
                    },
                    calculable: false,
                    series: [
                        {
                            name: '访问来源',
                            label: {
                                normal: {
                                    position: 'inner'
                                }
                            },
                            type: 'pie',
                            radius: '50%',
                            center: ['30%', '60%'],
                            data: data.map(function (item) {
                                return item
                            }),
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                }
            }
            else if (options.el == "main3") {
                opt = {
                    title: {
                        text: '读入读出情况',
                        left: 'center',
                        textStyle: {
                            color: '#fff',
                            fontSize: 14
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    color: ['#79d8f1', '#bf93eb', '#68dfcc'],
                    legend: {
                        data: [{
                            name: '读取',
                            textStyle: {
                                color: '#333'
                            }
                        }, {
                            name: '写入',
                            textStyle: {
                                color: '#333'
                            }
                        }, {
                            name: '读写速度',
                            textStyle: {
                                color: '#333'
                            }
                        }
                        ]
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    yAxis: [
                        {
                            type: 'category',
                            axisTick: {show: false},
                            data: data.category
                        }
                    ],
                    series: [
                        {
                            name: '写入',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true
                                }
                            },
                            data: data.xr
                        },
                        {
                            name: '读取',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'left'
                                }
                            },
                            data: data.dq
                        },
                        {
                            name: '读写速度',
                            type: 'bar',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside'
                                }
                            },
                            data: data.dx
                        }
                    ]
                }
            }
            else if (options.el == "main2") {
                opt = {
                    title: {
                        text: '每日处理流量（M）',
                        //subtext: '子标题',
                        left: 'center',
                        textStyle: {
                            color: '#fff',
                            fontSize: 14
                        }
                    },
                    tooltip: {
                        trigger: 'axis', //折线上的点显示对应的数据
                        axisPointer: {
                            type: 'cross',
                            animation: false,
                            label: {
                                backgroundColor: '#ccc',
                                borderColor: '#aaa',
                                borderWidth: 1,
                                shadowBlur: 0,
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                textStyle: {
                                    color: '#222'
                                }
                            }
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        data: data.categories,
                        axisLabel: {},
                        splitLine: {
                            show: false
                        },
                        boundaryGap: false
                    },
                    yAxis: {},
                    series: [{
                        name: '日处理流量',
                        type: 'line',
                        showSymbol: false,
                        hoverAnimation: false,
                        markLine: {
                            data: [
                                {
                                    type: 'average', name: '平均值', lineStyle: {
                                    normal: {
                                        color: "blue"
                                    }
                                }
                                }
                            ]
                        },
                        data: data.data
                    }]
                }
            }
            else if (options.el == "main1") {
                opt = {
                    title: {
                        text: '每日任务数统计（条数）',
                        left: 'center',
                        textStyle: {
                            color: '#fff',
                            fontSize: 14
                        }
                    },
                    tooltip: {},
                    color: ['red'],
                    xAxis: {
                        data: data.categories,
                        axisLabel: {  //坐标轴刻度标签的显示间隔
                            interval: 1
                        }
                    },
                    yAxis: {},
                    series: [{
                        // 根据名字对应到相应的系列
                        name: '任务数',
                        type: 'bar',
                        label: {
                            normal: { //柱形图上方的文字
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: '#333'
                                }
                            }
                        },
                        markLine: {
                            data: [
                                {
                                    type: 'average', name: '平均值', lineStyle: {
                                    normal: {
                                        color: "blue"
                                    }
                                }
                                }
                            ],
                            symbol: ['circle', 'triangle']//symbol标线两端的标记类型
                        },
                        data: data.data
                    }]
                }
            }
			myChart.setOption(option = opt);
	    }
    );
}

/**
 * echart传参
 */
function dailyTaskNumber(){
    chart({
        el: "main1",
        url: "data/data1.json"
    });
}
function dailyProcessingFlow(){
    chart({
        el: "main2",
        url: "data/data2.json"
    });
}
function readWriteSpeed(){
    chart({
        el: "main3",
        url: "data/data3.json"
    });
}
function companyType(){
    chart({
        el: "main4",
        url: "data/data4.json"
    });
}
function newCompanyType(){
    chart({
        el: "main5",
        url: "data/data4.json"
    });
}
function newLegalPerson(){
    chart({
        el: "main6",
        url: "data/data5.json"
    });
}
function handleTaskNumber(){
    chart({
        el: "main7",
        url: "data/data1.json"
    });
}
function dailyUploadData(){
    chart({
        el: "main8",
        url: "data/data9.json"
    });
}

dailyTaskNumber();
dailyProcessingFlow();
readWriteSpeed();
companyType();
newCompanyType();
newLegalPerson();
handleTaskNumber();
dailyUploadData();

setInterval(function(){
    dailyTaskNumber();
    dailyProcessingFlow();
    readWriteSpeed();
    companyType();
    newCompanyType();
    newLegalPerson();
    handleTaskNumber();
    dailyUploadData();
},time);


/**
 * ajax请求
 */
var defaultOpt = {
    async: true,
    dataType: 'json',
    type: 'get',
    cache: false,
    //serializable: false
};

function generateHttpParam(options) {
		var opt = $.extend({}, defaultOpt, options);
	    opt.url = options.url;
	    opt.success = function (data) {
	        //setTimeout(function(){
	        options.success && options.success(data);
	        //},400);
	    }
	    opt.error = function (jqXHR, textStatus, errorThrown) {
	        options.error && options.error(jqXHR, textStatus, errorThrown);
	    }
	    return opt;
};


function httpRequest(options) {
    var ajax = $.ajax(generateHttpParam(options));
};


/**
 * 法人数量动态统计
 */
function legalPersonNumber(){
    httpRequest({
        url: "data/data44.json",
        success: function (data) {
            var data = data.users;
            var j = $(".js-person-number li").length;
            var l = j - data.length;
            var k = l - 1;
            for (var i = 0; i < j; i++) {
                var item = data.charAt(i);
                if(l < j){
                    $(".js-person-number li").eq(l++).text(item);
                }
                else {
                    $(".js-person-number li").eq(k--).text("");
                }
            }
        },
        error: function (jqXHR) {
            console.log("myecharts error.");
        }
    });
}


/**
 * 累计处理条数
 */
function handleNumeral(){
    httpRequest({
        url: "data/data6.json",
        success: function (data) {
            var total = $(".total");
            var rightnum = $(".percentage-block .right");
            var errornum = $(".percentage-block .error");
            var monthly = $(".monthly .num");
            var flow = $(".sum-flow .num");
            var average = $(".average .num");
            var time = $(".sum-time .num");

            var rightpre = parseInt(data.right / data.total * 100);
            var errorpre = 100 - rightpre;
            total.text(data.total + "条");
            rightnum.text(data.right + "条, " + rightpre + "%").css("width", rightpre + "%");
            errornum.text(data.total - data.right + "条, " + errorpre + "%").css("width", errorpre + "%");

            monthly.text(data.monthly + "条");
            flow.text(data.flow + "M");
            average.text(data.average + "M/S");
            time.text(data.time + "S");
        },
        error: function (jqXHR) {
            console.log("myecharts error.");
        }
    });
}


/**
 * 数据质量对比
 */
function qualityComparison(){
    httpRequest({
        url: "data/data7.json",
        success: function (data) {
            var evaluate = $(".js-data-quality .evaluate");
            var lnum = $(".js-data-quality-chart .l-num");
            var cnum = $(".js-data-quality-chart .c-num");
            var rtnum = $(".js-data-quality-chart .rt-num");
            var rbnum = $(".js-data-quality-chart .rb-num");
            evaluate.text(data.evaluate);
            lnum.text(data.medium + "%").parents('.l').css("width", data.medium + "%");
            cnum.text(data.excellent + "%").parents('.c').css("width", data.excellent + "%");
            rtnum.text(data.good + "%").parent();
            rbnum.text(data.bad + "%").parent();
            $(".js-data-quality-chart .r").css("width", (100 - data.medium - data.excellent) + "%");
        },
        error: function (jqXHR) {
            console.log("myecharts error.");
        }
    });
}


/**
 * 处理任务
 */
function handleTask(){
    httpRequest({
        url: "data/data8.json",
        success: function (data) {
            $('.current-task-title').text(data.curtitle);
            $('.next-task-title').text(data.nexttask.title);
            $('.next-task-time').text(data.nexttask.time);

            $('.process-sum').text(data.curtask.num);
            $('.processed-num').text(data.curtask.finish);
            $('.processed-time').text(data.curtask.time);

            $('.total-percent').text(data.curtask.finish / data.curtask.num * 100 + "%");
            $('.total-time').text();
            $('.sub-percent').text(data.subtask.num + "%");
            $('.sub-time').text(data.subtask.time);

            var html2 = "";
            var l = data.tasks.length;
            for (var i = 0; i < l; i++) {
                var html = "<tr><td>" + data.tasks[i][0] + "</td><td>子任务：" + data.tasks[i][1] + "</td><td>" + data.tasks[i][2] + "</td><td>" +
                    data.tasks[i][3] + "</td><td>" + data.tasks[i][4] + "</td><td>" + data.tasks[i][5] + "S</td><td>" + data.tasks[i][6] + "R/S</td><td>" + data.tasks[i][7] + "</td></tr>";
                var html2 = html2 + html;
            }
            $("table tbody").html(html2);
        },
        error: function (jqXHR) {
            console.log("myecharts error.");
        }
    });
}

legalPersonNumber();
handleNumeral();
qualityComparison();
handleTask();

setInterval(function(){
    legalPersonNumber();
    handleNumeral();
    qualityComparison();
    handleTask();
},time);
