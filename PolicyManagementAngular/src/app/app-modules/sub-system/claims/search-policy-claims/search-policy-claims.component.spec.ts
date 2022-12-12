import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPolicyClaimsComponent } from './search-policy-claims.component';

describe('SearchPolicyClaimsComponent', () => {
  let component: SearchPolicyClaimsComponent;
  let fixture: ComponentFixture<SearchPolicyClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPolicyClaimsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPolicyClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
