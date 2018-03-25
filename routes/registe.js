/**
 * Created by yate on 2017/7/25.
 */
var express = require("express");
var router = express.Router();
var User = require("../models/user");

router.get("/", function (req, res, next) {
    res.render("registe", {title: "注册页面"});
});

router.post("/", function (req, res, next) {
    var name = req.body.user;
    var pwd = req.body.pwd;
    var user = new User({
        userName: name,
        password: pwd,
        age: "20",
        loginDate: new Date()
    });
    console.error(user);
    user.save(function (error, result) {
        if(error){
            res.send({msg: "页面错误", code: 0, data: null});
            return;
        }
        if(result == ""){
            res.send({msg: "注册失败", code: 0, data: null});
        }else{
            console.log(result);
            res.send({code:1, msg:'注册成功', data: null});
        }
    })
});

module.exports = router;