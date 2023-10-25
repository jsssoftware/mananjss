import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtozonemasterComponent } from './rtozonemaster.component';

describe('RtozonemasterComponent', () => {
  let component: RtozonemasterComponent;
  let fixture: ComponentFixture<RtozonemasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RtozonemasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RtozonemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
