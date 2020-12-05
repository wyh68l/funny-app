<template>
    <view class="page">
        <view class="back" :style="{'top':navTop}">
            <text class="icon iconfont iconfanhui1" @click="back"></text>

            <view class="nav_left" v-if="right">
                <view class="">
                    <view class="">
                        <picker @change="bindPickerChange" :value="index" :range="array">
                            <view class="uni-input">{{array[index]}}</view>
                        </picker>
                    </view>
                </view>
                <text class="icon2 iconfont iconjianchagengxin" ></text>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "back",
        data(){
            return {
                navTop:null,
                array: ['甜蜜情话','舔狗日记','朋友圈文案','人间凑数日记','渣男语录','精神小伙语录','毒鸡汤'],
                index:0,
            }
        },
        props:{
            right:{
                default:false,
                type:Boolean
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
            back(){
                this.$emit('back');
            },
            bindPickerChange: function(e) {
                this.$emit('changeType',e.target.value);
                this.index = e.target.value
            },
        }
    }
</script>

<style scoped lang="less">
    .page{
        .back{
            width: 60%;
            display: flex;
            justify-content: space-between;
            position: fixed;
            left: 5%;
            z-index: 999;
            align-items: center;
            .icon{
                color: #fff;
                font-size: 55upx;
            }

            .nav_left{
                color: #fff;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 30upx;

                .uni-input{
                    background:none;
                }
                .icon2{
                    color: aqua;
                    /*border-bottom:  1px solid #fff;*/
                }
            }
        }
    }
</style>
