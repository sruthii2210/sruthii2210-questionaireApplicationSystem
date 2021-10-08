import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Question } from 'src/app/model/question';
import { Quiz } from 'src/app/model/quiz';
import { Response } from 'src/app/model/response';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css']
})
export class ViewQuestionComponent implements OnInit {

 
  
  questions:Question[]=[]
  quiz: Quiz = new Quiz;
  constructor(private questionService:QuestionService,private router:Router,private quizService:QuizService) { }


  ngOnInit(): void {

    this.questionService.getQuestion(localStorage.getItem("id")).subscribe(
      response=>{
       let responseBody: Response = response;
         this.questions=responseBody.data
          console.log(this.questions)
      })
  }

  publish() {
    this.quizService.getQuizByQuizId(Number(localStorage.getItem("id"))).subscribe(
      response => {
        let responseBody: Response = response
        this.quiz = responseBody.data

        this.questionService.getQuestionCount(Number(localStorage.getItem("quizId"))).subscribe(
          response => {
            let responseBody: Response = response
            if (responseBody.data >= 10) {
              this.quiz.status = "published"
              this.quizService.updateQuiz(Number(this.quiz.teacher?.id), Number(localStorage.getItem("quizId")), String(this.quiz.subject?.code),
                this.quiz).subscribe(
                  response => {
                    let responseBody: Response = response
                    console.log(responseBody.data)
                    let value = window.confirm("Are you sure to publish quiz..")
                    if (value)
                      window.alert("Quiz is published")

                  }
                )
            }
            else {
              window.alert("Minimum 10 questions need to be added to publish...")
            }
          }
        )

      }
    )
  }
 

}
