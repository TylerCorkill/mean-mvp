var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var db = require('./helpers/db');
var session = require('express-session');

var viewPath = path.join(__dirname+'/public/views/');
var app = express();

app.use(bodyParser());
app.use(express.static(__dirname + '/public'));

app.use(session({
  secret: 'the secret potato',
  resave: false,
  saveUninitialized: true,
  cookie: {
    loggedIn: false
  }
}));


var auth = function(req, res) {
  if (req.session.user) {
    res.sendFile(viewPath + 'index.html');
  } else {
    res.redirect('login');
  }
};


app.get('/home', auth);
app.get('/submit', auth);

app.get('/login', function(req, res) {
  res.sendFile(viewPath + 'index.html');
});

app.get('/signup', function(req, res) {
  res.sendFile(viewPath + 'index.html');
});


app.get('/submissions', function(req, res) {
  db.getSubmits(function(results) {
    res.end(JSON.stringify(results));
  });
});

app.post('/average', function(req, res) {
  db.getRatings(req.body.id, res);
});



app.post('/rating', function(req, res) {
  req.body.userID = req.session.user.id;
  db.rate(req.body);
  res.redirect('/');
});


app.post('/submit', function(req, res) {
  req.body.userID = req.session.user.id;
  console.log(req.body);
  db.submit(req.body);
  res.redirect('/');
});

app.post('/signup', function(req, res) {
  db.newUser(req.body);
  res.redirect('/');
});

app.post('/login', function(req, res) {
  db.verifyUser(req, res, req.body);
});


app.get('/*', function(req, res) {
  res.redirect('/home');
});



module.exports = app;