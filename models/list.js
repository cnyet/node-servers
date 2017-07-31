/**
 * Created by yate on 2017/7/25.
 */
var mysql = require("mysql");
var mysql_conf = require("../config/mysql");

//创建数据库连接池
var pool = mysql.createPool(mysql_conf);

pool.on("connection", function (connection) {
    console.log("pool on");
    connection.query("set session auto_increment_increment=1")
});

//list对象
function List(list) {
    this.id = list.id,
    this.name = list.name;
    this.url = list.url;
    this.alexa = list.alexa;
    this.country = list.country;
}

//添加信息
List.prototype.addOrUpdate = function (callback) {
    var list = {
        id: this.id,
        name: this.name,
        url : this.url,
        alexa : this.alexa,
        country : this.country
    };
    var INSERT_LIST = "INSERT INTO WEBSITES (name, url, alexa, country) VALUES (?, ?, ?, ?)";
    var UPDATE_LIST = "UPDATE WEBSITES SET name=?, url=?, alexa=?, country=? WHERE id=?";
    console.error(list);
    if(this.id){
        pool.getConnection(function (error, connection) {
            connection.query(UPDATE_LIST, [list.name, list.url, list.alexa, list.country, list.id], function (err, res) {
                if(err){
                    console.log("UPDATE error:"+err.message);
                    return;
                }
                connection.release();
                callback(err, res);
            })
        })
    }else{
        pool.getConnection(function (error, connection) {
            connection.query(INSERT_LIST, [list.name, list.url, list.alexa, list.country], function (err, res) {
                if(err){
                    console.error("INSERT Error:"+err.message);
                    return;
                }
                connection.release();
                callback(err, res);
            })
        })
    }
};

//根据id删除记录
List.prototype.delete = function (callback) {
    var listId = this.id;
    var DELETE_LIST = "DELETE FROM WEBSITES WHERE id=?";
    pool.getConnection(function (error, connection) {
        connection.query(DELETE_LIST, [listId], function (err, res) {
            if(err){
                console.log("DELETE ERROR:"+err.message);
                return;
            }
            connection.release();
            callback(err, res);
        })
    })
};

//查询所有信息
List.prototype.selectAll = function (callback) {
    var SELECT_ALL = "SELECT * FROM WEBSITES";
    pool.getConnection(function (error, connection) {
        connection.query(SELECT_ALL, function (err, res) {
            if(err){
                console.log("SELECT_ALL ERROR: "+err.message);
                return;
            }
            connection.release();
            callback(err, res);
        })
    })
};

//根据ID查询所有信息
List.prototype.selectBy = function (callback) {
    var listId = this.id;
    console.error(listId);
    var SELECT_BY = "SELECT * FROM WEBSITES WHERE id=?";
    pool.getConnection(function (error, connection) {
        connection.query(SELECT_BY, [listId], function (err, res) {
            if(err){
                console.log("SELECT_BY ERROR: "+err.message);
                return;
            }
            connection.release();
            callback(err, res);
        })
    })
};

module.exports = List;

