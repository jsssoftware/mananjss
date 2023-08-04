import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ISearchClaimsDto } from 'src/app/app-entites/dtos/claims/search-claims-dto';

import { IDropDownDto } from 'src/app/app-entites/dtos/common/drop-down-dto';
import { ISearchClaimsModel } from 'src/app/app-entites/models/claims/search-claims-model';
import { IClaimsService } from 'src/app/app-services/claims/abstracts/claims.iservice';
import { ICommonService } from 'src/app/app-services/common-service/abstracts/common.iservice';
import { ICustomerService } from 'src/app/app-services/customer-service/abstracts/customer.iservice';
import { FormMode, Vertical } from 'src/app/shared/utilities/enums/enum';

@Component({
  selector: 'app-search-claims',
  templateUrl: './search-claims.component.html',
  styleUrls: ['./search-claims.component.css']
})



export class SearchClaimsComponent implements OnInit, AfterViewInit {

  public _form: number;
  public _header: string = '';
  public _branchId: number;
  public _customers: IDropDownDto<number>[] = [];
  public _filteredOptions: IDropDownDto<number>[] = [];
  public _insuranceCompanies: IDropDownDto<number>[] = [];
  public _filteredInsuranceCompaniesOptions: IDropDownDto<number>[] = [];
  public _posDatas: IDropDownDto<number>[] = [];
  public _filteredPosOptions: IDropDownDto<number>[] = [];
  public _claims: ISearchClaimsDto[] = [];
  public _userDetails:any;
  displayedColumns: string[] = [
    'controlNumber',
    'customerName',
    'vertical',
    'product',
    'registrationNumber',
    'model',
    'insuranceCompany',
    'claimsNumber',
    'claimsEntryDateString',
    'claimsStatus',
  ];

  constructor(
    private claimService: IClaimsService,
    private customerService: ICustomerService,
    private commonService: ICommonService,
    private route: ActivatedRoute,
    private router: Router) {
    const formType = parseInt(this.route.snapshot.paramMap.get('form-type') as string);
    switch (formType) {
      case FormMode.View as number:
        this._header = 'View';
        break;
      case FormMode.Update as number:
        this._header = 'Updation';
    }
    this._form = formType;
    this._branchId = parseInt(sessionStorage.getItem("branchId") as string);
    this._userDetails = JSON.parse((sessionStorage.getItem("userDetails")));

  }

  ngOnInit(): void {
    this.searchClaimForm.get("customerName")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterCustomerData(input);
      else
        this.filterCustomerData(input.Name);
    });

    this.searchClaimForm.get("posId")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterPosData(input);
      else
        this.filterPosData(input.Name);
    });

    this.searchClaimForm.get("insuranceCompanyId")?.valueChanges.subscribe(input => {
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

  searchClaimForm = new FormGroup({
    posId: new FormControl(''),
    customerName: new FormControl(''),
    claimsNumber: new FormControl(''),
    insuranceCompanyId: new FormControl(''),
    policyNumber: new FormControl(''),
    claimEntryFromDate: new FormControl(''),
    claimEntryToDate: new FormControl(''),
    controlNumber: new FormControl(''),
    mobileNumber: new FormControl(''),
    registrationNumber: new FormControl('')
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
    this.claimService.searchClaims(model).subscribe((response: ISearchClaimsDto[]) => {
      this._claims = response;
      console.log(response);
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

  private getPayload(): ISearchClaimsModel {
    return {
      CustomerName: this.searchClaimForm.get('customerName')?.value,
      PolicyNumber: this.searchClaimForm.get('policyNumber')?.value,
      ClaimsEntryFromDate: this.commonService.getDateInString(this.searchClaimForm.get('claimEntryFromDate')?.value),
      ClaimsEntryToDate: this.commonService.getDateInString(this.searchClaimForm.get('claimEntryToDate')?.value),
      InsuranceCompanyId: this.searchClaimForm.get('insuranceCompanyId')?.value?.Value,
      PosId: this.searchClaimForm.get('posId')?.value?.Value,
      ClaimsNumber: this.searchClaimForm.get('claimsNumber')?.value,
      Mode: this._form,
      IsShowAll: false,
      ControlNumber: this.searchClaimForm.get('controlNumber')?.value,
      MobileNumber: this.searchClaimForm.get('mobileNumber')?.value,
      RegistrationNumber: this.searchClaimForm.get('registrationNumber')?.value,
      RoleId : this._userDetails.LoginUserRoleId
    };

  }

  navigate(data: ISearchClaimsDto): void {
    this.router.navigate(["/subsystem/claims", this._form, data.ClaimsId, data.PolicyId, data.VerticalId]);
  }

  reset(): void {
    this.searchClaimForm.reset();
    this._claims = [];
  }
}