import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirePolicyManagementComponent } from './fire-policy-management.component';

describe('FirePolicyManagementComponent', () => {
  let component: FirePolicyManagementComponent;
  let fixture: ComponentFixture<FirePolicyManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirePolicyManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirePolicyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
