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

 
  
  questions:Question[]=[]
  constructor(private questionService:QuestionService,private router:Router) { }


  ngOnInit(): void {

    this.questionService.getQuestion(localStorage.getItem("id")).subscribe(
      response=>{
       let responseBody: Response = response;
         this.questions=responseBody.data
          console.log(this.questions)
      })
  }


 

}
