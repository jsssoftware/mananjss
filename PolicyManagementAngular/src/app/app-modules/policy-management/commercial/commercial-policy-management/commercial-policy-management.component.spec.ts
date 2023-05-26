import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialPolicyManagementComponent } from './commercial-policy-management.component';

describe('CommercialPolicyManagementComponent', () => {
  let component: CommercialPolicyManagementComponent;
  let fixture: ComponentFixture<CommercialPolicyManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommercialPolicyManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommercialPolicyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
