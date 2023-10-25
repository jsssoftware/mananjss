import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefrencemasterComponent } from './refrencemaster.component';

describe('RefrencemasterComponent', () => {
  let component: RefrencemasterComponent;
  let fixture: ComponentFixture<RefrencemasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefrencemasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefrencemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
