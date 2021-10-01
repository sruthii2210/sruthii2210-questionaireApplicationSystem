import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http:HttpClient) { }

  baseUrl: string='http://localhost:8086/api/class';
  
  getClass(standard:any,section:any):Observable<any>
  {
    return this.http.get(`${this.baseUrl}`+'/'+`${standard}`+'/'+`${section}`); 
  }
  getClassByRoomNo(roomNo:any):Observable<any>
  {
    return this.http.get(`${this.baseUrl}`+'/'+`${roomNo}`); 
  }
  addClass(classDetails:any):Observable<any>
  {
    return this.http.post(`${this.baseUrl}`,classDetails); 
  }
}
