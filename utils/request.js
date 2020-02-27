var axios = require('axios');
var cache = require('memory-cache');

exports.handleRequest = function (url) {
  return new Promise(function(resolve, reject) {
    axios.get(url).then(res => {
      if (res && res.status === 200) {
        resolve(exports.handleSuccess(res));
      } else {
        reject(exports.handleFail(res));
      }
    });
  });
}
exports.handleSuccess = function (res) {
  if (res && res.status === 200) {
    return {
      code: 0,
      data: res.data,
      message: 'ok'
    };
  } else {
    return {
      code: res.statusCode,
      data: null,
      message: res.message
    };
  }
};

exports.handleFail = function (code, message) {
  return {
    code,
    data: null,
    message
  };
};