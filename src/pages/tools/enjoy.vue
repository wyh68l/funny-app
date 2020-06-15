<template>
  <view class='content' :style="{'background':'url('+bgImg+')','backgroundSize':'cover'}">
      <Back @click.native='goBack'></Back>
      <view class="result animated fadeInUp">
        <textarea v-model="result"
                  disabled class="text"
                  :class="{'animated fadeIn':isShow}"
        >
        </textarea>
        <text class="copy" @tap="copy" v-show="result !== '' && result">复制</text>
          <!--#ifdef MP-WEIXIN-->
          <button class="share" open-type="share" v-show="result !== '' && result">分享</button>
          <!--#endif-->
      </view>
      <!--<view class="tips animated fadeInUp">-->
          <!--<text>Tips:如果点击生成无效果,请尝试以下步骤</text>-->
          <!--<text>请点击右上角按钮->点击‘开发调试’-></text>-->
          <!--<text>点击‘打开调试’->重启小程序即可</text>-->
          <!--<text>（仅体验版可用）</text>-->
      <!--</view>-->
      <view class="search animated fadeInUp" @tap="getResult">
        <button class="button">生成</button>
      </view>
    </view>
</template>

<script>
  import {fetch} from 'serves/serves'
  import {getEnjoyList} from "../../static/data/enjoy";
  import {getFriendlyList} from "../../static/data/friendly";
  import {getSadList} from "../../static/data/sad";
  import Back from '../../components/Back'
    export default {
        name: "enjoy",
        components:{
            Back
        },
        data(){
            return {
                result:'',
                tips:'',
                type:'',
                api:[
                    {
                        type:'friendly',
                        api:'https://pyq.shadiao.app/api.php?from=wyh68l',
                        title:'朋友圈文案'
                    },
                    {
                        type:'default',
                        api:'https://chp.shadiao.app/api.php?from=wyh68l',
                        title:'彩虹屁'
                    },
                    {
                        type:'sad',
                        api:'https://du.shadiao.app/api.php?from=wyh68l',
                        title:'毒鸡汤'
                    },
                ],
                apiIndex:0,
                isShow:false,
                imgList:[
                    'https://ae01.alicdn.com/kf/U529d5c5750714689a12b2354a6f6cd9ag.jpg',
                    'https://ae01.alicdn.com/kf/Ucd7234a1b4904a5e991de97f8ff37c7bw.jpg',
                    'https://ae01.alicdn.com/kf/U8802fad9f0644b1b99f87d159b5520ef1.jpg',
                    'https://ae01.alicdn.com/kf/U3269b8989d4641029463a7b63c6081c7U.jpg',
                    'https://ae01.alicdn.com/kf/Udabe55e8fd8f49479084e58ab17e33937.jpg',
                    'https://ae01.alicdn.com/kf/U4e0158f556b44d3aa4eee97c8f32d628o.jpg',
                    'https://hq-one-stand.oss-cn-shenzhen.aliyuncs.com/one-stand/photo/20200611/icon36.jpg',
                    'https://ae01.alicdn.com/kf/U8b55c71b010342b2bfc943e062f7921bp.jpg',
                    'https://ae01.alicdn.com/kf/U179c3ff3d4484f37b023147a4fcc1c5e8.jpg',
                    'https://ae01.alicdn.com/kf/U4e7ae4b89fe74c139c275a5c67b9eb3ci.jpg',
                    'https://ae01.alicdn.com/kf/Ufaa6a9946c23401b8dea0e3a4e445c52R.jpg',
                    'https://ae01.alicdn.com/kf/U21d9dcc50e0c4869ae84c49b73e708d0z.jpg',
                    'https://ae01.alicdn.com/kf/H46c61f38b14f407aa2711b298a4870a4W.jpg',
                    'https://ae01.alicdn.com/kf/Uadc0e683f9e64fb88a55413e16b9dc98z.jpg',
                ],
                color:[
                    {
                        index:0,
                        color:'#0E4561'
                    },
                    {
                        index:1,
                        color:'#343556'
                    },
                    {
                        index:2,
                        color:'#7C7C79'
                    },
                    {
                        index:3,
                        color:'#3C5E6B'
                    },
                    {
                        index:4,
                        color:'#3C5E6B'
                    },
                    {
                        index:5,
                        color:'#5B5C6A'
                    },
                    {
                        index:6,
                        color:'#2B5C88'
                    },
                    {
                        index:7,
                        color:'#6D7060'
                    },
                    {
                        index:8,
                        color:'#877978'
                    },
                    {
                        index:9,
                        color:'#356E92'
                    },
                    {
                        index:10,
                        color:'#CBA39A'
                    },
                    {
                        index:11,
                        color:'#5E8297'
                    },
                    {
                        index:12,
                        color:'#5E7383'
                    },
                    {
                        index:13,
                        color:'#2E4F64'
                    }
                ],
                bgImg:'',
                conTextObj:null,
                length:100,
                conTextList:[]
            }
        },
        created(){
            /*uniapp获取dom元素（只能获取部分属性）*/
            // const query = uni.createSelectorQuery().in(this);
            // query.select('.content').boundingClientRect(data => {
            //     console.log(data);
            // }).exec();


            /*wx获取dom元素（只能获取部分属性）*/
            // let query = wx.createSelectorQuery();
            // let el = query.select('.content')
            // console.log(el);

            /*js获取dom元素*/
            //let el = document.getElementsByClassName('content');
            // el.style.backgroundImg = 'url(https://ae01.alicdn.com/kf/U529d5c5750714689a12b2354a6f6cd9ag.jpg) no-repeat';
            // el.style.backgroundSize = 'cover'

            this.randomImg();
        },
        onLoad(option){
            //#ifdef MP-WEIXIN
            wx.showShareMenu({
                withShareTicket: true
            })
            //#endif
            this.api.forEach((item,index)=>{
                if(option.type === item.type){
                    this.apiIndex = index;
                    this.type = option.type;
                    wx.setNavigationBarTitle({
                        title: item.title
                    })
                }
            })
            this.initConTextObj();
        },
        methods:{
            goBack(){
                //#ifdef MP-WEIXIN
                console.log(getCurrentPages());
                if(getCurrentPages().length >1){
                    uni.navigateBack();
                }else {
                    uni.reLaunch({
                        url: '../index/index'
                    });
                }
                //#endif

                //#ifdef H5 || APP-PLUS
                uni.navigateBack();
                //#endif
            },
            initConTextObj(){
                switch (this.type) {
                    case 'default':
                        this.conTextObj = new getEnjoyList();
                        this.length = Number(this.conTextObj.enjoyList.length);
                        this.conTextList = this.conTextObj.enjoyList;
                    break;
                    case 'friendly':
                        this.conTextObj = new getFriendlyList();
                        this.length = Number(this.conTextObj.friendlyList.length);
                        this.conTextList = this.conTextObj.friendlyList;
                        break;
                    case 'sad':
                        this.conTextObj = new getSadList();
                        this.length = Number(this.conTextObj.sadList.length);
                        this.conTextList = this.conTextObj.sadList;
                        break;
                }
            },
            getResult(){
                // fetch(this.api[this.apiIndex].api,'get').then(res=>{
                //     //console.log(res);
                //     if(res.errMsg === 'request:ok'){
                //       this.result = res.data;
                //         this.isShow = true;
                //         setTimeout(()=>{
                //             this.isShow = false
                //         },250)
                //     }else{
                //         wx.showToast({
                //             title: '诶呀,好疼',
                //             icon: 'none',
                //             duration: 2000
                //         })
                //     }
                // })
                this.result = this.randomContext().data?this.randomContext().data:this.randomContext();
                this.isShow = true;
                setTimeout(()=>{
                    this.isShow = false
                },250)
            },
            sendMes(){
                console.log('sasa');
                // wx.requestSubscribeMessage({ //获取下发权限
                //     tmplIds: ['y2k4X9fDqN9nKEkoZTo1aw_YBgEj5RPuKt8ANYmzSUo'], //此处写在后台获取的模板ID，可以写多个模板ID，看自己的需求
                //     success: (res) => {
                //         if (res['y2k4X9fDqN9nKEkoZTo1aw_YBgEj5RPuKt8ANYmzSUo'] == 'accept') { //accept--用户同意 reject--用户拒绝 ban--微信后台封禁,可不管
                //             // 获取access_token（仅为测试，正常需要在后台获取）
                //
                //         } else {
                //             wx.showModal({
                //                 title: '温馨提示',
                //                 content: '您已拒绝授权，将无法在微信中收到简历审核通知！',
                //                 showCancel: false,
                //                 success: res => {
                //                     if (res.confirm) {
                //                         // 这里可以写自己的逻辑
                //                     }
                //                 }
                //             })
                //         }
                //     }
                // })

                // wx.request({
                //     url: 'https://api.weixin.qq.com/cgi-bin/token', //获取access_token的地址，微信定义的
                //     data: {
                //         grant_type: 'client_credential', //写死的
                //         appid: 'wxb40b9e8b41b1c907', //小程序的appId(填写自己的)
                //         secret: 'b38075f7b3b03b4de98fb38aa0277758' //小程序密钥,在小程序后台获取的，登录西奥程序后台->点开发->点开发设置->获取密钥就可以了
                //     },
                //     success: (req) => {
                //         console.log('获取access_token成功', req.data.access_token)
                //         let _access_token = req.data.access_token;
                //         wx.login({
                //             success: res => {
                //                 if (res.code) { //code五分钟内有效
                //                     // 调用下发接口前需要得到用户的openid
                //                     wx.request({
                //                         url: 'https://api.weixin.qq.com/sns/jscode2session',
                //                         data: {
                //                             appid: 'wxb40b9e8b41b1c907',
                //                             secret: 'b38075f7b3b03b4de98fb38aa0277758',
                //                             js_code: res.code, //登录时获取的code
                //                             grant_type: "authorization_code", //授权类型，写死的
                //                         },
                //                         success: res => {
                //                             console.log('获取openid成功', res)
                //                             let _openid = res.data.openid;
                //                             // 调用下发接口
                //                             wx.request({
                //                                 url: 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' + _access_token,
                //                                 method: "POST",
                //                                 data: JSON.stringify({
                //                                     touser: _openid, //当前用户的openid
                //                                     template_id: "y2k4X9fDqN9nKEkoZTo1aw_YBgEj5RPuKt8ANYmzSUo", //需要下发的模板ID，如模板不多可让后台直接配置写死，多的话就通过微信获取模板列表接口查询模板
                //                                     //page: "pages/garden/garden", //点击小程序订阅消息跳转的页面，可携带参数
                //                                     data: {
                //                                         "thing1": { //这个key值就是上面提到的关键词，在后台对应的模板详情里可以看到，等后台-->点订阅消息-->我的模板(没有的话先去公共模板库选一个)-->点击详情-->右边详细内容里就是对应的key了
                //                                             "value": '已通过' //这个值是下发给用户的信息
                //                                         },
                //                                         "thing2": {
                //                                             "value": '您被录用了'
                //                                         },
                //                                     }
                //                                 }),
                //                                 success: res => {
                //                                     console.log(res)
                //                                     wx.showToast({
                //                                         title: '下发成功',
                //                                     })
                //                                     // 这里可以写自己的逻辑
                //                                 }
                //                             })
                //                         }
                //                     })
                //                 }
                //             }
                //         })
                //     }
                // })

                // wx.requestSubscribeMessage({
                //     tmplIds: ['y2k4X9fDqN9nKEkoZTo1aw_YBgEj5RPuKt8ANYmzSUo'],
                //     success (res) {
                //         console.log(res);
                //     },
                //     fail(res){
                //         console.log(res);
                //     }
                // })
                // wx.login({
                //     success (res) {
                //         if (res.code) {
                //             //发起网络请求
                //             console.log(res.code);
                //         } else {
                //             console.log('登录失败！' + res.errMsg)
                //         }
                //     }
                // })
            },
            randomImg(){
                let that = this;
                let index = parseInt(Math.random()*37)+15;
                //console.log(index);
                this.bgImg = `https://hq-one-stand.oss-cn-shenzhen.aliyuncs.com/one-stand/photo/20200611/icon${index}.jpg`;
                // console.log(wx);
                // wx.setNavigationBarColor({
                //     frontColor: '#ffffff',
                //     //backgroundColor: that.color[index].color,
                //     animation: {
                //         duration: 400,
                //         timingFunc: 'easeIn'
                //     }
                // })
            },
            randomContext(){
                let index = parseInt(Math.random()*this.length);
                let item = this.conTextList[index];
                return item;
            },
            copy(){

                //#ifdef MP-WEIXIN
                let that = this;
                /*wx.setClipboardData设置剪贴板*/
                wx.setClipboardData({
                    data: this.result,
                    success (res) {
                    },
                    fail(res) {
                        that.tips = '诶呀,再试下吧'
                        wx.showToast({
                            title: that.tips,
                            icon: 'none',
                            duration: 2000
                        })
                    }
                })
                //#endif

                //#ifdef APP-PLUS
                uni.setClipboardData({
                    data:this.result,//要被复制的内容
                    success:()=>{//复制成功的回调函数
                        uni.showToast({//提示
                            title:'复制成功'
                        })
                    },
                    fail:()=>{
                        uni.showToast({//提示
                            title:'诶呀 再试下吧'
                        })
                    }
                });
                //#endif

                //#ifdef H5
                /*使用插件复制*/
                    this.$copyText(this.result).then((e)=>{
                        this.tips = '复制成功咯'
                        wx.showToast({
                            title: this.tips,
                            icon: 'success',
                            duration: 2000
                        })
                        console.log(e)
                    }, (e)=> {
                        this.tips = '诶呀,再试下吧'
                        wx.showToast({
                            title: this.tips,
                            icon: 'none',
                            duration: 2000
                        })
                        console.log(e)
                    })
                //#endif
            }
        }
    }
