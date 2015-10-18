(function() {
  'use strict';
  var express    = require('express');
  var mysql      = require('mysql');
  var url        = require('url');
  var http       = require('http');
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

  app.get("/insertQuery", function(req, res) {
    var queryData = url.parse(req.url, true).query;
    console.log(queryData);
    connection.query(queryData.query, function(error){ // To specify query do http.get(?query=<Full query goes here>)
    //connection.query('SELECT * FROM Test', function(err, rows, fields) {
      if (error) throw error;
      res.send(true);
      //console.log(rows[0]);
    });
  });

  app.get("/getQuery", function(req, res) {
    var queryData = url.parse(req.url, true).query;
    console.log(queryData);
    connection.query(queryData.query, function(error, rows, fields) {
      if (error) throw error;
      console.log(rows);
      res.send(rows);
    });
  });

  app.get("/deleteQuery", function(req, res) {
    var queryData = url.parse(req.url, true).query;
    console.log(queryData);
    connection.query(queryData.query, function(error, rows, fields){ // To specify query do http.get(?query=<Full query goes here>)
    //connection.query('SELECT * FROM Test', function(err, rows, fields) {
      if (error) throw error;

      res.send(true);
    });
  })


/*
  connection.query("?" 'INSERT INTO Test(UID,Password) VALUES(\'abc\',\'ddd\')', function(err, rows, fields)
  {
  if (err) throw err;

  console.log(rows[1]);
  });
  */

/*
  app.get("/query",function(req,res){
    connection.query('SELECT * from Table', function(err, rows, fields) {
    if (!err)
      console.log('The solution is: ', rows);
    else
      console.log('Error while performing Query.');
    });
  });


  app.post('/query', function (req, res) {
    var queryData = url.parse(req.url, true).query;
    response.writeHead(200, {"Content-Type": "text/plain"});

    connection.query("?", [queryData.query], function(error){ // To specify query do http.get(?query=<Full query goes here>)
      console.log("Error!");
    });
  });
  */

  /* ===== END SQL QUERIES ===== */

  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/app/index.html');
  });

  var port = 8080;
  app.listen(port, function () {
    console.log('Listening on port 8080');
  });

  //connection.end();
})();
