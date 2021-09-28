import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentViewResultComponent } from './student-view-result.component';

describe('StudentViewResultComponent', () => {
  let component: StudentViewResultComponent;
  let fixture: ComponentFixture<StudentViewResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentViewResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentViewResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
