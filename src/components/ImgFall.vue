<template>
    <div class="waterfall px-container clearfix" v-cloak>
        <ul class="px-waterfall left" v-for="(el,i) in newWaterfallData" :key="i">
            <li v-for="(item,index) in el" :key="index">
                <div style="position: relative;"  >
                    <img lazy-load :src="item.path || item.img" class="bg-img animated bounceIn" alt=""
                         @tap="imgView(item.path || item.img)" @longpress="downImg(item.path || item.img)"/>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "imgFall",
        data(){
            return {
                newWaterfallData: [],
            }
        },
        props:{
            imgList:{
                default:[],
                type:Array
            }
        },
        watch:{
            imgList(val){
                if(val.length !== 0){
                    // console.log(val);
                    this.setImgList();
                }
            }
        },
        methods:{
            setImgList(){
                let [ ...waterfallData ]  = this.imgList;
                let [ ...newWaterfallData ]= [[],[]]
                waterfallData.forEach((el,i) => {
                    switch( i%2 ) {
                        case 0 : newWaterfallData[0].push(el)
                            break
                        case 1: newWaterfallData[1].push(el)
                    }
                });
                this.newWaterfallData = newWaterfallData;
                // console.log(this.newWaterfallData);
            },
            imgView(url){
                this.$emit('imgView',url);
            },
            downImg(url){
                //#ifdef APP-PLUS
                uni.showLoading({
                    title:'保存中...',
                    mask:true
                })
                let url2 = url.slice(url.indexOf('com')+4,46);
                let option = {
                    filename:'_downloads/'+url2+'.jpeg'
                }
                var dtask = plus.downloader.createDownload(url, option, function (d, status) {
                    // 下载完成
                    if (status == 200) {
                        uni.hideLoading();
                        var fileSaveUrl = plus.io.convertLocalFileSystemURL(d.filename);
                        alert(`已保存到本地：${fileSaveUrl}`);
                    } else {
                        uni.hideLoading();
                        uni.showToast({
                            title:'保存失败，请重试',
                        })
                        plus.downloader.clear();        //清除下载任务
                        console.log("Download failed: " + status);
                    }
                });
                dtask.start();
                //#endif
            }
        },

    }
</script>

<style scoped lang="less">
    .px-container {
        width: 96%;
        max-width: 1200px;
        margin: 0 auto;
    }
    .clearfix:before,
    .clearfix:after {
        content: "";
        display: block;
        clear: both;
    }
    .clearfix {
        zoom: 1;
    }
    .left {
        float: left;
    }
    .font22{
        font-size:22px;
    }
    .color-fff {
        color:#fff;
    }
    .fh {
        overflow:hidden;
    }
    [v-cloak]{
        display: none!important;
    }
    .waterfall {
        margin-top: 20upx;
    }
    .px-waterfall {
        width: calc(335upx);
        &:nth-child(2n + 2) {
            margin-left: 20upx;
        }
        img.bg-img {
            width: 100%;
            border-radius: 8px;
        }
        h3 {
            text-overflow:ellipsis;
            white-space: nowrap;
            text-overflow: ellipsis;
            height:60upx;
            font-family:PingFangSC-Semibold;
            font-weight:600;
            line-height:60upx;
            letter-spacing:6px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            z-index: 999;
        }
        li{
            background: #fff;
            border-radius: 8px;
            margin-bottom: 20upx;
        }
    }
</style>
