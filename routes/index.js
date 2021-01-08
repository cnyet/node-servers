var express = require('express');
var router = express.Router();
const Mongodb = require('../models/mongodb');

// 查询数据
router.get('/', function(req, res) {
  Mongodb.query({}, 'article').then((data) => {
    res.render('index', { title: 'Express', list: data });
  });
});

// 新增数据
router.post('/add', function(req, res) {
  const params = {
    id: req.body.id,
    name: req.body.name,
    remark: req.body.remark
  };
  Mongodb.insert(params, 'article').then(data => {
    res.send(data);
  });
});

// 修改数据
router.post('/update', function(req, res) {
  const params = {
    query: {
      id: req.body.status
    },
    body: {
      name: req.body.name,
      remark: req.body.remark
    }
  };
  Mongodb.update(params, 'article').then(data => {
    res.send(data);
  });
});

// 删除数据
router.delete('/delete', function(req, res) {
  Mongodb.delete(req.body, 'article').then(data => {
    res.send(data);
  });
});

module.exports = router;
