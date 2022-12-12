import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IDropDownDto } from 'src/app/app-entites/dtos/common/drop-down-dto';
import { IVoucherSearchPolicyDto } from 'src/app/app-entites/dtos/voucher/voucher-search-policy-dto';
import { IVoucherSearchPolicyModel } from 'src/app/app-entites/models/voucher/voucher-search-policy-model';
import { ICommonService } from 'src/app/app-services/common-service/abstracts/common.iservice';
import { ICustomerService } from 'src/app/app-services/customer-service/abstracts/customer.iservice';
import { IVoucherService } from 'src/app/app-services/voucher/abstracts/voucher.iservice';
import { Vertical } from 'src/app/shared/utilities/enums/enum';

@Component({
  selector: 'app-search-policy-voucher',
  templateUrl: './search-policy-voucher.component.html',
  styleUrls: ['./search-policy-voucher.component.css']
})
export class SearchPolicyVoucherComponent implements OnInit, AfterViewInit {

  //#region Variables
  public _branchId: number;
  public _insuranceCompanies: IDropDownDto<number>[] = [];
  public _filteredInsuranceCompaniesOptions: IDropDownDto<number>[] = [];
  public _posDatas: IDropDownDto<number>[] = [];
  public _filteredPosOptions: IDropDownDto<number>[] = [];
  public _customers: IDropDownDto<number>[] = [];
  public _filteredOptions: IDropDownDto<number>[] = [];
  public _policies: IVoucherSearchPolicyDto[] = [];
  displayedColumns: string[] = [
    'controlNumber',
    'policyNumber',
    'customer',
    'pos',
    'insuranceCompany',
    'policyStartDate',
    'grossPremium',
    'telecaller',
    'vertical'
  ];
  //#endregion

  //#region 
  policySearchForm = new FormGroup({
    posId: new FormControl(''),
    customerName: new FormControl(''),
    controlNumber: new FormControl(''),
    insuranceCompanyId: new FormControl(''),
    policyNumber: new FormControl(''),
    policyStartFromDate: new FormControl(''),
    policyStartToDate: new FormControl('')
  });
  //#endregion

  constructor(private voucherService: IVoucherService,
    private commonService: ICommonService,
    private customerService: ICustomerService,
    private dialogRef: MatDialogRef<SearchPolicyVoucherComponent>) {
    dialogRef.disableClose = true;
    this._branchId = parseInt(sessionStorage.getItem("branchId") as string);
  }

  ngOnInit(): void {
    this.policySearchForm.get("customerName")?.valueChanges.subscribe(input => {
      if (typeof (input) == "string")
        this.filterCustomerData(input);
      else
        this.filterCustomerData(input.Name);
    });

    this.policySearchForm.get("posId")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterPosData(input);
      else
        this.filterPosData(input.Name);
    });

    this.policySearchForm.get("insuranceCompanyId")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterInsurancerCompaniesData(input);
      else
        this.filterInsurancerCompaniesData(input.Name);
    });
  }

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

  ngAfterViewInit(): void {
    this.getInsuranceCompanies();
    this.getPos();
    this.getCustomers();
  }

  onSubmit() {
    if (this.policySearchForm.invalid) return;
    const model = this.getPayload();
    this.voucherService.searchPolicies(model).subscribe((response: IVoucherSearchPolicyDto[]) => {
      this._policies = response;
    });
  };

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

  getCustomers(): void {
    this.customerService.getCustomerNames().subscribe((response: IDropDownDto<number>[]) => {
      this._customers = response;
    });
  }

  private getPayload(): IVoucherSearchPolicyModel {
    let data = this.policySearchForm.get('customerName')?.value
    let customerId;
    let customerName;
    if (typeof (data) == "string") { customerName = data; }
    else {
      customerId = data.Value;
      customerName = data.Name;
    }

    return {
      ControlNumber: this.policySearchForm.get('controlNumber')?.value,
      CustomerId: customerId,
      CustomerName: customerName,
      PolicyNumber: this.policySearchForm.get('policyNumber')?.value,
      PolicyStartFromDate: this.commonService.getDateInString(this.policySearchForm.get('policyStartFromDate')?.value),
      PolicyStartToDate: this.commonService.getDateInString(this.policySearchForm.get('policyStartToDate')?.value),
      InsuranceCompanyId: this.policySearchForm.get('insuranceCompanyId')?.value?.Value,
      PosId: this.policySearchForm.get('posId')?.value?.Value,
    };
  }

  setPolicyData(data: IVoucherSearchPolicyDto): void {
    this.dialogRef.close(data);
  }

  close(): void {
    this.dialogRef.close(null);
  }
}