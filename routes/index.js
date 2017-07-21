var express = require('express');
var router = express.Router();

//连接mongodb查询用户信息
var MongoCilent = require("mongodb").MongoClient;
var DB_CONN_STR = "mongodb://localhost:27017/test";

var selectData = function (db, callback) {
  var collection = db.collection("user");
  //var whereStr = {"name": "admin"};
  var data = {"name": "test", "password": "123"};
  collection.find().toArray(function (err, result) {
    if(err){
      console.log("error msg:"+err);
      return;
    }
    callback(result);
  })
};

/* GET home page. */
router.get('/', function(req, res, next) {
  MongoCilent.connect(DB_CONN_STR, function (err, db) {
    console.log("连接成功");
    selectData(db, function (result) {
      res.render('index', { title: 'Express' , data: result});
      db.close();
    });
  });
});


module.exports = router;
