import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl:string='http://localhost:8086/api/'
  constructor(private http:HttpClient) { }

  getLoginDetails(id:any):Observable<any>
  {
    return this.http.get(`${this.baseUrl}`+'login/'+`${id}`); 
  }

  getLoginDetailsByRollNo(id:any):Observable<any>
  {
    return this.http.get(`${this.baseUrl}`+'studentlogin/'+`${id}`); 
  }

  addStaffLogin(id:any,login:any)
  {
    return this.http.post(`${this.baseUrl}`+'login/'+`${id}`,login)
  }

}
