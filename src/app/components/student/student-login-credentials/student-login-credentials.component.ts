import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { StaffLogin } from 'src/app/model/staff-login';
import { LoginService } from 'src/app/services/login.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { Response } from 'src/app/model/response';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/model/student';
import { StudentLogin } from 'src/app/model/student-login';

@Component({
  selector: 'app-student-login-credentials',
  templateUrl: './student-login-credentials.component.html',
  styleUrls: ['./student-login-credentials.component.css']
})
export class StudentLoginCredentialsComponent implements OnInit {

  
  constructor(private loginService:LoginService,private studentService:StudentService,private router:Router) { }
  studentLoginForm=new FormGroup(
    {
      rollNo:new FormControl(''),
      password:new FormControl(''),
      confirmPassword:new FormControl('')
    }
  )

  checkId()
  {
      this.studentService.getStudentById(this.studentLoginForm.get('rollNo')?.value).subscribe(
        response=>{
          let responseBody:Response=response
          let student:Student=new Student
          student=responseBody.data
          console.log(student)
        },error=>{window.alert(error.error.statusText)}
      )
  }
  login()
  {
    if(this.studentLoginForm.get('password')?.value==this.studentLoginForm.get('confirmPassword')?.value)
    {
      let studentLogin=new StudentLogin()
      studentLogin.password=this.studentLoginForm.get('password')?.value
      
      this.loginService.addStudentLogin(this.studentLoginForm.get('rollNo')?.value,studentLogin).subscribe(
        response=>{
          
          let responseBody:Response=response
        
          window.alert(responseBody.statusText)
          this.router.navigate(['studentlogin'])
        }
      )
    }
    else
    window.alert("Password and ConfirmPassword must be same..")
  }

  ngOnInit(): void {
  }

}
