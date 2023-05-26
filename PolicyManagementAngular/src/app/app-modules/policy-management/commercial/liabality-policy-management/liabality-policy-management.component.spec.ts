import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiabalityPolicyManagementComponent } from './liabality-policy-management.component';

describe('LiabalityPolicyManagementComponent', () => {
  let component: LiabalityPolicyManagementComponent;
  let fixture: ComponentFixture<LiabalityPolicyManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiabalityPolicyManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiabalityPolicyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
