import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Class } from 'src/app/model/class';
import { Quiz } from 'src/app/model/quiz';
import { Response } from 'src/app/model/response';
import { Result } from 'src/app/model/result';
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
              // this.available = 0
              // this.completed = 0
              // this.expired = 0
              this.totalQuiz[i] = 0
              this.pendingQuiz[i] = 0
              this.completedQuiz[i] = 0
              this.ExpiredQuiz[i] =0

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
                        this.completedQuiz[i]=0;
                      }
                      else {
                        this.available = 0;
                        this.expired = 0;
                        this.completed=0;
                        // this.pendingQuiz=[0,0,0,0,0]
                        // this.completedQuiz=[0,0,0,0,0]
                        // this.ExpiredQuiz=[0,0,0,0,0]
                        var d = new Date(),
                          month = '' + (d.getMonth() + 1),
                          day = '' + d.getDate(),
                          year = d.getFullYear();

                        if (month.length < 2)
                          month = '0' + month;
                        if (day.length < 2)
                          day = '0' + day;

                        let today = [year, month, day].join('-');

                         
                        for (let j = 0; j < quizDetails.length; j++) {

                          console.log("Quiz id is "+quizDetails[j].autoId)
                          if (quizDetails[j].quizDate >= today) {

                            
                            this.resultService.getResultByRollNo(localStorage.getItem("loginId"),quizDetails[j].autoId).subscribe(
                              response=>{
                                let responseBody:Response=response
                                let resultDetails:Result[]=[]
                                resultDetails=responseBody.data
                                let count=0
                                
                                if(resultDetails.length>0)
                                {
                                  // this.completed=this.completed+1;
                                  this.completedQuiz[i]=this.completedQuiz[i]+1
                                  console.log(" i is "+i+" completed quiz: "+this.completedQuiz[i])
                                }
                                  else
                                  {
                                  this.available=this.available+1;
                                  count++;
                                  this.pendingQuiz[i] = this.pendingQuiz[i]+1;
                                  console.log(count)
                                  console.log(" i is "+i+" pendingquiz: "+this.pendingQuiz[i])
                                  }
                              }
                            )
                          }
                          
                          else {
                           // this.expired = this.expired + 1
                            this.ExpiredQuiz[i] = this.ExpiredQuiz[i]+1;
                            console.log(" i is "+i+" expiredquiz: "+this.ExpiredQuiz[i])
                          }
                          
                          // this.available=0;
                          // this.expired=0;
                          // this.completed=0
                        }

                      
                        

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
  

}
