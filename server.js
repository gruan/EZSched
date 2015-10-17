(function() {
  'use strict';
  var express = require('express');
  var app = express();
  var fs = require('fs');

  app.use(express.static('app'));

  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/app/index.html');
  });

/*
  app.get('/resume', function(req, res) {
    var tempFile = __dirname + '/public/resume.pdf';
    fs.readFile(tempFile, function(err, data) {
      res.set('Content-Type', 'application/pdf');
      res.send(data);
    });
  });
  */

  var port = 8080;
  app.listen(port, function () {
    console.log('Listening on port 8080');
  });
})();
