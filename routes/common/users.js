var User = require("../../models/user");
var utils = require('../../utils');

exports.query = function(params) {
  return new Promise((resolve, reject) => {
    User.find(params, function(error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);  
      }
    });
  });
};

exports.insert = function(params) {
  return new Promise((resolve, reject) => {
    var user = new User({
      userName: params.userName,
      password: params.password,
      sex: Math.round(Math.random() * 10),
      province: params.province,
      avatar: params.avatar,
      openId: params.openId,
      loginDate: new Date().toLocaleString()
    });
    console.log('user', user);
    user.save(function(error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    })
  })
}