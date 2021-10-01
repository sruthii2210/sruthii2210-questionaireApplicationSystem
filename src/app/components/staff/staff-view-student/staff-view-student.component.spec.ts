import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffViewStudentComponent } from './staff-view-student.component';

describe('StaffViewStudentComponent', () => {
  let component: StaffViewStudentComponent;
  let fixture: ComponentFixture<StaffViewStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffViewStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffViewStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
