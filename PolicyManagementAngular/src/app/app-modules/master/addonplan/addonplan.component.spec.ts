import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddonplanComponent } from './addonplan.component';

describe('AddonplanComponent', () => {
  let component: AddonplanComponent;
  let fixture: ComponentFixture<AddonplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddonplanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddonplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
