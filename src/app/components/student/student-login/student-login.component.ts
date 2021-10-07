import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { StaffLogin } from 'src/app/model/staff-login';
import { LoginService } from 'src/app/services/login.service';
import { Response } from 'src/app/model/response';
import { StudentLogin } from 'src/app/model/student-login';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {

  constructor(private loginService: LoginService,private router:Router) { }

  loginDetails: StudentLogin = new StudentLogin;
  loginForm = new FormGroup(
    {
      loginId: new FormControl(''),
      password: new FormControl('')
    }
  )
  getlogin() {
    this.loginService.getLoginDetailsByRollNo(this.loginForm.get('loginId')?.value).subscribe(
      response => {
        let responseBody: Response = response
        this.loginDetails = responseBody.data
        console.log(this.loginDetails)
        localStorage.setItem("loginId",this.loginForm.get('loginId')?.value)
        if(this.loginDetails.password==this.loginForm.get('password')?.value)
        {
          window.alert("Logged in successfully...")
          this.router.navigate(['studentdashboard/studenthome'])
        }
        else
        {
          window.alert("Enter valid Id and password..")
          this.loginForm.reset()
        }
      },error=>{window.alert(error.error.statusText)}
    )
  }
  register()
  {
    this.router.navigate(['studentlogincredentials'])
  }
  ngOnInit(): void {
  }

}
