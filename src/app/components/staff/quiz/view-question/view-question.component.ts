import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Question } from 'src/app/model/question';
import { Response } from 'src/app/model/response';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css']
})
export class ViewQuestionComponent implements OnInit {

  response: Response = new Response;
  id:number | any
  questions:Question[]|any
  constructor(private questionService:QuestionService,private router:Router) { }


  ngOnInit(): void {

     this.id=localStorage.getItem("id")
    this.questionService.getQuestion(this.id).subscribe(
      res=>{
         this.response=res;
         this.questions=this.response.data
          console.log(this.questions)
      })
  }


 

}
