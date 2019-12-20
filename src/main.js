import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

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


const app = new Vue({
  ...App
})
app.$mount()
