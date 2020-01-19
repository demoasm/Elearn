// pages/viewbox/view.js
var app = getApp()
var util = require('../../utils/util.js');
var GetMoreInfo = require('../../config.js').GetMoreInfo;
var SeeLL = require('../../config.js').SeeLL;
var WriteTime = require('../../config.js').WriteTime;
var SendLiuYan = require('../../config.js').SendLiuYan;
var ReadLiuYan = require('../../config.js').ReadLiuYan;
var ReadDanmu = require('../../config.js').ReadDanmu;
var Collection = require('../../config.js').Collection;
var UnCollection = require('../../config.js').UnCollection;
var Like = require('../../config.js').Like;
var UnLike = require('../../config.js').UnLike;
var Judge = require('../../config.js').Judge;
var SendDanmu = require('../../config.js').SendDanmu;
function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
Page({
  data: {
    intime: '',
    outtime: '',
    iflike: 'unlike.png',
    iflove: 'unlove.png',
    ifjudge:0,
    judge1: 'ster2.png',
    judge2: 'ster2.png',
    judge3: 'ster2.png',
    judge4: 'ster2.png',
    judge5: 'ster2.png',
    hard:'',
    hardlv:0,
    progress:0,
    src: '',
    viewinfo: '',
    nickName: '',
    avatarUrl: '',
    openid:'',
    danmuList: [{
      color: "#130c7d",
      text:"dtyfyfu",
      time:6}],
    liuyanlist: [],
  },
  inputValue: '',
  onReady: function(res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  onLoad: function(option) {
    var that = this;
    var intime = util.formatTime(new Date());
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        console.log(res);
        that.setData({
          nickName: res.data.nickName,
          avatarUrl: res.data.avatarUrl,
        })
        wx.request({
          url: GetMoreInfo,
          data: {
            id: option.id
          },
          success: function (res1) {
            that.setData({
              viewinfo: res1.data,
              intime: intime,
            })
            console.log(res1.data);
            that.readliuyanlist();
            that.readDanmulist();
          }  
        })

      },
    })

    wx.getStorage({
      key: 'openid',
      success: function(res1) {
        var openid = res1.data;
        that.setData({
          openid:openid,
        })
        wx.request({
          url: SeeLL,
          data: {
            Type: '视频',
            id: option.id,
            openid: that.data.openid,
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
    console.log(option.id);
    //console.log(app.globalData.userInfo);
  },
  onUnload: function() {
    var that = this;
    var outtime = util.formatTime(new Date());
    that.data.outtime = outtime;
    var duration = parseInt(outtime.replace(/[^0-9]/ig, "")) - parseInt(that.data.intime.replace(/[^0-9]/ig, ""));
    if (duration > 30) {
      wx.request({
        url: WriteTime,
        data: {
          openid: that.data.openid,
          id: that.data.viewinfo.id,
          Type: '视频',
          intime: that.data.intime,
          outtime: that.data.outtime,
          duration: that.data.viewinfo.duration,
          Class: that.data.viewinfo.keycardT,
          ifmust:that.data.viewinfo.must,
        },
        success: function(res) {
          console.log(res.data);
        }
      })
    }
    console.log(duration);
  },

  
  bindInputBlur: function(e) {
    this.inputValue = e.detail.value
  },
  bindButtonTap: function() {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success: function(res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },
  bindSendDanmu: function(e) {
    var that = this;
    that.videoContext.sendDanmu({
      text: that.inputValue,
      color: getRandomColor()
    });
    var color = getRandomColor();
    wx.request({
      url:SendDanmu,
      data:{
        text: that.inputValue,
        color: color,
        time: that.data.progress,
        id:that.data.viewinfo.id,
        sender:that.data.openid
      },
      success:function(res){
        console.log(res.data);
      }
    })
  },
  update: function (e) {
    this.data.progress = parseInt(e.detail.currentTime);
  },
  videoErrorCallback: function(e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },
  formSubmit: function(e) {
    console.log(e);
    var date = util.formatTime(new Date());
    var that = this;
    wx.request({
      url: SendLiuYan,
      data: {
        Type:'视频',
        sender: that.data.openid,
        headimg: e.detail.value.headimg,
        liuyantext: e.detail.value.liuyantext,
        nickname: e.detail.value.nickname,
        homeid: that.data.viewinfo.id,
        sendtime: date,
      },
      success: function(res) {
        console.log(res);
        that.readliuyanlist();
      }
    })
  },
  readliuyanlist: function() {
    var that = this;
    wx.request({
      url: ReadLiuYan,
      data: {
        homeid: that.data.viewinfo.id,
        Type:'视频'
      },
      success: function(res) {
        console.log(res.data);
        that.setData({
          liuyanlist: res.data
        })
      }
    })
  },
  readDanmulist: function(){
    var that = this;
    wx.request({
      url: ReadDanmu,
      data: {
        id: that.data.viewinfo.id,
      },
      success: function (res) {
        console.log(res.data);
        for(var i in res.data){
          res.data[i].time = parseInt(res.data[i].time);
        }
        that.setData({
          danmuList: res.data
        });
      }
    })
  },
  jump: function(e) {
    console.log(e.target.id);
    var id = e.target.id.replace("\&", ".");
    console.log(id);
    wx.navigateTo({
      url: '../more/more?title=' + id
    })
  },
  collection: function(e) {
    var that = this;
    if (that.data.iflove == 'unlove.png') {
      console.log('开始收藏')
      wx.request({
        url: Collection,
        data: {
          Type: '视频',
          id: that.data.viewinfo.id,
          openid: that.data.openid,
        },
        success: function(res) {
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
          Type: '视频',
          id: that.data.viewinfo.id,
          openid: that.data.openid,
        },
        success: function(res) {
          console.log(res.data);
          that.setData({
            iflove: 'unlove.png'
          })
        }
      })
    }
  },
  like: function(e) {
    var that = this;
    if (that.data.iflike == 'unlike.png') {
      wx.request({
        url: Like,
        data: {
          Type: '视频',
          id: that.data.viewinfo.id,
          openid: that.data.openid,
        },
        success: function(res) {
          that.setData({
            iflike: 'like.png'
          })
        }
      })
    } else {
      wx.request({
        url: UnLike,
        data: {
          Type: '视频',
          id: that.data.viewinfo.id,
          openid: that.data.openid,
        },
        success: function(res) {
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
            hard:"简单",
            hardlv:"1"
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
  submatjudge: function(){
    var that=this;
    wx.showModal({
      title: '确定提交评价？',
      success: function () {
        wx.request({
          url: Judge,
          data: {
            score: that.data.hardlv,
            openid: that.data.openid,
            Type: '视频',
            id: that.data.viewinfo.id,
            keycardT: that.data.viewinfo.keycardT,
          },
          success: function (res) {
            console.log(res.data);
            that.setData({
              ifjudge:1,
              hardlv:0
            })
          }
        })
      }
    })
  } 
})