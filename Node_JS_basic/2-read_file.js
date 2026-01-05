const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf-8');
    const lines = data.split('\n');

    // Remove header to count students
    const fields = {};
    let total = 0;

    for (let i = 1; i < lines.length; i += 1) {
      const line = lines[i].trim();
      const [firstname, , , field] = line.split(',');
      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(firstname);
      total += 1;
    }
    console.log(`Number of students: ${total}`);

    // Log by field
    Object.entries(fields).forEach(([field, names]) => {
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    });
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
