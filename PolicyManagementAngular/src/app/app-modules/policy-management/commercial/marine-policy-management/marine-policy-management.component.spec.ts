import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarinePolicyManagementComponent } from './marine-policy-management.component';

describe('MarinePolicyManagementComponent', () => {
  let component: MarinePolicyManagementComponent;
  let fixture: ComponentFixture<MarinePolicyManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarinePolicyManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarinePolicyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
