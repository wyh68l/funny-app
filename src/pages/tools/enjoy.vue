<template>
  <view class='content' :style="{'background':'url('+bgImg+')','backgroundSize':'cover'}">
      <!--#ifdef MP-WEIXIN || H5-->
      <Back @back='goBack' :right="true" @changeType="changeType"></Back>
      <!--#endif-->

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
        <div class="button">生成</div>
      </view>
    </view>
</template>

<script>
  import {getRainbow,getApkUrl,getDogList} from 'serves/main'
  // import {fetch} from 'serves/serves'
  // import {getEnjoyList} from "../../static/data/enjoy";
  // import {getFriendlyList} from "../../static/data/friendly";
  // import {getSadList} from "../../static/data/sad";
  import Back from '@components/Back'
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
                        type:'default',
                        api:'/api/app/getWords?type=chp',
                        apiwx:'https://chp.shadiao.app/api.php?from=wyh68l',
                        title:'甜蜜情话'
                    },
                    {
                        type:'dog',
                        api:'/api/app/getDogList?type=MY',
                        apiwx:this.$baseUrl+'/api/app/getDogList?type=MY',
                        title:'舔狗日记'
                    },
                    {
                        type:'friendly',
                        api:'/api/app/getWords?type=pyq',
                        apiwx:'https://pyq.shadiao.app/api.php?from=wyh68l',
                        title:'朋友圈文案'
                    },
                    {
                        type:'rjcs',
                        api:'/api/app/getWords?type=rjcs',
                        apiwx:'https://tools.tyh52.com/djt/api.php?type=renjiancoushu',
                        title:'人间凑数日记'
                    },
                    {
                        type:'zn',
                        api:'/api/app/getWords?type=zn',
                        apiwx:'https://tools.tyh52.com/djt/api.php?type=scumbag',
                        title:'渣男语录'
                    },
                    {
                        type:'spiritboy',
                        api:'/api/app/getWords?type=spiritboy',
                        apiwx:'https://tools.tyh52.com/djt/api.php?type=spiritboy',
                        title:'精神小伙语录'
                    },
                    {
                        type:'sad',
                        api:'/api/app/getWords?type=du',
                        apiwx:'https://du.shadiao.app/api.php?from=wyh68l',
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
            // 设置应用全屏显示！
            //#ifdef APP-PLUS
            plus.navigator.setFullscreen(true);
            //#endif
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
            //this.initConTextObj();使用本地存储的数据
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
            changeType(index){
                this.apiIndex = index;
                this.type = this.api[index].type;
                wx.setNavigationBarTitle({
                    title: this.api[index].title
                })
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
                let url;
                //#ifdef MP-WEIXIN || APP-PLUS
                url = this.api[this.apiIndex].apiwx;
                //#endif
                //#ifdef H5
                url = this.api[this.apiIndex].api;
                //#endif

                getRainbow(url).then(res=>{
                    console.log(res);
                    if(res.errMsg === 'request:ok'){
                        this.result = typeof res.data == 'object'?res.data.data:res.data;
                        this.isShow = true;
                        setTimeout(()=>{
                            this.isShow = false
                        },250)
                    }else{
                        wx.showToast({
                            title: '诶呀,好疼',
                            icon: 'none',
                            duration: 2000
                        })
                    }
                })

                //#ifdef MP-WEIXIN || H5
                // this.result = this.randomContext().data?this.randomContext().data:this.randomContext();
                // this.isShow = true;
                // setTimeout(()=>{
                //     this.isShow = false
                // },250)
                //#endif
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
                        // console.log(e)
                    }, (e)=> {
                        this.tips = '诶呀,再试下吧'
                        wx.showToast({
                            title: this.tips,
                            icon: 'none',
                            duration: 2000
                        })
                        // console.log(e)
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
    overflow: hidden;
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
        width: 100%;
        height: 100%;
        /*background: #fff;*/
        border-radius: 50%;
        border: 1px solid #fff;
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
        width: 100%;
        height: 100%;
        /*background: #fff;*/
        border-radius: 50%;
        border: 1px solid #fff;
        //transform: scale(1,1);
        //transform-origin: 50% 50%;
        animation: ripple 3s ease-out 1000ms infinite;
        top: 0;
        left:0;
      }

      .button{
        width: 100%;
        height: 100%;
        /*border: 1px solid #fff;*/
        /*border-radius: 50%;*/
        text-align: center;
        color: #fff;
      }
    }
  }
</style>
