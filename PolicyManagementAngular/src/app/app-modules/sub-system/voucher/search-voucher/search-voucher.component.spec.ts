import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchVoucherComponent } from './search-voucher.component';

describe('SearchVoucherComponent', () => {
  let component: SearchVoucherComponent;
  let fixture: ComponentFixture<SearchVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchVoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
