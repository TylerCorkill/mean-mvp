var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var db = require('./helpers/db');

var viewPath = path.join(__dirname+'/public/views/');
var app = express();

app.use(bodyParser());
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res) {
  // res.render('index');
  res.sendFile(viewPath + 'index.html');
});




app.post('/submit', function(req, res) {
  console.log(req.body);
  res.redirect('/');
  // res.sendFile(viewPath + 'index.html');
});

app.post('/signup', function(req, res) {
  console.log(req.body);
  res.redirect('/');
  // res.sendFile(viewPath + 'index.html');
});

app.post('/login', function(req, res) {
  console.log(req.body);
  res.redirect('/');
  // res.sendFile(viewPath + 'index.html');
});



module.exports = app;