const http = require('node:http');
const countStudents = require('./3-read_file_async');

const port = 1245;

const app = http.createServer((request, response) => {
  const file = process.argv[2];

  response.writeHead(200, { 'Content-type': 'text/plain' });
  if (request.url === '/') {
    response.end('Hello Holberton School!');
  } else if (response.url === '/students') {
    countStudents(file)
      .then((data) => response.end(`This is the list of our students\n${data}`))
      .catch((err) => response.end(`This is the list of our students\n${err.message}`));
  }
});

app.listen(port, 'localhost', () => {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;
