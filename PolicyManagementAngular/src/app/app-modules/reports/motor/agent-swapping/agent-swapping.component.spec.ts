import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentSwappingComponent } from './agent-swapping.component';

describe('AgentSwappingComponent', () => {
  let component: AgentSwappingComponent;
  let fixture: ComponentFixture<AgentSwappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentSwappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentSwappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
