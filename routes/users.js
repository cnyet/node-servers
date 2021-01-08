var express = require('express');
var router = express.Router();
const Mongodb = require('../models/mongodb');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
