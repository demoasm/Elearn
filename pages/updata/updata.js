// pages/updata/updata.js
var app = getApp()
var GetCard = require('../../config.js').GetCard;
var Save = require('../../config.js').Save;
var UpLoadFile = require('../../config.js').UpLoadFile;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    video_src: '',
    image_src: '',
    video_net_src: '',
    image_net_src: '',
    cardlist:'',
    openid:'',
  },
  onLoad: function(){
    var that = this;
    wx.request({
      url:GetCard,
      success:function(res){
        console.log(res.data);
        that.setData({
          cardlist:res.data
        })
      }
    })

    wx.getStorage({
      key: 'openid',
      success: function(res) {
       var openid = res.data;
       that.setData({
         openid:openid,
       }) 
      },
    })
  },
  chooseVideo: function(e) {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      compressed: true,
      maxDuration: 3600,
      success: function(res) {
        console.log(res);
        //console.log(e);
        var video_src = res.tempFilePath;
        console.log(video_src);
        wx.getStorage({
          key: 'openid',
          success: function(res) {},
        })
        
        wx.uploadFile({
          url: UpLoadFile,
          filePath: video_src,
          name: 'name',
          formData: {
            openid: that.data.openid
          },
          success: function(res) {
            console.log(res.data);
            var back = {
              state: "",
              content: ""
            };
            back = JSON.parse(res.data);
            console.log(back['content']);
            if (back['state'] == 1) {
              if (e.currentTarget.dataset.name == "video") {
                that.setData({
                  video_src: video_src,
                  video_net_src: back['content'],
                })
              }
              wx.showToast({
                title: '上传成功',
                icon: 'success',
                duration: 1000
              })
            } else {
              wx.showToast({
                title: '上传失败',
                image: '/image/fail1.png',
                icon: 'fail',
                duration: 2000
              })
            }
          },
          fail: function({
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
      },
      fail: function({
        errMsg
      }) {
        console.log('choosevideo fail, err is', errMsg)
      }
    })
  },
  chooseimage: function(e) {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: 'original',
      success: function(res) {
        console.log(res);
        //console.log(e);
        var image_src = res.tempFilePaths[0];
        console.log(image_src);
        wx.uploadFile({
          url: UpLoadFile,
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
              if (e.currentTarget.dataset.name == "image") {
                that.setData({
                  image_src: image_src,
                  image_net_src: back['content'],
                })
                console.log(that.data.image_net_src);
              }
              wx.showToast({
                title: '上传成功',
                icon: 'success',
                duration: 1000
              })
            } else {
              wx.showToast({
                title: '上传失败',
                image: '/image/fail1.png',
                icon: 'fail',
                duration: 2000
              })
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
      },
      fail: function ({
        errMsg
      }) {
        console.log('choosevideo fail, err is', errMsg)
      }
    })
  },
  formSubmit: function (e) {
    var that = this;
    console.log(e);
    if (e.detail.value.name != "" && e.detail.value.video_net_src !="") {
          wx.request({
            url: Save,//表单的提交，通过这个接口实现，这个接口的用法和jq的ajax用法相似
            data: {
              name: e.detail.value.name,
              video_src: e.detail.value.video_net_src,
              image_src: e.detail.value.image_net_src,
            },//默认是get提交，若post提交，得设置header里"Content-Type": "application/x-www-form-urlencoded"
            success: function (res) {
              console.log(res.data);
              if (res.data) {
                wx.showToast({
                  title: '提交成功',
                  icon: 'success',
                  duration: 2000
                })
              } else {
                wx.showToast({
                  title: '提交失败',
                  image: '/images/fail1.png',
                  icon: 'fail',
                  duration: 2000
                })
              }
              //console.log(res.data);
            },
            fail: function (res) {
              wx.showToast({
                title: '提交失败',
                image: '/images/fail1.png',
                icon: 'fail',
                duration: 2000
              })
            }
          })
        } else {
          wx.showToast({
            title: '请上传视频并填写标题',
            image: '/images/fail1.png',
            icon: 'fail',
            duration: 2000
          })
        }
  },

  formReset: function (e) {
    this.setData({
      video_src: '',
      image_src: '',
    })
  }
})