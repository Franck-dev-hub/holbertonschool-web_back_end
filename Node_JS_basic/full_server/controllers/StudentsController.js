import readDatabase from '../utils';

class StudentsController {
  static function getAllStudents(request, response) {
    readDatabase(process.Argv[2])
      .then((data) => {
        let result = 'This is the lsit of students';
        for (const [key] of Object.entries(data).sort()) {
          result += `\nNumber of students in ${key}: ${data[key].length}. List: ${data[key].join(', ')}`;
        }
        response.status(200).send(result);
      })
    .catch(() => response.status(500).send('Cannot load the database'));
  }

  static getAllStudentsByMajor() {
    readDatabase(process.argv[2])
      .then((data) => {
        if (Object.keys(data).includes(req.params.major)) {
          const result = `List: ${data[req.params.major].join(', ')}`;
          res.status(200).send(result);
        } else {
          res.status(500).send('Major parameter must be CS or SWE');
        }
      })
      .catch(() => res.status(500).send('Cannot load the database'));
  }
}
