import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { StudentDashboardComponent } from './components/student/student-dashboard/student-dashboard.component';
import { StudentHomeComponent } from './components/student/student-home/student-home.component';
import { StudentViewQuizComponent } from './components/student/student-view-quiz/student-view-quiz.component';
import { StudentViewResultComponent } from './components/student/student-view-result/student-view-result.component';
import { TakeQuizComponent } from './components/student/take-quiz/take-quiz.component';


const routes: Routes = [
  { path: 'staffdashboard', component: StaffDashboardComponent },
  { path: 'createquiz', component: CreateQuizComponent },
  { path: 'createquestion', component: CreateQuestionComponent },
  { path: 'createanswer', component: CreateAnswerComponent },
  { path: 'viewquiz', component: ViewQuizComponent },
  { path: 'addquestion', component: AddQuestionComponent },
  { path: 'viewcoursequiz', component: ViewCourseQuizComponent },
  { path: 'viewquestion', component: ViewQuestionComponent },
  { path: 'studentdashboard', component: StudentDashboardComponent},
    {path: 'studentviewquiz', component: StudentViewQuizComponent},
     { path: 'takequiz', component: TakeQuizComponent },
    { path: 'studenthome', component: StudentHomeComponent },
    { path: 'takequiz', component: TakeQuizComponent},
    {path:'staffviewresult',component:StaffViewResultComponent},
    {path:'studentviewresult',component:StudentViewResultComponent},

  // { path: 'studentdashboard', component: StudentDashboardComponent, children: [
  //     {path: 'studentviewquiz', component: StudentViewQuizComponent,children:[ { path: 'takequiz', component: TakeQuizComponent }]},
  //     { path: 'studenthome', component: StudentHomeComponent },
  //     { path: 'takequiz', component: TakeQuizComponent,children:[{ path: 'studentdashboard', component: StudentDashboardComponent}] },
  //   ]
  // },

  { path: 'home', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
