<template>
    <div class="content">
        <!--<Back></Back>-->
        <ToolsList></ToolsList>
    </div>
</template>

<script>
    import ToolsList from '@components/ToolsList'
    export default {
        components:{ToolsList},
        name: "Tools",
        data(){
            return {
                color:'rgb(65, 67, 69)',
                delay:3,
                flag:true,
            }
        },
        created(){
            wx.setNavigationBarTitle({
                title: '简桔'
            })
            // 设置应用全屏显示！
            //#ifdef APP-PLUS
            plus.navigator.setFullscreen(true);
            //#endif
        },
        methods:{

        },
        onShareAppMessage: function () {

        },
        onShareTimeline: function () {//分享朋友圈

        },
        onLoad() {
            //#ifdef MP-WEIXIN
            wx.showShareMenu({
                menus: ['shareAppMessagewx', 'shareTimeline'],
                withShareTicket:true
            })
            //#endif
        },
    }
</script>

<style lang="less" scoped>
    .content {
        padding: 60upx 0;
        padding-bottom: 100upx;
        background: linear-gradient(to bottom, rgb(35, 37, 38), rgb(65, 67, 69));
    }
</style>
