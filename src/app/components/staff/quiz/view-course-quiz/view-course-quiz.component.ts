import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Question } from 'src/app/model/question';
import { Quiz } from 'src/app/model/quiz';
import { TeacherSubject } from 'src/app/model/teacher-subject';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import { SubjectService } from 'src/app/services/subject.service';
import { Response } from 'src/app/model/response';

@Component({
  selector: 'app-view-course-quiz',
  templateUrl: './view-course-quiz.component.html',
  styleUrls: ['./view-course-quiz.component.css']
})
export class ViewCourseQuizComponent implements OnInit {

  response: Response = new Response;
  subjects:TeacherSubject[]|any
  questions:Question[]|any
  quizList:Quiz[]=[]
  quizLength:number=0
  staffId=localStorage.getItem("staffId")
  constructor(private subjectService:SubjectService,private quizService:QuizService,private questionService:QuestionService,private router:Router) {
   }
   StaffCourseForm=new FormGroup(
    {
      staffId:new FormControl({value:'',disabled:true}),
      code:new FormControl(''),
      name:new FormControl('')
      
    }
  )
  ngOnInit(): void {
    
  }

  getCourse()
  {
      console.log(localStorage.getItem("staffId"))
    this.subjectService.getCourseById(localStorage.getItem("staffId")).subscribe(
      data=>{
        this.response=data
        this.subjects=this.response.data
        console.log(this.subjects)
      }
    )
  }

  onSubmit()
  {
 
    localStorage.setItem("subCode",this.StaffCourseForm.get('code')?.value)
  
    this.quizService.getQuizByStaff(localStorage.getItem("staffId"),localStorage.getItem("subCode")).subscribe(
      data=>{
        let publishedQuiz:Quiz[]=[]
        this.response=data
        publishedQuiz=this.response.data
        console.log(data)
        

        this.quizService.getQuiz(localStorage.getItem("staffId"),localStorage.getItem("subCode")).subscribe(
          data=>{
            let pendingQuiz:Quiz[]=[]
            this.response=data
            pendingQuiz=this.response.data
            console.log(data)
            
            this.quizList=this.quizList.concat(publishedQuiz).concat(pendingQuiz)
            console.log(this.quizList)
          })

          this.quizList=[]
      }
    )
  }

  view(id:any)
  {
    // this.questionService.getQuestion(id).subscribe(
    //   res=>{
    //       this.que=res;
    //       console.log(res)
    //   })

    localStorage.setItem("id",id)
    this.router.navigate(['staffdashboard/viewquestion'])
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


 

}
