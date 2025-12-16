export default function updateStudentGradeByCity(studentList, city, newGrades) {
  return studentList
    .filter(studentList => studentList.location === city)
    .map(student => {
      const gradeObj = newGrades.find(grade => grade.studentId === student.id);
      return {...student, grade: gradeObj ? gradeObj.grade : "N/A"};
    })
}
