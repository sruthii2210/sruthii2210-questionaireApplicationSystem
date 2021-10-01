import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StaffLogin } from 'src/app/model/staff-login';
import { LoginService } from 'src/app/services/login.service';
import { Response } from 'src/app/model/response';
import { TeacherService } from 'src/app/services/teacher.service';
import { Teacher } from 'src/app/model/teacher';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-login-credentials',
  templateUrl: './staff-login-credentials.component.html',
  styleUrls: ['./staff-login-credentials.component.css']
})
export class StaffLoginCredentialsComponent implements OnInit {

  constructor(private loginService:LoginService,private teacherService:TeacherService,private router:Router) { }

  teacher: Teacher = new Teacher;
  staffLogin:StaffLogin=new StaffLogin
  staffLoginForm=new FormGroup(
    {
      loginId:new FormControl(''),
      password:new FormControl(''),
      confirmPassword:new FormControl('')
    }
  )

  checkId()
  {
      this.teacherService.getTeacher(this.staffLoginForm.get('loginId')?.value).subscribe(
        response=>{
          let responseBody:Response=response
          this.teacher=responseBody.data
        },error=>{window.alert(error.error.statusText)}
      )
  }
  login()
  {
      if(this.staffLoginForm.get('password')?.value==this.staffLoginForm.get('confirmPassword')?.value)
      {
        this.staffLogin=new StaffLogin()
        this.staffLogin.password=this.staffLoginForm.get('password')?.value
        this.loginService.addStaffLogin(this.staffLoginForm.get('loginId')?.value,this.staffLogin).subscribe(
          response=>{
            let responseBody:Response=response
            window.alert(responseBody.statusText)
            this.router.navigate(['stafflogin'])
          }
        )
      }
      else
      window.alert("Password and ConfirmPassword must be same..")
  }
  ngOnInit(): void {
  }

}
