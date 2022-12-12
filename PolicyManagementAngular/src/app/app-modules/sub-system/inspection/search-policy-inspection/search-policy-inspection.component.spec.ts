import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPolicyInspectionComponent } from './search-policy-inspection.component';

describe('SearchPolicyInspectionComponent', () => {
  let component: SearchPolicyInspectionComponent;
  let fixture: ComponentFixture<SearchPolicyInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPolicyInspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPolicyInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
