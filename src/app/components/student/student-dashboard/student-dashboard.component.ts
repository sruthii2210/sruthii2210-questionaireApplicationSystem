import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/services/student.service';
import { Response } from 'src/app/model/response';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  constructor(private studentService:StudentService,private router:Router) { }
student:Student=new Student

  opened=false
  toggle()
  {
    this.opened=!this.opened
  }
  logout()
  {
    let response=window.confirm("Are you sure need to logout..")
    if(response)
    this.router.navigate(['home'])
  }
  ngOnInit(): void {
    let loginId=localStorage.getItem("loginId")
    this.studentService.getStudentById(loginId).subscribe(
      response=>{
        let responseBody:Response=response
        this.student=responseBody.data
      }
    )
  }

}
