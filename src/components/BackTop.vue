<template>
    <div class="backTop animated" :class="isShow?'fadeInUp':'fadeOutDown'" @click="backTop">
        <span class="iconfont iconshangla"></span>
    </div>
</template>

<script>
    export default {
        name: "BackTop.vue",
        data(){
            return {
                isShow:false
            }
        },
        created(){
            let that = this;
            // window.onscroll = function () {
            //     if(window.scrollY >= 700){
            //         that.isShow = true;
            //     }else {
            //         that.isShow = false;
            //     }
            // }
        },
        methods:{
            backTop(){
                uni.pageScrollTo({
                    scrollTop: 0,
                    duration: 100
                });
                this.$emit('backTop')
            }
        }
    }
</script>

<style scoped lang="less">
    .backTop{
        position: fixed;
        width: 100upx;
        height: 100upx;
        border-radius: 50%;
        line-height: 100upx;
        text-align: center;
        right: 20upx;
        bottom: 200upx;
        z-index: 999;
        background-color: #faaca8;

       span{
           font-size: 60upx;
           color: #fff;
       }
    }

</style>
