import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Class } from 'src/app/model/class';
import { Student } from 'src/app/model/student';
import { ClassService } from 'src/app/services/class.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import { ResultService } from 'src/app/services/result.service';
import { StudentService } from 'src/app/services/student.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TeacherSubjectService } from 'src/app/services/teacher-subject.service';
import { Response } from 'src/app/model/response';
import { Subject } from 'src/app/model/subject';
import { TeacherSubject } from 'src/app/model/teacher-subject';
import { Quiz } from 'src/app/model/quiz';
import { Result } from 'src/app/model/result';
import { Teacher } from 'src/app/model/teacher';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css']
})
export class ViewResultComponent implements OnInit {


  constructor(private classService: ClassService, private subService: SubjectService,
    private teacherSubject: TeacherSubjectService, private quizService: QuizService,
    private router: Router, private studentService: StudentService, private questionService: QuestionService, private resultService: ResultService) { }

    totalMarks:number=100
  classDetails: Class = new Class;
  student: Student = new Student;
  teacherSubjects: TeacherSubject = new TeacherSubject;
  teacherIds: number[] = []
  quizl: Quiz = new Quiz;
  //teacherIds:[]|any
  subjectCodes: String[] = []
  subjectDetails: Subject[] = [];
  subjectOneQuiz: number[] = []
  subjectTwoQuiz: number[] = []
  subjectThreeQuiz: number[] = []
  subjectFourQuiz: number[] = []
  subjectFiveQuiz: number[] = []

  quizDetails: Array<Array<Quiz>> = []
  quizNames: String[] = []
  quizIds: number[] = []
  resultDetails: Result[] = [];
  
  subject1QuizIdList: number[] = []
  subject2QuizIdList: number[] = []
  subject3QuizIdList: number[] = []
  subject4QuizIdList: number[] = []
  subject5QuizIdList: number[] = []

  subject1QuizNameList: string[] = []
  subject2QuizNameList: string[] = []
  subject3QuizNameList: string[] = []
  subject4QuizNameList: string[] = []
  subject5QuizNameList: string[] = []

  subject1Percent:number[]=[]
  subject2Percent:number[]=[]
  subject3Percent:number[]=[]
  subject4Percent:number[]=[]
  subject5Percent:number[]=[]
  subject6Percent:number[]=[]

  result:String[]=[]

