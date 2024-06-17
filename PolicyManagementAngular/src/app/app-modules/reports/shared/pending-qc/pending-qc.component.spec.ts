import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingQcComponent } from './pending-qc.component';

describe('PendingQcComponent', () => {
  let component: PendingQcComponent;
  let fixture: ComponentFixture<PendingQcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingQcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingQcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
