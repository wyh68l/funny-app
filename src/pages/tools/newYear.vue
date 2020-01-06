<template>
  <view class='content' :style="{'background':'url('+bgImg+')','backgroundSize':'cover'}">
    <view class="selectPage animated fadeInUp">
      <view @tap="page = page<=1?1:page-1">上一页</view>
      <view><input type="number" v-model="page"></view>
      <view @tap="page++">下一页</view>
    </view>
    <view class="box animated fadeInUp">
      <view class="title">
        <text>{{newYearPoet[poetIndex].mes}}</text>
        <text class="author">{{newYearPoet[poetIndex].author}}</text>
      </view>
      <view class="list">
          <view class="item" v-for="(item,index) in changePage" :key="item.id">
            <text class="mes">{{item.mes}}</text>
            <text class="copy" @tap="copy(item.mes,item.id)">复制</text>

            <!--#ifdef MP-WEIXIN-->
            <button class="share" open-type="share">转发</button>
            <!--#endif-->
          </view>
      </view>
    </view>
  </view>
</template>

<script>
    import {fetch} from 'serves/serves'
    import {getYearsList} from "../../static/data/newYears";
    export default {
        name: "newYear",
        data(){
            return {
                result:'',
                tips:'',
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
                page:1,
                bgImg:'',
                newYearsList:[],
                newYearsList2:[],
                newYearPoet:[],
                poetIndex:0
            }
        },
        created(){
          this.init();
        },
        computed:{
            changePage(){
                this.newYearsList2 = this.newYearsList.slice(this.page*10-10,this.page*10);
                return this.newYearsList2;
            }
        },
        methods:{
            init(){
                //this.randomImg();
                let newYears = new getYearsList();
                this.newYearsList = newYears.newYearsList;
                this.newYearPoet = newYears.newYearPoet;
                this.poetIndex = parseInt(Math.random()*19);
                // console.log(this.poetIndex);
                // console.log(newYears.newYearPoet);
            },
            randomImg(){
                let that = this;
                let index = parseInt(Math.random()*14);
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
            getResult(){
                fetch('https://nmsl.shadiao.app/api.php?level=min&lang=zh_cn','get').then(res=>{
                    console.log(res);
                    if(res.errMsg === 'request:ok'){
                        this.result = res.data;
                        this.isShow = true;
                        setTimeout(()=>{
                            this.isShow = false
                        },250)
                    }else{
                        console.log('sas');
                        wx.showToast({
                            title: '诶呀,好疼',
                            icon: 'fail',
                            duration: 2000
                        })
                    }
                })
            },
            share(){
                wx.updateShareMenu({
                    withShareTicket: true,
                    success () {
                        console.log('sasa');
                    }
                })
            },
            copy(mes,id){
                let index = 0;
                if(id < 9){
                    index = 2
                }else if(id < 99){
                    index = 3
                }else{
                    index = 4
                }
                // console.log(index+'--'+id);
                let msg = mes.substr(index);

                //#ifdef MP-WEIXIN
                let that = this;
                /*wx.setClipboardData设置剪贴板*/
                wx.setClipboardData({
                    data: msg,
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
                this.$copyText(msg).then((e)=>{
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
    background: linear-gradient(to bottom, rgb(131, 164, 212), rgb(182, 191, 195));
    /*background-size: cover;*/
    height: 100%;
  }
</style>
<style scoped lang="less">
  .content{
    height: 100%;
    padding-top: 20px;
    box-sizing: border-box;

    .selectPage{
      display: flex;
      justify-content: space-around;
        padding-bottom: 20px;

      view{
        color: #fff;
      }
      input{
        text-align: center;
          border-bottom: 1px solid #fff;
      }
    }

    .box{
      width: 92%;
      height: 93%;
      margin: 0 auto;
      overflow: scroll;

      .title{
        height: 120px;
        position: relative;
        border-radius: 12upx;
        padding: 20px 30upx;
        overflow: hidden;
        margin-bottom: 20px;

        text{
          position: relative;
          display: block;
          color: #fff;
          font-size: 36upx;
          z-index: 2;
        }
        .author{
          text-align: right;
          margin-top: 30px;
        }

        &:after{
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 12upx;
          background-color: rgba(0,0,0,.4);
          z-index: 1;
        }
      }

      .list{

        .item{
          height: 180px;
          position: relative;
          border-radius: 12upx;
          padding: 20px 30upx;
          overflow: scroll;
          margin-bottom: 20px;
          text-align: right;

          .mes{
            position: relative;
            text-align: left;
            display: block;
            color: #fff;
            line-height: 45upx;
            font-size: 35upx;
            z-index: 2;
          }
          .copy{
            position: absolute;
            right: 30px;
            bottom: 10px;
            color: #fff;
            font-size: 34upx;
            z-index: 2;
          }
          .share{
            position: absolute;
            right: 100px;
            bottom: 0;
            color: #fff;
            font-size: 34upx;
            z-index: 2;
            padding: 0;
            border: none;
            background:initial;
            outline: none;
            text-align: center;

            &:after{
              border: none;
            }
          }

          &:after{
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 12upx;
            background-color: rgba(0,0,0,.4);
            z-index: 1;
          }
        }
      }
    }

  }
</style>
