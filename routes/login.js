/**
 * Created by yate on 2017/7/19.
 */
var express = require("express");
var router = express.Router();
var User = require("../models/user");

router.get("/", function (req, res, next) {
    var tips = "还未登录";
    if (req.session.user) {
        tips = "你好"+req.session.user.name;
    }
    res.render("login", {title: "登录页面", tips: tips});
});

router.post("/", function (req, res, next) {
    var name = req.body.user;
    var pwd = req.body.pwd;
    var param = {userName: name, password: pwd};
    User.find(param, function (error, result) {
        console.error(result);
        if(error){
            res.send({msg: "页面错误", code: 0, data: null});
            return;
        }
        if(result == ""){
            res.send({msg: "用户不存在", code: 0, data: null});
        }else{
            //判断用户密码是否正确
            if(result[0].password == pwd){
                var user = {"name": name};
                //保存用户session信息
                req.session.user = user;
                res.send({msg: "登录成功", code: 1, data: null});
            }else{
                res.send({msg: "密码或用户名错误", code: 0, data: null});
            }
        }

    });
});

module.exports = router;
