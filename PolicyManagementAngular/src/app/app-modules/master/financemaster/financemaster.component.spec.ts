import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancemasterComponent } from './financemaster.component';

describe('FinancemasterComponent', () => {
  let component: FinancemasterComponent;
  let fixture: ComponentFixture<FinancemasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancemasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
