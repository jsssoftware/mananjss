import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscPolicyManagementComponent } from './misc-policy-management.component';

describe('MiscPolicyManagementComponent', () => {
  let component: MiscPolicyManagementComponent;
  let fixture: ComponentFixture<MiscPolicyManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscPolicyManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscPolicyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
