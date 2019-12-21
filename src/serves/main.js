import {request,requestMock} from './serves'

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
export function getRainbow() {
  return request({
    url:'chp.shadiao.app/api.php'
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
