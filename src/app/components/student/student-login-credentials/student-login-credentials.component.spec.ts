import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLoginCredentialsComponent } from './student-login-credentials.component';

describe('StudentLoginCredentialsComponent', () => {
  let component: StudentLoginCredentialsComponent;
  let fixture: ComponentFixture<StudentLoginCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentLoginCredentialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentLoginCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
