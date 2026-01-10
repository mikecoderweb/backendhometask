export const mikecoderStudents = [
  { id: 1, name: 'Ali', age: 15 },
  { id: 2, name: 'Laylo', age: 14 }
]

let mikecoderIdCounter = 3

export function mikecoderAddStudent(name, age) {
  const newStudent = {
    id: mikecoderIdCounter++,
    name,
    age
  }

  mikecoderStudents.push(newStudent)
  return newStudent
}

export function mikecoderStudentsCount() {
  return mikecoderStudents.length
}
