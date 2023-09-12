import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancebranchComponent } from './insurancebranch.component';

describe('InsurancebranchComponent', () => {
  let component: InsurancebranchComponent;
  let fixture: ComponentFixture<InsurancebranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsurancebranchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsurancebranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
