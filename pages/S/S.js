//index.js
//获取应用实例
const app = getApp()
const deleteCommentUrl = require('../../config').deleteCommentUrl;

Page({
  data: {
    value_showall: true,
    value_tap: 0,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    comment_result: '',
    classlist_result: '',
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://dlut-elab.com/ljh/getallcomment.php',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //console.log(res.data);
        that.setData({
          comment_result: res.data
        })
      }
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //其他tap点击函数
  button_others: function (e) {
    var that = this;
    this.setData({
      value_tap: 2
    })

  },
  //最新tap点击函数
  button_new: function (e) {
    var that = this;
    this.setData({
      value_tap: 0
    })
  },
  //教材相关tap点击函数
  button_course: function (e) {
    var that = this;
    this.setData({
      value_tap: 1
    })
    wx.request({
      url: 'https://dlut-elab.com/ljh/getallclass.php',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //console.log(res.data);
        that.setData({
          classlist_result: res.data
        })
      }
    })
  },
  /*
  button_uocomment: function (e) {
    var that = this;
    
  },*/
  deletecomment: function (e) {
    var that = this;
    console.log(that.data.comment_result);
    console.log(e.currentTarget.dataset.liuyantext);
    console.log(e.currentTarget.dataset.sender);
    wx.request({
      url: 
        deleteCommentUrl,
      data: {
        sender: e.currentTarget.dataset.sender,
        liuyantext: e.currentTarget.dataset.liuyantext
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //console.log(res.data);
        that.setData({
          comment_result: res.data
        })
        console.log(res.data);
      }
    })
  }
})
