import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Class } from 'src/app/model/class';
import { Response } from 'src/app/model/response';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/services/student.service';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  student: Student = new Student;
  classRoom: Class = new Class;
  rollNo:number=0
  constructor(private studentService:StudentService,private router:Router,public dialogRef:MatDialogRef<UpdateProfileComponent>) { }

  ngOnInit(): void {

   this.rollNo=Number(localStorage.getItem("studentId"))

    this.studentService.getStudentById(this.rollNo).subscribe(
      response=>{
        let responseBody:Response=response
        this.student=responseBody.data
        console.log(this.student)
      },error=>{window.alert(error.error.statusText)}
    )
  }

  onSubmit()
  {
    this.studentService.updateStudent(this.student.classRoom?.roomNo,this.student.rollNo,this.student).subscribe(
      response=>{
        let responseBody:Response=response
        console.log(responseBody.data)
        window.alert(responseBody.statusText)
        this.dialogRef.close();
        location.reload();
       
      },error=>{window.alert(error.error.statusText)}
    )
  }
  // Cancel()
  // {
  //   this.dialogRef.close();
  //   this.router.navigate(['viewprofile'])
  // }

}