  ngOnInit(): void {

    this.studentService.getStudentById(localStorage.getItem("loginId")).subscribe(
      response => {

        let responseBody: Response = response
        this.student = responseBody.data
        console.log(this.student)

        this.classService.getClass(this.student.classRoom?.standard, this.student.classRoom?.section).subscribe(
          response => {
            let responseBody: Response = response
            this.classDetails = responseBody.data
            console.log(this.classDetails)

            this.subService.getSubject(this.student.classRoom?.standard).subscribe(
              response => {

                let responseBody: Response = response
                this.subjectDetails = responseBody.data
                console.log(this.subjectDetails)
                for (let k in this.subjectDetails)
                  this.subjectCodes.push(String(this.subjectDetails[k].code))
                console.log(this.subjectCodes)

                this.subService.getAllTeachers(this.student.classRoom?.roomNo, this.subjectCodes).subscribe(
                  response => {
                    let responseBody: Response = response
                    this.teacherIds = responseBody.data
                    console.log(this.teacherIds)

                    this.quizService.getAllQuiz(this.teacherIds, this.subjectCodes).subscribe(
                      response => {
                        let responseBody: Response = response
                        this.quizDetails = responseBody.data
                        console.log(this.quizDetails)

                        for (let i = 0; i < this.subjectCodes.length; i++) {
                          for (let j = 0; j < this.quizDetails[i].length; j++) {
                            console.log(this.quizDetails[i].slice(j, j + 1))
                            if (i == 0) {
                              if (Number(this.quizDetails[i][j].autoId) > 0) {
                                this.subject1QuizIdList.push(Number(this.quizDetails[i][j].autoId))
                                this.subject1QuizNameList.push(String(this.quizDetails[i][j].name))
                                this.subject1Percent.push(Number(this.quizDetails[i][j].passPercent))
                              }
                            }

                            if (i == 1) {
                              if (Number(this.quizDetails[i][j].autoId) > 0) {
                                this.subject2QuizIdList.push(Number(this.quizDetails[i][j].autoId))
                                this.subject2QuizNameList.push(String(this.quizDetails[i][j].name))
                                this.subject2Percent.push(Number(this.quizDetails[i][j].passPercent))
                              }
                            }

                            if (i == 2) {
                              if (Number(this.quizDetails[i][j].autoId) > 0) {
                                this.subject3QuizIdList.push(Number(this.quizDetails[i][j].autoId))
                                this.subject3QuizNameList.push(String(this.quizDetails[i][j].name))
                                this.subject3Percent.push(Number(this.quizDetails[i][j].passPercent))
                              }
                            }

                            if (i == 3) {
                              if (Number(this.quizDetails[i][j].autoId) > 0) {
                                this.subject4QuizIdList.push(Number(this.quizDetails[i][j].autoId))
                                this.subject4QuizNameList.push(String(this.quizDetails[i][j].name))
                                this.subject4Percent.push(Number(this.quizDetails[i][j].passPercent))
                              }

                            }

                            if (i == 4) {
                              if (Number(this.quizDetails[i][j].autoId) > 0) {
                                this.subject5QuizIdList.push(Number(this.quizDetails[i][j].autoId))
                                this.subject5QuizNameList.push(String(this.quizDetails[i][j].name))
                                this.subject5Percent.push(Number(this.quizDetails[i][j].passPercent))
                              }
                            }
                          }
                        }

                        console.log(this.subject1QuizIdList)

                        let quizList: number[] = []
                        let score: number[] = []
                        let count: number[] = []
                        quizList = this.subject1QuizIdList.concat(this.subject2QuizIdList).concat(this.subject3QuizIdList).concat(
                          this.subject4QuizIdList).concat(this.subject5QuizIdList)
                        console.log(quizList)

                        this.questionService.getCountOfQuestion(quizList).subscribe(
                          response => {
                            let responseBody: Response = response
                            count = responseBody.data
                            console.log(responseBody.data)

                            this.resultService.getResultByQuizId(localStorage.getItem("loginId"), quizList).subscribe(
                              response => {
                                let responseBody: Response = response
                                score = responseBody.data
                                console.log(score.length)

                                let scoreList: number[] = []
                                for (let k = 0; k < score.length; k++) {

                                  let result: number = Number(score[k])
                                  let calculate: number = result * 100
                                  scoreList[k] = Number(calculate / count[k])
                                  console.log(scoreList[k])
                                }

                                for (let i = 0; i < scoreList.length; i++) {
                                  for (let j = 0; i < this.subject1QuizIdList.length; j++) {
                                    console.log(i)
                                    let result: number = Number(score[i])
                                    let calculate: number = result * 100
                                    this.subjectOneQuiz[j] = Number(calculate / count[i])

                                    console.log(this.subjectOneQuiz)
                                    i++;
                                  }

                                  let j = 0;
                                  for (i >= this.subject1QuizIdList.length; j < this.subject2QuizIdList.length; j++) {
                                    console.log(i)
                                    let result: number = Number(score[i])
                                    let calculate: number = result * 100
                                    this.subjectTwoQuiz[j] = Number(calculate / count[i])
                                    console.log(this.subjectTwoQuiz)
                                    i++;
                                  }
                                  console.log(i);

                                  for (i >= this.subject2QuizIdList.length; j < this.subject3QuizIdList.length; j++) {
                                    console.log(i)
                                    let result: number = Number(score[i])
                                    let calculate: number = result * 100
                                    this.subjectTwoQuiz[j] = Number(calculate / count[i])
                                    console.log(this.subjectTwoQuiz)
                                    i++;
                                  }
                                  console.log(i)

                                }

                                let j=0;
                                for(let k=0;k<this.subjectOneQuiz.length;k++)
                                {
                                  this.result[j]="Pass"
                                  if(this.subjectOneQuiz[k]<this.subject1Percent[k])
                                  {
                                    this.result[j]="Fail"
                                  }
                                }
                               j++;
                                console.log(this.result[0])
                                for(let k=0;k<this.subjectTwoQuiz.length;k++)
                                {
                                  this.result[j]="Pass"
                                  if(this.subjectTwoQuiz[k]<this.subject2Percent[k])
                                  {
                                    this.result[j]="Fail"
                                  }
                                }
                                j++;
                                for(let k=0;k<this.subjectThreeQuiz.length;k++)
                                {
                                  this.result[j]="Pass"
                                  if(this.subjectThreeQuiz[k]<this.subject3Percent[k])
                                  {
                                    this.result[j]="Fail"
                                  }
                                }
                                j++;
                                for(let k=0;k<this.subjectFourQuiz.length;k++)
                                {
                                  this.result[j]="Pass"
                                  if(this.subjectFourQuiz[k]<this.subject4Percent[k])
                                  {
                                    this.result[j]="Fail"
                                  }
                                }
                                j++;
                                for(let k=0;k<this.subjectFiveQuiz.length;k++)
                                {
                                  this.result[j]="Pass"
                                  if(this.subjectFiveQuiz[k]<this.subject5Percent[k])
                                  {
                                    this.result[j]="Fail"
                                  }
                                }
                                j++;
                              }
                            )
                          }
                        )


                      }
                    )
                  }
                )

              }, error => {
                window.alert(error.error.statusText)
              }
            )

          }, error => {
            window.alert(error.error.statusText)
          }
        )
      }, error => {
        window.alert(error.error.statusText)
      }
    )
  }

}
