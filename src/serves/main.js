import {fetch} from './serves'
import Vue from 'vue'
const baseUrl = Vue.prototype.$baseUrl;
const baseImgUrl = Vue.prototype.$baseImgUrl;

// import {
//   mainGoodsMock,
//   mainBannerMock,
//   mainReviewsMock,
//   goodsInfoMock
// }
// from "../mock/index";
//
// import Mock from 'mockjs'

//彩虹屁的接口--（弃用）
// export function getRainbow(url) {
//   return request({url})
// }

//彩虹屁的接口
export function getRainbow(url) {
    return fetch({
        url,
        method:'get'
    })
}

//获取魅音apk下载
export function getApkUrl() {
    return fetch({
        //url:'/api/download/url',
        url:baseUrl+'/api/download/url',
        method:'get'
    })
}

//获取版本更新
export function getVersion(data) {
    return fetch({
        url:baseUrl+'/api/app/version',
        method:'get',
        data
    })
}

//获取功能列表
export function getToolsList(data) {
    return fetch({
        url:baseUrl+'/api/tools/getToolsList',
        // url:'/api/tools/getToolsList',
        method:'get',
        params:data
    })
}

//获取关于信息
export function getAboutInfo(data) {
    return fetch({
        // url:baseUrl+'/app/aboutInfo',
        url:baseUrl+'/api/app/aboutInfo',
        method:'get',
        params:data
    })
}

//获取图片分类接口
export function getImgClassify(data) {
    return fetch({
        // url:baseUrl+'/v1/wallpaper/category',
        url:baseUrl+'/api/v1/wallpaper/category',
        method:'get',
        params:data
    })
}

//获取图片列表接口
export function getImgList(data) {
    return fetch({
        // url:`${baseUrl}/v1/vertical/category/vertical`,
        url:`${baseUrl}/api/v1/vertical/category/vertical`,
        method:'get',
        params:data
    })
}

//获取表情包图片搜索接口
export function searchEmoji(data) {
    return fetch({
        // url:`http://www.dbbqb.com/api/search/json`,
        url:baseUrl+'/bqb/search/json',
        method:'get',
        params:data
    })
}

/*--------------首页mock模拟的接口2.0----------------*/

//截获首页商品数据(暂时不用)
export function mainGoods(type,page) {
  Mock.mock(RegExp(`/mock/mainGoods` + ".*"), 'get', mainGoodsMock(type, page))
  return requestMock( {
    url:'/mainGoods'
  })
}
