import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoscontactComponent } from './poscontact.component';

describe('PoscontactComponent', () => {
  let component: PoscontactComponent;
  let fixture: ComponentFixture<PoscontactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoscontactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoscontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
