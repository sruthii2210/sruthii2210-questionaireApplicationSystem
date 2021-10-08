import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Quiz } from 'src/app/model/quiz';
import { Response } from 'src/app/model/response';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.css']
})
export class ViewQuizComponent implements OnInit {

  response: Response = new Response;
  quizList:Quiz[]|any
  quizLength:number|any;
  staffId:number=Number(localStorage.getItem("staffId"))
  constructor(private quizService:QuizService,private router:Router) { 
    console.log(this.subCode)
  }

  quizForm=new FormGroup(
    {
      staffId:new FormControl({value:'',disabled:true})
    }
  )
  subCode=localStorage.getItem("subCode")
  
  onSubmit()
  {
    this.quizService.getQuizByStaff(localStorage.getItem("staffId"),localStorage.getItem("subCode")).subscribe(
      data=>{
        this.response=data
        this.quizList=this.response.data
        console.log(data)
        this.quizLength=this.quizList.length
        if(this.quizLength==0)
        window.alert("No quiz found!..create new one..")
      }
    )
  }

  addQuestion(id: any,name: any)
  {
    for(var i = 0; i < this.quizList.length; i++)
    { 
      console.log(this.quizList[i].autoId);
        console.log(this.quizList[i].name); 
        if(this.quizList[i].autoId==id&&this.quizList[i].name==name)
        {
          localStorage.setItem("quizId",id)
          
              this.router.navigate(['staffdashboard/addquestion'])
        }
  }
}

  ngOnInit(): void {

    this.quizService.getQuizByStaff(localStorage.getItem("staffId"),localStorage.getItem("subCode")).subscribe(
      data=>{
        this.response=data
        this.quizList=this.response.data
        console.log(data)
        this.quizLength=this.quizList.length
        if(this.quizLength==0)
        window.alert("No quiz found!..create new one..")
      }
    )
  }

}
