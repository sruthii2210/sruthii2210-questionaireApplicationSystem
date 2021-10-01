import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadMasterDashboardComponent } from './head-master-dashboard.component';

describe('HeadMasterDashboardComponent', () => {
  let component: HeadMasterDashboardComponent;
  let fixture: ComponentFixture<HeadMasterDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadMasterDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadMasterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
