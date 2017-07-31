var express = require('express');
var router = express.Router();
var connection = require("../config/mysql");
var List = require("../models/list");

/* GET users listing. */
router.get('/', function(req, res, next) {
  var list = new List({});
  var user = req.session.user.name || "";
  list.selectAll(function (error, result) {
    if(error){
      res.send({code: 0, msg: "页面错误", data: error});
    }
    if(result == ""){
      res.send({ code: 0, msg: "查询出错了", data: null});
    }else{
      res.render("list", {code: 1, msg: "查询成功", user: user, data: JSON.parse(JSON.stringify(result))});
    }
  });
});

router.post("/add", function (req, res, next) {
  var obj = req.body;
  var list = new List(obj);
  console.log(obj);
  list.addOrUpdate(function (error, result) {
    if(error){
      res.send({code: 0, msg: "页面错误", data: error});
    }
    if(result == ""){
      res.send({ code: 0, msg: "查询出错了", data: null});
    }else{
      res.json({code: 1, msg: "更新成功", data: result});
    }
  })
});

router.post("/findBy", function (req, res, next) {
  var obj = req.body;
  var list = new List(obj);
  list.selectBy(function (error, result) {
    if(error){
      res.send({code: 0, msg: "页面错误", data: error});
    }
    if(result == ""){
      res.send({ code: 0, msg: "查询出错了", data: null});
    }else{
      res.json({code: 1, msg: "查询成功", data: result});
    }
  })
});

router.post("/deleteBy", function (req, res, next) {
  var obj = req.body;
  var list = new List(obj);
  list.delete(function (error, result) {
    if(error){
      res.send({code: 0, msg: "页面错误", data: error});
    }
    if(result == ""){
      res.send({ code: 0, msg: "查询出错了", data: null});
    }else{
      res.json({code: 1, msg: "删除成功", data: result});
    }
  })
});

module.exports = router;
