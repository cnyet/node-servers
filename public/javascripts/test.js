/**
 * Created by yate on 2017/7/21.
 */
var MongoCilent = require("mongodb").MongoClient;
var DB_CONN_STR = "mongodb://localhost:27017/test";

var selectData = function (db, callback) {
    var collection = db.collection("user");
    var whereStr = {"name": "admin"};
    var data = {"name": "test", "password": "123"};
    collection.find(whereStr).toArray(function (err, result) {
        if(err){
            console.log("error msg:"+err);
            return;
        }
        callback(result);
    })
};

MongoCilent.connect(DB_CONN_STR, function (err, db) {
    console.log("连接成功");
    selectData(db, function (result) {
        console.log(result);
        db.close();
    });
});