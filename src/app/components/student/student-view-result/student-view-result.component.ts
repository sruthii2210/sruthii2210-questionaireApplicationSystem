import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Class } from 'src/app/model/class';
import { ClassService } from 'src/app/services/class.service';
import { QuizService } from 'src/app/services/quiz.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TeacherSubjectService } from 'src/app/services/teacher-subject.service';
import { Response } from 'src/app/model/response';
import { Subject } from 'src/app/model/subject';
import { TeacherSubject } from 'src/app/model/teacher-subject';
import { Quiz } from 'src/app/model/quiz';

@Component({
  selector: 'app-student-view-result',
  templateUrl: './student-view-result.component.html',
  styleUrls: ['./student-view-result.component.css']
})
export class StudentViewResultComponent implements OnInit {


  classDetails: Class = new Class;
  subjectDetails: Subject[] =[]
  teacherSubjects: TeacherSubject = new TeacherSubject;
  quizDetails:Quiz[]=[]
  
  constructor(private classService: ClassService, private subService: SubjectService, 
    private teacherSubject: TeacherSubjectService, private quizService: QuizService,
    private router:Router) { }

  getClassDetails = new FormGroup(
    {
      rollNo: new FormControl(''),
      standard: new FormControl(''),
      section:new FormControl(''),
      code:new FormControl(''),
    }
  )

  getCourse() {
   
    this.classService.getClass(this.getClassDetails.get('standard')?.value,this.getClassDetails.get('section')?.value).subscribe(
      response=>{
        let responseBody:Response=response
        this.classDetails=responseBody.data
        console.log(this.classDetails)
      }
    )
    this.subService.getSubject(this.getClassDetails.get('standard')?.value).subscribe(
      response => {
        let responseBody:Response=response
        this.subjectDetails = responseBody.data
        console.log(this.subjectDetails)


        for(var i=0;i<this.subjectDetails.length;i++)
    {
    this.teacherSubject.getTeacherSubject(this.classDetails.roomNo, this.subjectDetails[i].code).subscribe(
      response => {
        let responseBody:Response=response
        this.teacherSubjects = responseBody.data
        console.log(this.teacherSubjects)

        this.quizService.getQuiz(this.teacherSubjects.teacherId, this.subjectDetails[i].code).subscribe(
          response => {
            let responseBody:Response=response
            this.quizDetails = responseBody.data
            //this.quizLength = this.quizDetails.length
            console.log(this.quizDetails)
          }
        )

      }
    )
    }
      }
    )

    
  }



  ngOnInit(): void {
  }

}
