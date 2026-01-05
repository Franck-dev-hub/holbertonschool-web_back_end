const fs = require("fs");

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, "utf-8")
    const lines = data.split('\n').filter(line => line.trim());

    // Remove header to count students
    const students = lines.slice(1);
    console.log(`Number of students: ${students.length}`);

    // Group field
    const fields = {};
    students.forEach(line => {
      const [firstname, lastname, age, field] = line.split(',');
      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(firstname);
    });

  // Log by field
    Object.entries(fields).forEach(([field, names]) => {
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    });
  } catch {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
