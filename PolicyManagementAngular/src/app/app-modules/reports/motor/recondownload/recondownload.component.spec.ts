import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecondownloadComponent } from './recondownload.component';

describe('RecondownloadComponent', () => {
  let component: RecondownloadComponent;
  let fixture: ComponentFixture<RecondownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecondownloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecondownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
