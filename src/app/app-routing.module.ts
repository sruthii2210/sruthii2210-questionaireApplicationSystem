import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddQuestionComponent } from './components/staff/quiz/add-question/add-question.component';
import { CreateAnswerComponent } from './components/staff/quiz/create-answer/create-answer.component';
import { CreateQuestionComponent } from './components/staff/quiz/create-question/create-question.component';
import { CreateQuizComponent } from './components/staff/quiz/create-quiz/create-quiz.component';
import { ViewCourseQuizComponent } from './components/staff/quiz/view-course-quiz/view-course-quiz.component';
import { ViewQuestionComponent } from './components/staff/quiz/view-question/view-question.component';
import { ViewQuizComponent } from './components/staff/quiz/view-quiz/view-quiz.component';
import { StaffDashboardComponent } from './components/staff/staff-dashboard/staff-dashboard.component';
import { StudentDashboardComponent } from './components/student/student-dashboard/student-dashboard.component';
import { StudentHomeComponent } from './components/student/student-home/student-home.component';
import { StudentViewQuizComponent } from './components/student/student-view-quiz/student-view-quiz.component';


const routes: Routes = [
  {
    path: 'staffdashboard', component: StaffDashboardComponent, children: [
      { path: 'createquiz', component: CreateQuizComponent },
      { path: 'createquestion', component: CreateQuestionComponent },
      { path: 'createanswer', component: CreateAnswerComponent },
      { path: 'viewquiz', component: ViewQuizComponent },
      { path: 'addquestion', component: AddQuestionComponent },
      { path: 'viewcoursequiz', component: ViewCourseQuizComponent },
      { path: 'viewquestion', component: ViewQuestionComponent },
    ]
  },
  {
    path: 'studentdashboard', component: StudentDashboardComponent, children: [
      { path: 'studentviewquiz', component: StudentViewQuizComponent },
      { path: 'studenthome', component: StudentHomeComponent },
    ]
  },
  { path: 'home', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
