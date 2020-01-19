// pages/index/myclass.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classinfo: [{
        name: '微机安装与调试',
        start: '#fff',
        end: '#EFF3F6',
        icon: '../../image/unselected.png',
        lv:'0'
      },
      {
        name: '硬件部分',
        start: '#EFF3F6',
        end: '#EFF3F6',
        icon: '../../image/unselected.png',
        lv:'1'
      },
      {
        name: '硬件系统概论',
        start: '#EFF3F6',
        end: '#EFF3F6',
        icon: '../../image/unselected.png',
        lv:'2'
      },
      {
        name: 'CPU',
        start: '#EFF3F6',
        end: '#EFF3F6',
        icon: '../../image/unselected.png',
        lv:'2'
      },
      {
        name: '显卡&显示器',
        start: '#EFF3F6',
        end: '#fff',
        icon: '../../image/unselected.png',
        lv:'2'
      },
      {
        name:'存储器',
        start:'#EFF3F6',
        end:'#fff',
        icon:'../../image/unselected.png',
        lv:'2'
      },
      {
        name: '软件部分',
        start: '#EFF3F6',
        end: '#fff',
        icon: '../../image/unselected.png',
        lv: '1'
      },
      {
        name: '软件系统概论',
        start: '#EFF3F6',
        end: '#fff',
        icon: '../../image/unselected.png',
        lv: '2'
      },
      {
        name: '虚拟机',
        start: '#EFF3F6',
        end: '#fff',
        icon: '../../image/unselected.png',
        lv: '2'
      },
      {
        name: '启动流程&文件系统',
        start: '#EFF3F6',
        end: '#fff',
        icon: '../../image/unselected.png',
        lv: '2'
      },
      {
        name: '计算机网络简介',
        start: '#EFF3F6',
        end: '#fff',
        icon: '../../image/unselected.png',
        lv: '2'
      },
      {
        name: '实验部分',
        start: '#EFF3F6',
        end: '#fff',
        icon: '../../image/unselected.png',
        lv: '1'
      },
      {
        name: '硬件实验',
        start: '#EFF3F6',
        end: '#fff',
        icon: '../../image/unselected.png',
        lv: '2'
      },
      {
        name: '软件实验',
        start: '#EFF3F6',
        end: '#fff',
        icon: '../../image/unselected.png',
        lv: '2'
      }
    ],
  },

/**
 * 生命周期函数--监听页面加载
 */
onLoad: function(options) {

},

/**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady: function() {

},

/**
 * 生命周期函数--监听页面显示
 */
onShow: function() {

},

/**
 * 生命周期函数--监听页面隐藏
 */
onHide: function() {

},

/**
 * 生命周期函数--监听页面卸载
 */
onUnload: function() {

},

/**
 * 页面相关事件处理函数--监听用户下拉动作
 */
onPullDownRefresh: function() {

},

/**
 * 页面上拉触底事件的处理函数
 */
onReachBottom: function() {

},

/**
 * 用户点击右上角分享
 */
onShareAppMessage: function() {

},
  jump: function (e) {
    console.log(e.target.id);
    var id = e.target.id.replace("\&", ".");
    console.log(id);
    wx.navigateTo({
      url: '../more/more?title=' + id
    })
  }
})