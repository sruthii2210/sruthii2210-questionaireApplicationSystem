import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentViewQuizComponent } from './student-view-quiz.component';

describe('StudentViewQuizComponent', () => {
  let component: StudentViewQuizComponent;
  let fixture: ComponentFixture<StudentViewQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentViewQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentViewQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
