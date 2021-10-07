import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Response } from 'src/app/model/response';
import { Teacher } from 'src/app/model/teacher';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-staff-sign-up',
  templateUrl: './staff-sign-up.component.html',
  styleUrls: ['./staff-sign-up.component.css']
})
export class StaffSignUpComponent implements OnInit {

  constructor(private teacherService:TeacherService) { }

  teacher: Teacher = new Teacher;
  addStaff=new FormGroup(
    {
      id:new FormControl(''),
      firstName:new FormControl(''),
      lastName:new FormControl(''),
      dateOfBirth:new FormControl(''),
      gender:new FormControl(''),
      qualification:new FormControl(''),
      email:new FormControl(''),
      contactNo:new FormControl(''),
      address:new FormControl('')
    }
  )

  add()
  {
    this.teacher=new Teacher()
    this.teacher.id=this.addStaff.get('id')?.value;
    this.teacher.firstName=this.addStaff.get('firstName')?.value;
    this.teacher.lastName=this.addStaff.get('lastName')?.value;
    this.teacher.dateOfBirth=this.addStaff.get('dateOfBirth')?.value;
    this.teacher.gender=this.addStaff.get('gender')?.value;
    this.teacher.qualification=this.addStaff.get('qualification')?.value;
    this.teacher.email=this.addStaff.get('email')?.value;
    this.teacher.contactNo=this.addStaff.get('contactNo')?.value;
    this.teacher.address=this.addStaff.get('address')?.value
    this.teacherService.addTeacher(this.teacher).subscribe(
      response=>{
        let responseBody:Response=response
        window.alert(responseBody.statusText)
        //this.addStaff.reset()
      },error=>{window.alert(error.error.statusText)}
    )
  }
  ngOnInit(): void {
  }

}
