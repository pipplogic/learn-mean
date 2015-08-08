var express = require('express');
var http = require('http');

var router = express.Router();

router.get('/', function (req, res) {
  http.get('http://sports.yahoo.com', function (resp) {
    var body = '';
    resp.setEncoding('utf8');

    resp.on('data', function (chunk) {
      body += chunk;
    });

    resp.on('end', function () {
      res.send(body);
    })

  });
});

module.exports = router;