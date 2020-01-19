// pages/viewbox/viewbox.js

var app = getApp()

var GetView = require('../../config.js').GetView
Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewbox:'',
    articlebox:'',
    imageurl:'',
    navbar: ['我的','文章','视频'],
    currentTab: 0 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    console.log('页面加载');
    wx.request({
      url: GetView,
      success: function (res) {
        console.log(res.data);
        that.setData({
          viewbox: res.data.viewbox,
          imageurl:res.data.imoprtinfo,
          articlebox:res.data.articlebox,
        });
        console.log(that.data.imageurl);
      }
    })
  },
 onShow:function(){
   var that = this;
   console.log('页面加载');
   wx.request({
     url: GetView,
     success: function (res) {
       console.log(res.data);
       that.setData({
         url: res.data.viewbox,
         imageurl: res.data.imoprtinfo
       })
     }
   })
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

  selectview: function(e){
    console.log("发生视频选择时间");
    console.log(e.currentTarget.id);
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: "view?id="+id
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
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  jump: function(e){
    console.log(e.target.id);
    var id = e.target.id.replace("\&", ".");
    console.log(id);
    wx.navigateTo({
      url: '../more/more?title=' + id
    })
  }
})