import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosPerfomanceComponent } from './pos-perfomance.component';

describe('PosPerfomanceComponent', () => {
  let component: PosPerfomanceComponent;
  let fixture: ComponentFixture<PosPerfomanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosPerfomanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosPerfomanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
