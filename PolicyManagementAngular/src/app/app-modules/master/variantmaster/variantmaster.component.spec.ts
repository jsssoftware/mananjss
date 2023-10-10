import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantmasterComponent } from './variantmaster.component';

describe('VariantmasterComponent', () => {
  let component: VariantmasterComponent;
  let fixture: ComponentFixture<VariantmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariantmasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
