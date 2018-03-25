/**
 * Created by yate on 2017/7/27.
 */
var mongoose = require("../conf/db"),
    Schema = mongoose.Schema;

var WebsiteSchema = new Schema({
    name: {type: String},
    url: {type: String},
    country: {type: String}
});

module.exports = mongoose.model("website", WebsiteSchema);