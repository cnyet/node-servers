/**
 * Created by yate on 2017/7/26.
 */
var mongoose = require("../conf/db"),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    userName: {type: String},
    password: {type: String},
    province: {type: String},
    avatar: {type: String},
    openId: {type: String},
    sex: {type: Number},
    longinDate: {type: String}
});
module.exports = mongoose.model("user", UserSchema);