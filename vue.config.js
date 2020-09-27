let target = 'https://pyq.shadiao.app/api.php';
let target2 = 'https://chp.shadiao.app/api.php';
let target3 = 'https://du.shadiao.app/api.php';
let target4 = 'http://47.97.104.206:3000/';
module.exports = {
    configureWebpack: {
        resolve: {
            //创建别名，可以方便写路径，@为src
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'serves': '@/serves',
                'views': '@/pages',
                'static': '@/static'
            }
        }
    },
    devServer: {
        port: 80,
        // 设置代理
        // proxy: {
        //     // 如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。这个问题可以通过 vue.config.js 中的 devServer.proxy 选项来配置。
        //     "/pyq": {
        //         //你要跨域的域名(包含host、端口号,切记：一定要带上http头);
        //         //同一个域名只能设置一次跨域，否则重复报错！
        //         target: target,
        //         ws: true,
        //         changOrigin: true, //是否跨域，设置为true;(必须)
        //         /**(可选设置----如果访问域名根目录，那这里必须设置重定向了)
        //          * 是否要把'/api'目录重定向去哪里，跟目录还是其他（可选）
        //          * 如果设置了,那在axios的路径中/article替换成https://baike.baidu.com/相当于根目录一样！
        //          *  */
        //          pathRewrite:{//重写标记，将多余的字符替换掉
        //             '^/pyq':''
        //         }
        //     },
        //     "/chp": {
        //         //你要跨域的域名(包含host、端口号,切记：一定要带上http头);
        //         //同一个域名只能设置一次跨域，否则重复报错！
        //         target: target2,
        //         ws: true,
        //         changOrigin: true, //是否跨域，设置为true;(必须)
        //         pathRewrite:{
        //             '^/chp':''
        //         }
        //     },
        //     "/djt": {
        //         //你要跨域的域名(包含host、端口号,切记：一定要带上http头);
        //         //同一个域名只能设置一次跨域，否则重复报错！
        //         target: target3,
        //         ws: true,
        //         changOrigin: true, //是否跨域，设置为true;(必须)
        //          pathRewrite:{
        //             '^/djt':''
        //         }
        //     },
        //     "/api": {
        //         //你要跨域的域名(包含host、端口号,切记：一定要带上http头);
        //         //同一个域名只能设置一次跨域，否则重复报错！
        //         target: target4,
        //         ws: true,
        //         changOrigin: true, //是否跨域，设置为true;(必须)
        //         pathRewrite:{
        //             '^/api':''
        //         }
        //     },
        // },
    }
}
