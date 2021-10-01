import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }

  getStudent(roomNo:any): Observable<any>
  {
    return this.http.get('http://localhost:8086/api/student/room/'+`${roomNo}`); 
  }
  getStudentById(rollNo:any):Observable<any>
  {
    return this.http.get('http://localhost:8086/api/student/'+`${rollNo}`);
  }
  updateStudent(roomNo:any,rollNo:any,student:any):Observable<any>
  {
    return this.http.put('http://localhost:8086/api/student/'+`${roomNo}`+'/'+`${rollNo}`,student);
  }
  addStudent(roomNo:any,student:any):Observable<any>
  {
    return this.http.post('http://localhost:8086/api/student/'+`${roomNo}`,student);
  }

}
