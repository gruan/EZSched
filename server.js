(function() {
  'use strict';
  var express    = require('express');
  var mysql      = require('mysql');
  var url        = require('url');
  var app        = express();

  var connection = mysql.createConnection({
    host     : 'ezsched411.web.engr.illinois.edu',
    user     : 'ezsched4_admin',
    password : 'password12345',
    database : 'ezsched4_db'
  });

  app.use(express.static('app'));

  connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
    console.log('connected as id ' + connection.threadId);
  });

  /* ===== SQL QUERIES ===== */

  app.get('/insertQuery', function(req, res) {
    var queryData = url.parse(req.url, true).query;
    console.log(queryData);
    connection.query(queryData.query, function(error){ // To specify query do http.get(?query=<Full query goes here>)
    //connection.query('SELECT * FROM Test', function(err, rows, fields) {
      if (error) { throw error; }
      res.send(true);
      //console.log(rows[0]);
    });
  });

  app.get('/getQuery', function(req, res) {
    var queryData = url.parse(req.url, true).query;
    console.log(queryData);
    connection.query(queryData.query, function(error, rows, fields) {
      if (error) { throw error; }
      res.send(rows);
    });
  });

  app.get('/genericQuery', function(req, res) {
    var queryData = url.parse(req.url, true).query;
    console.log(queryData);
    connection.query(queryData.query, function(error, rows, fields){ // To specify query do http.get(?query=<Full query goes here>)
    //connection.query('SELECT * FROM Test', function(err, rows, fields) {
      if (error) { throw error; }

      res.send(true);
    });
  });

  /* ===== END SQL QUERIES ===== */

  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/app/index.html');
  });

  var port = 14001;
  app.listen(port, function () {
    console.log('Listening on port %d', port);
  });

  //connection.end();
})();
