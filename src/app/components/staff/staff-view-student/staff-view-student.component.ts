import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'src/app/model/subject';
import { SubjectService } from 'src/app/services/subject.service';
import { Response } from 'src/app/model/response';
import { TeacherSubjectService } from 'src/app/services/teacher-subject.service';
import { TeacherSubjectModel } from 'src/app/model/teacher-subject-model';
import { StudentService } from 'src/app/services/student.service';
import { ClassService } from 'src/app/services/class.service';
import { Class } from 'src/app/model/class';
import { ThisReceiver } from '@angular/compiler';
import { Student } from 'src/app/model/student';
@Component({
  selector: 'app-staff-view-student',
  templateUrl: './staff-view-student.component.html',
  styleUrls: ['./staff-view-student.component.css']
})
export class StaffViewStudentComponent implements OnInit {

  subjects: Subject[] = []
  standards:string[]=[]
  sections:string[]=[]
  students:Student[]=[]
  

  constructor(private subjectService: SubjectService, private teacherSubject: TeacherSubjectService,
    private classService: ClassService, private studentService: StudentService) { }

  viewStudent = new FormGroup(
    {
      staffId: new FormControl(''),
      code: new FormControl(''),
      standardSection:new FormControl('')
    }
  )
  getCourse() {
    console.log(this.viewStudent.get('staffId')?.value)
    this.subjectService.getCourseById(this.viewStudent.get('staffId')?.value).subscribe(
      response => {
        let responseBody: Response = response;
        this.subjects = responseBody.data
        console.log(this.subjects)
      }
    )
  }
  getDetails() {
    this.teacherSubject.getTeacherSubjectById(this.viewStudent.get('staffId')?.value, this.viewStudent.get('code')?.value).subscribe(
      response => {
        let teacherSubject: TeacherSubjectModel[] = []
        let responseBody: Response = response
        teacherSubject = responseBody.data
        console.log(teacherSubject)

        for (let i = 0; i < teacherSubject.length; i++) {
          this.classService.getClassByRoomNo(teacherSubject[i].roomNo).subscribe(
            response=>{
              let classDetails:Class=new Class
              let responseBody:Response=response
              classDetails=responseBody.data
              this.standards.push(String(classDetails.standard))
              this.sections.push(String(classDetails.section))
            }
          )
        }
      }, error => { window.alert(error.error.statusText) }
    )
  }
  getStudent()
  {
    let standardSection=this.viewStudent.get('standardSection')?.value
    console.log(standardSection)
   let standard=[]
   let roomNo:number=0
   for(let i=0;i<2;i++)
        standard=standardSection.split("-")
   
        console.log(standard)
    this.classService.getClass(standard[0],standard[1]).subscribe(
      response=>{
        let responseBody:Response=response
        roomNo=responseBody.data.roomNo
       
        this.studentService.getStudent(roomNo).subscribe(
          response=>{
            let responseBody:Response=response
            this.students=responseBody.data
            console.log(this.students)
          },error=>{window.alert(error.error.statusText)}
        )
      },error=>{window.alert(error.error.statusText)}
    )
  }
  ngOnInit(): void {
  }

}
