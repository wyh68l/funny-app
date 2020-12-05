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

            }
        },
        props:{
            isShow:{
                default:false,
                type:Boolean
            }
        },
        created(){

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
