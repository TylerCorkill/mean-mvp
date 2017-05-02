var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'ratings'
});


var viewPath = path.join(__dirname+'/public/views/');
var app = express();

// app.set('view engine', 'pug');
// app.set('views', './views');
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res) {
  // res.render('index');
  res.sendFile(viewPath + 'index.html');
});




app.post('/submit', function(req, res) {
  console.log(req.body);
  res.sendFile(viewPath + 'index.html');
});

app.post('/signup', function(req, res) {
  console.log(req.body);
  res.sendFile(viewPath + 'index.html');
});

app.post('/login', function(req, res) {
  console.log(req.body);
  res.sendFile(viewPath + 'index.html');
});



module.exports = app;