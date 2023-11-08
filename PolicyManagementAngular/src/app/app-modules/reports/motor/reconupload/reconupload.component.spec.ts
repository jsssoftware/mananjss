import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconuploadComponent } from './reconupload.component';

describe('ReconuploadComponent', () => {
  let component: ReconuploadComponent;
  let fixture: ComponentFixture<ReconuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconuploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReconuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
