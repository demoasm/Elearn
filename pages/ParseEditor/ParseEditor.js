// pages/ParseEditor/ParseEditor.js
const util = require('../../utils/util.js')
const UploadFile = require('../../config').UploadFile;
var GetCard = require('../../config.js').GetCard;
const submitUrl = require('../../config').submitUrl;
const compareVersion = util.compareVersion
var html = undefined;
var image_net_src = undefined;
Page({
  onShareAppMessage() {
    return {
      title: 'editor',
      path: 'page/component/pages/editor/editor'
    }
  },

  data: {
    formats: {},
    bottom: 0,
    readOnly: false,
    placeholder: '开始输入...',
    image_src1: '',
    cardlist: [],
    labelf:'',
    labels:'',
    labelt:'',
    avatarurl:'',
  },
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  onLoad() {
    var that = this;
    wx.request({
      url: GetCard,
      success: function(res) {
        console.log(res.data);
        that.data.cardlist = res.data;
        that.setData({
          cardlist: res.data
        })
        //console.log(that.cardlist);
      }
    })
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        var openid = res.data;
        that.setData({
          openid: openid,
        })
      },
    })
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.data.avatarurl = res.data.avatarUrl;
      },
    })
    that.canUse = true
    wx.loadFontFace({
      family: 'Pacifico',
      source: 'url("https://sungd.github.io/Pacifico.ttf")',
      success: console.log
    })
    const {
      SDKVersion
    } = wx.getSystemInfoSync()

    if (compareVersion(SDKVersion, '2.7.0') >= 0) {
      //
    } else {
      console.log(SDKVersion);
      this.canUse = false
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  bindinput(e) {
    console.log(e.detail.html);
    html = e.detail.html;
  },
  select1(e) {
    var that = this;
    //console.log(this.cardlist[parseInt(e.target.id)]);
    that.data.cardlist[parseInt(e.target.id)].select = 1;
    that.data.labelf = that.data.cardlist[parseInt(e.target.id)].name;
    for (var i in that.data.cardlist) {
      console.log(that.data.cardlist[i].lv);
      if (that.data.cardlist[i].lv == 0) {
        var select = 'cardlist[' + i + '].select';
        if (i == parseInt(e.target.id)) {
          that.setData({
            [select]: 1
          })
        } else {
          that.setData({
            [select]: 0
          })
        }
      }
    }
  },
  select2(e) {
    var that = this;
    //console.log(this.cardlist[parseInt(e.target.id)]);
    that.data.cardlist[parseInt(e.target.id)].select = 1;
    that.data.labels = that.data.cardlist[parseInt(e.target.id)].name;
    for (var i in that.data.cardlist) {
      console.log(that.data.cardlist[i].lv);
      if (that.data.cardlist[i].lv == 1) {
        var select = 'cardlist[' + i + '].select';
        if (i == parseInt(e.target.id)) {
          that.setData({
            [select]: 1
          })
        } else {
          that.setData({
            [select]: 0
          })
        }
      }
    }
  },
  select3(e) {
    var that = this;
    //console.log(this.cardlist[parseInt(e.target.id)]);
    that.data.cardlist[parseInt(e.target.id)].select = 1;
    that.data.labelt = that.data.cardlist[parseInt(e.target.id)].name;
    for (var i in that.data.cardlist) {
      console.log(that.data.cardlist[i].lv);
      if (that.data.cardlist[i].lv == 2) {
        var select = 'cardlist[' + i + '].select';
        if (i == parseInt(e.target.id)) {
          that.setData({
            [select]: 1
          })
        } else {
          that.setData({
            [select]: 0
          })
        }
      }
    }
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function(res) {
      that.editorCtx = res.context
    }).exec()
  },

  undo() {
    this.editorCtx.undo()
  },
  redo() {
    this.editorCtx.redo()
  },
  format(e) {
    if (!this.canUse) return
    const {
      name,
      value
    } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)
  },

  onStatusChange(e) {
    const formats = e.detail
    this.setData({
      formats
    })
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success() {
        console.log('insert divider success')
      }
    })
  },
  clear() {
    this.editorCtx.clear({
      success() {
        console.log('clear success')
      }
    })
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },
  insertImage() {
    const that = this
    wx.chooseImage({
      count: 1,
      sizeType: 'original',
      success(res) {
        console.log(res);
        var image_src = res.tempFilePaths[0];
        console.log(image_src);
        wx.uploadFile({
          url: UploadFile,
          filePath: image_src,
          name: 'name',
          formData: {
            openid: that.data.openid
          },
          success: function(res) {
            //console.log(res.data.content);
            var back = {
              state: "",
              content: ""
            };
            back = JSON.parse(res.data);
            console.log(back['content']);
            that.editorCtx.insertImage({
              src: back['content'],
              data: {
                id: 'abcd',
                role: 'god'
              },
              success() {
                console.log('insert image success')
              }
            })
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
        //

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
          url: UploadFile,
          filePath: image_src,
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
              if (e.currentTarget.dataset.name == "image") {
                that.setData({
                  image_src1: image_src,
                  //image_net_src: back['content'],
                })
                image_net_src = back['content'];
                console.log(image_net_src);
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

  formSubmit(e) {
    var that = this;
    console.log(e.detail.value);
    console.log(that.data.labelf + '#' + that.data.labels + '#' + that.data.labelt + '#' + html + '#' + image_net_src);
    if (e.detail.value.name == '' || e.detail.value.abstract == '' || e.detail.value.up == '' || e.detail.value.duration == '' || e.detail.value.difficulty == '' || that.data.labelf == undefined || that.data.labels == undefined || that.data.labelt == undefined || html == undefined || image_net_src==undefined){
      wx.showToast({
        title: '请完善信息',
        icon: 'none',
      })
    }else{
      wx.request({
        url: submitUrl,
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:{
          "name": e.detail.value.name,
          "abstract": e.detail.value.abstract,
          "text": html,
          "labelf": that.data.labelf,
          "labels": that.data.labels,
          "labelt": that.data.labelt,
          "up": e.detail.value.up,
          "avatarurl":that.data.avatarurl,
          "imageurl": image_net_src,
          "difficulty": e.detail.value.difficulty,
          "duration": e.detail.value.duration,
        },
        success:function(res){
          console.log(res.data);
          wx.showToast({
            title: '上传成功',
          })
        },
      })
    }
  }
})