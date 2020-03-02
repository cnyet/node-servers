var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/test';
var utils = require('../utils');

function connect(callback) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var database = db.db('test');
    callback(database, db);
  })
}

exports.query = function(data, table) {
  return new Promise((resolve, reject) => {
    connect(function(database, db) {
      database.collection(table).find(data).toArray((err, res) => {
        if (err) {
          throw err;
        } else {
          db.close();
          resolve(utils.handleSuccess(res));
        }
      })
    });
  });
};

exports.insert = function(data, table) {
  return new Promise((resolve, reject) => {
    connect(function(database, db) {
      database.collection(table).insertOne(function(err, res) {
        if (err) {
          throw err;
        } else {
          db.close();
          resolve(utils.handleSuccess(res));
        }
      })
    })
  })
}