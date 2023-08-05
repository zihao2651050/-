
import { alert } from 'assets/libs/utils'
import { login } from 'assets/libs/apis'
import { polyfill } from 'assets/libs/object-assign'

polyfill()

App({
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  onError: function (msg) {
    wx.showToast(msg)
  },
  globalData: {
    userInfo: null,
  },
  getUserInfo: function (callback) {
    const that = this;
    if (that.globalData.userInfo) {
      callback(null, that.globalData.userInfo)
    } else {
      wx.login({

        success: function (res) {
          login({
            code: res.code,
            success(data) {
              that.globalData.userInfo = data
              if (data['session_3rd']) {
                wx.setStorageSync('session_3rd', data['session_3rd'])
              }
              wx.getUserInfo({
                success: function (res) {
                  that.globalData.userInfo = Object.assign(
                    that.globalData.userInfo, res.userInfo
                  )
                },
                fail: function (res) {
                  // fail
                  // alert('获取用户信息失败')
                },
                complete: function (res) {
                  // complete

                  callback(null, that.globalData.userInfo)
                }
              })
            }
          })
        },
        fail: function (err) {
          console.log(err)
        }
      })
    }
  },


})
