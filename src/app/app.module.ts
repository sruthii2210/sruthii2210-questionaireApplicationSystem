import { NgModule } from '@angular/core';
import {MatDialogModule} from "@angular/material/dialog";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { StaffDashboardComponent } from './components/staff/staff-dashboard/staff-dashboard.component';
import { StudentDashboardComponent } from './components/student/student-dashboard/student-dashboard.component';
import { AddQuestionComponent } from './components/staff/quiz/add-question/add-question.component';
import { CreateAnswerComponent } from './components/staff/quiz/create-answer/create-answer.component';
import { CreateQuestionComponent } from './components/staff/quiz/create-question/create-question.component';
import { CreateQuizComponent } from './components/staff/quiz/create-quiz/create-quiz.component';
import { ViewCourseQuizComponent } from './components/staff/quiz/view-course-quiz/view-course-quiz.component';
import { ViewQuestionComponent } from './components/staff/quiz/view-question/view-question.component';
import { ViewQuizComponent } from './components/staff/quiz/view-quiz/view-quiz.component';
import { StudentViewQuizComponent } from './components/student/student-view-quiz/student-view-quiz.component';
import { StudentHomeComponent } from './components/student/student-home/student-home.component';
import { TakeQuizComponent } from './components/student/take-quiz/take-quiz.component';
import { StaffViewResultComponent } from './components/staff/quiz/staff-view-result/staff-view-result.component';
import { StudentViewResultComponent } from './components/student/student-view-result/student-view-result.component';
import { ViewProfileComponent } from './components/student/view-profile/view-profile.component';
import { StaffLoginComponent } from './components/staff/staff-login/staff-login.component';
import { UpdateProfileComponent } from './components/student/update-profile/update-profile.component';
import { StudentLoginComponent } from './components/student/student-login/student-login.component';
import { AddStudentComponent } from './components/headmaster/add-student/add-student.component';
import { HeadMasterDashboardComponent } from './components/headmaster/head-master-dashboard/head-master-dashboard.component';
import { ViewStudentComponent } from './components/headmaster/view-student/view-student.component';
import { AddClassComponent } from './components/headmaster/add-class/add-class.component';
import { StaffSignUpComponent } from './components/staff/staff-sign-up/staff-sign-up.component';
import { AddSubjectComponent } from './components/headmaster/add-subject/add-subject.component';
import { AddTeacherSubjectComponent } from './components/headmaster/add-teacher-subject/add-teacher-subject.component';
import { StaffLoginCredentialsComponent } from './components/staff/staff-login-credentials/staff-login-credentials.component';
import { StaffViewStudentComponent } from './components/staff/staff-view-student/staff-view-student.component';

// import { ModalModule } from 'ngx-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    CreateQuizComponent,
    HomeComponent,
    CreateQuestionComponent,
    CreateAnswerComponent,
    ViewQuizComponent,
    AddQuestionComponent,
    ViewCourseQuizComponent,
    ViewQuestionComponent,
    StaffDashboardComponent,
    StudentDashboardComponent,
    StudentViewQuizComponent,
    StudentHomeComponent,
    TakeQuizComponent,
    StaffViewResultComponent,
    StudentViewResultComponent,
    ViewProfileComponent,
    StaffLoginComponent,
    UpdateProfileComponent,
    StudentLoginComponent,
    AddStudentComponent,
    HeadMasterDashboardComponent,
    ViewStudentComponent,
    AddClassComponent,
    StaffSignUpComponent,
    AddSubjectComponent,
    AddTeacherSubjectComponent,
    StaffLoginCredentialsComponent,
    StaffViewStudentComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    
    
    // ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[UpdateProfileComponent]
})
export class AppModule { }
