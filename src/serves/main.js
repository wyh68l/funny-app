import {fetch} from './serves'

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
        url:'http://47.97.104.206:3000/download/url',
        method:'get'
    })
}

//获取版本更新
export function getVersion(data) {
    return fetch({
        url:'http://47.97.104.206:3000/app/version',
        method:'get',
        data
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

//截获首页轮播图数据
export function mainBanner() {
  Mock.mock(RegExp(`/mock/mainBanner` + ".*"), 'get', mainBannerMock())
  return requestMock( {
    url:'/mainBanner'
  })
}

//截获首页分栏
export function mainReviews() {
  Mock.mock(RegExp(`/mock/mainReviews` + ".*"), 'get', mainReviewsMock())
  return requestMock( {
    url:'/mainReviews'
  })
}

//截获首页商品详情数据
export function mainGoodsInfo(id) {
  Mock.mock(RegExp(`/mock/GoodsInfo` + ".*"), 'get', goodsInfoMock(id))
  return requestMock( {
    url:'/GoodsInfo',
  })
}
