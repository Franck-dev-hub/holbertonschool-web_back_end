const http = require('node:http');
const countStudents = require('./3-read_file_async');

const app = http.createServer((request, response) => {
  const file = process.argv[2];
  const { url } = request;

  response.writeHead(200, { 'Content-Type': 'text/plain' });
  if (url === '/') {
    response.end('Hello Holberton School!');
  } else if (url === '/students') {
    countStudents(file)
      .then((data) => response.end(`This is the list of our students\n${data}`))
      .catch((err) => response.end(`This is the list of our students\n${err.message}`));
  }
});

app.listen(1245, 'localhost', () => {
  console.log(`Server running at http://localhost:1245/`);
});

module.exports = app;
