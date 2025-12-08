export default function createIteratorObject(report) {
  return {
    *[Symbol.iterator]() {
      for (const employees of Object.values(report.allEmployees)) {
        for (const employee of employees) {
          yield employee;
        }
      }
    },
  };
}
