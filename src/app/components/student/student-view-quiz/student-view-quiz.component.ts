import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Class } from 'src/app/model/class';
import { Question } from 'src/app/model/question';
import { Quiz } from 'src/app/model/quiz';
import { Response } from 'src/app/model/response';
import { Student } from 'src/app/model/student';
import { Subject } from 'src/app/model/subject';
import { TeacherSubject } from 'src/app/model/teacher-subject';
import { ClassService } from 'src/app/services/class.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import { StudentService } from 'src/app/services/student.service';
import { SubjectService } from 'src/app/services/subject.service';
import { TeacherSubjectService } from 'src/app/services/teacher-subject.service';

@Component({
  selector: 'app-student-view-quiz',
  templateUrl: './student-view-quiz.component.html',
  styleUrls: ['./student-view-quiz.component.css']
})
export class StudentViewQuizComponent implements OnInit {

  response: Response = new Response;
  classDetails: Class = new Class;
  teacherSub: TeacherSubject = new TeacherSubject;
  quizDetails: Quiz[] = []
  student: Student = new Student;
  questions:Question[]=[]
  subjectDetails: Subject[] =[]
  roomNo: number = 0
  today: string="";
  constructor(private classService: ClassService, private subService: SubjectService, 
    private teacherSubject: TeacherSubjectService, private quizService: QuizService,
    private router:Router,private studentService:StudentService,private questionService:QuestionService) {
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

  getClassDetails = new FormGroup(
    {
      rollNo: new FormControl({value:'',disabled:true}),
      standard: new FormControl(''),
      section: new FormControl(''),
      roomNo: new FormControl(''),
      code: new FormControl('')
    }
  )

  // getStudent() {
  //   this.studentService.getStudentById(localStorage.getItem("loginId")).subscribe(
  //     response => {

  //       let responseBody: Response = response
  //       this.student = responseBody.data
  //       console.log(this.student)

  //     }, error => {
  //       window.alert(error.error.statusText)
  //     }
  //   )
  // }

  getCourse() {
    localStorage.setItem("rollNo",this.getClassDetails.get('rollNo')?.value)
    this.subService.getSubject(this.student.classRoom?.standard).subscribe(
      data => {
        this.response = data
        this.subjectDetails = this.response.data
        console.log(data)
      }
    )
  }
  takeTest(autoId:any)
  {
    console.log(autoId)
    this.questionService.getQuestion(localStorage.getItem("quizId")).subscribe(
      response=>{
       let responseBody: Response = response;
         this.questions=responseBody.data
          console.log(this.questions)
        //  localStorage.setItem("questions",JSON.stringify(this.questions))
      })
    localStorage.setItem("quizId",autoId);
    this.router.navigate(['/studentdashboard/takequiz']);
  }

  onSubmit() {
    localStorage.setItem("subjectCode",this.getClassDetails.get('code')?.value)
    this.teacherSubject.getTeacherSubject(this.student.classRoom?.roomNo, this.getClassDetails.get('code')?.value).subscribe(
      data => {
        this.response = data
        this.teacherSub = this.response.data
        console.log(this.teacherSub)
        console.log(this.teacherSub.teacherId)

        this.quizService.getQuiz(this.teacherSub.teacherId, this.getClassDetails.get('code')?.value).subscribe(
          data => {
            this.response = data
            this.quizDetails = this.response.data
            //this.quizLength = this.quizDetails.length
            console.log(this.quizDetails)
            if(this.quizDetails.length==0)
            {
            window.alert("Quiz is not created yet..")
          
            }
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
