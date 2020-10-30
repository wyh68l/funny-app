import Vue from 'vue'
import App from './App'
import VueLazyLoad from 'vue-lazyload'
//import vConsole from 'common/js/vconsole'//引入console

Vue.config.productionTip = false
Vue.prototype.$baseUrl = 'https://wyh68l.cn';
Vue.prototype.$baseImgUrl = 'http://service.picasso.adesk.com';
App.mpType = 'app'
// import {Swipe, SwipeItem, Toast,Popup,Dialog} from 'vant';
//
// Vue.use(Swipe);
// Vue.use(SwipeItem);
// Vue.use(Toast);
// Vue.use(Popup);
// Vue.use(Dialog);

Vue.use(VueLazyLoad,{
    error:require('static/images/error.jpg'),      //报错需要的图片
    loading:require('static/images/loading.gif')		// 替换需要的图片
})

/*判断运行平台(不准确，只能判断是否在安卓或苹果)*/
console.log(uni.getSystemInfoSync());
switch(uni.getSystemInfoSync().platform){
  case 'android':
    Vue.prototype.platform = 'android'
    break;
  case 'ios':
    Vue.prototype.platform = 'ios'
    break;
  default:
    Vue.prototype.platform = 'tools'
    break;
}

/* 使用注释法来把代码分开在app，h5,小程序端 */

/*引入剪切板插件*/
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard);

const app = new Vue({
  ...App
})
app.$mount()
