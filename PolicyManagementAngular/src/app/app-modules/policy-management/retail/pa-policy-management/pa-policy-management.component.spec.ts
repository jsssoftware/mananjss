import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaPolicyManagementComponent } from './pa-policy-management.component';

describe('PaPolicyManagementComponent', () => {
  let component: PaPolicyManagementComponent;
  let fixture: ComponentFixture<PaPolicyManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaPolicyManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaPolicyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
