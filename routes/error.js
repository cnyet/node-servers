/**
 * Created by yate on 2017/7/24.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('error', { title: 'Express', message: "密码或用户名错误"});
});

module.exports = router;