import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Class } from 'src/app/model/class';
import { Quiz } from 'src/app/model/quiz';
import { Response } from 'src/app/model/response';
import { Result } from 'src/app/model/result';
import { ResultModel } from 'src/app/model/result-model';
import { Student } from 'src/app/model/student';
import { Subject } from 'src/app/model/subject';
import { TeacherSubjectModel } from 'src/app/model/teacher-subject-model';
import { ClassService } from 'src/app/services/class.service';
import { QuizService } from 'src/app/services/quiz.service';
import { ResultService } from 'src/app/services/result.service';
import { StudentService } from 'src/app/services/student.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TeacherSubjectService } from 'src/app/services/teacher-subject.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {



  classDetails: Class = new Class;
  classRoom: Class = new Class;
  subjects: Subject[] = [];
  student: Student = new Student;
  teacherSubjects: TeacherSubjectModel = new TeacherSubjectModel;
  teachersId: number[] = [];
  totalQuiz: number[] = [];
  pendingQuiz: number[] = [];
  completedQuiz: number[] = [];
  ExpiredQuiz: number[] = [];

  available: number = 0
  expired: number = 0
  completed: number = 0


  constructor(private classService: ClassService, private subjectService: SubjectService,
    private quizService: QuizService, private teacherSubjectService: TeacherSubjectService,
    private resultService: ResultService, private studentService: StudentService) { }

  getClassDetails = new FormGroup(
    {
      rollNo: new FormControl(''),
      standard: new FormControl(''),
      section: new FormControl(''),
    }
  )

  getStudent() {
    this.studentService.getStudentById(this.getClassDetails.get('rollNo')?.value).subscribe(
      response => {

        let responseBody: Response = response
        this.student = responseBody.data
        console.log(this.student)

      }, error => {
        window.alert(error.error.statusText)
      }
    )
  }

  getClass() {

    this.subjectService.getSubject(this.student.classRoom?.standard).subscribe(
      response => {
        let responseBody: Response = response
        this.subjects = responseBody.data
        console.log(this.subjects)

        this.classService.getClass(this.student.classRoom?.standard, this.student.classRoom?.section)
          .subscribe(response => {
            let responseBody: Response = response

            this.classDetails = responseBody.data;
            console.log(this.classDetails);
            for (let i = 0; i < this.subjects.length; i++) {

              console.log("hello")
              this.available = 0
              this.completed = 0
              this.expired = 0
              this.totalQuiz[i] = 0
              this.pendingQuiz[i] = this.available
              this.completedQuiz[i] = this.completed
              this.ExpiredQuiz[i] = this.expired

              this.teacherSubjectService.getTeacherId(this.classDetails.roomNo, this.subjects[i].code).subscribe(
                response => {
                  let responseBody: Response = response
                  this.teacherSubjects = responseBody.data
                  this.teachersId.push(Number(this.teacherSubjects.teacherId));
                  console.log(this.subjects[i].code)


                  this.quizService.getQuiz(this.teacherSubjects.teacherId, this.subjects[i].code).subscribe(
                    response => {
                      let quizDetails: Quiz[] = []
                      let responseBody: Response = response
                      quizDetails = responseBody.data
                      console.log(quizDetails)


                      this.totalQuiz[i] = quizDetails.length

                      if (quizDetails.length == 0) {
                        this.pendingQuiz[i] = 0;
                        this.ExpiredQuiz[i] = 0;

                      }
                      else {
                        this.available = 0;
                        this.expired = 0;

                        var d = new Date(),
                          month = '' + (d.getMonth() + 1),
                          day = '' + d.getDate(),
                          year = d.getFullYear();

                        if (month.length < 2)
                          month = '0' + month;
                        if (day.length < 2)
                          day = '0' + day;

                        let today = [year, month, day].join('-');

                        for (let i = 0; i < quizDetails.length; i++) {

                          if (quizDetails[i].quizDate > today) {
                            this.available = this.available + 1
                          }
                          else {
                            this.expired = this.expired + 1
                          }

                          // this.resultService.getResult(quizDetails[i].autoId).subscribe(
                          //   response => {

                          //     let index: any = 0
                          //     let resultDetails: ResultModel[] = []
                          //     let responseBody: Response = response
                          //     resultDetails = responseBody.data
                          //     console.log(resultDetails)
                          //     let studentIds = []

                          //     for (index in resultDetails)
                          //       studentIds.push(resultDetails[index].rollNo);
                          //     console.log(studentIds)

                          //     let rollNo: number = Number(localStorage.getItem("rollNo"))
                          //     index = 0

                          //     for (index in studentIds) {

                          //       if (studentIds[index] == rollNo) {
                          //         this.completed = this.completed + 1
                          //         console.log(this.completed)
                          //       }
                          //       else{
                          //         this.completed=0
                          //         this.available=this.available+1
                          //         this.pendingQuiz[i] = this.available
                          //         console.log(this.pendingQuiz[i])
                          //       }

                          //       this.completedQuiz[i] = this.completed;
                          //       console.log(this.pendingQuiz[i])
                          //        if(this.pendingQuiz[i]>0)
                          //       this.pendingQuiz[i]=this.pendingQuiz[i]-this.completedQuiz[i]
                          //       else
                          //       this.pendingQuiz[i]=0
                          //       console.log(this.pendingQuiz[i])
                          //     }
                          //   }
                          // )

                          this.resultService.getResult(quizDetails[i].autoId).subscribe(
                            response => {

                              let index: any = 0
                              let resultDetails: ResultModel[] = []
                              let responseBody: Response = response
                              resultDetails = responseBody.data
                              console.log(resultDetails)
                              let studentIds = []
                              let quizIds = []

                              for (index in resultDetails) {
                                studentIds.push(resultDetails[index].rollNo);
                                quizIds.push(resultDetails[index].quizId);
                              }
                              console.log(studentIds)

                              let rollNo: number = Number(localStorage.getItem("rollNo"))
                              index = 0

                              if (studentIds[index] == rollNo && quizIds[index] == quizDetails[i].autoId) {
                                this.completed = this.completed + 1
                                console.log(quizDetails[i].autoId)
                              }

                              this.completedQuiz[i] = this.completed
                            })

                        }

                        this.pendingQuiz[i] = this.available;
                        //  this.completedQuiz[i]=this.completed
                        this.ExpiredQuiz[i] = this.expired;

                      }
                    }
                  )

                }
              )
            }
            console.log(this.teachersId)

          })
      }
    )
  }
  ngOnInit(): void {

  }

}
