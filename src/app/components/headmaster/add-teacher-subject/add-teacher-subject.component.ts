import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Response } from 'src/app/model/response';
import { Subject } from 'src/app/model/subject';
import { Teacher } from 'src/app/model/teacher';
import { TeacherSubject } from 'src/app/model/teacher-subject';
import { ClassService } from 'src/app/services/class.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TeacherSubjectService } from 'src/app/services/teacher-subject.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-add-teacher-subject',
  templateUrl: './add-teacher-subject.component.html',
  styleUrls: ['./add-teacher-subject.component.css']
})
export class AddTeacherSubjectComponent implements OnInit {

  constructor(private subjectService: SubjectService,private teacherService:TeacherService,
    private teacherSubject:TeacherSubjectService,private classService:ClassService) { }
  subjects: Subject[] = []
  roomNo:number=0
  teacherAssign:TeacherSubject=new TeacherSubject()
  teachers:Teacher[]=[]
  addClass = new FormGroup(
    {
      standard: new FormControl(''),
      section: new FormControl(''),
      code: new FormControl(''),
      staff:new FormControl('')
    }
  )
  getCourse() {
    this.subjectService.getSubject(this.addClass.get('standard')?.value).subscribe(
      response => {
        let responseBody: Response = response
        this.subjects = responseBody.data
        console.log(this.subjects)
        if(this.subjects.length==0)
        window.alert("No subjects are alloted for this class..First add subjects!");
      }, error => { window.alert(error.error.statusText) }
    )
  }

  getStaff()
  {
    this.teacherService.getAllTeacher().subscribe(
      response=>{
        let responseBody:Response=response
        this.teachers=responseBody.data
      }
    )
  }

  getstaffAssign()
  {
    this.classService.getClass(this.addClass.get('standard')?.value,this.addClass.get('section')?.value).subscribe(
      response=>{
        let responseBody:Response=response
        this.roomNo=responseBody.data.roomNo
        console.log(this.roomNo)

        this.teacherSubject.getTeacherId(this.roomNo,this.addClass.get('code')?.value).subscribe(
          response=>{
            console.log("hello")
            let responseBody:Response=response
            this.teacherAssign=responseBody.data
            console.log(this.teacherAssign)
            if(this.teacherAssign!=null)
              window.alert("Staff is already assigned to this subject...")
          },error=>{window.alert(error.error.statusText);}

          )},error=>{window.alert(error.error.statusText);}
        )
        
      }
    
  add() {
   let staff=this.addClass.get('staff')?.value
   let staffId=[]
   for(let i=0;i<2;i++)
        staffId=staff.split("-")

        this.teacherAssign=new TeacherSubject
        console.log(this.roomNo)
      this.teacherSubject.assignStaff(staffId[1],this.addClass.get('code')?.value,this.roomNo,this.teacherAssign).subscribe(
        response=>{
          let responseBody:Response=response
          window.alert(responseBody.statusText)
          this.addClass.reset()
        },error=>{window.alert(error.error.statusText)}
      )
  }

  ngOnInit(): void {
  }

}
