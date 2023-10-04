import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclemodelComponent } from './vehiclemodel.component';

describe('VehiclemodelComponent', () => {
  let component: VehiclemodelComponent;
  let fixture: ComponentFixture<VehiclemodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclemodelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclemodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
