import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentSwapDialogComponent } from './agent-swap-dialog.component';

describe('AgentSwapDialogComponent', () => {
  let component: AgentSwapDialogComponent;
  let fixture: ComponentFixture<AgentSwapDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentSwapDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentSwapDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
