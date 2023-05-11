import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthPolicyManagementComponent } from './health-policy-management.component';

describe('HealthPolicyManagementComponent', () => {
  let component: HealthPolicyManagementComponent;
  let fixture: ComponentFixture<HealthPolicyManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthPolicyManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthPolicyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
