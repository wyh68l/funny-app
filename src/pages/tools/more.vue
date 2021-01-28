<template>
    <view class="page">
        <!--<Back></Back>-->

        <!--#ifdef MP-WEIXIN || H5-->
        <view class="tip animated fadeInUp">
            <image :src="`${baseUrl}/api/download/images?name=logo&type=png`"></image>
            <text>拥有很多，不如有我</text>
        </view>
        <!--#endif-->

        <!--#ifdef APP-PLUS-->
        <view class="tip animated fadeInUp" style="margin-top: 50px;">
            <image :src="`${baseUrl}/api/download/images?name=logo&type=png`"></image>
            <text>拥有很多，不如有我</text>
        </view>
        <!--#endif-->

        <view class="about animated fadeInUp">
            <!--#ifdef MP-WEIXIN-->
            <button class="share" open-type="share">转发小程序</button>
            <text>感谢使用这款有趣的小程序！</text>
            <text>后续还会不断更新更多有趣的功能</text>
            <!--#endif-->

            <!--#ifdef APP-PLUS || H5-->
            <text>感谢使用这款有趣的app！</text>
            <text>微信小程序<span style='color: #ff401c;'>'简桔'</span>已上线哦~希望多多关注呦~</text>
            <text>已更新部分功能，后续还会不断更新更多有趣的功能</text>
            <!--#endif-->

            <text>如果觉得好用的话，可以推广出去呀~</text>

            <!--#ifdef MP-WEIXIN-->
            <!--<text>也可以给可怜的小哥哥发个1元小红包吧๑乛◡乛๑</text>-->
            <!--#endif-->
        </view>


       <view class="money animated fadeInUp">
           <div v-html="aboutInfo" style="margin: 0 auto;"></div>
            <!--<view style="text-align: center;margin: 0 auto;">-->
                <!--&lt;!&ndash;<image :src="imgList[0]" @tap="imgView" :data-src="imgList[0]"></image>&ndash;&gt;-->
                <!--<image :src="appImgList[0]" @tap="imgView" :data-src="appImgList[0]"></image>-->
                <!--<text>女生止步，靓仔们，这里有你们想康的东西呦~</text>-->
                <!--<text @tap="copy">{{apkUrl}}</text>-->
            <!--</view>-->
            <!--<view>-->
                <!--<image :src="imgList[1]" @tap="imgView" :data-src="imgList[1]"></image>-->
                <!--<text>谢谢靓仔</text>-->
            <!--</view>-->
        </view>

        <official-account class="gzh"></official-account>
    </view>
</template>

<script>
    import Back from '@components/Back'
    import {getApkUrl,getVersion,getAboutInfo} from 'serves/main'
    export default {
        name: "more",
        components:{
            Back
        },
        data(){
            return {
                imgList: [
                    "https://ae01.alicdn.com/kf/H4ac62d11328f4e5599b2b36ee80f4b72w.jpg",
                    "https://ae01.alicdn.com/kf/Hf935989e748e428eadde064960b08755a.jpg",
                ],
                appImgList:[this.$baseUrl+'api/download/wechat'],
                apkUrl:'https://wws.lanzous.com/ihU7Dh0b3ta',
                version: 103,
                updateAppUrl:'',
                isUpdate:false,
                aboutInfo:'',
                baseUrl:this.$baseUrl
            }
        },
        onLoad(){
            //#ifdef MP-WEIXIN
            wx.showShareMenu({
                menus: ['shareAppMessagewx', 'shareTimeline'],
                withShareTicket:true
            })
            //#endif
        },
        onShareTimeline: function () {//分享朋友圈

        },
        onShareAppMessage: function () {//分享好友

        },
        created(){
            //#ifdef APP-PLUS || H5
            // this.getApkUrl();
            // this.getAboutInfo();

            //#endif
            this.getAboutInfo();
            //#ifdef APP-PLUS
            //this.getVersion();
            //#endif
            this.getAboutInfo();

            // 设置应用非全屏显示！
            //#ifdef APP-PLUS
            plus.navigator.setFullscreen(false);
            //#endif
        },
        methods:{
            imgView(event){
                let currentUrl = event.currentTarget.dataset.src;
                console.log(currentUrl);
                let that = this;
                wx.previewImage({
                    current: currentUrl, // 当前显示图片的http链接
                    urls: that.appImgList // 需要预览的图片http链接列表
                })
            },
            getAboutInfo(){
                getAboutInfo({type:'MY'}).then(res=>{
                    let result = res.data.data;
                    if(res.data.status === 200 && result.flag){
                        this.aboutInfo = result.aboutInfo;
                    }else {
                        wx.showToast({
                            title: result.msg,
                            icon: 'none',
                            duration: 2000
                        })
                    }
                })
            },
            getVersion(){
                let options = {
                    version:this.version,
                    appName:'version_MY'
                }
                getVersion(options).then(res =>{
                    let result = res.data.data;
                    if(res.data.status === 200 && result.flag){
                        this.updateAppUrl = result.link;
                        this.isUpdate = true;
                    }else {
                        wx.showToast({
                            title: result.msg,
                            icon: 'none',
                            duration: 2000
                        })
                    }
                })
            },
            getAboutInfo(){
                getAboutInfo({type:'MY'}).then(res=>{
                    let result = res.data.data;
                    if(res.data.status === 200 && result.flag){
                        this.aboutInfo = result.aboutInfo;
                    }else {
                        wx.showToast({
                            title: result.msg,
                            icon: 'none',
                            duration: 2000
                        })
                    }
                })
            },
            getApkUrl(){
                getApkUrl().then(res =>{
                    let result = res.data.data;
                    if(res.data.status === 200){
                        this.apkUrl = result.link;
                    }else {

                    }
                })
            },
            copy(){
                //#ifdef MP-WEIXIN
                let that = this;
                /*wx.setClipboardData设置剪贴板*/
                wx.setClipboardData({
                    data: this.apkUrl,
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
                    data:this.apkUrl,//要被复制的内容
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
                this.$copyText(this.apkUrl).then((e)=>{
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
        background: linear-gradient(to bottom, rgb(131, 164, 212), rgb(182, 191, 195));
        /*background-size: cover;*/
        height: 100%;
    }
</style>
<style scoped lang="less">
    .page{
        padding-top: 20upx;

        .tip{
            width: 500upx;
            height: 150px;
            text-align: center;
            margin: 0 auto;
            border: 1px solid #fff;
            border-radius: 8px;
            padding-top: 20px;


            image{
                width: 120upx;
                height: 120upx;
            }

            text{
                margin-top: 10px;
                display: block;
                color: #fff;
                font-size: 36upx;
            }
        }

        .about{
            text-align: center;
            margin-top: 30px;
            text{
                color: #fff;
                font-size: 30upx;
                display: block;
                margin-bottom: 5px;
            }
            .share{
                color: #fff;
                font-size: 34upx;
                z-index: 2;
                padding: 0;
                border: 1px solid #fff;
                background:initial;
                outline: none;
                text-align: center;
                height: 40px;
                line-height: 40px;
                margin-bottom: 5px;
                width: 200upx;

                &:after{
                    border: none;
                }
            }
        }

        .money{
            width: 94%;
            display: flex;
            margin: 0 auto;
            margin-top: 40px;
            justify-content: space-between;

            image{
                width: 320upx;
                height: 320upx;
            }
            text{
                display: block;
                text-align: center;
                color: #fff;
                font-size: 32upx;
            }
        }
        .gzh{
            width: 100%;
            position: absolute;
            left: 0;
            bottom: 0;
        }
    }

</style>
