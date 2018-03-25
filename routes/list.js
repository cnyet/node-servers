/**
 * Created by yate on 2017/7/24.
 */
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Website = require("../models/website");

/* GET home page. */
router.get('/', function(req, res, next) {
    var user = req.session.user.name || "";
    Website.find({}, function (error, result) {
        if(error){
            res.send({code: 0, msg: "页面错误", data: error});
            return;
        }
        if(result == ""){
            res.send({ code: 0, msg: "查询出错了", data: null});
        }else{
            res.render("list", {code: 1, msg: "查询成功", user: user, data: JSON.parse(JSON.stringify(result))});
        }
    });
});
//添加数据
router.post("/add", function (req, res, next) {
    var obj = req.body;
    var id = obj.id;
    var param;
    var website = new Website({
        name: obj.name,
        url: obj.url,
        country: obj.country
    });
    console.log(obj);
    website.save(function (error, result) {
        if(error){
            res.send({code: 0, msg: "页面错误", data: error});
            return;
        }
        if(result == ""){
            res.send({ code: 0, msg: "添加出错了", data: null});
        }else{
            res.json({code: 1, msg: "添加成功", data: result});
        }
    })
});
//根据ID查找并更新
router.post("/update", function (req, res, next) {
    var obj = req.body;
    var param = mongoose.Types.ObjectId(obj.id);
    var website = {
        name: obj.name,
        url: obj.url,
        country: obj.country
    };
    Website.findByIdAndUpdate(param, website, function (error, result) {
        if(error){
            res.send({code: 0, msg: "页面错误", data: error});
            return;
        }
        if(result == ""){
            res.send({ code: 0, msg: "更新出错了", data: null});
        }else{
            res.json({code: 1, msg: "更新成功", data: result});
        }
    })
});

router.post("/findBy", function (req, res, next) {
    var obj = req.body;
    var param = mongoose.Types.ObjectId(obj.id);
    Website.findById(param, function (error, result) {
        if(error){
            res.send({code: 0, msg: "页面错误", data: error});
            return;
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
    var param = mongoose.Types.ObjectId(obj.id);
    Website.findById(param, function (error, result) {
        if(error){
            res.send({code: 0, msg: "页面错误", data: error});
            return;
        }
        if(result){
            result.remove();
            res.json({code: 1, msg: "删除成功", data: result});
        }else{
            res.send({ code: 0, msg: "查询出错了", data: null});
        }
    })
});

module.exports = router;