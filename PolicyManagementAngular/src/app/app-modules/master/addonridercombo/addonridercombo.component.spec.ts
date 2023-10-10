import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddonridercomboComponent } from './addonridercombo.component';

describe('AddonridercomboComponent', () => {
  let component: AddonridercomboComponent;
  let fixture: ComponentFixture<AddonridercomboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddonridercomboComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddonridercomboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
