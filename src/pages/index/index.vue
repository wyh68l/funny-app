<template>
  <view class="content">
    <view class="title animated fadeIn slow" v-if="!hasUserInfo && canIUse">
      <text>简</text>
      <text class="tip">.</text>
      <text>桔</text>
      <text class="tip2">简约而又简单</text>
    </view>

    <view class="getInfo animated fadeInUp slow" v-if="!hasUserInfo && canIUse">
      <button open-type="getUserInfo" @getuserinfo="getUserInfo" @tap="entry">拾取</button>
    </view>
    <view class="loginInfo animated fadeInUp" v-else>
      <image @tap="bindViewTap" class="userinfo-avatar" :src="userInfo.avatarUrl" mode="cover"></image>
      <text class="userinfo-nickname">{{userInfo.nickName?'欢迎回来 '+userInfo.nickName:'欢迎回来 旅行者'}}</text>

      <view class="getInfo entry animated fadeInUp">
        <button @tap="goTo">浸入</button>
      </view>
    </view>

  </view>
</template>

<script>
    //获取应用实例
    const app = getApp();

    export default {
        data() {
            return {
                title: '简具',
                hasUserInfo: false,
                app: null,
                userInfo: null,
                // flag:false,
                canIUse: true
            }
        },
        onLoad() {
            //#ifdef MP-WEIXIN
            wx.showShareMenu({
                withShareTicket: true
            })
            //判断全局数据是否存在
            // let that = this;
            // this.canIUse = wx.canIUse('button.open-type.getUserInfo'); //wx.canIUse判断api接口是否还有用
            // wx.getStorage({
            //   key: 'userInfo',
            //   success (res) {
            //     if (res) {
            //       //this.setData想data里面存入数据
            //       that.userInfo = res.data;
            //       // that.hasUserInfo = true;
            //     }
            //#endif
        },
        methods: {
            getUserInfo(e) { //会执行两遍（弹框一次，选择按钮后一次）
                //#ifdef MP-WEIXIN
                console.log(e)
                let that = this;
                wx.getStorage({
                    key: 'userInfo',
                    success(res) {
                        if (res) {
                            //this.setData想data里面存入数据
                            that.userInfo = res.data;
                            that.hasUserInfo = true;
                        }
                    },
                    fail(res) {
                        if (e.detail.userInfo) {
                            wx.setStorage({
                                key: "userInfo",
                                data: e.detail.userInfo
                            })
                            that.userInfo = e.detail.userInfo;
                            that.hasUserInfo = true;
                        } else {
                            that.userInfo = {
                                avatarUrl: 'https://ae01.alicdn.com/kf/U1a01a022dc9340758caf143612d9d7f6p.png',
                                nickName: '旅行者'
                            };
                            that.hasUserInfo = true;
                            that.canIUse = true;
                        }
                    }
                })

                //#endif
            },
            entry() {
                //#ifdef H5 || APP-PLUS
                this.userInfo = {
                    avatarUrl: 'https://ae01.alicdn.com/kf/U1a01a022dc9340758caf143612d9d7f6p.png',
                    nickName: '旅行者'
                };
                this.hasUserInfo = true;
                this.canIUse = true;
                //#endif
            },
            goTo() {
                uni.navigateTo({
                    url: '../tools/index'
                })
            }
        },
    }
</script>

<style>
  page {
    /* linear-gradient(to right, rgb(131, 164, 212), rgb(182, 251, 255)); 渐变蓝*/
    /*rgb(242, 112, 156), rgb(255, 148, 114)渐变红*/
    background: linear-gradient(to bottom, rgb(131, 164, 212), rgb(182, 221, 175));
    height: 100%;
  }
</style>
<style lang="less" scoped>
  .content {
    width: 100%;
    text-align: center;
    padding-top: 190upx;
  }

  .title {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);

    text {
      font-size: 70upx;
      color: #fff;
      display: block;
      margin-bottom: 30px;
    }

    .tip {
      font-size: 130upx;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, 0);
    }

    .tip2 {
      font-size: 32upx;
    }
  }

  .getInfo {
    position: absolute;
    top: 70%;
    left: 36%;
    transform: translate(-50%, -50%);

    button {
      font-size: 32upx;
      background: initial;
      outline: none;
      color: #fff;
      border: 1upx solid #fff;
      border-radius: 8upx;
      padding: 0 75upx;

      &:after {
        border: none;
      }
    }
  }

  .loginInfo {

    .userinfo-avatar {
      width: 128upx;
      height: 128upx;
      margin: 20upx;
      border-radius: 50%;
    }

    .userinfo-nickname {
      color: #fff;
      display: block;
      font-size: 30upx;
    }

    .entry {
      top: 300%;
      left: 36%;
    }
  }
</style>
