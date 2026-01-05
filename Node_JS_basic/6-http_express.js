const express = require('express');

const app = express();
const port = 1245;

// Basic route to test the server
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
