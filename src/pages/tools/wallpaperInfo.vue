<template>
    <div class="img-home">
        <!-- 分页 -->
        <view class="selectPage animated fadeInUp" :style="{'padding-top':navTop}">
            <view class="left">
                <view @tap="handleCurrentChange(false)">{{status?'跳转':'上一页'}}</view>
                <view><input type="number" v-model="page" @focus="status = true"></view>
                <view @tap="handleCurrentChange(true)">{{status?'跳转':'下一页'}}</view>
            </view>
            <view class="right uni-padding-wrap uni-common-mt">
                <text style="color: #fff;font-size: 30upx;">{{type?'最新':'热门'}}</text>
                <switch checked @change="switchChange" color="#faaca8" />
            </view>
        </view>
        <!--<div class="imgs">-->
            <!--<img v-lazy="pic.img" lazy class="pic-li animated bounceIn" v-for="(pic,index) of imgs" :key="index" @tap="imgView"/>-->
        <!--</div>-->

        <ImgFall :imgList="imgs" @imgView="imgView"></ImgFall>
        <BackTop @backTop="status = false" :isShow = 'isShow'></BackTop>
    </div>
</template>

<script>
    import {getImgList} from '@serves/main'
    import ImgFall from '@components/ImgFall'
    import BackTop from '@components/BackTop'
    // import {Toast} from 'vant'
    export default {
        name: "wallpaperInfo",
        components:{
            ImgFall,
            BackTop
        },
        data() {
            return {
                loading: true,
                imgs: [],
                imgsUrl: [],
                activeName: '',
                listName: [], // 分类
                //   listIndex: "", // 当前点击 id
                id: 0,
                count: 0, // 最多
                name: '', // 最多
                skip: 0,
                order: "new", // 最新 最热
                limit: 20, // 每页数量，暂定20
                currentPage1: 1,
                value4: true,
                page:1,
                status:false,
                type:true,
                navTop:0,
                isShow:false
            };
        },
        watch:{

        },
        onLoad(options) {
            wx.setNavigationBarTitle({
                title: '壁纸列表'
            })
            let skip = this.skip;
            let id = this.id = options.id;
            this.count = options.count;
            let order = this.order;
            this.getInfo(id, order, skip);

            setTimeout(()=>{
                uni.showToast({//提示
                    title:'长按可以保存图片哦~',
                    icon:'none'
                })
            },2000)
            // 设置应用非全屏显示！
            //#ifdef APP-PLUS
            plus.navigator.setFullscreen(false);
            //#endif
        },
        onShow(){
            this.navTop = this.customBar;
        },
        // 监听页面滚动事件
        onPageScroll: function (e) {
            if (e.scrollTop >= 700) {
                this.isShow = true;
            } else {
                this.isShow = false;
            }
        },
        methods: {
            getInfo(id, order, skip,type) {
                getImgList({id,order,skip}).then(res=>{
                    if(type){
                        this.$set(this,'imgs',res.data.res.vertical || [])
                    }else {
                        this.$set(this,'imgs',this.imgs.concat(res.data.res.vertical || []))
                    }
                    this.imgs.forEach(item =>{
                        this.imgsUrl.push(item.img)
                    })
                })
                // console.log(this.imgs);
            },
            switchChange(){
                uni.pageScrollTo({
                    scrollTop: 0,
                    duration: 100
                });
                this.type = !this.type;
                this.order = this.type?'new':'hot';
                this.getInfo(this.id, this.order, this.skip,true);
            },
            imgView(url){
                this.status = false;
                uni.showLoading({
                    title:'加载中...',
                    mask:true
                })
                setTimeout(()=>{
                    let currentUrl = url
                    let that = this;
                    uni.previewImage({
                        current: currentUrl, // 当前显示图片的http链接
                        urls: this.imgsUrl,
                        longPressActions: {
                            itemList: ['保存图片'],
                            success: function(data) {
                                console.log(data);
                                if(data.tapIndex==0) {
                                    uni.saveImageToPhotosAlbum({
                                        filePath: currentUrl,
                                        success: function () {
                                            uni.showToast({
                                                title: '保存成功'
                                            })
                                        },fail:function () {
                                            uni.showToast({
                                                title: '保存失败，请重试~'
                                            })
                                        }
                                    })
                                }
                            },
                            fail: function(err) {
                                console.log(err.errMsg);
                            }
                        },// 需要预览的图片http链接列表
                        success:()=>{
                            uni.hideLoading();
                        }
                    })
                },200)
            },
            handleCurrentChange(type) {
                uni.pageScrollTo({
                    scrollTop: 0,
                    duration: 100
                });
                let flag = false;
                try {
                    if(Number(this.page) < 1  && this.page !== ''){
                        this.page = 1;
                        flag = true;
                    }else {
                        this.page = Number(this.page);
                    }
                    if(!this.status){
                        if(type){
                            this.page+=1;
                        }else {
                            if(this.page<=1){
                                this.page = 1;
                                flag = true;
                            }else {
                                this.page-=1;
                            }
                        }

                    }
                    this.status = false;
                    this.skip = flag?0:(this.page-1) * 20;
                    this.getInfo(this.id, this.order, this.skip,true);
                }catch (e) {
                    this.page = 1;
                    uni.showToast({//提示
                        title:'不能调皮哦~'
                    })
                }

            }
        },
        onReachBottom() {
            this.page+=1;
            this.skip = this.page * 20;
            this.getInfo(this.id, this.order, this.skip);
        },
    };
</script>

<style scoped lang="less">
    page{
        height: 100%;
        background: linear-gradient(to bottom, rgb(35, 37, 38), rgb(65, 67, 69));
    }
    .img-home {
        padding: 2% 2%;
        padding-top: 180upx;
        background: linear-gradient(to bottom, rgb(35, 37, 38), rgb(65, 67, 69));
    }
    .imgs {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: left;
        align-items: flex-start;
    }
    .selectPage{
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgb(35, 37, 38);
        width: 100%;
        height: 70upx;
        padding-bottom: 20upx;
        z-index: 1;
        align-items: center;
        display: flex;
        justify-content: space-between;
        .left{
            width: 75%;
            height: 70upx;
            box-sizing: border-box;
            padding-left: 30upx;
            align-items: center;
            display: flex;
            justify-content: space-between;
            view{
                flex: 1;
                color: #fff;
                font-size: 30upx;
                text-align: center;
            }
            input{
                flex: 3;
                text-align: center;
                border-bottom: 1px solid #fff;
            }
        }
        .uni-common-mt{
            margin-top: 0;
        }
        .right{
            height: 70upx;
            line-height: 70upx;

            switch{
                transform:scale(0.8)
            }
        }
    }
    .pic-li {
        width: 30%;
        position: relative;
        height: auto;
        margin: 7upx;
        /* 如果一行有一个则一个撑满整行，如果有两个则两个撑满整行 */
        flex-grow: 1;
        border-radius: 5px;
        overflow: hidden;
        cursor: pointer;
        box-shadow: 0 0 5upx #fff;

        &:nth-of-type(2n+1){
            /*width: 31%;*/
            /*height: auto;*/
        }
    }
    .pic-li:hover {
        box-shadow: 0 0 15upx #faaca8;
    }
</style>
