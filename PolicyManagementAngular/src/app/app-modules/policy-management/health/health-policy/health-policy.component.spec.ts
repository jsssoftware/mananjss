import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthPolicyComponent } from './health-policy.component';

describe('HealthPolicyComponent', () => {
  let component: HealthPolicyComponent;
  let fixture: ComponentFixture<HealthPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
