var express = require('express');
var router = express.Router();
var path = require('path');
var Alipay = require('../pay/alipay');
var utl = require('../pay/utl');

var outTradeId = Date.now().toString();

var ali = new Alipay({
    appId: '2019031263540308',
    notifyUrl: 'http://192.168.3.1:3000/',
    rsaPrivate: path.resolve('./pay/pem/app_private_key_nonjava.pem'),
    rsaPublic: path.resolve('./pay/pem/alipay_public_key_nonjava.pem'),
    sandbox: true,
    signType: 'RSA2'
});

router.post('/doPay', function(req, res, next) {
    var url =  ali.webPay({
        body: "ttt",
        subject: "ttt1",
        outTradeId: outTradeId,
        timeout: '90m',
        amount: "0.1",
        sellerId: '',
        product_code: 'FAST_INSTANT_TRADE_PAY',
        goods_type: "1",
        return_url:"127.0.0.1:300",
    })

    var url_API = 'https://openapi.alipay.com/gateway.do?'+ url;
    res.json({url:url_API})
});

module.exports = router;
