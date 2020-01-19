// pages/index/main.js
var app = getApp(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:'',
    openid:'',
    admin:'',
    navList1: [
      {
        page: '../J/J',
        id: '查看课程情况',
      },
      {
        page: '../T/T',
        id: '查看学生名单',
      },
      {
        page: '../shezhi/shezhi',
        id: '设置必修课程',
      },
      // {
      //   page: '../K/K',
      //   id: '课程综合情况',
      // },
      // {
      //   page: '../M/M',
      //   id: '学生参与情况排名',
      // },
     {
        page: '../textprase/textprase',
        id: '各实验环节耗时排名',
      },
      {
        page: '../S/S',
        id: '评论&弹幕管理',
      },
      {
        page: '../ParseEditor/ParseEditor',
        id: '创作文章',
      },
      {
        page: '../updata/updata',
        id: '上传视频',
      }
    ],
    navList2: [
      {
        page: 'myclass',
        id: '我的课程',
      },
      {
        page: "../more/more?title=我的收藏",
        id: '我的收藏',
      }
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        that.setData({
          openid:res.data
        })
      },
    })
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({
          userInfo: res.data
        })
      },
    })

    wx.getStorage({
      key: 'admin',
      success: function (res) {
        that.setData({
          admin: res.data
        })
      },
    })
    //console.log(app.globalData.userInfo.avatarUrl);
    /*this.setData({
      userinfo: app.globalData.userInfo,
      openid: app.globalData.openid,
      admin:app.globalData.admin,
    })
    console.log(app.globalData.userInfo);*/
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