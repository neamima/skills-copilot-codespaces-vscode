//create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const port = 3000;

//use body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//get comments from file
app.get('/comments', (req, res) => {
  fs.readFile('./comments.json', 'utf8', (err, data) => {
    if(err) {
      console.log(err);
      res.status(500).send('Internal server error');
    } else {
      res.send(data);
    }
  });
});

//update comments in file
app.post('/comments', (req, res) => {
  let newComment = req.body.comment;
  fs.readFile('./comments.json', 'utf8', (err, data) => {
    if(err) {
      console.log(err);
      res.status(500).send('Internal server error');
    } else {
      let comments = JSON.parse(data);
      comments.push(newComment);
      fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
        if(err) {
          console.log(err);
          res.status(500).send('Internal server error');
        } else {
          res.send('Comment added');
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log('Server started on http://localhost:' + port);
});