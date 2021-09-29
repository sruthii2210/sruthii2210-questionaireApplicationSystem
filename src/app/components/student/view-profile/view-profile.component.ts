import { Component, OnInit,TemplateRef } from '@angular/core';
import { Class } from 'src/app/model/class';
import { Response } from 'src/app/model/response';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/services/student.service';



@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  student:Student=new Student
  classRoom:Class=new Class
  constructor(private studentService:StudentService) { }

  ngOnInit(): void {
    let rollNo=4001
    this.studentService.getStudentById(rollNo).subscribe(
      response=>{
        let responseBody:Response=response
        this.student=responseBody.data
        console.log(this.student)
      },error=>{window.alert(error.error.statusText)}
    )
  }

update()
  {
    document.getElementById("profile")?.style.display
  }

}
