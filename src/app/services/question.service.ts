import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  addQuestion(id:any,question:object):Observable<object>
  {
    return this.http.post('http://localhost:8086/api/question/'+`${id}`,question); 
  }

  getQuestion(id:any):Observable<any>
  {
    return this.http.get('http://localhost:8086/api/question/'+`${id}`); 
  }
}
