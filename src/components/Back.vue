<template>
    <view class="page">
        <view class="back" :style="{'top':navTop}">
            <text class="icon iconfont iconfanhui1"></text>
        </view>
    </view>
</template>

<script>
    export default {
        name: "back",
        data(){
            return {
                navTop:null,
            }
        },
        created(){
            this.getTop();
        },
        methods:{
            getTop(){
                this.navTop = this.customBar;
                console.log(this.customBar);
            },
        }
    }
</script>

<style scoped lang="less">
    .page{
        .back{
            position: fixed;
            left: 35upx;
            z-index: 999;
            .icon{
                color: #fff;
                font-size: 55upx;
            }
        }
    }
</style>
