export default function getStudentIdsSum(studentList) {
  return studentList.reduce((accumulator, object) => accumulator + object.id, 0);
}
