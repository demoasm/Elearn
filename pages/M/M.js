import * as echarts from '../../ec-canvas/echarts';
const t_rankingUrl = require('../../config').t_rankingUrl;
const app = getApp();

var Chart = null;
var dataList = [];
Page({
  data: {
    ecBar1: {
      lazyLoad: true
    },
    ecBar2:{
      lazyLoad: true // 延迟加载
    },
    ecBar3: {
      lazyLoad: true // 延迟加载
    },
  },
  onLoad: function () {
    this.getData(); 
    this.echartsComponnet1 = this.selectComponent('#mychart-dom-bar1');
    this.echartsComponnet2 = this.selectComponent('#mychart-dom-bar2');
    this.echartsComponnet3 = this.selectComponent('#mychart-dom-bar3');
    
  },
  getData: function () {
    var that = this;
      wx.request({
        url: t_rankingUrl,
        success: function (res) {
          //console.log(666);
          var hitsRank10 = JSON.parse(res.data[0]);
          var readingRank10 = JSON.parse(res.data[1]);
          var commentRank10 = JSON.parse(res.data[2]);
          //console.log(hitsRank10);
          for (var i = 0; i < 10; i++) {
            hitsRank10[1][i] = parseInt(hitsRank10[1][i]);
            readingRank10[1][i] = parseInt(readingRank10[1][i]);
            commentRank10[1][i] = parseInt(commentRank10[1][i]);
          }
          //console.log(hitsRank10);
          dataList.push(hitsRank10);
          dataList.push(readingRank10);
          dataList.push(commentRank10);
          //console.log(555);
          //chart.setOption(option);
          that.init_echarts(0); //初始化图表
          that.init_echarts(1); //初始化图表
          that.init_echarts(2); //初始化图表
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
      
  },
  //初始化图表
  init_echarts: function (idx) {
    var that = this;
    var echartsComponnet;
    if(idx==0){
      echartsComponnet = this.echartsComponnet1;
    }
    else if(idx==1){
      echartsComponnet = this.echartsComponnet2;
    }
    else{
      echartsComponnet = this.echartsComponnet3;
    }
    //console.log(echartsComponnet);
    echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.setOption(Chart,idx);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },
  setOption: function (Chart,idx) {
    Chart.clear();  // 清除
    Chart.setOption(this.getOption(idx));  //获取新数据
  },
  getOption: function (idx) {
    //console.log(dataList);
    // 指定图表的配置项和数据
    var that = this;
    var option = {
      backgroundColor: "#F6F6F6",
      color: ['#37a2da', '#32c5e9', '#67e0e3'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        confine: true
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true
      },
      xAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666'
          }
        }
      ],
      yAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: dataList[idx][0],
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666'
          }
        }
      ],
      series: [
        {
          name: '热度',
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
          data: dataList[idx][1],
          itemStyle: {
            // emphasis: {
            //   color: '#37a2da'
            // }
          }
        }
      ]
    };
    return option;
  },
})

