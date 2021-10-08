import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/model/question';
import { QuestionService } from 'src/app/services/question.service';
import { Response } from 'src/app/model/response';
import { Answer } from 'src/app/model/answer';
import { ResultService } from 'src/app/services/result.service';
import { Result } from 'src/app/model/result';

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.css']
})
export class TakeQuizComponent implements OnInit {

  questions:Question[]=[]
  quizId:number=0
  answer: Answer = new Answer;
   count:number=0
  constructor(private questionService:QuestionService,private resultService:ResultService,private router:Router) { }

check(index:number,option:number)
{
  if(option==Number(this.questions[index].answer?.crctAns))
  {
    this.count=this.count+1;
  }
  console.log(this.count);
}
  
result()
{

  let questionCount: number = this.count
  let calculate: number = questionCount * 100

  this.questionService.getQuestionCount(localStorage.getItem("quizId")).subscribe(
    response => {
      let responseBody: Response = response
      console.log(responseBody.data)

      this.count = Number(calculate/responseBody.data)
      this.count=Number(this.count.toFixed())
      window.alert("Your score is "+this.count);
    })


  console.log(localStorage.getItem("subjectCode"))
  let result:Result=new Result;
  result.score=this.count
  this.resultService.publishResult(localStorage.getItem("loginId"),localStorage.getItem("subjectCode"),localStorage.getItem("quizId"),result).subscribe(
    response=>{
      let responseBody:Response=response;
      console.log(responseBody)
    },error=>{window.alert(error.error.statusText)}
  )
  this.router.navigate(['studentdashboard'])
}
  ngOnInit(): void {

    this.quizId=Number(localStorage.getItem("quizId"))
    console.log(localStorage.getItem("quizId"))
    this.questionService.getQuestion(localStorage.getItem("quizId")).subscribe(
      response=>{
       let responseBody: Response = response;
         this.questions=responseBody.data
          console.log(this.questions)
          localStorage.setItem("questions",JSON.stringify(this.questions))
      })
  }


}
