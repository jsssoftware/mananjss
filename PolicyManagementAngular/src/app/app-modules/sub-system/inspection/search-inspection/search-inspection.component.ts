import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropDownDto } from 'src/app/app-entites/dtos/common/drop-down-dto';
import { ISearchInspectionDto } from 'src/app/app-entites/dtos/inspection/search-inspection-dto';
import { ISearchInspectionModel } from 'src/app/app-entites/models/inspection/search-inspection-model';
import { ICommonService } from 'src/app/app-services/common-service/abstracts/common.iservice';
import { IInspectionService } from 'src/app/app-services/inspection/abstracts/inspection.iservice';
import { Vertical } from 'src/app/shared/utilities/enums/enum';

@Component({
  selector: 'app-search-inspection',
  templateUrl: './search-inspection.component.html',
  styleUrls: ['./search-inspection.component.css']
})
export class SearchInspectionComponent implements OnInit {

  showApprovalBasis: boolean = false;
  showVehicleNotAvailable: boolean = false;
  public _form: number;
  public _isControlNumberSearchDisabled: boolean = false;
  public _manufacturers: IDropDownDto<number>[] = [];
  public _filteredManufacturers: IDropDownDto<number>[] = [];
  public _insuranceCompanies: IDropDownDto<number>[] = [];
  public _filteredInsuranceCompaniesOptions: IDropDownDto<number>[] = [];
  public _verticals: any;
  public _models: IDropDownDto<number>[] = [];
  public _posDatas: IDropDownDto<number>[] = [];
  public _inspectionReasons: IDropDownDto<number>[] = [];
  public _filteredPosOptions: IDropDownDto<number>[] = [];
  public _branchId: number;
  public _inspections: ISearchInspectionDto[] = [];
  public _userDetails:any;

  displayedColumns: string[] = [
    'Customer',
    'InspectionDate',
    'InsuranceCompany',
    'RegistrationNumber',
    'Manufacturer',
    'Model',
    'InspectionReason',
    'Status',
    'SubStatus'
  ];


  inspectionSearchForm = new FormGroup({
    customerName: new FormControl(''),
    contactNumber: new FormControl(''),
    inspectionReferenceNumber: new FormControl(''),
    inspectionDate: new FormControl(''),
    insuranceCompanyId: new FormControl(''),
    inspectionReasonId: new FormControl(''),
    posId: new FormControl(''),
    manufacturer: new FormControl(''),
    modelId: new FormControl(''),
    registrationNumber: new FormControl(''),
    inspectionDateFrom: new FormControl(''),
    inspectionDateTo: new FormControl(''),
  });


  constructor(private commonService: ICommonService,
    private inspectionService: IInspectionService,
    private route: ActivatedRoute,
    private router: Router) {
    this._branchId = parseInt(sessionStorage.getItem("branchId") as string);
    this._form = parseInt(this.route.snapshot.paramMap.get('form-type') as string);
  }

  onSubmit() {
    const model = this.getPayload();
    this.inspectionService.searchInspections(model).subscribe((response: ISearchInspectionDto[]) => {
      this._inspections = response;
    });
  };

  onClose() {
    this.router.navigate(["/subsystem/inspection"]);
  };

  onReset() {
    this.inspectionSearchForm.reset();
    this._inspections = [];
  }

  ngOnInit(): void {
    this.inspectionSearchForm.get("manufacturer")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterManufacturerData(input);
      else
        this.filterManufacturerData(input.Name);
    });
    this.inspectionSearchForm.get("insuranceCompanyId")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterInsurancerCompaniesData(input);
      else
        this.filterInsurancerCompaniesData(input.Name);
    });
    this.inspectionSearchForm.get("posId")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterPosData(input);
      else
        this.filterPosData(input.Name);
    });
    this._userDetails = JSON.parse((sessionStorage.getItem("userDetails")));
  }

  ngAfterViewInit(): void {
    this.getPos();
    this.getManufacturers();
    this.getInsuranceCompanies();
    this.getInspectionReasons();
  }

  filterPosData(input: any) {
    if (input === undefined)
      return;
    this._filteredPosOptions = this._posDatas.filter(item => {
      return item.Name.toLowerCase().indexOf(input.toLowerCase()) > -1
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

  getInsuranceCompanies(): void {
    this.commonService.getInsuranceCompanies(Vertical.Motor).subscribe((response: IDropDownDto<number>[]) => {
      this._insuranceCompanies = response;
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

  getInspectionReasons(): void {
    this.commonService.getInspectionReasons().subscribe((response: IDropDownDto<number>[]) => {
      this._inspectionReasons = response;
    });
  }

  navigate(data: ISearchInspectionDto): void {
    this.router.navigate(["/subsystem/inspection", this._form, data.InspectionId]);
  }

  private getPayload(): ISearchInspectionModel {
    return {
      BranchId: this._branchId,
      ContactNumber: this.inspectionSearchForm.get('contactNumber')?.value,
      CustomerName: this.inspectionSearchForm.get('customerName')?.value,
      InspectionDate: this.commonService.getDateInString(this.inspectionSearchForm.get('inspectionDate')?.value),
      InspectionEntryFromDate: this.commonService.getDateInString(this.inspectionSearchForm.get('inspectionDateFrom')?.value),
      InspectionEntryToDate: this.commonService.getDateInString(this.inspectionSearchForm.get('inspectionDateTo')?.value),
      InspectionReferenceNumber: this.inspectionSearchForm.get('inspectionReferenceNumber')?.value,
      RegistrationNumber: this.inspectionSearchForm.get('registrationNumber')?.value,
      InspectionReasonId: this.inspectionSearchForm.get('inspectionReasonId')?.value,
      InsuranceCompanyId: this.inspectionSearchForm.get('insuranceCompanyId')?.value?.Value,
      ManufacturerId: this.inspectionSearchForm.get('manufacturer')?.value?.Value,
      ModelId: this.inspectionSearchForm.get('modelId')?.value,
      PosId: this.inspectionSearchForm.get('posId')?.value?.Value,
      RoleId : this._userDetails.LoginUserRoleId

    };
  }
}