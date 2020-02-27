var cache = require('memory-cache');
var utils = require('../../utils');
var config = require('../wechat/config');

exports.getAccessToken = function (code) {
  return new Promise(function(resolve, reject) {
    var APPID = config.wx.appId;
    var SECRET = config.wx.appsecret;
    var url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${APPID}&secret=${SECRET}&code=${code}&grant_type=authorization_code`;
    utils.handleRequest(url).then(function(res) {
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

exports.getUserInfo = function (access_token, openId) {
  return new Promise(function(resolve, reject) {
    var url = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openId}&lang=zh_CN`;
    utils.handleRequest(url).then(function(res) {
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}