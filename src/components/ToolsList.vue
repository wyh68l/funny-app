<template>
    <div class="toolsList">
        <div v-for="(item,index) in toolsList" :key="index" class="item animated fadeInUp" :class="item.delay" @click="goTo(item)">
            <img :src="item.bgc"/>
            <div class="bgc"></div>
            <div class="box">
                <span class="title">{{item.title}}</span>
                <span class="tips">{{item.tips}}</span>
                <div class="link animated ">
                    {{item.goTo}}
                    <span class="iconfont iconicon-right"></span>
                </div>
            </div>
        </div>
        <ad unit-id="adunit-920bff2d51207ed4" ad-type="grid" grid-opacity="0.8" grid-count="5" ad-theme="white"></ad>
    </div>
</template>

<script>
    import {getToolsList} from '@serves/main'
    // import {Toast} from 'vant'
    export default {
        name: "ToolsList",
        data(){
            return {
                toolsList: []
            }
        },
        created(){
            this.getToolsList();
        },
        methods:{
            getToolsList(){
                getToolsList({type:'MY'}).then(res=>{
                    let result = res.data;
                    if (result.status === 200) {
                        console.log(result);
                        this.toolsList = result.data;
                    }else {
                        wx.showToast({title:result.data.msg,icon:'none'})
                    }
                }).catch(err=>{
                    wx.showToast({title:err.msg,icon:'none'})
                })
            },
            goTo(item){
                console.log(item);
                let options = {
                    url:item.url,
                    title:item.title
                }
                uni.navigateTo({
                    url:`${item.src}?options=${encodeURIComponent(JSON.stringify(options))}`,
                    fail:(err)=>{
                        if(err){
                            wx.showToast({
                                title: item.err,
                                icon: 'none',
                                duration: 2000
                            })
                        }
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .toolsList {
        .item {
            width: 94%;
            height: 200px;
            position: relative;
            left: 3%;
            border-radius: 15px;
            margin-bottom: 20px;

            &:last-of-type{
                margin-bottom: 0;
            }

            img {
                width: 100%;
                height: 100%;
                position: absolute;
                border-radius: 15px;
                top: 0;
                left: 0;
                z-index: 1;
            }

            .bgc{
                position: absolute;
                z-index: 2;
                width: 100%;
                height: 100%;
                opacity: 0.4;
                background-color: #000;
                border-radius: 15px;
            }
            .box{
                position: absolute;
                z-index: 3;
                width: 100%;
                height: 100%;

                span{
                    color: #fff;
                    display: block;
                    margin-left: 8%;
                    font-weight: lighter;
                    margin-bottom: 10upx;
                }

                .title{
                    font-size: 60upx;
                    margin-top: 10%;
                }

                .tips{
                    font-size: 26upx;
                }

                .link {
                    position: absolute;
                    right: 8%;
                    top: 50%;
                    transform: translate(0,-50%);
                    font-size: 38upx;
                    color: #fff;
                    z-index: 2;
                    width: 175upx;
                    height: 40px;
                    line-height: 40px;
                    padding-left: 15upx;
                    text-align: center;
                    border: 1upx solid #fff;
                    border-radius: 60upx;

                    span{
                        display: inline-block;
                        margin-left: 0;
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
</style>
