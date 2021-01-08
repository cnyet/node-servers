const axios = require('axios');

class Http {
  static create (url) {
    return new Promise(function(resolve, reject) {
      axios.get(url).then(res => {
        if (res && res.status === 200) {
          resolve({
            code: 1,
            data: res.data,
            message: 'ok'
          });
        } else {
          reject({
            code: res.status,
            data: null,
            message: res.message
          });
        }
      })
    })
  }
}

module.exports = Http;