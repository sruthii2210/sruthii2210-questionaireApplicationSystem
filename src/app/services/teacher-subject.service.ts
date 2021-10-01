import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherSubjectService {

  constructor(private http:HttpClient) { }

  baseUrl: string='http://localhost:8086/api/teacherSubject/';

  getTeacherSubject(roomNo:any,standard:any):Observable<any>
  {
      return this.http.get(`${this.baseUrl}`+`${roomNo}`+'/'+`${standard}`);
  }

  getTeacherId(roomNo:any,code:any):Observable<any>
  {
      return this.http.get(`${this.baseUrl}`+`${roomNo}`+'/'+`${code}`);
  }
  assignStaff(id:any,code:any,roomNo:any,staff:any):Observable<any>
  {
    return this.http.post(`${this.baseUrl}`+'teacher/'+`${id}`+'/subject/'+`${code}`+'/'+`${roomNo}`,staff);
  }
  getTeacherSubjectById(id:any,code:any):Observable<any>
  {
    return this.http.get(`${this.baseUrl}`+'staff/'+`${id}`+'/'+`${code}`)
  }
}
