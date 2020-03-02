var mongoose = require('./db');
var mongo = require('./mongo');

module.exports = {
  ...mongoose,
  ...mongo
};