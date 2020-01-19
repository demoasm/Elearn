// pages/L/L.js
import * as echarts from '../../ec-canvas/echarts';
const t_courseRankingUrl = require('../../config').t_courseRankingUrl;
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ecBar: {
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
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})