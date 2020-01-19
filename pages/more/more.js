// pages/more/more.js
var app = getApp();
var GetOther = require('../../config.js').GetOther

Page({

  /**
   * 页面的初始数据
   */
  data: {
     title:"",
     viewbox: '',
     articlebox:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
     var that = this;
     console.log(option.title);
    var title = option.title.replace(".", "&");
    console.log(title);
     that.setData({
      title:title
     });
     wx.getStorage({
       key: 'openid',
       success: function(res1) {
         wx.request({
           url: GetOther,
           data: {
             title: title,
             openid: res1.data,
           },
           success: function (res) {
             console.log(res.data);
             that.setData({
               viewbox: res.data.viewbox,
               articlebox: res.data.articlebox,
             })
           }
         })

       },
     })
  },
  selecttext: function (e) {
    console.log("发生视频选择时间");
    console.log(e.currentTarget.id);
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: "../article/article?id=" + id
    })
  },
  selectview: function (e) {
    console.log("发生视频选择时间");
    console.log(e.currentTarget.id);
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: "../viewbox/view?id=" + id
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

  }
})