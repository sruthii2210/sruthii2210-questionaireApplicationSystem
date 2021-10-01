import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StaffLogin } from 'src/app/model/staff-login';
import { LoginService } from 'src/app/services/login.service';
import { Response } from 'src/app/model/response';
import { Router } from '@angular/router';
@Component({
  selector: 'app-staff-login',
  templateUrl: './staff-login.component.html',
  styleUrls: ['./staff-login.component.css']
})
export class StaffLoginComponent implements OnInit {

  constructor(private loginService: LoginService,private router:Router) { }

  loginDetails: StaffLogin = new StaffLogin;
  loginForm = new FormGroup(
    {
      loginId: new FormControl(''),
      password: new FormControl('')
    }
  )
  getlogin() {
    this.loginService.getLoginDetails(this.loginForm.get('loginId')?.value).subscribe(
      response => {
        let responseBody: Response = response
        this.loginDetails = responseBody.data
        console.log(this.loginDetails)
        if(this.loginDetails.password==this.loginForm.get('password')?.value)
        {
          window.alert("Logged in successfully...")
          this.router.navigate(['staffdashboard'])
        }
        else
        {
          window.alert("Enter valid Id and password..")
          window.location.reload()
        }
      },error=>{window.alert(error.error.statusText)}
    )
  }
  ngOnInit(): void {
  }

}
