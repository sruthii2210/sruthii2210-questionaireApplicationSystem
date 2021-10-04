import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { add } from 'ngx-bootstrap/chronos';
import { AddClassComponent } from './components/headmaster/add-class/add-class.component';
import { AddStudentComponent } from './components/headmaster/add-student/add-student.component';
import { AddSubjectComponent } from './components/headmaster/add-subject/add-subject.component';
import { AddTeacherSubjectComponent } from './components/headmaster/add-teacher-subject/add-teacher-subject.component';
import { HeadMasterDashboardComponent } from './components/headmaster/head-master-dashboard/head-master-dashboard.component';
import { ViewStudentComponent } from './components/headmaster/view-student/view-student.component';
import { HomeComponent } from './components/home/home.component';
import { AddQuestionComponent } from './components/staff/quiz/add-question/add-question.component';
import { CreateAnswerComponent } from './components/staff/quiz/create-answer/create-answer.component';
import { CreateQuestionComponent } from './components/staff/quiz/create-question/create-question.component';
import { CreateQuizComponent } from './components/staff/quiz/create-quiz/create-quiz.component';
import { StaffViewResultComponent } from './components/staff/quiz/staff-view-result/staff-view-result.component';
import { ViewCourseQuizComponent } from './components/staff/quiz/view-course-quiz/view-course-quiz.component';
import { ViewQuestionComponent } from './components/staff/quiz/view-question/view-question.component';
import { ViewQuizComponent } from './components/staff/quiz/view-quiz/view-quiz.component';
import { StaffDashboardComponent } from './components/staff/staff-dashboard/staff-dashboard.component';
import { StaffLoginCredentialsComponent } from './components/staff/staff-login-credentials/staff-login-credentials.component';
import { StaffLoginComponent } from './components/staff/staff-login/staff-login.component';
import { StaffSignUpComponent } from './components/staff/staff-sign-up/staff-sign-up.component';
import { StaffViewStudentComponent } from './components/staff/staff-view-student/staff-view-student.component';
import { StudentDashboardComponent } from './components/student/student-dashboard/student-dashboard.component';
import { StudentHomeComponent } from './components/student/student-home/student-home.component';
import { StudentLoginCredentialsComponent } from './components/student/student-login-credentials/student-login-credentials.component';
import { StudentLoginComponent } from './components/student/student-login/student-login.component';
import { StudentViewQuizComponent } from './components/student/student-view-quiz/student-view-quiz.component';
import { StudentViewResultComponent } from './components/student/student-view-result/student-view-result.component';
import { TakeQuizComponent } from './components/student/take-quiz/take-quiz.component';
import { UpdateProfileComponent } from './components/student/update-profile/update-profile.component';
import { ViewProfileComponent } from './components/student/view-profile/view-profile.component';


const routes: Routes = [

  {path:'',component:HomeComponent},
  
 
  // { path: 'studentdashboard', component: StudentDashboardComponent},
  //   {path: 'studentviewquiz', component: StudentViewQuizComponent},
  //    { path: 'takequiz', component: TakeQuizComponent },
  //   { path: 'studenthome', component: StudentHomeComponent },
  //  { path: 'takequiz', component: TakeQuizComponent},
  // { path: 'staffviewresult', component: StaffViewResultComponent },
  // {path:'studentviewresult',component:StudentViewResultComponent},
  //{path:'studentviewprofile',component:ViewProfileComponent},
  //{path:'studentupdateprofile',component:UpdateProfileComponent},


  { path: 'stafflogin', component: StaffLoginComponent },
  { path: 'studentlogin', component: StudentLoginComponent },
  { path: 'stafflogincredentials', component: StaffLoginCredentialsComponent },

  { path: 'headmasterdashboard', component: HeadMasterDashboardComponent,children:[
    { path: 'addstudent', component: AddStudentComponent },
  { path: 'viewstudent', component: ViewStudentComponent },
  { path: 'addclass', component: AddClassComponent },
  { path: 'staffsignup', component: StaffSignUpComponent },
  { path: 'addsubject', component: AddSubjectComponent },
  { path: 'addteachersubject', component: AddTeacherSubjectComponent },
  ] },

  { path: 'studentlogincredentials', component: StudentLoginCredentialsComponent },

  {
    path: 'studentdashboard', component: StudentDashboardComponent, children: [
      { path: 'studentviewquiz', component: StudentViewQuizComponent },
      { path: 'studenthome', component: StudentHomeComponent },
      { path: 'takequiz', component: TakeQuizComponent },
      { path: 'studentviewprofile', component: ViewProfileComponent, children: [{ path: 'studentupdateprofile', component: UpdateProfileComponent }] },
      { path: 'studentviewresult', component: StudentViewResultComponent },

    ]
  },

  {
    path: 'staffdashboard', component: StaffDashboardComponent, children: [
      { path: 'createquiz', component: CreateQuizComponent },
      { path: 'createquestion', component: CreateQuestionComponent },
      { path: 'createanswer', component: CreateAnswerComponent },
      { path: 'viewquiz', component: ViewQuizComponent },
      { path: 'addquestion', component: AddQuestionComponent },
      { path: 'viewcoursequiz', component: ViewCourseQuizComponent },
      { path: 'viewquestion', component: ViewQuestionComponent },
      { path: 'staffviewresult', component: StaffViewResultComponent },
      { path: 'staffviewstudent', component: StaffViewStudentComponent },
    ]
  },

  { path: 'home', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
