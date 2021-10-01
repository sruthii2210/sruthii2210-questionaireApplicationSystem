import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  baseUrl: string='http://localhost:8086/api/teacher';
  constructor(private http:HttpClient) { }
  
  addTeacher(teacher:any):Observable<any>
  {
    return this.http.post(`${this.baseUrl}`,teacher);
  }
  getAllTeacher():Observable<any>
  {
    return this.http.get(`${this.baseUrl}`);
  }
  getTeacher(id:any):Observable<any>
  {
    return this.http.get(`${this.baseUrl}`+'/'+`${id}`)
  }
}
