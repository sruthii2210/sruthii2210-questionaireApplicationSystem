import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
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
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
