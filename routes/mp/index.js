/**
 * 小程序接口请求
 */
var express = require('express');
var router = express.Router();
var utils = require('../../utils');
var common = require('../common');
var config = require('../wechat/config');

router.get('/getSession', function(req, res, next) {
  var jsCode = req.query.code;
  var appId = config.mp.appId;
  var appSecret = config.mp.appSecret;
  var url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${jsCode}&grant_type=authorization_code`;
  utils.handleRequest(url).then(response => {
    res.json(response);
  }).catch(err => {
    utils.handleFail(err.code, err.message);
  });
});

router.post('/login', function(req, res, next) {
  var data = req.body;
  common.queryMP({
    openId: data.openId
  }).then(function(result) {
    if (result.length == 0) {
      common.insertMP({
        userName: data.userName,
        openId: data.openId,
        sex: data.sex,
        avatar: data.avatar,
        province: data.province,
        loginDate: new Date().toLocaleString()
      }).then(function(response) {
        res.json(response);
      });
    } else {
      res.json({
        code: 0,
        data: result,
        message: '已经注册了'
      });
    }
  }).catch(err => {
    console.log(err);
  });;
});

module.exports = router;