// pages/shezhi/shezhi.js
var getClasslist = require('../../config.js').getClasslist;
var setMust = require('../../config.js').setMust;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classinfo:[],
    selectclass:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
      wx.request({
         url:getClasslist,
         data:{},
         success: function(res){
            console.log(res.data);
            that.setData({
              classinfo: res.data.classlist,
              selectlist:res.data.selectlist
            })
         }
      })
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

  },

  select: function(e) {
     console.log(e.target.id);
     console.log(e.target.dataset);
     var that = this;
     var classicon='classinfo['+e.target.id+'].icon';
    if (e.target.dataset.icon=="../../image/unmust.png"){
      that.setData({
        [classicon]:'../../image/must.png'
      })
      console.log(classicon);
      var b = {
        'id': e.target.dataset.id,
        'Type': e.target.dataset.type
      }
      that.data.selectlist.push(b);
      console.log(that.data.selectlist);
    }else{
      that.setData({
        [classicon]: '../../image/unmust.png'
      })
      var b = {
        'id': e.target.dataset.id,
        'Type': e.target.dataset.type
      }
      that.data.selectlist.splice(that.data.selectlist.indexOf(b), 1);
      console.log(that.data.selectlist);
    }
  },
  submit: function(){
    var that = this;
    console.log(that.data.selectlist);
    wx.request({
      url: setMust,
      data: {
        selectlist: that.data.selectlist
      },
      success: function(res){
        console.log(res.data);
        wx.showToast({
          title: '设置成功',
          icon: 'success',
          duration: 2000
        })
        wx.navigateBack();
      }
    })
  }
})