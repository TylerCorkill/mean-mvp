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
  // res.render('index');
  res.sendFile(viewPath + 'index.html');
});

app.get('/signup', function(req, res) {
  // res.render('index');
  res.sendFile(viewPath + 'index.html');
});


app.get('/ratings', function(req, res) {
  db.getRatings(function(results) {
    // this.ratings = results;

    // console.log(results);
    res.end(JSON.stringify(results));

    // $window.location.reload();
  });
});



app.post('/submit', function(req, res) {
  // console.log(req.body);
  req.body.userID = req.session.user.id;
  console.log(req.body);
  db.submit(req.body);
  res.redirect('/');
  // res.sendFile(viewPath + 'index.html');
});

app.post('/signup', function(req, res) {
  // console.log(req.body);
  db.newUser(req.body);
  res.redirect('/');
  // res.sendFile(viewPath + 'index.html');
});

app.post('/login', function(req, res) {
  // console.log(req.body);
  db.verifyUser(req, res, req.body);
  // res.redirect('/');
  // res.sendFile(viewPath + 'index.html');
});


app.get('/*', function(req, res) {
  // res.render('index');
  res.redirect('/home');
  // res.sendFile(viewPath + 'index.html');
});



module.exports = app;