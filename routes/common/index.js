var accessToken = require('./accessToken');
var users = require('./users');

module.exports = {
  ...accessToken,
  ...users
};