// pages/editor/editor.js
const submitUrl = require('../../config').submitUrl;
const UploadFile = require('../../config').UploadFile;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    writer:'',
    time:'',
    value:'',
    intro:'',
    label1:'0',
    label2: '0',
    label3: '0',
    arr: [],
    arrlen:3,
    time:'2018-11-8',
    para:'',
    index:'',
    openid:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  /**
   * 生命周期函数--监听页面初次渲染完成
   */},
  onReady: function () {
    var myDate = new Date();
    var date = myDate.getFullYear() + "-" + (myDate.getMonth()+1) + "-" + myDate.getDate();
    this.setData({
      time: date
    })
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
    var that = this;
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        that.setData({
          openid:res.data,
        })
      },
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  newpara:function(e){
    var that = this;
    that.setData({
      para: e.detail.value
    })
    
    //console.log(e);
    
  },
  finish:function(e){
    var that = this;
    setTimeout(function () {
      var arr = that.data.arr;
      var newpara = {};
      newpara.para = that.data.para;
      newpara.ispic = false;
      arr.push(newpara);
      that.setData({
        arr: arr,
        arrlen: that.data.arrlen + 1,
      })
      that.setData({
        para: ''
      })
    }, 100)
    //console.log(arr);
  },

  
  choosepic: function (e) {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: 'original',
      success: function (res) {
        console.log(res);
        //console.log(e);
        var image_src = res.tempFilePaths[0];
        console.log(image_src);
        wx.uploadFile({
          url: UploadFile,
          filePath: image_src,
          name: 'name',
          formData: {
            openid: that.data.openid
          },
          success: function (res) {
            console.log(res.data);
            var back = {
              state: "",
              content: ""
            };
            back = JSON.parse(res.data);
            console.log(back['content']);
            if (back['state'] == 1) {
                var arr = that.data.arr;
                var newpic = {};
                newpic.ispic = true;
                newpic.para = back['content'];
                arr.push(newpic);
                that.setData({
                  arr: arr,
                  arrlen: that.data.arrlen + 1
                })
            } else {

            }
          },
          fail: function ({
            errMsg
          }) {
            wx.showToast({
              title: '上传失败',
              image: '/image/fail1.png',
              icon: 'fail',
              duration: 2000
            })
            console.log('uploadvideo fail, errMsg is', errMsg)
          }
        })
        //

      },
      fail: function ({
        errMsg
      }) {
        console.log('choosevideo fail, err is', errMsg)
      }
    })
  },
  submit:function(e){
    var that=this;
    console.log(e.detail.value);
   /*wx.request({
      url: submitUrl,
      data:{
        title:e.detail.value.title,
        writer:e.detail.value.writer,
        time:that.data.time,
        intro: e.detail.value.intro,
        value: e.detail.value.value
      }
    })*/
  },
  deletepara:function(e){
    var that = this;
    var idx = e.target.dataset.idx;// 获取当前下标
    //console.log(e.currentTarget.dataset.idx);
    var arr=that.data.arr;
    arr.splice(idx,1);
    this.setData({
      arr: arr
    })
  },
  post:function(e){
    var that = this;
    console.log(e);
    console.log(e.detail.value);
    console.log(that.data.arr);
    wx.request({
      url: submitUrl,
      data:{
        title: e.detail.value.title,
        writer:e.detail.value.writer,
        time:that.data.time,
        Abstract:e.detail.value.intro,
        text:that.data.arr
      },
      success: function(res){
        console.log(res.data);
        wx.showModal({
          title: '上传成功',
          content: '',
        })
      }
    })
  }
})
