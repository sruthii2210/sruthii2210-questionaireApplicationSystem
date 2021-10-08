import { Subject } from "./subject";
import { Teacher } from "./teacher";
export class Quiz {
    public code?:string;
    public name?:string;
    public autoId?:number;
    public quizDate?:any;
    public passPercent?:number;
    public subject?:Subject;
    public status?:String;
    public teacher?:Teacher;
}
