import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCourseQuizComponent } from './view-course-quiz.component';

describe('ViewCourseQuizComponent', () => {
  let component: ViewCourseQuizComponent;
  let fixture: ComponentFixture<ViewCourseQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCourseQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCourseQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
