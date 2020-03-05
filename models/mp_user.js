/**
 * Created by yate on 2017/7/26.
 */
var mongoose = require('mongoose');
var config = require("../config");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  userName: {type: String},
  province: {type: String},
  avatar: {type: String},
  openId: {type: String},
  sex: {type: Number},
  longinDate: {type: String}
});
module.exports = mongoose.model("mp_users", UserSchema);