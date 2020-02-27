/**
 * 微信分享和支付接口
 * @type {[type]}
 */
var express = require('express');
var cache = require('memory-cache');
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
    res.json({
      code: 0,
      data: data,
      message: 'ok'
    });
  });
});

module.exports = router;