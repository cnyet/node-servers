var request = require('./request');
var formatStr = require('./formatStr');

module.exports = {
  ...request,
  ...formatStr
};