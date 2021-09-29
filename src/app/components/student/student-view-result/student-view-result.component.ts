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
import { ResultService } from 'src/app/services/result.service';
import { ResultModel } from 'src/app/model/result-model';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-student-view-result',
  templateUrl: './student-view-result.component.html',
  styleUrls: ['./student-view-result.component.css']
})
export class StudentViewResultComponent implements OnInit {


  classDetails: Class = new Class;
  subjectDetails: Subject[] = []
  teacherSubjects: TeacherSubject = new TeacherSubject;
  quizDetails: Quiz[] = []
  resultDetails: ResultModel[] =[];  
  quizOne=new Array(6);
  quizTwo=new Array(6);
  quizThree=new Array(6);

  constructor(private classService: ClassService, private subService: SubjectService,
    private teacherSubject: TeacherSubjectService, private quizService: QuizService,
    private router: Router, private questionService:QuestionService,private resultService: ResultService) { }

  getClassDetails = new FormGroup(
    {
      rollNo: new FormControl(''),
      standard: new FormControl(''),
      section: new FormControl(''),
      code: new FormControl(''),
    }
  )

  getCourse() {

    this.classService.getClass(this.getClassDetails.get('standard')?.value, this.getClassDetails.get('section')?.value).subscribe(
      response => {
        let responseBody: Response = response
        this.classDetails = responseBody.data
        console.log(this.classDetails)
      }
    )
    this.subService.getSubject(this.getClassDetails.get('standard')?.value).subscribe(
      response => {
        let responseBody: Response = response
        this.subjectDetails = responseBody.data
        console.log(this.subjectDetails)


        for (var i = 0; i < this.subjectDetails.length; i++) {
          let subjectCode=this.subjectDetails[i].code
          this.teacherSubject.getTeacherSubject(this.classDetails.roomNo, subjectCode).subscribe(
            response => {
              
              let responseBody: Response = response
              this.teacherSubjects = responseBody.data
              console.log(this.teacherSubjects)
              //console.log(this.teacherSubjects.teacherId)

              let teacherId=this.teacherSubjects.teacherId
              this.quizService.getQuiz(teacherId, this.teacherSubjects.code).subscribe(
                response => {
                  let responseBody: Response = response
                  this.quizDetails = responseBody.data
                  console.log(this.quizDetails)


                  this.quizOne.fill(0)
                  this.quizTwo.fill(0)
                  this.quizThree.fill(0)
                  for (i = 0; i < this.quizDetails.length; i++) {
                    let quizId=this.quizDetails[i].autoId
                    this.questionService.getQuestionCount(this.quizDetails[i].autoId).subscribe(
                      response=>{
                        let count=0
                        let responseBody:Response=response
                        count=responseBody.data
                        console.log(count)

                    this.resultService.getResultByRollNo(this.getClassDetails.get('rollNo')?.value, quizId).subscribe(
                      response => {
                        console.log(this.getClassDetails.get('rollNo')?.value)
                        let responseBody: Response = response
                        this.resultDetails = responseBody.data
                       
                        console.log(this.resultDetails)
                        //let score: any = this.resultDetails[i].score
                        console.log(this.resultDetails[0].score)
                        let calculate = Number(this.resultDetails[0].score) * 100
                        console.log(calculate)
                        this.resultDetails[0].score=calculate/count
                        this.quizOne[i]=Number(this.resultDetails[0].score)
                        console.log(this.quizOne[i])
                        
                      }
                    )

                      })

                  }
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
