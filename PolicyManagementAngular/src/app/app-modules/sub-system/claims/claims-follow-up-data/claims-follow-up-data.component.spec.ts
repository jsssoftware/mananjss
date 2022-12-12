import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsFollowUpDataComponent } from './claims-follow-up-data.component';

describe('ClaimsFollowUpDataComponent', () => {
  let component: ClaimsFollowUpDataComponent;
  let fixture: ComponentFixture<ClaimsFollowUpDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimsFollowUpDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsFollowUpDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
