import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http:HttpClient) { }

  addAnswer(quesNo:any,answer:object):Observable<object>
  {
    return this.http.post('http://localhost:8086/api/answer/'+`${quesNo}`,answer); 
  }
}
