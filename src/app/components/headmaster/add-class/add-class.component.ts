import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Class } from 'src/app/model/class';
import { ClassService } from 'src/app/services/class.service';
import { Response } from 'src/app/model/response';
@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {

  classDetails: Class = new Class;
  constructor(private classService:ClassService) { }

  addClass=new FormGroup(
    {
      standard:new FormControl(''),
      section:new FormControl(''),
      roomNo:new FormControl('')
    }
  )

  add()
  {
    this.classDetails=new Class();
    this.classDetails.roomNo=this.addClass.get('roomNo')?.value;
    this.classDetails.standard=this.addClass.get('standard')?.value;
    this.classDetails.section=this.addClass.get('section')?.value;
    this.classService.addClass(this.classDetails).subscribe(
      response=>{
        let responseBody:Response=response
        window.alert(responseBody.statusText)
      },error=>{
        console.log(error)
        window.alert(error.error.statusText)}
    )
  }
  ngOnInit(): void {
  }

}
