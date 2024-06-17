import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostDataCallingComponent } from './lost-data-calling.component';

describe('LostDataCallingComponent', () => {
  let component: LostDataCallingComponent;
  let fixture: ComponentFixture<LostDataCallingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LostDataCallingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LostDataCallingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
