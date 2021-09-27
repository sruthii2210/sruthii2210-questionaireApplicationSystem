import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Class } from 'src/app/model/class';
import { Quiz } from 'src/app/model/quiz';
import { Response } from 'src/app/model/response';
import { Subject } from 'src/app/model/subject';
import { TeacherSubject } from 'src/app/model/teacher-subject';
import { ClassService } from 'src/app/services/class.service';
import { QuizService } from 'src/app/services/quiz.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TeacherSubjectService } from 'src/app/services/teacher-subject.service';

@Component({
  selector: 'app-student-view-quiz',
  templateUrl: './student-view-quiz.component.html',
  styleUrls: ['./student-view-quiz.component.css']
})
export class StudentViewQuizComponent implements OnInit {

  response: Response = new Response;
  classDetails: Class | any
  teacherSub: TeacherSubject[] | any
  quizDetails: Quiz[] = []
  subjectDetails: Subject[] | any
  roomNo: number = 0
  today: string="";
  constructor(private classService: ClassService, private subService: SubjectService, private teacherSubject: TeacherSubjectService, private quizService: QuizService) {
  }


  ngOnInit(): void {
  }

  getClassDetails = new FormGroup(
    {
      rollNo: new FormControl(''),
      standard: new FormControl(''),
      section: new FormControl(''),
      roomNo: new FormControl(''),
      code: new FormControl('')
    }
  )

  getCourse() {
    this.subService.getSubject(this.classDetails.standard).subscribe(
      data => {
        this.response = data
        this.subjectDetails = this.response.data
        console.log(data)
      }
    )
  }
  getClass() {
    this.classService.getClass(this.getClassDetails.get('standard')?.value, this.getClassDetails.get('section')?.value)
      .subscribe(data => {
        this.response = data
        this.classDetails = this.response.data
        this.roomNo = this.classDetails.roomNo
        console.log(data)
      })
  }

  onSubmit() {
    console.log(this.roomNo)
    this.teacherSubject.getTeacherSubject(this.roomNo, this.getClassDetails.get('code')?.value).subscribe(
      data => {
        this.response = data
        this.teacherSub = this.response.data
        console.log(this.teacherSub)

        this.quizService.getQuiz(this.teacherSub.teacherId, this.getClassDetails.get('code')?.value).subscribe(
          data => {
            this.response = data
            this.quizDetails = this.response.data
            //this.quizLength = this.quizDetails.length
            console.log(this.quizDetails)
          }
        )

      }
    )

    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    this.today = [year, month, day].join('-');
  }

}
