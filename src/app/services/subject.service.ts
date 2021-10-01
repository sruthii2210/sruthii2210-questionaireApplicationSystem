import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http:HttpClient) { }

  getCourseById(id:any): Observable<any>
  {
    return this.http.get('http://localhost:8086/api/teacherSubject/teacher/'+`${id}`); 
  }
  getSubject(standard:any): Observable<any>
  {
    return this.http.get('http://localhost:8086/api/subject/'+`${standard}`); 
  }
  addSubject(standard:any,subject:any):Observable<any>
  {
    return this.http.post('http://localhost:8086/api/subject/'+`${standard}`,subject);
  }
}
