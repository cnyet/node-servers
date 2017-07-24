/**
 * Created by yate on 2017/7/24.
 */
var mysql = require("mysql");
var mysql_conf = require("../config/mysql");
var DB_NAME = "user";

//创建数据库连接池
var pool = mysql.createPool(mysql_conf);

pool.on("connection", function (connection) {
    console.log("pool on");
    connection.query("set session auto_increment_increment=1")
});

function User(user) {
    this.name = user.name;
    this.password = user.password;
}

//用户信息保存
User.prototype.userSave = function (callback) {
    var user = {
        name: this.name,
        password: this.password
    };
    var INSERT_USER = "INSERT INTO USER (NAME, PASSWORD) VALUES (?, ?)";
    pool.getConnection(function (error, connection) {
        connection.query(INSERT_USER, [user.name, user.password], function (error, result) {
            if(error){
                console.log("INSERT_USER Error: " + error.message);
                return;
            }
            connection.release();
            callback(error, result);
        })
    })
};

//查询用户信息
User.prototype.userInfo = function (callback) {
    var user = {
        name: this.name,
        password: this.password
    };

    var SELECT_LOGIN = "SELECT * FROM user WHERE name = ? AND password = ?";
    pool.getConnection(function (error, connection) {
        connection.query(SELECT_LOGIN, [user.name, user.password], function (error, result) {
            if(error){
                console.log("SELECT_LOGIN Error: " + error.message);
                return;
            }
            connection.release();
            callback(error, result);
        })
    })
};

module.exports = User;