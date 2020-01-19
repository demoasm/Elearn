import * as echarts from '../../ec-canvas/echarts';
const t_requiredCourseUrl = require('../../config').t_requiredCourseUrl;
const t_timeDistributionUrl = require('../../config').t_timeDistributionUrl;
const t_learningConditionUrl = require('../../config').t_learningConditionUrl;
const t_contentTreeUrl = require('../../config').t_contentTreeUrl;
const GetData = require('../../config').GetDataUrl;
const app = getApp();

var Chart = null;
var dataList = [];

Page({
  data: {
    major: '',
    grade: '',
    name: '',
    openid:'',
    schedule:0,
    /*
     * 饼状图的初始数据
     */
    ecPie: {
      lazyLoad: true,
      /*onInit: function (canvas, width, height) {
        const pieChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(pieChart);
        wx.request({
          url: t_requiredCourseUrl,
          success: function (res) {
            var pieArr = new Array();
            pieArr = res.data;
            for (var i in pieArr) {
              pieArr[i].value = parseInt(pieArr[i].value);
            }
            //console.log(pieArr);
            
            pieChart.setOption(pieOption);
          },
          fail: function (res) {
            console.log(res);
            wx.showToast({
              title: '获取数据1失败',
              icon: 'fail',
              duration: 2000
            })
          }
        })
        return pieChart;
      }*/
    },
    /*
     * 曲线图的初始数据
     */
    ecLine: {
      lazyLoad: true,
      /*onInit: function (canvas, width, height) {
        const lineChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(lineChart);
        wx.request({
          url: t_timeDistributionUrl,
          success: function (res) {
            var lineArr = new Array();
            lineArr = res.data;
            for (var i in lineArr) {
              lineArr[i] = parseInt(lineArr[i]);
            }
            //console.log(lineArr);
            

            lineChart.setOption(option);
          },
          fail: function (res) {
            console.log(res);
            wx.showToast({
              title: '获取数据2失败',
              icon: 'fail',
              duration: 2000
            })
          }
        })

        return lineChart;
      }*/
    },
    ecRadar: {
      lazyLoad: true,
    }
  },
  onLoad: function (options) {
    console.log(options);
    this.setData({
      name: options.name,
      major: options.major,
      grade: options.grade.substr(2, 2),
      openid: options.openid,
    })
    //Chart = options.Chart;
    //console.log(Chart);
    //console.log(options.Chart);
    this.echartsComponnet1 = this.selectComponent('#mychart-radar');
    this.echartsComponnet2 = this.selectComponent('#mychart-line');
    this.echartsComponnet3 = this.selectComponent('#mychart-pie');
    this.getData();

  },
  getData: function () {
    var that = this;
      /*增加wx.request时下面这一句要拿到requst的success里*/
          wx.request({
            url: GetData,
            data: {
              openid: that.data.openid
            },
            success: function (res) {
              console.log(res.data);
              var line = [Math.ceil(Math.random() * 30), Math.ceil(Math.random() * 30), Math.ceil(Math.random() * 30), Math.ceil(Math.random() * 30), Math.ceil(Math.random() * 30), Math.ceil(Math.random() * 30), Math.ceil(Math.random() * 30)];
              var pie = [{ value: 45, name: "拆机" }, { value: 30, name: "装机" }, { value: 36, name: "配置路由器" }, { value: 14, name: "网线制作" }];
              var schedule = 100;
              var radar = [[{ name: "学习时长/max 999min", max: 999 }, { name: "阅读量/max 999次", max: 999 }, { name: "收藏数/max：999", max: 999 }, { name: "点赞数/max 999", max: 999 }, { name: "评论&弹幕/max 999", max: 999 }], res.data.radar];
              dataList.push(radar);
              dataList.push(line);
              dataList.push(pie);
              console.log(dataList);
              that.init_echarts(0); //初始化图表
              that.init_echarts(1);
              that.init_echarts(2);
              that.setData({
                schedule: schedule
              });
            }
          })
     /* var line = [5,4,1,1,2,12,8];
      var pie = [{ value:45, name: "拆机" }, { value:30, name: "装机" }, { value:36, name: "配置路由器" }, { value:14, name: "网线制作"}];
      var schedule = 76;
      var radar = [[{ name: "学习时长", max: 60 }, { name: "阅读量", max: 60 }, { name: "收藏数", max: 60 }, { name: "评论&弹幕", max: 60 }, { name: "点赞数", max: 60 }], [1, 1, 1, 1, 1]];
      dataList.push(radar);
      dataList.push(line);
      dataList.push(pie);
      that.init_echarts(0); //初始化图表
      that.init_echarts(1);
      that.init_echarts(2);
      that.setData({
        schedule:schedule
      })*/
    
  },
  init_echarts: function (idx) {
    var that = this;
    var echartsComponnet;
    if (idx == 0) {
      echartsComponnet = this.echartsComponnet1;
    }
    else if (idx == 1) {
      echartsComponnet = this.echartsComponnet2;
    }
    else {
      echartsComponnet = this.echartsComponnet3;
    }
    //console.log(echartsComponnet);
    echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      that.setOption(Chart, idx);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },
  setOption: function (Chart, idx) {
    Chart.clear();  // 清除
    Chart.setOption(this.getOption(idx));  //获取新数据
  },
  getOption: function (idx) {
    //console.log(dataList);
    // 指定图表的配置项和数据
    var that = this;
    var option;
    if(idx==0){
      option = {
        backgroundColor: "#F6F6F6",
        color: ["#37A2DA", "#FF9F7F"],
        tooltip: {},
        xAxis: {
          show: false
        },
        yAxis: {
          show: false
        },
        radar: {
          // shape: 'circle',
          indicator:dataList[0][0]
        },
        series: [{
          name: '',
          type: 'radar',
          data: [{
            value: [Math.ceil(Math.random() * 900), Math.ceil(Math.random() * 700), Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 400), Math.ceil(Math.random() * 500)],
            name: ''
          },
          ]
        }]
      };
    }
    else if(idx==1){
      option = {

        color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
        grid: {
          containLabel: true,
          color: "#F6F6F6"
        },
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          name: '',
          boundaryGap: false,
          data: ['10.1.', '10.5.', '10.10.', '10.15', '10.20.', '10.25', '10.30.'],
          // show: false
        },
        yAxis: {
          x: 'center',
          type: 'value',
          name: '学习次数',
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
          // show: false
        },
        series: [{
          name: '学习次数',
          type: 'line',
          smooth: true,
          data: [Math.ceil(Math.random() * 15), Math.ceil(Math.random() * 20), Math.ceil(Math.random() * 10), Math.ceil(Math.random() * 20), Math.ceil(Math.random() * 30), Math.ceil(Math.random() * 30), Math.ceil(Math.random() * 30)],

        }]
      };
    }
    else{
        option = {
        backgroundColor: "#F6F6F6",
        color: ["#37A2DA",  "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
        series: [{
          label: {
            normal: {
              fontSize: 14
            }
          },
          type: 'pie',
          center: ['50%', '50%'],
          radius: [0, '60%'],
          data: dataList[2],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 2, 2, 0.3)'
            }
          }
        }]
      }
    }
    return option;
  }

})

