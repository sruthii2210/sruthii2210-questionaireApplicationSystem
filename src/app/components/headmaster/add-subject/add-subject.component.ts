import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Response } from 'src/app/model/response';
import { Subject } from 'src/app/model/subject';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {

  subjects:Subject[]=[]
  standard:string=""
  constructor(private subjectService:SubjectService) { }

  getStudent=new FormGroup({
    standard:new FormControl(''),
    code:new FormControl(''),
    name:new FormControl('')
  })

  getStandard()
  {
    this.standard=this.getStudent.get('standard')?.value
    this.subjectService.getSubject( this.getStudent.get('standard')?.value).subscribe(
      response=>{
        let responseBody:Response=response
        this.subjects=responseBody.data
        console.log(this.subjects)
        if(this.subjects.length==5)
        window.alert("Cant able to add subjects..maxSubjects=5")
      }
    )
   
  }
  add()
  {
    let subject:Subject=new Subject
    subject.standard=this.getStudent.get('standard')?.value
    subject.code=this.getStudent.get('code')?.value
    subject.name=this.getStudent.get('name')?.value
    this.subjectService.addSubject(this.getStudent.get('standard')?.value,subject).subscribe(
      response=>{
        let responseBody:Response=response
        window.alert("subject added..")
        this.getStudent.reset()

      },error=>{window.alert(error.error.statusText)}
    )
  }

  ngOnInit(): void {
  }

}
