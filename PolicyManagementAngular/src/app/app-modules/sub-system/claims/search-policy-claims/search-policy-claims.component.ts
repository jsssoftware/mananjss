import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropDownDto } from 'src/app/app-entites/dtos/common/drop-down-dto';
import { ISearchPolicyDto } from 'src/app/app-entites/dtos/common/search-policy-dto';
import { ICommonService } from 'src/app/app-services/common-service/abstracts/common.iservice';
import { ICustomerService } from 'src/app/app-services/customer-service/abstracts/customer.iservice';
import { FormMode, Vertical } from 'src/app/shared/utilities/enums/enum';
import { IClaimsSearchPolicyModel } from 'src/app/app-entites/models/claims/claims-search-policy-model';
import { IClaimsService } from 'src/app/app-services/claims/abstracts/claims.iservice';
import { IClaimsSearchPolicyDto } from 'src/app/app-entites/dtos/claims/claims-search-policy-dto';

@Component({
  selector: 'app-search-policy-claims',
  templateUrl: './search-policy-claims.component.html',
  styleUrls: ['./search-policy-claims.component.css']
})
export class SearchPolicyClaimsComponent implements OnInit {

  public _form: string = '';
  public _header: string = '';
  public _branchId: number;
  public _customers: IDropDownDto<number>[] = [];
  public _filteredOptions: IDropDownDto<number>[] = [];
  public _insuranceCompanies: IDropDownDto<number>[] = [];
  public _filteredInsuranceCompaniesOptions: IDropDownDto<number>[] = [];
  public _posDatas: IDropDownDto<number>[] = [];
  public _VerticalDatas: IDropDownDto<number>[] = [];
  public _filteredPosOptions: IDropDownDto<number>[] = [];
  public _filteredVerticalsOptions: IDropDownDto<number>[] = [];
  public _manufacturers: IDropDownDto<number>[] = [];
  public _filteredManufacturers: IDropDownDto<number>[] = [];
  public _verticals: any;
  public _models: IDropDownDto<number>[] = [];
  public _products: IDropDownDto<number>[] = [];

  displayedColumns: string[] = [
    'controlNumber',
    'customer',
    'policyExpiry',
    'insuranceCompany',
    'registrationNumber',
    'model',
    'vertical',
    'product',
    'pos'
  ];

  public _policyDatas: IClaimsSearchPolicyDto[] = [];
  public _length: number = 0;
  public _pageSize: number = 20;
  public _pageNumber: number = 0;
  public _input: string = "";
  public _showAll: boolean = false;
  @ViewChild(MatPaginator) _paginator!: MatPaginator;

  claimsForm = new FormGroup({
    posId: new FormControl(''),
    customerName: new FormControl(''),
    customerPhone: new FormControl(''),
    insuranceCompanyId: new FormControl(''),
    policyNumber: new FormControl(''),
    policyStartFromDate: new FormControl(''),
    policyStartToDate: new FormControl(''),
    vertical: new FormControl(''),
    manufacturer: new FormControl(''),
    model: new FormControl(''),
    product: new FormControl(''),
    registrationNumber: new FormControl(''),
    controlNumber: new FormControl(''),
    hasExpiredData: new FormControl(false)
  });

  constructor(
    private customerService: ICustomerService,
    private commonService: ICommonService,
    private claimsService: IClaimsService,
    private route: ActivatedRoute,
    private router: Router) {
    this._branchId = parseInt(sessionStorage.getItem("branchId") as string);
  }

