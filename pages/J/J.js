import * as echarts from '../../ec-canvas/echarts';
const t_requiredCourseUrl = require('../../config').t_requiredCourseUrl;
const t_timeDistributionUrl = require('../../config').t_timeDistributionUrl;
const t_learningConditionUrl = require('../../config').t_learningConditionUrl;
const t_contentTreeUrl = require('../../config').t_contentTreeUrl;
const t_learningTimeUrl = require('../../config').t_learningTimeUrl;
const t_courseRankingUrl = require('../../config').t_courseRankingUrl;
const app = getApp();
Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    /*
     * 饼状图的初始数据
     */ 
    ecPie: {
      onInit: function (canvas, width, height) {
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
            console.log(pieArr);
            var pieOption = {
              backgroundColor: "#F6F6F6",
              color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
              series: [{
                label: {
                  normal: {
                    fontSize: 14
                  }
                },
                type: 'pie',
                center: ['50%', '50%'],
                radius: [0, '60%'],
                data: pieArr,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 1, 2, 0.3)'
                  }
                }
              }]
            }
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
      }
    },
    /*
     * 曲线图的初始数据
     */
    ecLine:{
      onInit :function(canvas, width, height) {
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
            var option = {
              
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
                name: '人数',
                splitLine: {
                  lineStyle: {
                    type: 'dashed'
                  }
                }
                // show: false
              },
              series: [{
                name: 'A',
                type: 'line',
                smooth: true,
                data: lineArr,
                
              }]
            };

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
      }
    },
    ecBar:{
      onInit: function (canvas, width, height){
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart);
        wx.request({
          url:t_learningConditionUrl,
          success: function (res) {
            console.log(res.data);
            var nameArr = JSON.parse(res.data[0]);
            var valueArr = JSON.parse(res.data[1]);
            console.log(nameArr);
            console.log(valueArr);
            for (var i in valueArr) {
              valueArr[i] = parseFloat(valueArr[i]).toFixed(2);
            }
            console.log(valueArr);
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
                  data: nameArr,
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
                  data: valueArr,
                  itemStyle: {
                    // emphasis: {
                    //   color: '#37a2da'
                    // }
                  }
                }
              ]
            };

            chart.setOption(option);
          },
          fail: function (res) {
            console.log(res);
            wx.showToast({
              title: '获取数据3失败',
              icon: 'fail',
              duration: 2000
            })
          }
        })
        
        return chart;
      }
    },
    ecBar2: {
      onInit: function (canvas, width, height) {
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart);
        wx.request({
          url: t_learningTimeUrl,
          success: function (res) {
            console.log(res.data);
            var nameArr = JSON.parse(res.data[0]);
            var valueArr = JSON.parse(res.data[1]);
            console.log(nameArr);
            console.log(valueArr);
            for (var i in valueArr) {
              valueArr[i] = parseFloat(valueArr[i]).toFixed(2);
            }
            console.log(valueArr);
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
                  data: nameArr,
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
                  data: valueArr,
                  itemStyle: {
                    // emphasis: {
                    //   color: '#37a2da'
                    // }
                  }
                }
              ]
            };

            chart.setOption(option);
          },
          fail: function (res) {
            console.log(res);
            wx.showToast({
              title: '获取数据3失败',
              icon: 'fail',
              duration: 2000
            })
          }
        })

        return chart;
      }
    },

    ecBar3: {
      onInit: function (canvas, width, height) {
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart);
        wx.request({
          url: t_courseRankingUrl,
          success: function (res) {
            //console.log(res.data);
            var nameArr = JSON.parse(res.data[0]);
            var valueArr = JSON.parse(res.data[1]);
            //console.log(nameArr);
            //console.log(valueArr);
            for (var i in valueArr) {
              valueArr[i] = parseInt(valueArr[i]);
            }
            //console.log(valueArr);
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
                  data: nameArr,
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
                  data: valueArr,
                  itemStyle: {
                    // emphasis: {
                    //   color: '#37a2da'
                    // }
                  }
                }
              ]
            };

            chart.setOption(option);
          },
          fail: function (res) {
            console.log(res);
            wx.showToast({
              title: '获取数据3失败',
              icon: 'fail',
              duration: 2000
            })
          }
        })

        return chart;
      }
    },
    ecTree:{
      onInit :function(canvas, width, height) {
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart);
        wx.request({
          url: t_contentTreeUrl,
          success: function (res) {
            //console.log(res.data);
            var data1 = JSON.parse(res.data);
            var option = {
              backgroundColor: "#F6F6F6",
              series: [{
                type: 'tree',
                initialTreeDepth: -1,
                name: 'tree1',
                data: [data1],
                top: '5%',
                left: '20%',
                bottom: '2%',
                right: '15%',
                symbolSize: 10,
                symbol: 'circle',
                label: {
                  normal: {
                    position: 'left',
                    verticalAlign: 'middle',
                    align: 'right',
                    color: 'black'
                  }
                }

              }]
            };

            chart.setOption(option);
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
        

        return chart;
      }
    }
  },
  onLoad :function(){

  },
  onReady() {

  }
})

