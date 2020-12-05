<template>
    <view class="page">
        <!--<web-view src="https://www.yikm.net/"></web-view>-->
        <web-view :src="item.url"></web-view>
        <!--<web-view src="http://rainyscope.com/#slide-1"></web-view>-->
    </view>
</template>

<script>
    export default {
        name: "game",
        data(){
            return {
                item:{
                    url:'',
                    title:''
                }
            }
        },
        onLoad(option) {
            if(option.options){
                this.item = JSON.parse(decodeURIComponent(option.options));
                wx.setNavigationBarTitle({
                    title: this.item.title
                })
            }
            console.log(this.item);
        },
        created(){
            uni.showLoading({
                title:'此网站加载较慢...请耐心等待',
                mask:false
            })
            setTimeout(()=>{
                uni.hideLoading();
            },3000)
        }
    }
</script>

<style scoped>

</style>
