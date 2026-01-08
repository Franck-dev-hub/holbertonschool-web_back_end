const fs = require('fs');

async export function readDatabase(path) {
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
        return Object.entries(fields).forEach(([field, names]));

        resolve();
      } catch (err) {
        reject(new Error('Cannot load the database'));
      }
    });
  });
}

module.exports = readDatabase;
