import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http:HttpClient) { }

  publishResult(rollNo:any,subjectCode:any,quizId:any,result:any):Observable<any>
  {
    return this.http.post('http://localhost:8086/api/result/'+`${rollNo}`+'/'+`${subjectCode}`+'/'+`${quizId}`,result); 
  }

  getResult(quizId:any):Observable<any>
  {
    return this.http.get('http://localhost:8086/api/result/'+`${quizId}`); 
  }

  getResultByRollNo(rollNo:any,quizId:any):Observable<any>
  {
    return this.http.get('http://localhost:8086/api/result/'+`${rollNo}`+'/'+`${quizId}`); 
  }
}
