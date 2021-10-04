import { Component, OnInit,TemplateRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Class } from 'src/app/model/class';
import { Response } from 'src/app/model/response';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/services/student.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { UpdateProfileComponent } from '../update-profile/update-profile.component';


@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  student:Student=new Student
  classRoom:Class=new Class
  constructor(private studentService:StudentService,private dialog: MatDialog) { }

  ngOnInit(): void {
    let rollNo:number=4001
    localStorage.setItem("studentId",String(rollNo));
    this.studentService.getStudentById(rollNo).subscribe(
      response=>{
        let responseBody:Response=response
        this.student=responseBody.data
        console.log(this.student)
      },error=>{window.alert(error.error.statusText)}
    )
  }

update()
  {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      // dialogConfig.autoFocus = true;
      this.dialog.open(UpdateProfileComponent,{
        // maxWidth: '100vw',
        // maxHeight: '100vh',
        width: '600px',
        height: '65vh',
        
       
      })
     
  }


}
