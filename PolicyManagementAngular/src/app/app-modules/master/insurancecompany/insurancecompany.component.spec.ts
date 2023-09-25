import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancecompanyComponent } from './insurancecompany.component';

describe('InsurancecompanyComponent', () => {
  let component: InsurancecompanyComponent;
  let fixture: ComponentFixture<InsurancecompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsurancecompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsurancecompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
