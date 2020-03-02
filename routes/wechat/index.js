/**
 * 微信分享和支付接口
 * @type {[type]}
 */
var express = require('express');
var cache = require('memory-cache');
var createHash = require('create-hash');
var config = require('./config');
var utils = require('../../utils');
var common = require('../common');
var router = express.Router();

/* GET home page. */
router.get('/share', function(req, res, next) {
  res.json({
    code: 0,
    data: 'share',
    messages: 'ok'
  });
});

router.get('/redirect', function(req, res, next) {
  var APPID = config.wx.appId;
  var REDIRECT_URI = req.query.url;
  var SCOPE = 'snsapi_userinfo';
  var callback = 'http://m.yates.com/api/wechat/getOpenId';
  var authorizeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${callback}&response_type=code&scope=${SCOPE}&state=STATE#wechat_redirect`;
  cache.put('REDIRECT_URI', REDIRECT_URI);
  console.log(REDIRECT_URI);
  res.redirect(authorizeUrl);
});

router.get('/getOpenId', function(req, res, next) {
  var code = req.query.code;
  if (!code) {
    res.json({
      code: 1,
      data: null,
      message: '未获取授权CODE'
    });
  } else {
    common.getAccessToken(code).then(function(response) {
      var data = response.data;
      var expire_time = 1000 * 60 * 60 * 2;
      var redirect_url = cache.get('REDIRECT_URI');
      res.cookie('openId', data.openid, {maxAge: expire_time});
      cache.put('access_token', data.access_token, expire_time);
      cache.put('openId', data.openid, expire_time);
      res.redirect(redirect_url);
    });
  }
});

router.get('/getUserInfo', function(req, res, next) {
  var access_token = cache.get('access_token');
  var openId = cache.get('openId');
  common.getUserInfo(access_token, openId).then(function(data) {
    console.log(data.data.nickname);
    common.query({userName: data.data.nickname}).then(function(result) {
      console.log('用户', result);
      if (result.length == 0) {
         common.insert({
           userName: data.data.nickname,
           openId: data.data.openid,
           sex: data.data.sex,
           avatar: data.data.headimgurl,
           province: data.data.province,
           loginDate: new Date().toLocaleString()
         }).then(function(response){
           console.log('添加', response);
         });
      }
    });
    res.json({
      code: 0,
      data: data,
      message: 'ok'
    });
  });
});

router.get('/getBaseToken', function(req, res, next) {
  var access_token = cache.get('access_token');
  var openId = cache.get('openId');
  var expire_time = 1000 * 60 * 60 * 2;
  // 获取普通access_token
  common.getBaseToken().then(function(data) {
    var base_token = data.data.access_token;
    cache.put('base_token', base_token, expire_time);
    // 获取ticket
    common.getTicket(base_token).then(function(response) {
      console.log(response);
      var ticket = response.data.ticket;
      var timestamp = parseInt(new Date().getTime() / 1000).toString();
      var noncestr = utils.randomStr();
      cache.put('ticket', ticket, expire_time);
      var params = {
        noncestr: noncestr,
        jsapi_ticket: ticket,
        timestamp: timestamp,
        url: 'http://m.yates.com'
      };
      var str = utils.combine(params);
      var sign = createHash('sha1').update(str).digest('hex');
      console.log('参数', params, sign);
      res.json({
        code: 0,
        data: {
          appId: config.wx.appId, // 必填，公众号的唯一标识
          timestamp: params.timestamp, // 必填，生成签名的时间戳
          nonceStr: params.noncestr, // 必填，生成签名的随机串
          signature: sign,// 必填，签名,
        },
        message: 'ok'
      });
    });
  });
});

module.exports = router;