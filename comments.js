//Create web server
var express = require('express');
var app = express();

//Create a route for the path /comments
app.get('/comments', function(req, res) {
  res.send('Comments will be here!');
});

//Bind server to port 8080
app.listen(8080, function() {
  console.log('Listening on port 8080...');
});