</script>
<style>
  page {
    /* linear-gradient(to right, rgb(131, 164, 212), rgb(182, 251, 255)); 渐变蓝*/
    /*rgb(242, 112, 156), rgb(255, 148, 114)渐变红*/
    /*background: linear-gradient(to bottom, rgb(242, 112, 156), rgb(255, 148, 114));*/
    height: 100%;
  }
</style>
<style scoped lang="less">
  .content{
    height: 100%;
    /*background: url('https://ae01.alicdn.com/kf/U529d5c5750714689a12b2354a6f6cd9ag.jpg') no-repeat;*/
    /*background-size: cover;*/
    padding-top: 190upx;
    box-sizing: border-box;


    &:after{
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.4);
    }

    .result{
      width: 80%;
      height: 40%;
      margin: 0 auto;
      border: 1px solid #fff;
      border-radius: 10upx;
      text-align: right;
      position: relative;
      z-index: 2;

      .text{
        width: 80%;
        height: 170px;
        /*border: 1px solid #fff;*/
        color: #fff;
        margin: 0 auto;
        margin-top: 90upx;
        font-size: 32upx;
        text-align: left;
      }

      .copy{
          position: absolute;
          bottom: 40upx;
          right: 40upx;
          color: #fff;
          height: 41rpx;
          line-height: 41rpx;
          font-size: 32upx;
      }
        .share{
            position: absolute;
            height: 41rpx;
            line-height: 41rpx;
            bottom: 40upx;
            right: 150upx;
            color: #fff;
            font-size: 32upx;
            z-index: 2;
            padding: 0;
            background:initial;
            outline: none;
            width: 100upx;

            &:after{
                border: none;
            }
        }
    }

      .tips{
          margin-top: 20px;
          text-align: center;
          position: relative;
          z-index: 2;

          text{
              display: block;
              color: #fff;
              font-size: 28upx;
          }
      }

    .search{
      margin: 0 auto;
      position: relative;
      top: 25%;
      width: 100upx;
      height: 100upx;
      line-height: 100upx;
      border-radius: 50%;
      transform-origin: 50% 50%;
      border: 1upx solid #fff;
      z-index: 2;

      &:after{
        content: "";
        display: block;
        position: absolute;
        width: 100upx;
        height: 100upx;
        /*background: #fff;*/
        border-radius: 50%;
        border: 1upx solid #fff;
        //transform: scale(1,1);
        //transform-origin: -50% -50%;
        animation: ripple 3s ease-out 0ms infinite;
        top: 0;
        left:0;

      }
      &:before{
        content: "";
        display: block;
        position: absolute;
        width: 100upx;
        height: 100upx;
        /*background: #fff;*/
        border-radius: 50%;
        border: 1upx solid #fff;
        //transform: scale(1,1);
        //transform-origin: 50% 50%;
        animation: ripple 3s ease-out 1000ms infinite;
        top: 0;
        left:0;
      }

      .button{
        width: 100upx;
        height: 100upx;
        line-height: 100upx;
        padding: 0;
        border: none;
        background:initial;
        outline: none;
        text-align: center;
        color: #fff;

        &:after{
          border: none;
        }
      }
    }
  }
</style>
