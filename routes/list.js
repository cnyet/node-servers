var express = require('express');
var router = express.Router();
var connection = require("../config/mysql");

/* GET users listing. */
router.get('/', function(req, res, next) {
  var data;
  connection.query("select * from websites", function (error, result, fields) {
    if(error) {
      console.log("select error", error.message);
      return;
    }
    console.log(JSON.parse(JSON.stringify(result)));
    data = JSON.parse(JSON.stringify(result));
    res.render("list", {data: data});
  });
  //connection.end();
});

module.exports = router;
