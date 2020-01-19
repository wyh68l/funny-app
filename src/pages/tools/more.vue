<template>
    <view class="page">
        <view class="tip animated fadeInUp">
            <image src="../../static/images/logo.png"></image>
            <text>拥有很多，不如有我</text>
        </view>
        <view class="about animated fadeInUp">
            <!--#ifdef MP-WEIXIN-->
            <button class="share" open-type="share">转发小程序</button>
            <!--#endif-->
            <text>感谢使用这款有趣的小程序！</text>
            <text>如果您觉得好用，可以推广出去哦~</text>
            <text>也可以给可怜的小哥哥发个1元小红包吧๑乛◡乛๑</text>
        </view>
        <view class="money animated fadeInUp">
            <view>
                <image :src="imgList[0]" @tap="imgView" :data-src="imgList[0]"></image>
                <text>谢谢靓女</text>
            </view>
            <view>
                <image :src="imgList[1]" @tap="imgView" :data-src="imgList[1]"></image>
                <text>谢谢靓仔</text>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "more",
        data(){
            return {
                imgList: [
                    "https://ae01.alicdn.com/kf/U0e851f2f55064818bfbcf864373f9f76k.jpg",
                    "https://ae01.alicdn.com/kf/U42dd6d512f3c4a9994372b0e3b445635E.jpg",
                ]
            }
        },
        methods:{
            imgView(event){
                let currentUrl = event.currentTarget.dataset.src;
                let that = this;
                wx.previewImage({
                    current: currentUrl, // 当前显示图片的http链接
                    urls: that.imgList // 需要预览的图片http链接列表
                })
            },
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
        padding-top: 20px;

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
                height: 400upx;
            }
            text{
                display: block;
                text-align: center;
                color: #fff;
                font-size: 32upx;
            }
        }
    }

</style>
