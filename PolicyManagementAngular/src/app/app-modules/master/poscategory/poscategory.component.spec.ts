import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoscategoryComponent } from './poscategory.component';

describe('PoscategoryComponent', () => {
  let component: PoscategoryComponent;
  let fixture: ComponentFixture<PoscategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoscategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoscategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
