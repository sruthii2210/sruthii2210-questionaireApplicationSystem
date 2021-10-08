import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from '../model/quiz';
import { Response } from '../model/response';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  saveQuiz(id:any,subCode:any,quiz:object):Observable<any>
  {
    return this.http.post('http://localhost:8086/api/quiz/'+`${id}`+'/'+`${subCode}`,quiz); 
  }
  getQuiz(id:any,code:any):Observable<any>
  {
    return this.http.get('http://localhost:8086/api/quiz/'+`${id}`+'/'+`${code}`); 
  }
  getQuizBySubCode(subCode:any):Observable<any>
  {
    return this.http.get('http://localhost:8086/api/quiz/'+`${subCode}`); 
  }
  
  getAllQuiz(teacherList:Number[],subjectList:String[]):Observable<any>
  {
    return this.http.get('http://localhost:8086/api/quiz/teacher/'+`${teacherList}`+'/'+`${subjectList}`)
  }
  
  updateQuiz(id:number,quizId:number,code:String,quiz:Quiz):Observable<Response>
  {
    return this.http.put('http://localhost:8086/api/quiz/'+`${id}`+'/'+`${quizId}`+'/'+`${code}`,quiz)
  }

  getQuizByQuizId(quizId:number):Observable<Response>
  {
    return this.http.get('http://localhost:8086/api/quiz/quiz/getQuiz/quizId/'+`${quizId}`);
  }

  getQuizByStaff(id:any,code:any):Observable<any>
  {
    return this.http.get('http://localhost:8086/api/quiz/getQuiz/'+`${id}`+'/'+`${code}`); 
  }
}

