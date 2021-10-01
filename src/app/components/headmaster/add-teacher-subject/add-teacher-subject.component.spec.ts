import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeacherSubjectComponent } from './add-teacher-subject.component';

describe('AddTeacherSubjectComponent', () => {
  let component: AddTeacherSubjectComponent;
  let fixture: ComponentFixture<AddTeacherSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTeacherSubjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeacherSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
