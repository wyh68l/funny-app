<script>
    import Vue from 'vue';
    export default {
        globalData: {
            userInfo: null
        },
        onLaunch: function() {
            //如果是小程序，则调用微信的api

            //#ifdef MP-WEIXIN
                // 展示本地存储能力
                var logs = wx.getStorageSync('logs') || []
                logs.unshift(Date.now())
                wx.setStorageSync('logs', logs)

                // 登录
                wx.login({
                    success: res => {
                        // 发送 res.code 到后台换取 openId, sessionKey, unionId
                    }
                })
                // 获取用户信息
                wx.getSetting({
                    success: res => {
                      //console.log(res);
                        if (res.authSetting['scope.userInfo']) {
                            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                            wx.getUserInfo({
                                success: res => {
                                    // 可以将 res 发送给后台解码出 unionId
                                    this.globalData.userInfo = res.userInfo
                                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                                    // 所以此处加入 callback 以防止这种情况
                                    if (this.userInfoReadyCallback) {
                                        this.userInfoReadyCallback(res)
                                    }
                                }
                            })
                        }else{

                          // 如果没有授权
                          // wx.removeStorage({
                          //   key: 'userInfo',
                          //   success (res) {
                          //     console.log(res)
                          //   }
                          // })
                        }
                    }
                })
                //#endif

            uni.getSystemInfo({
                success:function(e){
                    Vue.prototype.statusBar = e.statusBarHeight
                    // #ifndef MP
                    if(e.platform == 'android') {
                        Vue.prototype.customBar = e.statusBarHeight + 50+'px'
                    }else {
                        Vue.prototype.customBar = e.statusBarHeight + 45+'px'
                    }
                    // #endif

                    // #ifdef MP-WEIXIN
                    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
                    Vue.prototype.customBar = menuButtonObject.top+'px';//胶囊按钮与顶部的距离
                    // #endif

                    // #ifdef MP-ALIPAY
                    Vue.prototype.customBar = e.statusBarHeight + e.titleBarHeight+'px'
                    // #endif
                }
            })
        },
        onShow: function() {
            //console.log('App Show')
        },
        onHide: function() {
            //console.log('App Hide')
        }
    }
</script>

<style lang="less">

  /*每个页面公共css */
  @import url("common/public_css/iconfont.css");
  @import url("common/public_css/base.less");
  @import url("common/public_css/uni.css");
  @import url("common/public_css/animate.min.css");
  @import url("common/public_css/animate_base.less");
  /*@import url("https://at.alicdn.com/t/font_1392728_z5v49ioej1.css");*/



</style>
