<template>
<!-- #ifdef H5 || APP-PLUS-->
  <view class='content' :style="{'background':`url('${bgImg}')`,'backgroundSize':'cover'}">
    <view class="result animated fadeInUp">
        <textarea v-model="result"
                  disabled class="text"
                  :class="{'animated fadeIn':isShow}"
        >
        </textarea>
      <text class="copy" @tap="copy" v-show="result !== '' && result">复制</text>
    </view>
    <view class="search animated fadeInUp" @tap="getResult">
      <button class="button">生成</button>
    </view>
  </view>
<!-- #endif-->

<!-- #ifdef MP-WEIXIN-->
    <view class='content' style="background:url('{{bgImg}}');background-size: cover" >
      <view class="result animated fadeInUp">
        <textarea v-model="result"
                  disabled class="text"
                  :class="{'animated fadeIn':isShow}"
        >
        </textarea>
        <text class="copy" @tap="copy" v-show="result !== '' && result">复制</text>
      </view>
      <view class="search animated fadeInUp" @tap="getResult">
        <button class="button">生成</button>
      </view>
    </view>

    <!--#endif-->
</template>

<script>
  import {fetch} from 'serves/serves'
    export default {
        name: "enjoy",
        data(){
            return {
                result:'',
                tips:'',
                api:[
                    {
                        type:'friendly',
                        api:'https://pyq.shadiao.app/api.php',
                        title:'朋友圈文案'
                    },
                    {
                        type:'default',
                        api:'https://chp.shadiao.app/api.php',
                        title:'彩虹屁'
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
                    'https://ae01.alicdn.com/kf/U8140ddc5f96d4e0090eddae0abde24d3I.jpg',
                    'https://ae01.alicdn.com/kf/U8b55c71b010342b2bfc943e062f7921bp.jpg',
                    'https://ae01.alicdn.com/kf/U179c3ff3d4484f37b023147a4fcc1c5e8.jpg',
                    'https://ae01.alicdn.com/kf/U4e7ae4b89fe74c139c275a5c67b9eb3ci.jpg',
                    'https://ae01.alicdn.com/kf/Ufaa6a9946c23401b8dea0e3a4e445c52R.jpg',
                    'https://ae01.alicdn.com/kf/U21d9dcc50e0c4869ae84c49b73e708d0z.jpg',
                    'https://ae01.alicdn.com/kf/Uc3d2b481d1bc40b0847d8b4bce61590dP.jpg',
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
                        color:'#32617A'
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
                        color:'#1A6D98'
                    },
                    {
                        index:13,
                        color:'#2E4F64'
                    }
                ],
                bgImg:''
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
            this.api.forEach((item,index)=>{
                if(option.type === item.type){
                    this.apiIndex = index;
                    wx.setNavigationBarTitle({
                        title: item.title
                    })
                }
            })
        },
        methods:{
            getResult(){
                fetch(this.api[this.apiIndex].api,'get').then(res=>{
                    console.log(res);
                    if(res.errMsg === 'request:ok'){
                      this.result = res.data;
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
            },
            randomImg(){
                let that = this;
                let index = parseInt(Math.random()*10)+1;
                console.log(index);
                this.bgImg = this.imgList[index];
                // console.log(wx);
                wx.setNavigationBarColor({
                    frontColor: '#ffffff',
                    backgroundColor: that.color[index].color,
                    animation: {
                        duration: 400,
                        timingFunc: 'easeIn'
                    }
                })
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
                        that.tips = '诶呀,再试下'
                        wx.showToast({
                            title: that.tips,
                            icon: 'none',
                            duration: 2000
                        })
                    }
                })
                //#endif

                //#ifdef H5 || APP-PLUS
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
                        this.tips = '诶呀,再试下'
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
    padding-top: 60upx;
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
        color: #fff;
        font-size: 32upx;
        margin: 40upx;
      }
    }

    .search{
      margin: 0 auto;
      position: relative;
      top: 30%;
      width: 100upx;
      height: 100upx;
      line-height: 100upx;
      border-radius: 50%;
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
        transform: scale(1,1);
        transform-origin: 50% 50%;
        animation: ripple 3s ease-out 0ms infinite;
        top: -2upx;
        left:-2upx;
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
        transform: scale(1,1);
        transform-origin: 50% 50%;
        animation: ripple 3s ease-out 1000ms infinite;
        top: -2upx;
        left:-2upx;
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
