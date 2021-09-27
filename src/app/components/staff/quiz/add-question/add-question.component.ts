import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Answer } from 'src/app/model/answer';
import { Question } from 'src/app/model/question';
import { Response } from 'src/app/model/response';
import { QuestionService } from 'src/app/services/question.service';



@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {



response:Response=new Response
  questionModel:Question=new Question()
  addedQuestion:Question|any
  questions:Question[]|any
  answer:Answer[]|any
  questionsLength:number=0

  createQuestion=new FormGroup({
    question:new FormControl('')
  })

  count:number=0;

  constructor(private questionService:QuestionService,private router:Router) { }

  quiz()
  {
    this.questionService.getQuestion(localStorage.getItem("quizId")).subscribe(
      response=>{
        this.response=response
          this.questions=this.response.data;
          console.log(this.questions)
          this.questionsLength=this.questions.length
      }) 
  }


  create()
  {
    this.count=this.count+1
  }

  // add()
  // {
  //   console.log(localStorage.getItem("quizId"))
  //   this.questionModel.question=this.createQuestion.get('question')?.value
  //   this.questionService.addQuestion(localStorage.getItem("quizId"),this.questionModel).subscribe(
  //     data=>{
  //       console.log(data),(error: any)=>console.log(error)
  //       this.response=data
  //       this.addedQuestion=this.response.data
  //       console.log(this.addedQuestion);
  //     })
  // }
 
add()
{
    console.log(localStorage.getItem("quizId"))
    this.questionModel.question=this.createQuestion.get('question')?.value
    this.questionService.addQuestion(localStorage.getItem("quizId"),this.questionModel).subscribe(
      data=>{
        console.log(data),(error: any)=>console.log(error)
        this.response=data
        this.addedQuestion=this.response.data
        console.log(this.addedQuestion);

        this.questionService.getQuestion(localStorage.getItem("quizId")).subscribe(
          data=>{
            this.response=data
              this.questions=this.response.data
              console.log(this.questions)
             
              for(var i = 0; i < this.questions.length; i++)
              { 
                    console.log(this.questions[i].question);
                     if(this.questions[i].question==this.createQuestion.get('question')?.value)
                    {
                      console.log(this.questions[i].question);
                       console.log(this.questions[i].questionNo);
                       localStorage.setItem("quesNo", this.questions[i].questionNo);
                       window.alert(this.response.statusText);
                      this.router.navigate(['createanswer']);
                    }
               }
              }
            )
      })
 

  // this.questionService.getQuestion(localStorage.getItem("quizId")).subscribe(
  //   data=>{
  //     this.response=data
  //       this.questions=this.response.data
  //       console.log(this.questions)
  //       for(var i = 0; i < this.questions.length; i++)
  //       { 
  //             console.log(this.questions[i].question);
  //              if(this.questions[i].question==this.createQuestion.get('question')?.value)
  //             {
  //               console.log(this.questions[i].question);
  //                console.log(this.questions[i].quesNo);
  //                localStorage.setItem("quesNo", this.questions[i].quesNo)
  //                //window.alert("Question is added successfully")
  //               this.router.navigate(['answer'])
  //             }
  //        }
  //       }
  //     )
 
}

  ngOnInit(): void {
  } 

}
