export default function getStudentsByLocation(studentList, city) {
  return studentList.filter((object) => object.location === city);
}
