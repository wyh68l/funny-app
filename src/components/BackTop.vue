<template>
  <div class="box">
      <div class="backTop animated" :class="isShow?'fadeInUp':'fadeOutDown'" @click="backTop">
          <span class="iconfont iconshangla"></span>
      </div>
      <div class="backLeft animated" :class="isShow?'fadeInUp':'fadeOutDown'" @click="backLeft">
          <span class="iconfont iconfanhui1"></span>
      </div>
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
            },
            backLeft(){
                //#ifdef MP-WEIXIN
                console.log(getCurrentPages());
                if(getCurrentPages().length >1){
                    uni.navigateBack();
                }else {
                    uni.reLaunch({
                        url: '../index/index'
                    });
                }
                //#endif

                //#ifdef H5 || APP-PLUS
                uni.navigateBack();
                //#endif
            }
        }
    }
</script>

<style scoped lang="less">
    .box{
        position: fixed;
        width: 100upx;
        right: 20upx;
        bottom: 200upx;
        z-index: 999;
        .backTop,.backLeft{
            width: 100upx;
            height: 100upx;
            border-radius: 50%;
            line-height: 100upx;
            text-align: center;
            background-color: #faaca8;
            margin-bottom: 30upx;

            span{
                font-size: 60upx;
                color: #fff;
            }
        }
    }

</style>