  ngOnInit(): void {
    this.claimsForm.get("customerName")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterCustomerData(input);
      else
        this.filterCustomerData(input.Name);
    });

    this.claimsForm.get("posId")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterPosData(input);
      else
        this.filterPosData(input.Name);
    });

    this.claimsForm.get("insuranceCompanyId")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterInsurancerCompaniesData(input);
      else
        this.filterInsurancerCompaniesData(input.Name);
    });

    this.claimsForm.get("manufacturer")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterManufacturerData(input);
      else
        this.filterManufacturerData(input.Name);
    });

    this.claimsForm.get("vertical")?.valueChanges.subscribe(value => {
      if (value === 1) {
        this.claimsForm.get('product')?.disable();
        this.claimsForm.get('product')?.reset();
        this.claimsForm.get('model')?.enable();
        this.claimsForm.get('model')?.reset();
        this.claimsForm.get('manufacturer')?.enable();
        this.claimsForm.get('manufacturer')?.reset();
        this.claimsForm.get('registrationNumber')?.enable();
        this.claimsForm.get('registrationNumber')?.reset();
      }
      else {
        this.claimsForm.get('product')?.enable();
        this.claimsForm.get('product')?.reset();
        this.claimsForm.get('model')?.disable();
        this.claimsForm.get('model')?.reset();
        this.claimsForm.get('manufacturer')?.disable();
        this.claimsForm.get('manufacturer')?.reset();
        this.claimsForm.get('registrationNumber')?.disable();
        this.claimsForm.get('registrationNumber')?.reset();
      }
    });
  }

  ngAfterViewInit(): void {
    this.getCustomers();
    this.getPos();
    this.getInsuranceCompanies();
    this.getManufacturers();
    this.getVerticals();
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

  getManufacturers(): void {
    this.commonService.getManufacturers().subscribe((response: any) => {
      this._manufacturers = response;
    });
  }

  getVerticals(): void {
    this.commonService.getVerticals().subscribe((response: any) => {
      this._verticals = response;
    });
  }

  getModels(manufacturerId: any): any {
    this.commonService.getModels(manufacturerId).subscribe((response: IDropDownDto<number>[]) => {
      this._models = response;
    });
  }

  getProducts(verticalId: number): any {
    this.commonService.getProducts(verticalId).subscribe((response: IDropDownDto<number>[]) => {
      this._products = response;
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

  getPos(Vertical: number = 0): void {
    this.commonService.getPos(Vertical, this._branchId).subscribe((response: IDropDownDto<number>[]) => {
      this._posDatas = response;
    });
  }

  displayFn(data: any): string {
    return data && data.Name ? data.Name : '';
  }

  onSubmit(): void {
    this.searchPolicy()
  };

  searchPolicy(): void {
    let model = this.getPayload();
    this.claimsService.searchPolicies(model).subscribe((response: IClaimsSearchPolicyDto[]) => {
      this._policyDatas = response;
    });
  }

  getPayload(): IClaimsSearchPolicyModel {
    return {
      ControlNumber: this.claimsForm.value.controlNumber,
      CustomerName: this.claimsForm.value.customerName,
      InsuranceCompanyId: this.getAutoCompleteDropdownValue(this.claimsForm.value.insuranceCompanyId),
      PolicyNumber: this.claimsForm.value.policyNumber,
      RegistrationNumber: this.claimsForm.value.registrationNumber,
      ManufactureId: this.getAutoCompleteDropdownValue(this.claimsForm.value.manufacturer),
      ModelId: this.claimsForm.value.model,
      PosId: this.getAutoCompleteDropdownValue(this.claimsForm.value.posId),
      PolicyStartFromDate: this.commonService.getDateInString(this.claimsForm.value.policyStartFromDate),
      PolicyStartToDate: this.commonService.getDateInString(this.claimsForm.value.policyStartToDate),
      ProductId: this.claimsForm.value.product,
      VerticalId: this.claimsForm.value.vertical,
      CustomerPhone: this.claimsForm.value.customerPhone,
      HasExpiredData: this.claimsForm.value.hasExpiredData,
    };
  }

  getAutoCompleteDropdownValue(data: any): number | undefined {
    if (data && data != undefined)
      return data.Value;
    return data;
  }

  onReset(): void {
    this.claimsForm.reset();
  }

  onClose(): void {
    this.router.navigate(["/subsystem/claims"]);
  }

  navigate(data: IClaimsSearchPolicyDto): void {
    this.router.navigate(["/subsystem/claims", FormMode.Add, 0, data.PolicyId, data.VerticalId]);
  }
}