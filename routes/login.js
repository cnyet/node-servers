/**
 * Created by yate on 2017/7/19.
 */
var express = require("express");
var router = express.Router();
var connection = require("../config/mysql");

router.get("/", function (req, res, next) {
    console.log(req.session);
    var tips = "还未登录";
    if (req.session.user) {
        tips = "你好"+req.session.user;
    }
    res.render("login", {title: "登录页面", tips: tips});
});
router.post("/into", function (req, res, next) {
    var param = req.body;
    var name = param.user;
    var pwd = param.pwd;
    console.error(param);
    connection.query("SELECT * FROM `user` WHERE `name` = '"+name+"' AND `password` = '"+pwd+"'", function (error, result, fields) {
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
    });
});

module.exports = router;
