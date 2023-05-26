import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GmcPolicyManagementComponent } from './gmc-policy-management.component';

describe('GmcPolicyManagementComponent', () => {
  let component: GmcPolicyManagementComponent;
  let fixture: ComponentFixture<GmcPolicyManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GmcPolicyManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GmcPolicyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
