import {Injectable} from 'angular2/core';
import {Student} from './student';
import {STUDENTS} from './mock-students';

@Injectable()
export class StudentService {
  getStudents() {
    return Promise.resolve(STUDENTS)
    // return Promise.resolve(STUDENTS).then(
    //   students => students.filter(student => student.roster_id === roster_id)[0]
    // );
  }
}
