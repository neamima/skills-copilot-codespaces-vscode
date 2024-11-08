//create web server
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/comments', (req, res) => {
  fs.readFile('comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Something went wrong');
      return;
    }
    res.send(data);
  });
});

app.post('/comments', (req, res) => {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    let comments = [];
    try {
      comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
    } catch (err) {
      // ignore error
    }
    comments.push(JSON.parse(body));
    fs.writeFile('comments.json', JSON.stringify(comments), err => {
      if (err) {
        res.status(500).send('Something went wrong');
        return;
      }
      res.send('Comment added');
    });
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});