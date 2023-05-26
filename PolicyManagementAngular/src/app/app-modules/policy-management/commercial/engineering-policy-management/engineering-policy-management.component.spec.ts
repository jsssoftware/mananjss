import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineeringPolicyManagementComponent } from './engineering-policy-management.component';

describe('EngineeringPolicyManagementComponent', () => {
  let component: EngineeringPolicyManagementComponent;
  let fixture: ComponentFixture<EngineeringPolicyManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineeringPolicyManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EngineeringPolicyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
