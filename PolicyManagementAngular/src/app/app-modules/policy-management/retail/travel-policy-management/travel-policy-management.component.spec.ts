import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelPolicyManagementComponent } from './travel-policy-management.component';

describe('TravelPolicyManagementComponent', () => {
  let component: TravelPolicyManagementComponent;
  let fixture: ComponentFixture<TravelPolicyManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelPolicyManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelPolicyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
