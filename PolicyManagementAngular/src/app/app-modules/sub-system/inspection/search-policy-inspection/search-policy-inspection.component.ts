import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IDropDownDto } from 'src/app/app-entites/dtos/common/drop-down-dto';
import { IInspectionSearchPolicyDto } from 'src/app/app-entites/dtos/inspection/inspection-search-policy-dto';
import { IInspectionSearchPolicyModel } from 'src/app/app-entites/models/inspection/inspection-search-policy-model';
import { ICommonService } from 'src/app/app-services/common-service/abstracts/common.iservice';
import { ICustomerService } from 'src/app/app-services/customer-service/abstracts/customer.iservice';
import { IInspectionService } from 'src/app/app-services/inspection/abstracts/inspection.iservice';
import { Vertical } from 'src/app/shared/utilities/enums/enum';

@Component({
  selector: 'app-search-policy-inspection',
  templateUrl: './search-policy-inspection.component.html',
  styleUrls: ['./search-policy-inspection.component.css']
})
export class SearchPolicyInspectionComponent implements OnInit {

  //#region Variables
  public _branchId: number;
  public _insuranceCompanies: IDropDownDto<number>[] = [];
  public _filteredInsuranceCompaniesOptions: IDropDownDto<number>[] = [];
  public _posDatas: IDropDownDto<number>[] = [];
  public _filteredPosOptions: IDropDownDto<number>[] = [];
  public _customers: IDropDownDto<number>[] = [];
  public _filteredOptions: IDropDownDto<number>[] = [];
  public _policies: IInspectionSearchPolicyDto[] = [];
  public _manufacturers: IDropDownDto<number>[] = [];
  public _filteredManufacturers: IDropDownDto<number>[] = [];
  public _models: IDropDownDto<number>[] = [];
  displayedColumns: string[] = [
    'ControlNumber',
    'Customer',
    'RegistrationNumber',
    'Manufacturer',
    'Model',
    'MakeYear',
    'InsuranceCompany',
    'Pos',
    'PolicyExpiryString'
  ];
  //#endregion

  //#region 
  policySearchForm = new FormGroup({
    posId: new FormControl(''),
    customerName: new FormControl(''),
    customerPhone: new FormControl(''),
    controlNumber: new FormControl(''),
    insuranceCompanyId: new FormControl(''),
    policyNumber: new FormControl(''),
    policyStartFromDate: new FormControl(''),
    policyStartToDate: new FormControl(''),
    manufacturer: new FormControl(''),
    modelId: new FormControl(''),
    registrationNumber: new FormControl('')
  });
  //#endregion

  constructor(private inspectionService: IInspectionService,
    private commonService: ICommonService,
    private customerService: ICustomerService,
    private dialogRef: MatDialogRef<SearchPolicyInspectionComponent>) {
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

    this.policySearchForm.get("manufacturer")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterManufacturerData(input);
      else
        this.filterManufacturerData(input.Name);
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

  filterManufacturerData(input: any) {
    if (input === undefined)
      return;
    this._filteredManufacturers = this._manufacturers.filter(item => {
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
    this.getManufacturers();
  }

  onSubmit() {
    if (this.policySearchForm.invalid) return;
    const model = this.getPayload();
    this.inspectionService.searchPolicies(model).subscribe((response: IInspectionSearchPolicyDto[]) => {
      this._policies = response;
    });
  };

  getInsuranceCompanies(): void {
    this.commonService.getInsuranceCompanies(Vertical.Motor).subscribe((response: IDropDownDto<number>[]) => {
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

  getManufacturers(): void {
    this.commonService.getManufacturers().subscribe((response: any) => {
      this._manufacturers = response;
    });
  }

  getModels(manufacturerId: any): any {
    this.commonService.getModels(manufacturerId).subscribe((response: IDropDownDto<number>[]) => {
      this._models = response;
    });
  }

  private getPayload(): IInspectionSearchPolicyModel {
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
      BranchId: this._branchId,
      CustomerPhone: this.policySearchForm.get('customerPhone')?.value,
      RegistrationNumber: this.policySearchForm.get('registrationNumber')?.value,
      ManufacturerId: this.policySearchForm.get('manufacturer')?.value?.Value,
      ModelId: this.policySearchForm.get('modelId')?.value,
    };
  }

  setPolicyData(data: IInspectionSearchPolicyDto): void {
    this.dialogRef.close(data);
  }

  close(): void {
    this.dialogRef.close(null);
  }

  onReset() {
    this.policySearchForm.reset();
    this._policies = [];
  }

}
