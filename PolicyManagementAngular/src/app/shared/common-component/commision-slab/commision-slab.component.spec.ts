import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommisionSlabComponent } from './commision-slab.component';

describe('CommisionSlabComponent', () => {
  let component: CommisionSlabComponent;
  let fixture: ComponentFixture<CommisionSlabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommisionSlabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommisionSlabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
