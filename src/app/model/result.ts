import { Quiz } from "./quiz";
import { Student } from "./student";
import { Subject } from "./subject";
export class Result {
    public autoId?:number;
    public student?:Student;
    public subject?:Subject;
    public quiz?:Quiz;
    public score:number|any;
}
