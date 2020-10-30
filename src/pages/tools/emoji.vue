<template>
    <div class="img-home">
        <!-- 分页 -->
        <view class="selectPage animated fadeInUp">
            <view class="left">
                <view @tap="handleCurrentChange(false)">上一页</view>
                <text>{{page}}</text>
                <view @tap="handleCurrentChange(true)">下一页</view>
            </view>
            <view class="right uni-padding-wrap uni-common-mt">
                <view><input type="text" v-model="options.w" @focus="status = true" placeholder="输入关键字"></view>
                <text style="color: #fff;font-size: 30upx;" @click="searchEmoji(true)">搜索</text>
            </view>
        </view>

        <ImgFall :imgList="imgs" @imgView="imgView"></ImgFall>
        <BackTop @backTop="status = false"></BackTop>
    </div>
</template>


<script>
    import {searchEmoji} from '@serves/main'
    // import {Toast} from 'vant'
    import ImgFall from '@components/ImgFall'
    import BackTop from '@components/BackTop'

    export default {
        name: "emoji",
        components: {
            ImgFall,
            BackTop
        },
        data() {
            return {
                loading: true,
                imgs: [],
                imgsUrl: [],
                page: 1,
                status: false,
                type: true,
                newWaterfallData: '',
                options: {
                    start: 0,
                    over: false,
                    w: ''
                },
                options2: {
                    size:50
                },
            };
        },
        watch: {},
        created() {
            wx.setNavigationBarTitle({
                title: '表情包搜索'
            })
            this.searchEmoji();
            setTimeout(()=>{
                uni.showToast({//提示
                    title:'长按可以保存图片哦~',
                })
            },2000)
            // 设置应用非全屏显示！
            //#ifdef APP-PLUS
            plus.navigator.setFullscreen(false);
            //#endif
        },
        mounted() {

        },
        methods: {
            compareVal(){
                if (this.options.w == '') {
                    uni.showToast(({title: '请输入搜索关键字哦~'}))
                    return true;
                }else {
                    return false;
                }
            },
            searchEmoji(type = false) {
                if(type){
                    this.loading = true;
                    if (this.compareVal()) return;
                }
                searchEmoji(type?this.options:this.options2).then(res => {
                    if (res.data.length !== 0) {
                        uni.pageScrollTo({
                            scrollTop: 0,
                            duration: 0
                        });
                        this.$set(this, 'imgs', res.data)
                        this.imgs.forEach(item => {
                            item.path = 'http://image.dbbqb.com/' + item.path;
                            // this.imgsUrl.push('http://image.dbbqb.com/'+item.path)
                        })
                    } else {
                        this.loading = false;
                    }

                })
            },
            imgView(url) {
                console.log(url);
                this.status = false;
                uni.showLoading({
                    title:'加载中...',
                    mask:true
                })
                setTimeout(() => {
                    let currentUrl = url;
                    let that = this;
                    uni.previewImage({
                        current: currentUrl, // 当前显示图片的http链接
                        urls: [currentUrl], // 需要预览的图片http链接列表
                        success: () => {
                            uni.hideLoading();
                        }
                    })
                }, 200)
            },
            handleCurrentChange(type) {
                if (this.compareVal()) return;
                uni.pageScrollTo({
                    scrollTop: 0,
                    duration: 100
                });
                let flag = false;
                try {
                    if (Number(this.page) < 1 && this.page !== '') {
                        this.page = 1;
                        flag = true;
                    } else {
                        this.page = Number(this.page);
                    }
                    if (!this.status) {
                        if (type) {
                            this.page += 1;
                        } else {
                            if (this.page <= 1) {
                                this.page = 1;
                                flag = true;
                            } else {
                                this.page -= 1;
                            }
                        }

                    }
                    this.status = false;
                    this.options.start = flag ? 0 : (this.page - 1) * 100;
                    this.searchEmoji(true);
                } catch (e) {
                    this.page = 1;
                    uni.showToast({//提示
                        title: '不能调皮哦~'
                    })
                }

            }
        },
        onReachBottom() {
            if (this.compareVal()) return;
            if (this.loading) {
                this.page += 1;
                this.options.start = 100 * (this.page - 1);
                this.searchEmoji(true);
            } else {
                uni.showToast(({title: '没有更多咯~'}))
            }
        },
    };
</script>


<style scoped lang="less">
    page {
        height: 100%;
        background: linear-gradient(to bottom, rgb(35, 37, 38), rgb(65, 67, 69));
    }

    .img-home {
        height: 100%;
        margin-top: 100upx;
        padding: 2% 2%;
        background: linear-gradient(to bottom, rgb(35, 37, 38), rgb(65, 67, 69));
    }

    .imgs {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: left;
        align-items: flex-start;
    }

    .selectPage {
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgb(35, 37, 38);
        width: 100%;
        height: 120upx;
        padding-bottom: 20upx;
        z-index: 1;
        align-items: center;
        display: flex;
        justify-content: space-between;
        .left {
            width: 40%;
            height: 120upx;
            align-items: center;
            display: flex;
            justify-content: space-between;
            view {
                flex: 1;
                color: #fff;
                font-size: 30upx;
                text-align: center;
            }
            text {
                font-size: 30upx;
                color: #fff;
            }
        }
        .right {
            width: 40%;
            align-items: center;
            display: flex;
            justify-content: space-between;
            line-height: 120upx;
            height: 120upx;
            margin-right: 4%;

            text {
                display: block;
                width: 100upx;
                text-align: center;
            }

            input {
                color: #fff;
                width: 200upx;
                text-align: center;
                border-bottom: 1px solid #fff;
                font-size: 30upx;
                .uni-input-placeholder {
                    color: #eee;
                    font-size: 26upx;
                }
            }
        }
    }

    .pic-li {
        position: relative;
        height: auto;
        margin: 7upx;
        /* 如果一行有一个则一个撑满整行，如果有两个则两个撑满整行 */
        border-radius: 5px;
        overflow: hidden;
        cursor: pointer;
        box-shadow: 0 0 5upx #fff;

        &:nth-of-type(2n+1) {
            /*width: 31%;*/
            /*height: auto;*/
        }
    }

    .pic-li:hover {
        box-shadow: 0 0 15upx #faaca8;
    }
</style>
