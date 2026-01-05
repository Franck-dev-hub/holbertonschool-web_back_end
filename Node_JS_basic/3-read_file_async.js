const fs = require('fs');

// Read database
function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      // Handle file read errors
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      try {
        // Parse CSV file and organize students by field
        const lines = data.split('\n');
        const fields = {};
        let total = 0;

        for (let i = 1; i < lines.length; i += 1) {
          const line = lines[i].trim();
          if (line.length > 0) {
            const [firstname, , , field] = line.split(',');
            if (!fields[field]) {
              fields[field] = [];
            }
            fields[field].push(firstname);
            total += 1;
          }
        }

        // Log results
        console.log(`Number of students: ${total}`);
        Object.entries(fields).forEach(([field, names]) => {
          console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
        });

        resolve();
      } catch (err) {
        reject(new Error('Cannot load the database'));
      }
    });
  });
}

module.exports = countStudents;
