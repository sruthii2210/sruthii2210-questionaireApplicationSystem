import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Answer } from 'src/app/model/answer';
import { Quiz } from 'src/app/model/quiz';
import { Response } from 'src/app/model/response';
import { AnswerService } from 'src/app/services/answer.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-create-answer',
  templateUrl: './create-answer.component.html',
  styleUrls: ['./create-answer.component.css']
})
export class CreateAnswerComponent implements OnInit {

 
  answer:Answer=new Answer();
  quiz:Quiz=new Quiz();
  createAnswer=new FormGroup(
    {
      option1:new FormControl(''),
      option2:new FormControl(''),
      option3:new FormControl(''),
      option4:new FormControl(''),
      crctAns:new FormControl('')
    }
  )
  constructor(private answerService:AnswerService,private quizService:QuizService,private router:Router) { }
  onSubmit()
  {
     this.answer.option1=this.createAnswer.get('option1')?.value,
     this.answer.option2=this.createAnswer.get('option2')?.value,
     this.answer.option3=this.createAnswer.get('option3')?.value,
     this.answer.option4=this.createAnswer.get('option4')?.value,
     this.answer.crctAns=this.createAnswer.get('crctAns')?.value

     this.answerService.addAnswer(localStorage.getItem("quesNo"),this.answer).subscribe(
       data=>{
        let response: Response = new Response;
         console.log(data),(error: any)=>console.log(error)
         response=data
         window.alert(response.statusText)
       }
     )
  }

  publish()
  {
    this.quizService.getQuizByQuizId(Number(localStorage.getItem("quizId"))).subscribe(
      response=>{
        let responseBody:Response=response
        this.quiz=responseBody.data

        this.quiz.status="published"
        this.quizService.updateQuiz(Number(this.quiz.teacher?.id),Number(localStorage.getItem("quizId")),String(this.quiz.subject?.code),
        this.quiz).subscribe(
          response=>{
            let responseBody:Response=response
            console.log(responseBody.data)
           let value= window.confirm("Are you sure to publish quiz..")
            if(value)
              window.alert("Quiz is published")

          }
        )
      }
    )
  }
  ngOnInit(): void {
  }

}
