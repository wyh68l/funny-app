let $partner_public_key  = "";
let $alipay_public_key   = "";
let $serverUrl ='http://publicexprod.d5336aqcn.alipay.net/chat/multimedia.do';
let $appid = "";
let $partner_private_key = '';
let $format = "json";
let $charset = "GBK";

export function pay($order){
    //支付宝
    vendor('Alipay');
    vendor('Alipay.aop.AopClient');
    vendor('Alipay.aop.request.AlipayTradeAppPayRequest');
    $notify_url = $_SERVER['HTTP_HOST'].url("Alipay/notify_url");
    $config = array(
        'appid' =>$this->appid,//
        'rsaPrivateKey' =>$this->partner_private_key,//开发者私钥私钥
        'alipayrsaPublicKey'=>$this->alipay_public_key,//支付宝公钥
        'charset'=>strtolower('utf-8'),//编码
        'notify_url' =>$notify_url,//回调地址(支付宝支付成功后回调修改订单状态的地址)
        'payment_type' =>1,//(固定值)
        'seller_id' =>'xxxxxxxx@163.com',//收款商家账号
        'charset' => 'utf-8',//编码
        'sign_type' => 'RSA2',//签名方式
        'timestamp' =>date("Y-m-d H:i:s"),
        'version' =>"1.0",//固定值
        'url'  => 'https://openapi.alipay.com/gateway.do',//固定值
        'method' => 'alipay.trade.app.pay',//固定值
);

    $aop = new \AopClient();
    $aop->gatewayUrl = "https://openapi.alipay.com/gateway.do";
    $aop->appId = $config['appid'];
    $aop->rsaPrivateKey = $config['rsaPrivateKey'];
    $aop->format = "json";
    $aop->charset = "UTF-8";
    $aop->signType = "RSA2";
    $aop->alipayrsaPublicKey=$config['alipayrsaPublicKey'];
    //实例化具体API对应的request类,类名称和接口名称对应,当前调用接口名称：alipay.trade.app.pay
    $request = new \AlipayTradeAppPayRequest();
    //SDK已经封装掉了公共参数，这里只需要传入业务参数
    $total_price = sprintf("%.2f",$order['total_price']);
    $bizcontent = json_encode([
        'body'=>'商城购物',
        'subject'=>"商城购物",
        'out_trade_no'=> $order['order_sn'],//此订单号为商户唯一订单号
        'total_amount'=>$total_price,//保留两位小数
        'product_code'=>'QUICK_MSECURITY_PAY'
]);
    $request->setNotifyUrl($config['notify_url']);
    $request->setBizContent($bizcontent);
    //这里和普通的接口调用不同，使用的是sdkExecute
    $response = $aop->sdkExecute($request);
    $datas=$response;//就是orderString 可以直接给客户端请求，无需再做处理。
    return $datas;//把这些参数返回给前端
}
