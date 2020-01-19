  //app.js
  var GetOpenid = require('config.js').GetOpenid;
  var GetUse = require('config.js').GetUse;

  App({
    onLaunch: function() {
      // 展示本地存储能力
      var logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)
      var that = this;
      // 登录
      wx.login({
        success: res => {
          if (res.code) {
            console.log(res.code)
            wx.showLoading({
              title: '获取用户信息',
            })
            //发起网络请求
            wx.request({
              url: GetOpenid,
              data: {
                js_code: res.code,
              },
              success: function(res) {
                wx.setStorage({
                  key: 'openid',
                  data: res.data,
                })

                console.log('openid' + res.data);

                //that.globalData.openid = res.data;
                wx.hideLoading();
                wx.showLoading({
                  title: '正在检验信息',
                })
                //console.log(that.globalData.openid);
                wx.request({
                  url: GetUse,
                  data: {
                    openid: res.data
                  },
                  success: function(res) {
                    wx.hideLoading();
                    console.log(res.data);
                    if (res.data == '') {
                      wx.navigateTo({
                        url: '../index/add',
                      })
                    } else {
                      if (res.data.admin == 1) {
                        wx.setStorage({
                          key: 'admin',
                          data: true,
                        })
                        //that.globalData.admin=true;
                      } else if (res.data.admin == 0) {
                        wx.setStorage({
                          key: 'admin',
                          data: false,
                        })
                        //that.globalData.admin=false;
                      }
                      wx.switchTab({
                        url: '../viewbox/viewbox',
                      })
                    }
                  }
                })
              },
              fail: function(res) {
                wx.hideLoading()
                console.log(res)
                wx.showModal({
                  content: '网络请求发送失败',
                  showCancel: false
                })
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                wx.setStorage({
                  key: 'userInfo',
                  data: res.userInfo,
                })

                //this.globalData.userInfo = res.userInfo

                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }
        }
      })
    },
    globalData: {
      /*userInfo: null,
      path: 'https://dlut-elab.com/hcq/view/',
      openid: '',
      admin: '',*/
    }
  })