import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffViewResultComponent } from './staff-view-result.component';

describe('StaffViewResultComponent', () => {
  let component: StaffViewResultComponent;
  let fixture: ComponentFixture<StaffViewResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffViewResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffViewResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
