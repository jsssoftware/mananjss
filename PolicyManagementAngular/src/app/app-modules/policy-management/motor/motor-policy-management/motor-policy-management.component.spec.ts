import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorPolicyManagementComponent } from './motor-policy-management.component';

describe('MotorPolicyManagementComponent', () => {
  let component: MotorPolicyManagementComponent;
  let fixture: ComponentFixture<MotorPolicyManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotorPolicyManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotorPolicyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
