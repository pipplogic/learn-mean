var express = require('express');

var articles = require('./routers/articles.js');
var sports = require('./routers/sports.js');

var PORT = process.env.PORT || 3000;

var app = express();

app.use(express.static(__dirname + '/public'));

app.use('/articles', articles);
app.use('/sports', sports);

app.listen(PORT);