<template>
  <!-- #ifdef H5 || APP-PLUS -->
  <view class='content' :style="{'background':`url('${bgImg}')`,'backgroundSize':'cover'}">
    <!--#endif-->
    <!-- #ifdef WEIXIN -->
    <view class='content' style="background:url('{{bgImg}}')">
      <!--#endif-->
    <view class="result animated fadeInUp">
      <textarea v-model="result" disabled class="text" :class="{'animated fadeIn':isShow}"></textarea>
    </view>
    <view class="search animated fadeInUp" @tap="getResult">
      <button class="button">生成</button>
    </view>
  </view>
</template>

<script>
    import {fetch} from 'serves/serves'
    export default {
        name: "fuck",
        data(){
            return {
                result:'',
                isShow:false,
                imgList:[
                    'https://ae01.alicdn.com/kf/U529d5c5750714689a12b2354a6f6cd9ag.jpg',
                    'https://ae01.alicdn.com/kf/Ud7c5519c2beb4302a5e3208fccf17a943.jpg',
                    'https://ae01.alicdn.com/kf/U8802fad9f0644b1b99f87d159b5520ef1.jpg',
                    'https://ae01.alicdn.com/kf/U3269b8989d4641029463a7b63c6081c7U.jpg',
                    'https://ae01.alicdn.com/kf/Udabe55e8fd8f49479084e58ab17e33937.jpg',
                    'https://ae01.alicdn.com/kf/U4e0158f556b44d3aa4eee97c8f32d628o.jpg',
                    'https://ae01.alicdn.com/kf/U8140ddc5f96d4e0090eddae0abde24d3I.jpg',
                    'https://ae01.alicdn.com/kf/U8b55c71b010342b2bfc943e062f7921bp.jpg',
                    'https://ae01.alicdn.com/kf/U179c3ff3d4484f37b023147a4fcc1c5e8.jpg',
                    'https://ae01.alicdn.com/kf/Ua3552d86d063464e8771c67b204bc9cfQ.jpg',
                    'https://ae01.alicdn.com/kf/Ufaa6a9946c23401b8dea0e3a4e445c52R.jpg'
                ],
                bgImg:''
            }
        },
        created(){
            this.randomImg();
        },
        methods:{
            randomImg(){
                let index = parseInt(Math.random()*10);
                console.log(index);
                this.bgImg = this.imgList[index];
            },
            getResult(){
                fetch('https://nmsl.shadiao.app/api.php?level=min&lang=zh_cn','get').then(res=>{
                    console.log(res);
                    if(res.errMsg === 'request:ok'){
                        this.result = res.data;
                        this.isShow = true;
                        setTimeout(()=>{
                            this.isShow = false
                        },250)
                    }else{
                        console.log('sas');
                        wx.showToast({
                            title: '诶呀,好疼',
                            icon: 'fail',
                            duration: 2000
                        })
                    }
                })
            }
        }
    }
</script>
<style>
  page {
    /* linear-gradient(to right, rgb(131, 164, 212), rgb(182, 251, 255)); 渐变蓝*/
    /*rgb(242, 112, 156), rgb(255, 148, 114)渐变红*/
    /*background: url('https://ae01.alicdn.com/kf/Ud7c5519c2beb4302a5e3208fccf17a943.jpg') no-repeat;*/
    /*background-size: cover;*/
    height: 100%;
  }
</style>
<style scoped lang="less">
  .content{
    height: 100%;
    padding-top: 60upx;
    box-sizing: border-box;

    .result{
      width: 80%;
      height: 40%;
      margin: 0 auto;
      border: 1upx solid #fff;
      border-radius: 10upx;

      .text{
        width: 80%;
        height: 170px;
        /*border: 1px solid #fff;*/
        color: #fff;
        margin: 0 auto;
        margin-top: 120upx;
        font-size: 32upx;
      }
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
        width: 100upx;
        height: 100upx;
        line-height: 100upx;
        padding: 0;
        border: none;
        background:initial;
        outline: none;
        text-align: center;
        color: #fff;

        &:after{
          border: none;
        }
      }
    }
  }
</style>
