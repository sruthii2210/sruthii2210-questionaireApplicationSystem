import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Class } from 'src/app/model/class';
import { Quiz } from 'src/app/model/quiz';
import { Response } from 'src/app/model/response';
import { Subject } from 'src/app/model/subject';
import { TeacherSubjectModel } from 'src/app/model/teacher-subject-model';
import { ClassService } from 'src/app/services/class.service';
import { QuizService } from 'src/app/services/quiz.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TeacherSubjectService } from 'src/app/services/teacher-subject.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {


  classDetails: Class = new Class;
  subjects: Subject[] = [];
  teacherSubjects: TeacherSubjectModel = new TeacherSubjectModel;
  teachersId: number[] = [];
  totalQuiz: number[] = [];
  pendingQuiz: number[] = [];
  completedQuiz: number[] = [];
  ExpiredQuiz: number[] = [];
  available: number = 0
  expired: number = 0

  constructor(private classService: ClassService, private subjectService: SubjectService,
    private quizService: QuizService, private teacherSubjectService: TeacherSubjectService, public datepipe: DatePipe) { }

  getClassDetails = new FormGroup(
    {
      rollNo: new FormControl(''),
      standard: new FormControl(''),
      section: new FormControl(''),
    }
  )

  getCourses() {

    this.subjectService.getSubject(this.getClassDetails.get('standard')?.value).subscribe(
      response => {
        let responseBody: Response = response
        this.subjects = responseBody.data
        console.log(this.subjects)
      }
    )
  }
  getClass() {
    this.classService.getClass(this.getClassDetails.get('standard')?.value, this.getClassDetails.get('section')?.value)
      .subscribe(response => {
        let responseBody: Response = response

        this.classDetails = responseBody.data;
        console.log(this.classDetails);


        for (let i = 0; i < this.subjects.length; i++) {

          this.teacherSubjectService.getTeacherId(this.classDetails.roomNo, this.subjects[i].code).subscribe(
            response => {
              let responseBody: Response = response
              this.teacherSubjects = responseBody.data
              this.teachersId.push(Number(this.teacherSubjects.teacherId));
              console.log(this.subjects[i].code)


              this.quizService.getQuiz(this.teacherSubjects.teacherId, this.subjects[i].code).subscribe(
                response => {
                  let status;
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

                      if (quizDetails[i].quizDate > today)
                        this.available = this.available + 1
                      else
                        this.expired = this.expired + 1
                    }
                    this.pendingQuiz[i] = this.available;
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
  ngOnInit(): void {

  }

}
