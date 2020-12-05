<template>
    <div class="page">
        <ad unit-id="adunit-29dbde4267033f0c" ad-type="grid" grid-opacity="0.8" grid-count="5" ad-theme="white"></ad>
        <div class="app-cont">
            <div class="picmenus">
                <div
                        class="pic-li"
                        v-for="(pic,index) in picMenus"
                        :key="index"
                        @click="clickPic(pic.id,pic.count,pic.name)">
                    <img lazy-load :src="pic.cover"/>
                    <transition name="slide-fade">
                        <div class="pic-info">
                            <span class="title">{{pic.name}}</span>
                            <span class="num">{{pic.count}}</span>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getImgClassify} from '@serves/main'
    export default {
        name: "wallpaper",

        data(){
            return {
                show: false,
                picMenus: []
            }
        },
        mounted() {
           this.getImgClassify();
        },
        methods: {
            clickPic(id, num, name) {
                uni.navigateTo({
                    url:`wallpaperInfo?id=${id}&count=${num}&name=${name}`
                })
            },
            getImgClassify(){
                getImgClassify().then(res=>{
                    let _picMenus = res.data.res.category;
                    _picMenus.forEach((item, index) => {
                        item.show = true;
                    });
                    console.log(_picMenus);
                    this.picMenus = _picMenus;
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .page{
        width: 100%;
        background: linear-gradient(to bottom, #ddd6f3, #faaca8);
    }
    .app-cont {
        padding: 2% 4%;
    }
    .picmenus {
        height: auto;
        /*display: flex;*/
        /*flex-wrap: wrap;*/
        /*align-items: center;*/
        /*justify-content: space-between;*/
    }
    .pic-li {
        width: 100%;
        box-sizing: border-box;
        position: relative;
        /* 如果一行有一个则一个撑满整行，如果有两个则两个撑满整行 */
        /* flex-grow: 1; */
        /* 给每个20%的宽 */
        margin-bottom: 30upx;
        border-radius: 5px;
        overflow: hidden;

        img{
            width: 100%;
        }
    }
    .pic-li:hover {
        box-shadow: 0 0 10px #ddd;
    }
    .pic-info {
        position: absolute;
        left: 0;
        bottom: 0;
        color: #fff;
        width: 100%;
        box-sizing: border-box;
        background-color: rgba(0,0,0,.3);
        padding: 20upx 20upx;
        display: flex;
        justify-content: space-between;
        font-size: 36upx;
    }

    .slide-fade-enter-active {
        transition: all 0.3s ease;
    }
    .slide-fade-leave-active {
        /* transition: all .8s cubic-bezier(1.0,0.5,0.8,1.0); */
        transition: all 0.8s ease;
    }
    .slide-fade-enter,
    .slide-fade-leave-to {
        transform: translateY(100px);
        opacity: 0;
    }
</style>
