import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Class } from 'src/app/model/class';
import { Student } from 'src/app/model/student';
import { ClassService } from 'src/app/services/class.service';
import { StudentService } from 'src/app/services/student.service';
import { Response } from 'src/app/model/response';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {

  standardList:String[]=['I',"II",'III','IV','V','VI','VII','VIII','IX','X','XI','XII']
  constructor(private classService:ClassService,private studentService:StudentService) { }
  students: Student[] = [];
  roomNo:number=0
  classDetails: Class = new Class;
  getStudent=new FormGroup(
    {
      rollNo:new FormControl(''),
      name:new FormControl(''),
      standard:new FormControl(''),
      section:new FormControl(''),
      dateOfBirth:new FormControl(''),
      gender:new FormControl(''),
      address:new FormControl('')

    }
  )
  getclass()
  {
      this.classService.getClass(this.getStudent.get('standard')?.value,this.getStudent.get('section')?.value).subscribe(
        response=>{
          let responseBody:Response=response
         this.classDetails=responseBody.data
         this.roomNo=Number(this.classDetails.roomNo)
        },error=>{window.alert(error.error.statusText)}
      )
  }

  view()
  {
    this.studentService.getStudent(this.roomNo).subscribe(
      response=>{
        let responseBody:Response=response
        this.students=responseBody.data
      }
    )
  }
  ngOnInit(): void {
  }

}
