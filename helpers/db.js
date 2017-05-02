var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'ratings'
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
  connection.query(`INSERT INTO ratings
                    (id, title, description, userID)
                    VALUES
                    ('${id}', '${data.title}', '${data.description}', '${data.userID}')`,
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






// ---------------------- exported functions ----------------------


exports.newUser = function(data) {
  uniqueID(data, 'users', insertUser);
};

exports.verifyUser = function(req, res, data) {
  verify(req, res, data);
};

exports.submit = function(data) {
  uniqueID(data, 'ratings', submit);
};

exports.getRatings = function(callback) {
  // console.log('asdf');
  getFromTable(callback, 'ratings');
};
