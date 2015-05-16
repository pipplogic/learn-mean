var bodyParser = require('body-parser');
var express = require('express');
var mongojs = require('mongojs');

var PORT = process.env.PORT || 3000;

var app = express();
var db = mongojs('articles', ['articles']);

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get('/articles', function (req, res) {

  db.articles.find(function (err, docs) {
    res.json(docs);
  });
});

app.post('/articles', function (req, res) {
  var article = req.body;
  delete article._id;
  db.articles.insert(req.body, function (err, doc) {
    res.json(doc);
  });
});

app.delete('/articles/:id', function (req, res) {
  var id = req.params.id;
  db.articles.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/articles/:id', function (req, res) {
  var id = req.params.id;
  db.articles.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
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
        link: req.body.link,
        date: req.body.date
      }
    },
    new: true
  }, function (err, doc) {
    res.json(doc);
  });
});

app.listen(PORT);