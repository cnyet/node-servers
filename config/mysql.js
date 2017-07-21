/**
 * Created by yate on 2017/7/20.
 */
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "test"
});
connection.connect();

module.exports = connection;