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
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/model/student';
import { Result } from 'src/app/model/result';


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
  student: Student = new Student;
  resultDetails: Result[] = [];
  quizOne = new Array(6);
  quizTwo = new Array(6);
  quizThree = new Array(6);
  subjectCodes: String[] = []
  teacherIds: number[] = []
  quizNames:String[]=[]
 loginId=localStorage.getItem("loginId")

  constructor(private classService: ClassService, private subService: SubjectService,
    private teacherSubject: TeacherSubjectService, private quizService: QuizService,
    private router: Router, private studentService: StudentService, private questionService: QuestionService, private resultService: ResultService) { }

  getClassDetails = new FormGroup(
    {
      rollNo: new FormControl(''),
      standard: new FormControl(''),
      section: new FormControl(''),
      code: new FormControl(''),
    }
  )

  getStudent() {
    this.studentService.getStudentById(localStorage.getItem("loginId")).subscribe(
      response => {

        let responseBody: Response = response
        this.student = responseBody.data
        console.log(this.student)

      }, error => {
        window.alert(error.error.statusText)
      }
    )
  }
  getCourse() {

    
    this.classService.getClass(this.student.classRoom?.standard, this.student.classRoom?.section).subscribe(
      response => {
        let responseBody: Response = response
        this.classDetails = responseBody.data
        console.log(this.classDetails)

        // this.quizOne.fill(0)
        // this.quizTwo.fill(0)
        // this.quizThree.fill(0)
        

        this.subService.getSubject(this.student.classRoom?.standard).subscribe(
          response => {
            let responseBody: Response = response
            this.subjectDetails = responseBody.data
            console.log(this.subjectDetails)
            for (let i in this.subjectDetails)
              this.subjectCodes.push(String(this.subjectDetails[i].code))
            console.log(this.subjectCodes)


            for (let i = 0; i < this.subjectCodes.length; i++) {
              this.quizOne[i]=0
              this.quizTwo[i]=0
              this.quizThree[i]=0
             // this.teacherIds=[i]
              let quizIds: number[] = []
              //quizIds=[]
              this.teacherSubject.getTeacherId(this.student.classRoom?.roomNo, this.subjectCodes[i]).subscribe(
                response => {
                  let responseBody: Response = response
                  this.teacherSubjects = responseBody.data

                  if (this.teacherSubjects != null)
                    this.teacherIds.push(Number(this.teacherSubjects.teacherId))
                  else
                    this.teacherIds.push(0)

                  console.log(this.teacherIds)
                  // console.log(i)
                  this.quizService.getQuiz(this.teacherIds[i], this.subjectCodes[i]).subscribe(
                    response => {
                      let responseBody: Response = response
                      this.quizDetails = responseBody.data
                     
                      console.log(i)
                      console.log(this.teacherIds[i])
                      for (let i in this.quizDetails) {
                       // this.teacherIds.slice(Number(i),Number(i+1))
                       //this.teacherIds[i]=0
                       this.quizNames.push(String(this.quizDetails[i].name))
                        quizIds.push(Number(this.quizDetails[i].autoId))
                        //console.log(this.quizDetails[i].autoId)
                      }
                      console.log(quizIds)

                      for (let j = 0; j < quizIds.length; j++) {
                        let index=0;
                        index++;
                        //console.log(quizIds)

                        this.questionService.getQuestionCount(quizIds[j]).subscribe(
                          response => {
                            let count = 0
                            let responseBody: Response = response
                            count = responseBody.data
                            console.log(count)
                            console.log(quizIds[j])
                            
                            this.resultService.getResultByRollNo(localStorage.getItem("loginId"), quizIds[j])
                              .subscribe(response => {
                                console.log(quizIds[j])
                                let responseBody: Response = response
                                this.resultDetails = responseBody.data
                                console.log(this.resultDetails)
                                if (this.resultDetails.length>0) {
                                  let score: number = Number(this.resultDetails[0].score)
                                  let calculate:number = score * 100
                                  console.log(calculate)
                                  this.resultDetails[0].score = calculate / count
                                  //console.log(this.resultDetails.score)
                                  if (j == 0)
                                    this.quizOne[i] = Number(this.resultDetails[0].score)
                                  if (j == 1)
                                    this.quizTwo[i] = Number(this.resultDetails[0].score)
                                  if (j == 2)
                                    this.quizThree[i] = Number(this.resultDetails[0].score)

                                  console.log(this.quizOne)
                                  console.log("i is " + i + " j is " + j)
                                }
                               
                              })
                          }
                        )

                      }
                    

                    }

                  )

                }, error => {
                  window.alert(error.error.statusText)
                }

              )
            }
            console.log("At end..")

          }, error => {
            window.alert(error.error.statusText)
          }
        )
      }, error => {
        window.alert(error.error.statusText)
      }
    )
  }

  total(a:number,b:number,c:number)
  {
      return (a+b+c)/3
  }

  ngOnInit(): void {
   
    this.studentService.getStudentById(localStorage.getItem("loginId")).subscribe(
      response => {

        let responseBody: Response = response
        this.student = responseBody.data
        console.log(this.student)

      }, error => {
        window.alert(error.error.statusText)
      }
    )
  }

}
