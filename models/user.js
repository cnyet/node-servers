/**
 * Created by yate on 2017/7/26.
 */
var mongoose = require("../conf/db"),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    userName: {type: String},
    password: {type: String},
    age: {type: String},
    longinDate: {type: Date, dafault: Date.now}
});
module.exports = mongoose.model("user", UserSchema);