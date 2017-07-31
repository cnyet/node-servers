/**
 * Created by yate on 2017/7/24.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('error', { title: 'error', msg: "用户权限异常"});
});

module.exports = router;