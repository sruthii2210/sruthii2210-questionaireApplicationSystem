import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Quiz } from 'src/app/model/quiz';
import { Response } from 'src/app/model/response';
import { TeacherSubject } from 'src/app/model/teacher-subject';
import { QuizService } from 'src/app/services/quiz.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {


subjects: TeacherSubject[] |any
quiz:Quiz=new Quiz()
quizDetails:Quiz|any
constructor(private subjectService:SubjectService,private quizService:QuizService,private router:Router) {
}

StaffCourseForm=new FormGroup(
  {
    staffId:new FormControl('',Validators.required),
    code:new FormControl(''),
    name:new FormControl(''),
    quizDate:new FormControl(''),
  }
  )
getCourse()
{
console.log(this.StaffCourseForm.get('staffId')?.value)
this.subjectService.getCourseById(this.StaffCourseForm.get('staffId')?.value).subscribe(
 response=>{
  let responseBody: Response = response;
   this.subjects=responseBody.data
   console.log(this.subjects)
 }
)
}


setSubCode()
{
localStorage.setItem("subCode",this.StaffCourseForm.get('code')?.value)
}

onSubmit()
{

this.quiz.code=this.StaffCourseForm.get('code')?.value;
console.log(this.StaffCourseForm.get('code')?.value)
this.quiz.name=this.StaffCourseForm.get('name')?.value;
this.quiz.quizDate=this.StaffCourseForm.get('quizDate')?.value;
this.quizService.saveQuiz(this.StaffCourseForm.get('staffId')?.value,this.StaffCourseForm.get('code')?.value,this.quiz)
.subscribe(data=>{
  console.log(data),(error: any)=>console.log(error)

  this.quizService.getQuiz(this.StaffCourseForm.get('staffId')?.value,this.StaffCourseForm.get('code')?.value).subscribe(
    response=>{
      let responseBody: Response = response;
      this.quizDetails=responseBody.data

      for(var i = 0; i < this.quizDetails.length; i++)
            { 
                  console.log(this.quizDetails[i].name);
                   if(this.quizDetails[i].name==this.StaffCourseForm.get('name')?.value)
                  {
                    console.log(this.quizDetails[i].autoId);
                     console.log(this.quizDetails[i].name);
                     localStorage.setItem("quizId", this.quizDetails[i].autoId)
                  }
             }
    }
  )
})

window.alert("quiz is created successfully!")
this.router.navigate(['createquestion'])
}


  ngOnInit(): void {
  }

}
