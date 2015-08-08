var express = require('express');

var bodyParser = require('body-parser');
var mongojs = require('mongojs');

var dbConnection = process.env.MONGO_DB || 'articles';
var db = mongojs(dbConnection, ['articles']);

var router = express.Router();

router.use(bodyParser.json());

router.get('/', function (req, res) {

  db.articles.find(function (err, docs) {
    res.json(docs);
  });
});

router.get('/:id', function (req, res) {
  var id = req.params.id;
  db.articles.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

router.post('/', function (req, res) {

  db.articles.insert(req.body, function (err, doc) {
    res.json(doc);
  });
});

router.put('/:id', function (req, res) {
  var id = req.params.id;
  db.articles.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {
      $set: {
        name: req.body.name,
        link: req.body.link
      }
    },
    new: true
  }, function (err, doc) {
    res.json(doc);
  });
});

router.delete('/:id', function (req, res) {
  var id = req.params.id;
  db.articles.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

module.exports = router;