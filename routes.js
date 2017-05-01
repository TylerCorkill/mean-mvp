var express = require('express');
var path    = require("path");

var viewPath = path.join(__dirname+'/public/views/');
var app = express();

// app.set('view engine', 'pug');
// app.set('views', './views');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  // res.render('index');
  res.sendFile(viewPath + 'index.html');
});

module.exports = app;