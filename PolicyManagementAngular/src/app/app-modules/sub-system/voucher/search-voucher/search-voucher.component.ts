import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropDownDto } from 'src/app/app-entites/dtos/common/drop-down-dto';
import { ISearchVoucherDto } from 'src/app/app-entites/dtos/voucher/search-voucher-dto';
import { ISearchVoucherModel } from 'src/app/app-entites/models/voucher/search-voucher-model';
import { ICommonService } from 'src/app/app-services/common-service/abstracts/common.iservice';
import { ICustomerService } from 'src/app/app-services/customer-service/abstracts/customer.iservice';
import { IVoucherService } from 'src/app/app-services/voucher/abstracts/voucher.iservice';
import { Vertical } from 'src/app/shared/utilities/enums/enum';

@Component({
  selector: 'app-search-voucher',
  templateUrl: './search-voucher.component.html',
  styleUrls: ['./search-voucher.component.css']
})
export class SearchVoucherComponent implements OnInit, AfterViewInit {

  public _form: string = '';
  public _header: string = '';
  public _branchId: number;
  public _customers: IDropDownDto<number>[] = [];
  public _filteredOptions: IDropDownDto<number>[] = [];
  public _insuranceCompanies: IDropDownDto<number>[] = [];
  public _filteredInsuranceCompaniesOptions: IDropDownDto<number>[] = [];
  public _posDatas: IDropDownDto<number>[] = [];
  public _filteredPosOptions: IDropDownDto<number>[] = [];
  public _vouchers: ISearchVoucherDto[] = [];
  displayedColumns: string[] = [
    'voucherNumber',
    'voucherDateString',
    'voucherAmount',
    'policyNumber',
    'voucherType',
    'paymentMode',
    'bank',
    'instrumentNumber',
    'pos',
    'customer',
    'insuranceCompany',
    'teamMember'
  ];

  constructor(private voucherService: IVoucherService,
    private customerService: ICustomerService,
    private commonService: ICommonService,
    private route: ActivatedRoute,
    private router: Router) {
    const formType = this.route.snapshot.paramMap.get('form-type') as string;
    switch (formType) {
      case '1':
        this._header = 'View';
        break;
      case '2':
        this._header = 'Verification';
        break;
      case '3':
        this._header = 'Updation';
        break;
      case '4':
        this._header = 'Updation (Control Number Only)';
        break;
    }
    this._form = formType;
    this._branchId = parseInt(sessionStorage.getItem("branchId") as string);
  }

  ngOnInit(): void {
    this.searchVoucherForm.get("customerName")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterCustomerData(input);
      else
        this.filterCustomerData(input.Name);
    });

    this.searchVoucherForm.get("posId")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterPosData(input);
      else
        this.filterPosData(input.Name);
    });

    this.searchVoucherForm.get("insuranceCompanyId")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterInsurancerCompaniesData(input);
      else
        this.filterInsurancerCompaniesData(input.Name);
    });
  }

  ngAfterViewInit(): void {
    this.getCustomers();
    this.getPos();
    this.getInsuranceCompanies();
  }

  searchVoucherForm = new FormGroup({
    posId: new FormControl(''),
    customerName: new FormControl(''),
    voucherNumber: new FormControl(''),
    insuranceCompanyId: new FormControl(''),
    policyNumber: new FormControl(''),
    voucherStartFromDate: new FormControl(''),
    voucherStartToDate: new FormControl('')
  });

  filterCustomerData(input: any) {
    if (input === undefined)
      return;
    this._filteredOptions = this._customers.filter(item => {
      return item.Name.toLowerCase().indexOf(input.toLowerCase()) > -1
    });
  }

  filterPosData(input: any) {
    if (input === undefined)
      return;
    this._filteredPosOptions = this._posDatas.filter(item => {
      return item.Name.toLowerCase().indexOf(input.toLowerCase()) > -1
    });
  }

  filterInsurancerCompaniesData(input: any) {
    if (input === undefined)
      return;
    this._filteredInsuranceCompaniesOptions = this._insuranceCompanies.filter(item => {
      return item.Name.toLowerCase().indexOf(input.toLowerCase()) > -1
    });
  }

  displayFn(data: any): string {
    return data && data.Name ? data.Name : '';
  }

  onSubmit(): void {
    this.searchVouchers();
  };

  onShowAll(): void {
    this.reset();
    this.searchVouchers(true);
  }

  searchVouchers(isShowAll: boolean = false): void {
    const model = this.getPayload();
    model.IsShowAll = isShowAll;
    this.voucherService.searchVouchers(model).subscribe((response: ISearchVoucherDto[]) => {
      this._vouchers = response;
    });
  }

  getCustomers(): void {
    this.customerService.getCustomerNames().subscribe((response: IDropDownDto<number>[]) => {
      this._customers = response;
    });
  }

  getInsuranceCompanies(): void {
    this.commonService.getInsuranceCompanies(Vertical.All).subscribe((response: IDropDownDto<number>[]) => {
      this._insuranceCompanies = response;
    });
  }

  getPos(vertical: number = 0): void {
    this.commonService.getPos(vertical, this._branchId).subscribe((response: IDropDownDto<number>[]) => {
      this._posDatas = response;
    });
  }

  private getPayload(): ISearchVoucherModel {
    let data = this.searchVoucherForm.get('customerName')?.value
    let customerId;
    let customerName;

    if (data) {
      if (typeof (data) == "string") { customerName = data; }
      else {
        customerId = data.Value;
        customerName = data.Name;
      }
    }

    return {
      CustomerId: customerId,
      CustomerName: customerName,
      PolicyNumber: this.searchVoucherForm.get('policyNumber')?.value,
      VoucherStartFromDate: this.commonService.getDateInString(this.searchVoucherForm.get('voucherStartFromDate')?.value),
      VoucherStartToDate: this.commonService.getDateInString(this.searchVoucherForm.get('voucherStartToDate')?.value),
      InsuranceCompanyId: this.searchVoucherForm.get('insuranceCompanyId')?.value?.Value,
      PosId: this.searchVoucherForm.get('posId')?.value?.Value,
      VoucherNumber: this.searchVoucherForm.get('voucherNumber')?.value,
      Mode: parseInt(this._form),
      IsShowAll: false
    };
  }

  navigate(data: ISearchVoucherDto): void {
    this.router.navigate(["/subsystem/voucher-form", "update", data.VoucherId, this._form]);
  }

  reset(): void {
    this.searchVoucherForm.reset();
    this._vouchers = [];
  }
}