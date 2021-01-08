const MongoClient = require('mongodb').MongoClient;

class Mongodb {
  static url = 'mongodb://localhost:27017/web';
  // 连接数据库
  static connect (callback) {
    MongoClient.connect(this.url, function(err, database) {
      if (err) throw err;
      console.log('数据库已连接');
      const db = database.db('web');
      callback(db, database);
    })
  }
  // 查询数据库
  static query (data, col) {
    return new Promise((resolve, reject) => {
      this.connect((database, db) => {
        database.collection(col).find(data).toArray((err, res) => {
          if (err) {
            reject(err);
            throw err;
          } else {
            resolve({
              code: 1,
              data: res,
              message: 'find successfully.'
            });
          }
          db.close();
        })
      })
    })
  }
  // 新增数据
  static insert (data, col) {
    return new Promise((resolve, reject) => {
      this.connect((database, db) => {
        database.collection(col).insertOne(data, (err, res) => {
          if (err) {
            reject(err);
            throw err;
          } else {
            resolve({
              code: 1,
              data: res.data,
              message: 'create successfully.'
            });
          }
          db.close();
        })
      })
    });
  }
  // 修改数据
  static update (data, col) {
    return new Promise((resolve, reject) => {
      this.connect((database, db) => {
        const query = data.query;  // 查询条件
        const body = {$set: data.body}; // 更新的内容
        database.collection(col).updateOne(query, body, function(err, res) {
          if (err) {
            reject(err);
            throw err;
          } else {
            resolve({
              code: 1,
              data: res.data,
              message: 'update successfully.'
            });
          }
          db.close();
        })
      })
    })
  }
  // 删除数据
  static delete (data, col) {
    return new Promise((resolve, reject) => {
      this.connect((database, db) => {
        database.collection(col).deleteOne(data, function(err, res) {
          if (err) {
            reject(err);
            throw err;
          } else {
            resolve({
              code: 1,
              data: res.data,
              message: 'delete successfully.'
            });
          }
          db.close();
        })
      })
    });
  }
}

module.exports = Mongodb;