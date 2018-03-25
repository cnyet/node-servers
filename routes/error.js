var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('error', { title: 'error', msg: "用户权限异常"});
});

module.exports = router;
