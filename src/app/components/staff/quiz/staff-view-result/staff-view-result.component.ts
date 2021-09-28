import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { SubjectService } from 'src/app/services/subject.service';
import { Response } from 'src/app/model/response';
import { TeacherSubject } from 'src/app/model/teacher-subject';
import { Quiz } from 'src/app/model/quiz';
import { ResultService } from 'src/app/services/result.service';
import { Result } from 'src/app/model/result';
import { ResultModel } from 'src/app/model/result-model';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-staff-view-result',
  templateUrl: './staff-view-result.component.html',
  styleUrls: ['./staff-view-result.component.css']
})
export class StaffViewResultComponent implements OnInit {

  subjects: TeacherSubject[] =[]
  teacherSubject: TeacherSubject = new TeacherSubject;
  quizList: Quiz[] = []
  results:ResultModel[]=[]
  totalScore:number[]=[]
  constructor(private subjectService: SubjectService, private quizService: QuizService, 
    private router: Router,private resultService:ResultService,
    private questionService:QuestionService) { }

 resultForm = new FormGroup(
    {
      staffId: new FormControl('', Validators.required),
      code: new FormControl(''),
    }
  )
  getCourse() {
    console.log(this.resultForm.get('staffId')?.value)
    this.subjectService.getCourseById(this.resultForm.get('staffId')?.value).subscribe(
      response => {
        let responseBody: Response = response;
        this.subjects = responseBody.data
        console.log(this.subjects)
      }
    )
  }
  onSubmit()
  {
    this.quizService.getQuiz(this.resultForm.get('staffId')?.value, this.resultForm.get('code')?.value).subscribe(
      response => {
        let responseBody:Response=response
        this.quizList = responseBody.data
        console.log(this.quizList)
      }
    )
  }

  getResult(quiz:Quiz)
  {
      this.resultService.getResult(quiz.autoId).subscribe(
        response=>{
          let count:number=0
          let index:any
          let responseBody:Response=response
          this.results=responseBody.data
          console.log(this.results)

          this.questionService.getQuestionCount(quiz.autoId).subscribe(
            response=>{
              console.log(quiz.autoId)
              let responseBody:Response=response
              count=responseBody.data
              console.log(count)

              for(index in this.results)
              {
                console.log(count)
                let score:any=this.results[index].score
                let calculate=score*100
                console.log(calculate)
                   this.results[index].score=calculate/count
                   console.log(this.results[index].score)
              }
            }
          )

         

        }
      )
  }
  ngOnInit(): void {
  }

}
