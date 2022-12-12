import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPolicyVoucherComponent } from './search-policy-voucher.component';

describe('SearchPolicyVoucherComponent', () => {
  let component: SearchPolicyVoucherComponent;
  let fixture: ComponentFixture<SearchPolicyVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPolicyVoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPolicyVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
