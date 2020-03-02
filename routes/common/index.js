var accessToken = require('./accessToken');
var user = require('./users');

module.exports = {
  ...accessToken,
  ...user
};