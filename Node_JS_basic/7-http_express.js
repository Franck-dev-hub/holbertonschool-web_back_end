const express = require('express');
const countStudent = require('./3-read_file_async');

const app = express();
const port = 1245;

app.get('/', (req, res) => {
  res.set('Content-type', 'test/plain');
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const file = process.argv[2];

  res.set('Content-type', 'test/plain');
  countStudents(file)
    .then((data) => res.send(`This is the list of our students\n${data}`))
    .then((err) => res.send(`This is the list of our students\n${err.message}`));
});

app.listen(port, () => {
  console.log('Server running on http://localhost:1245/');
});

module.exports = app;
