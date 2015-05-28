var bodyParser = require('body-parser');
var express = require('express');
var mongojs = require('mongojs');

var PORT = process.env.PORT || 3000;
var dbConnection = process.env.MONGO_DB || 'articles';


var app = express();
var db = mongojs(dbConnection, ['articles']);

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get('/articles', function (req, res) {

  db.articles.find(function (err, docs) {
    res.json(docs);
  });
});

app.get('/articles/:id', function (req, res) {
  var id = req.params.id;
  db.articles.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.post('/articles', function (req, res) {

  db.articles.insert(req.body, function (err, doc) {
    res.json(doc);
  });
});

app.put('/articles/:id', function (req, res) {
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

app.delete('/articles/:id', function (req, res) {
  var id = req.params.id;
  db.articles.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.listen(PORT);