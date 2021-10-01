import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Class } from 'src/app/model/class';
import { Response } from 'src/app/model/response';
import { Student } from 'src/app/model/student';
import { ClassService } from 'src/app/services/class.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  constructor(private studentService:StudentService,private classService:ClassService) { }

  student: Student = new Student;
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
  add()
  {
    this.student=new Student();
    this.student.rollNo=this.getStudent.get('rollNo')?.value;
    this.student.name=this.getStudent.get('name')?.value;
    this.student.dateOfBirth=this.getStudent.get('dateOfBirth')?.value;
    this.student.gender=this.getStudent.get('gender')?.value;
    this.student.address=this.getStudent.get('address')?.value;
    this.studentService.addStudent(this.roomNo,this.student).subscribe(
      response=>{
        let responseBody:Response=response
        window.alert(responseBody.statusText)
      },error=>{window.alert(error.error.statusText)}
    )
  }
  ngOnInit(): void {
  }

}
