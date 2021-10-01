import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffSignUpComponent } from './staff-sign-up.component';

describe('StaffSignUpComponent', () => {
  let component: StaffSignUpComponent;
  let fixture: ComponentFixture<StaffSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffSignUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
