// pages/editor/editor.js
var app=getApp();
var util = require('../../utils/util.js');
var GetMoreText = require('../../config.js').GetMoreText;
var SeeLL = require('../../config.js').SeeLL;
var WriteTime = require('../../config.js').WriteTime;
var Collection = require('../../config.js').Collection;
var UnCollection = require('../../config.js').UnCollection;
var Like = require('../../config.js').Like;
var UnLike = require('../../config.js').UnLike;
var Judge = require('../../config.js').Judge;
var SendLiuYan = require('../../config.js').SendLiuYan;
var ReadLiuYan = require('../../config.js').ReadLiuYan;


Page({

  /**
   * 页面的初始数据
   */
  data: {
     text:'',
     articleinfo:'',
     intime:'',
     outtime:'',
     iflove:'unlove.png',
     iflike:'unlike.png',
    judge1: 'ster2.png',
    judge2: 'ster2.png',
    judge3: 'ster2.png',
    judge4: 'ster2.png',
    judge5: 'ster2.png',
    hard: '',
    ifjudge:0,
    hardlv: 0,
    openid:'',
    nickName: '',
    avatarUrl: '',
    liuyanlist: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var that = this;
    var intime = util.formatTime(new Date());
    wx.request({
      url: GetMoreText,
      data: {
        id: option.id
      },
      success: function (res1) {
        var textinfo = JSON.parse(res1.data.text);
        console.log(textinfo);
        console.log(res1.data);
        wx.getStorage({
          key: 'userInfo',
          success: function(res) {
            that.setData({
              articleinfo: res1.data,
              intime: intime,
              nickName: res.data.nickName,
              avatarUrl: res.data.avatarUrl,
              text: textinfo
            })
            that.readliuyanlist();
          },
        })
       
       
        /*that.setData({
          articleinfo: res1.data,
          intime: intime,
          nickName: app.globalData.userInfo.nickName,
          avatarUrl: app.globalData.userInfo.avatarUrl,
          text:textinfo
        })*/
        //console.log(res.data);
      }
    })
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        var openid = res.data;
        that.setData({
          openid:openid,
        })
        wx.request({
          url: SeeLL,
          data: {
            Type: '文章',
            id: option.id,
            openid:openid,
          },
          success: function (res) {
            console.log(res.data);
            if (res.data.like != 0) {
              that.setData({
                iflike: 'like.png',
              })
            };
            if (res.data.love != 0) {
              that.setData({
                iflove: 'love.png',
              })
            };
            if (res.data.judge != 0) {
              that.setData({
                ifjudge: 1
              })
              switch (res.data.judgeinfo.score) {
                case '1':
                  {
                    that.setData({
                      judge1: 'ster1.png',
                      judge2: 'ster2.png',
                      judge3: 'ster2.png',
                      judge4: 'ster2.png',
                      judge5: 'ster2.png',
                      hard: "简单",
                    })
                    break;
                  }
                case '2':
                  {
                    that.setData({
                      judge1: 'ster1.png',
                      judge2: 'ster1.png',
                      judge3: 'ster2.png',
                      judge4: 'ster2.png',
                      judge5: 'ster2.png',
                      hard: "较易",
                    })
                    break;
                  }
                case '3':
                  {
                    that.setData({
                      judge1: 'ster1.png',
                      judge2: 'ster1.png',
                      judge3: 'ster1.png',
                      judge4: 'ster2.png',
                      judge5: 'ster2.png',
                      hard: "一般",
                    })
                    break;
                  }
                case '4':
                  {
                    that.setData({
                      judge1: 'ster1.png',
                      judge2: 'ster1.png',
                      judge3: 'ster1.png',
                      judge4: 'ster1.png',
                      judge5: 'ster2.png',
                      hard: "较难",
                    })
                    break;
                  }
                case '5':
                  {
                    that.setData({
                      judge1: 'ster1.png',
                      judge2: 'ster1.png',
                      judge3: 'ster1.png',
                      judge4: 'ster1.png',
                      judge5: 'ster1.png',
                      hard: "很难",
                    })
                    break;
                  }
              }
            }
          }
        }) 
      },
    })
   /* wx.request({
      url: SeeLL,
      data: {
        Type: '文章',
        id: option.id,
        openid: app.globalData.openid,
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.like != 0) {
          that.setData({
            iflike: 'like.png',
          })
        };
        if (res.data.love != 0) {
          that.setData({
            iflove: 'love.png',
          })
        };
        if (res.data.judge != 0) {
          that.setData({
            ifjudge: 1
          })
          switch (res.data.judgeinfo.score) {
            case '0':
              {
                that.setData({
                  judge0: 'easy2.png'
                })
                break;
              }
            case '1':
              {
                that.setData({
                  judge1: 'normal2.png'
                })
                break;
              }
            case '2':
              {
                that.setData({
                  judge2: 'hard2.png'
                })
                break;
              }
          }
        }
      }
    })
    console.log(option.id);
    console.log(app.globalData.userInfo);*/
  },
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
    var outtime = util.formatTime(new Date());
    var that = this;
    that.data.outtime = outtime;
    var duration = parseInt(outtime.replace(/[^0-9]/ig, "")) - parseInt(that.data.intime.replace(/[^0-9]/ig, ""));
    if (duration >30) {
    wx.request({
      url: WriteTime,
      data: {
        openid: that.data.openid,
        id: that.data.articleinfo.id,
        Type: '文章',
        intime: that.data.intime,
        outtime: that.data.outtime,
        duration: that.data.articleinfo.duration,
        Class: that.data.articleinfo.labelt,
      },
      success: function (res) {
        console.log(res.data);
      }
    })
    }
    console.log(duration);

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
  jump: function (e) {
    console.log(e.target.id);
    wx.redirectTo({
      url: '../more/more?title=' + e.target.id
    })
  },
  collection: function (e) {
    var that = this;
    if (that.data.iflove == 'unlove.png') {
      console.log('开始收藏')
      wx.request({
        url: Collection,
        data: {
          Type: '文章',
          id: that.data.articleinfo.id,
          openid: that.data.openid,
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            iflove: 'love.png'
          })
        }
      })
    } else {
      console.log('取消收藏')
      wx.request({
        url: UnCollection,
        data: {
          Type: '文章',
          id: that.data.articleinfo.id,
          openid: that.data.openid,
        },
        success: function (res) {
          console.log(res.data);
          that.setData({
            iflove: 'unlove.png'
          })
        }
      })
    }
  },
  like: function (e) {
    var that = this;
    if (that.data.iflike == 'unlike.png') {
      wx.request({
        url: Like,
        data: {
          Type: '文章',
          id: that.data.articleinfo.id,
          openid: that.data.openid,
        },
        success: function (res) {
          that.setData({
            iflike: 'like.png'
          })
        }
      })
    } else {
      wx.request({
        url: UnLike,
        data: {
          Type: '文章',
          id: that.data.articleinfo.id,
          openid: that.data.openid,
        },
        success: function (res) {
          that.setData({
            iflike: 'unlike.png'
          })
        }
      })
    }
  },
  judge: function (e) {
    var that = this;
    if(that.data.ifjudge!=1){
    console.log(e.target.id);
    switch (e.target.id) {
      case '1':
        {
          that.setData({
            judge1: 'ster1.png',
            judge2: 'ster2.png',
            judge3: 'ster2.png',
            judge4: 'ster2.png',
            judge5: 'ster2.png',
            hard: "简单",
            hardlv: "1"
          })
          break;
        }
      case '2':
        {
          that.setData({
            judge1: 'ster1.png',
            judge2: 'ster1.png',
            judge3: 'ster2.png',
            judge4: 'ster2.png',
            judge5: 'ster2.png',
            hard: "较易",
            hardlv: "2"
          })
          break;
        }
      case '3':
        {
          that.setData({
            judge1: 'ster1.png',
            judge2: 'ster1.png',
            judge3: 'ster1.png',
            judge4: 'ster2.png',
            judge5: 'ster2.png',
            hard: "一般",
            hardlv: "3"
          })
          break;
        }
      case '4':
        {
          that.setData({
            judge1: 'ster1.png',
            judge2: 'ster1.png',
            judge3: 'ster1.png',
            judge4: 'ster1.png',
            judge5: 'ster2.png',
            hard: "较难",
            hardlv: "4"
          })
          break;
        }
      case '5':
        {
          that.setData({
            judge1: 'ster1.png',
            judge2: 'ster1.png',
            judge3: 'ster1.png',
            judge4: 'ster1.png',
            judge5: 'ster1.png',
            hard: "很难",
            hardlv: "5"
          })
          break;
        }
    }
    }
  },
  submatjudge: function () {
    var that = this;
    wx.showModal({
      title: '确定提交评价？',
      success: function () {
        wx.request({
          url: Judge,
          data: {
            score: that.data.hardlv,
            openid: that.data.openid,
            Type: '文章',
            id: that.data.articleinfo.id,
            keycardT: that.data.articleinfo.labelt,
          },
          success: function (res) {
            console.log(res.data);
            that.setData({
               hardlv:0,
               ifjudge:1
            })
          }
        })
      }
    })
  } ,
  formSubmit: function (e) {
    console.log(e);
    var date = util.formatTime(new Date());
    var that = this;
    wx.request({
      url: SendLiuYan,
      data: {
        Type:'文章',
        sender: that.data.openid,
        headimg: e.detail.value.headimg,
        liuyantext: e.detail.value.liuyantext,
        nickname: e.detail.value.nickname,
        homeid: that.data.articleinfo.id,
        sendtime: date,
      },
      success: function (res) {
        console.log(res);
        that.readliuyanlist();
      }
    })
  },
  readliuyanlist: function () {
    var that = this;
    wx.request({
      url: ReadLiuYan,
      data: {
        homeid: that.data.articleinfo.id,
        Type: '文章'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          liuyanlist: res.data
        })
      }
    })
  }
})
