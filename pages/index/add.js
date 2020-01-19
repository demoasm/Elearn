// pages/index/add.js
var app = getApp();
var AddUser = require('../../config.js').AddUser;

Page({

  /**
   * 页面的初始数据
   */
  data: {
     num:'',
     name:''
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

  },
  bindGetUserInfo: function(e){
    console.log(e);
    var that = this;
    wx.setStorage({
      key: 'userInfo',
      data: e.detail.userInfo,
    })
    //app.globalData.userInfo = e.detail.userInfo;
    if(that.data.num==''){

      console.log(that.data.num)
    }else{
      console.log(that.data.num)
      wx.getStorage({
        key: 'openid',
        success: function(res1) {
          wx.showLoading({
            title: '提交中',
          })
          wx.request({
            url: AddUser,
            data: {
              openid: res1.data,
              num: that.data.num,
              Name:that.data.name,
              avatarUrl: e.detail.userInfo.avatarUrl,
            },
            success: function (res) {
              console.log(res.data);
              if(res.data==-1){
                wx.showModal({
                  title: '绑定失败',
                  content: '未查询到此学号',
                  showCancel: false,
                })
              }else if(res.data==0){
                wx.showModal({
                  title: '绑定失败',
                  content: '学号姓名不匹配',
                  showCancel: false,
                })
              }else {
                wx.switchTab({
                  url: 'main',
                })
                wx.showToast({
                  title: '绑定成功',
                })
              }
              wx.hideLoading();
            }
          })
        },
      })
      /*wx.request({
        url:AddUser,
        data:{
          openid:app.globalData.openid,
          num:that.data.num,
          nickName: e.detail.userInfo.nickName,
          avatarUrl: e.detail.userInfo.avatarUrl,
        },
      success: function(res){
        console.log(res.data);
        wx.switchTab({
          url: 'main',
        })
      }
      })*/
    }
  },
  bindKeyInput1: function (e) {

    this.setData({
      num: e.detail.value
    })

    this.data.num = e.detail.value;
    console.log(this.data.num);
  },
  bindKeyInput2: function (e) {

    this.setData({
      name: e.detail.value
    })

    this.data.name = e.detail.value;
  }
})