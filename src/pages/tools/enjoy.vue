<template>
    <view class='content'>
      <view class="result animated fadeInUp">
        <textarea v-model="result" disabled v-show="isShow"></textarea>
      </view>
      <view class="search animated fadeInUp">
        <view class="button">生成</view>
      </view>
    </view>
</template>

<script>
    export default {
        name: "enjoy",
        data(){
            return {
                result:'',
                isShow:false
            }
        },
        methods:{

        }
    }
</script>
<style>
  page {
    /* linear-gradient(to right, rgb(131, 164, 212), rgb(182, 251, 255)); 渐变蓝*/
    /*rgb(242, 112, 156), rgb(255, 148, 114)渐变红*/
    background: linear-gradient(to bottom, rgb(242, 112, 156), rgb(255, 148, 114));
    height: 100%;
  }
</style>
<style scoped lang="less">
  .content{
    height: 100%;
    padding-top: 60upx;

    .result{
      width: 80%;
      height: 40%;
      margin: 0 auto;
      border: 1upx solid #fff;
      border-radius: 10upx;
    }

    .search{
      margin: 0 auto;
      position: relative;
      top: 30%;
      width: 100upx;
      height: 100upx;
      line-height: 100upx;
      border-radius: 50%;
      border: 1upx solid #fff;

      &:after{
        content: "";
        display: block;
        position: absolute;
        width: 100upx;
        height: 100upx;
        /*background: #fff;*/
        border-radius: 50%;
        border: 1upx solid #fff;
        transform: scale(1,1);
        transform-origin: 50% 50%;
        animation: ripple 3s ease-out 225ms infinite;
        top: -2upx;
        left:-2upx;
      }
      &:before{
        content: "";
        display: block;
        position: absolute;
        width: 100upx;
        height: 100upx;
        /*background: #fff;*/
        border-radius: 50%;
        border: 1upx solid #fff;
        transform: scale(1,1);
        transform-origin: 50% 50%;
        animation: ripple 5s ease-out 225ms infinite;
        top: -2upx;
        left:-2upx;
      }

      .button{
        text-align: center;
        color: #fff;
      }
    }
  }
</style>
