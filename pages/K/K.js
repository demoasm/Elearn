import * as echarts from '../../ec-canvas/echarts';

const t_courseDetailUrl = require('../../config').t_courseDetailUrl;

const app = getApp();

var nameArr = [], courseArr = [], dataArr = [];
var Chart = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ecRadar:{
        lazyLoad: true // 延迟加载
    },
    nameArr:nameArr,
    courseArr:courseArr,
    dataArr:dataArr,
    index1:0,
    index2:0
  },
  onLoad: function(options){
    this.echartsComponnet = this.selectComponent('#mychart');
    this.getData(0,0); 
  },
  getData: function (idx1,idx2) {
    var that = this;
      wx.request({
      url: t_courseDetailUrl,
      success: function (res) {
        //console.log(111);
        var resArr = new Array();
        resArr = res.data;
        var arr = new Array();
        var fatherArr = new Array();
        var sonArr = new Array();
        for (var i in resArr) {
          resArr[i].likes = parseInt(resArr[i].likes);
          resArr[i].reading = parseInt(resArr[i].reading);
          resArr[i].collect = parseInt(resArr[i].collect);
          resArr[i].comment = parseInt(resArr[i].comment);
          resArr[i].time = parseInt(resArr[i].time);
          resArr[i].forward = parseInt(resArr[i].forward);
          var tmp = fatherArr.indexOf(resArr[i].father);
          if (tmp == -1) {
            fatherArr.push(resArr[i].father);
            var tmpArr1 = new Array();
            var tmpArr2 = new Array();
            tmpArr1.push([resArr[i].time, resArr[i].reading, resArr[i].forward, resArr[i].collect, resArr[i].comment, resArr[i].likes]);
            tmpArr2.push(resArr[i].courseName);
            sonArr.push(tmpArr2);
            arr.push(tmpArr1);
          }
          else {
            sonArr[tmp].push(resArr[i].courseName);
            arr[tmp].push([resArr[i].time, resArr[i].reading, resArr[i].forward, resArr[i].collect, resArr[i].comment, resArr[i].likes]);
          }
        }
        //console.log(arr);
        nameArr = fatherArr;
        courseArr = sonArr;
        dataArr = arr;
        that.init_echarts();
        that.setData({
          nameArr: nameArr,
          courseArr: courseArr,
          index1: idx1,
          index2: idx2
        })
      },
      fail: function (res) {
        console.log(res);
        wx.showToast({
          title: '获取数据失败',
          icon: 'fail',
          duration: 2000
        })
      }
    })
      /*that.init_echarts(); //初始化图表
      dataArr = [
        [[30, 456, 20, 26, 2, 253], [16, 346, 225, 155, 8, 122]],
        [[12, 379, 67, 92, 6, 620], [34, 569, 54, 164, 40, 64]]
      ];
      nameArr = ["硬件课", "软件课"];
      courseArr = [
        ["拆机", "网线制作"],
        ["操作系统安装", "路由器配置"]
      ]*/
  },
  init_echarts: function () {
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.setOption(Chart,0,0);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },
  setOption: function (Chart,idx1,idx2) {
    Chart.clear();  // 清除
    Chart.setOption(this.getOption(idx1,idx2));  //获取新数据
  },
  getOption: function (idx1,idx2) {
    //时间显示范围
    /*var anchor = [
      { name: weekDate, value: [weekDate, 0] },  // 开始
      { name: nowDate, value: [nowDate, 0] }  // 结束
    ];*/
    // 指定图表的配置项和数据
    var that = this;
    //console.log(113);
    var option = {
      backgroundColor: "#ffffff",
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
        indicator: [
          {
            name: '平均耗时',
            max: 60
          },
          {
            name: '阅读量',
            max: 500
          },
          {
            name: '转发量',
            max: 500
          },
          {
            name: '收藏量',
            max: 500
          },
          {
            name: '评论&弹幕',
            max: 500
          },
          {
            name: '点赞',
            max: 500
          }
        ]
      },
      series: [{
        type: 'radar',
        data: [{
          value: dataArr[idx1][idx2]
        }]
      }]
    };
    return option;
  },
  bindPickerChange1:function(e){
    var that = this;
    that.getData(e.detail.value,0);
  },
  bindPickerChange2: function (e) {
    var that = this;
    that.getData(that.data.index1,e.detail.value);
  },
  navButton:function(){
    wx.navigateTo({
      url: '',//这里写G页面的url 
    })
  }
  
})