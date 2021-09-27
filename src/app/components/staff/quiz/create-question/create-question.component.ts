import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Answer } from 'src/app/model/answer';
import { Question } from 'src/app/model/question';
import { Response } from 'src/app/model/response';
import { AnswerService } from 'src/app/services/answer.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {

  response: Response = new Response;
  addQuestion:Question=new Question()
  quest:Question=new Question()
  questions:Question[]|any
  count:number=0;

  
  createQuestion=new FormGroup({
    question:new FormControl('')
  })
  
  
  constructor(private questionService:QuestionService,private router:Router,private answerService:AnswerService) { }

  create()
  {
    console.log(localStorage.getItem("quizId"))
    this.count=this.count+1
  }

  add()
  {
    this.addQuestion.question=this.createQuestion.get('question')?.value
  this.questionService.addQuestion(localStorage.getItem("quizId"),this.addQuestion).subscribe(
    data=>{
      console.log(data),(error: any)=>console.log(error)
      this.response=data
      window.alert(this.response.statusText)
      
     localStorage.setItem("quesNo",JSON.stringify(this.response.data))
     this.router.navigate(['createanswer'])
      
    })
  }


  // quiz()
  // {
  //   this.questionService.getQuestion(localStorage.getItem("quizId")).subscribe(
  //     res=>{
  //         this.que=res;
  //         console.log(res)
  //     })
  // }

// onSubmit()
// {
  
//   this.addQuestion.question=this.createQuestion.get('question')?.value
//   this.questionService.addQuestion(localStorage.getItem("quizId"),this.addQuestion).subscribe(
//     data=>{
//       console.log(data),(error: any)=>console.log(error)
//       this.response=data
//       window.alert(this.response.statusText)
//     })

//       this.questionService.getQuestion(localStorage.getItem("quizId")).subscribe(
//         data=>{
//           this.response=data
//             this.questions=this.response.data;
//             console.log(this.questions)
//             for(var i = 0; i < this.questions.length; i++)
//             { 
//                   console.log(this.questions[i].question);
//                    if(this.questions.question==this.createQuestion.get('question')?.value)
//                   {
//                     console.log(this.questions.question);
//                      console.log(this.questions.quesNo);
//                      localStorage.setItem("quesNo", this.questions.quesNo)
//                     this.router.navigate(['createanswer'])
//                   }
//              }
//             }
//           )
//       }

      ngOnInit(): void {
      }

}
