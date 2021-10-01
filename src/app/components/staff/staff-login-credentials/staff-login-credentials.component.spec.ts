import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffLoginCredentialsComponent } from './staff-login-credentials.component';

describe('StaffLoginCredentialsComponent', () => {
  let component: StaffLoginCredentialsComponent;
  let fixture: ComponentFixture<StaffLoginCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffLoginCredentialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffLoginCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
