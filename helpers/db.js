var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'us-cdbr-iron-east-03.cleardb.net',
  user     : 'b1e41edf596b8b',
  password : 'b85f98ad',
  database : 'heroku_71eb42161dc173d'
});







var insertUser = function(id, data) {

  connection.query(`INSERT INTO users (id, username, password) VALUES ('${id}', '${data.username}', '${data.password}')`, function (error, results, fields) {
    if (error) { throw error; }
  });
};

var verify = function(req, res, data) {
  var queryText = `SELECT * FROM users
                   WHERE username = '${data.username}'
                   AND password = '${data.password}'`;
  connection.query(queryText, (error, results, fields) => {
    if (error) { throw error; }
    // console.log(results[0].id);
    if (results.length) {
      req.session.user = results[0];
      res.redirect('home');
    } else {
      res.redirect('login');
    }
  });
};



var submit = function(id, data) {
  connection.query(`INSERT INTO submits
                    (id, title, description, filepath, userID)
                    VALUES
                    ('${id}', "${data.title}", "${data.description}", '${data.filepath}', '${data.userID}')`,
  function (error, results, fields) {
    if (error) { throw error; }
  });
};

var rate = function(id, data) {
  connection.query(`INSERT INTO ratings
                    (id, submitID, userID, rating)
                    VALUES
                    ('${id}', '${data.submitID}', '${data.userID}', '${data.rating}')`,
  function (error, results, fields) {
    if (error) { throw error; }
  });
};





var uniqueID = function (data, table, callback) {
  connection.query(`SELECT COUNT(*) FROM ${table}`, function(error, results, fields) {
    if (error) { throw error; }
    callback(results[0]['COUNT(*)'] + 1, data);
  });
};




var getFromTable = function(callback, table) {
  connection.query(`SELECT * FROM ${table}`, function(error, results, fields) {
    if (error) { throw error; }
    // console.log(results);
    callback(results);
  });
};


var getRatings = function(submitID, res) {
  var queryText = `SELECT rating FROM ratings
                   WHERE submitID = '${submitID}'`;
  connection.query(queryText, (error, results, fields) => {
    if (error) { throw error; }

    if (results.length) {
      var ratings = [];
      for (var obj of results) {
        ratings.push(obj.rating);
      }
      // console.log(ratings);

      var sum = ratings.reduce(function(a, b) {
        // console.log(a);
        return a + b;
      });

      var average = sum / ratings.length;
      // console.log(average);
      res.end(average.toFixed(2));
    } else {
      res.end('NA');
    }
  });
};





// ---------------------- exported functions ----------------------


exports.newUser = function(data) {
  uniqueID(data, 'users', insertUser);
};

exports.verifyUser = function(req, res, data) {
  verify(req, res, data);
};

exports.submit = function(data) {
  uniqueID(data, 'submits', submit);
};

exports.rate = function(data) {
  uniqueID(data, 'ratings', rate);
};

exports.getSubmits = function(callback) {
  // console.log('asdf');
  getFromTable(callback, 'submits');
};

exports.getRatings = function(id, res) {
  // console.log('asdf');
  getRatings(id, res);
};


