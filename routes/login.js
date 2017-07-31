/**
 * Created by yate on 2017/7/19.
 */
var express = require("express");
var router = express.Router();
var connection = require("../config/mysql");
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
    var loginUser = new User({
        name: name,
        password: pwd
    });
    console.error(loginUser);
    loginUser.findBy(function (error, result) {
        console.log(result);
        if(error){
            res.send({msg: "页面错误", code: 0, data: null});
            res.end();
            return;
        }
        if(result == ""){
            res.send({msg: "用户不存在", code: 0, data: null});
            res.end();
            return;
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
            res.end();
            return;
        }

    });
    /*connection.query("SELECT * FROM `user` WHERE `name` = '"+name+"' AND `password` = '"+pwd+"'", function (error, result, fields) {
        if(error) {
            console.log("insert error", error.message);
            return;
        }
        if(result == ""){
            res.send({err:0, msg:'失败'});
            res.end();
            return;
        }
        if(result[0].name != name || result[0].password != pwd) {
            res.send({err:0, msg:'失败'});
            res.end();
            return;
        } else {
            //记住密码
            // if(isRem) {
            //     res.cookie('islogin', userName, { maxAge: 60000 });
            // }
            
            console.log(result);
            req.session.user = name;
            res.send({err:1, msg:'成功'});
            res.end();
            return;
        }
    });*/
})

module.exports = router;
