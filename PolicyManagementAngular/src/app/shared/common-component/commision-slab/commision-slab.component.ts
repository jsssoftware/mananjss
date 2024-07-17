import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { ColumnMode, id } from '@swimlane/ngx-datatable';
import { ICommonDto } from 'src/app/app-entites/dtos/common/common-dto';
import { IDropDownDto } from 'src/app/app-entites/dtos/common/drop-down-dto';
import { ICommonService } from 'src/app/app-services/common-service/abstracts/common.iservice';
import { ReportService } from 'src/app/app-services/report-service/report.service';
import { Vertical } from 'src/app/shared/utilities/enums/enum';
import { WorkBook, WorkSheet, utils, writeFile } from 'xlsx';
import { DatePipe } from '@angular/common';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { VoucherService } from 'src/app/app-services/voucher/voucher.service';
import { TwoDigitDecimaNumberDirective } from 'src/app/shared/utilities/directive/twodecimal.directive';

@Component({
  selector: 'app-commision-slab',
  templateUrl: './commision-slab.component.html',
  styleUrls: ['./commision-slab.component.css']
})


export class CommisionSlabComponent implements OnInit {
  public _insuranceCompanies: any[] = [];
  public _policyTypes: IDropDownDto<number>[] = [];
  public _packageTypes: IDropDownDto<number>[] = [];
  public _policyTerms: any[] = [];
  public _vehicleClass: IDropDownDto<number>[] = [];
  public _fuelType: IDropDownDto<number>[] = [];
  public _commisonSlabType: IDropDownDto<number>[] = [];
  public _manufactures: IDropDownDto<number>[] = [];
  public _ncbs: IDropDownDto<number>[] = [];
  public _model: IDropDownDto<number>[] = [];
  public _manufacturers: IDropDownDto<number>[] = [];
  public _filteredInsuranceCompaniesOptions: IDropDownDto<number>[] = [];
  private _branchId: any;
  public isMotor :boolean = true;
  rows :any[] = [];

  loadingIndicator = false;
  reorderable = true;
  ColumnMode = ColumnMode;
  columns = [
    { prop: 'insuranceCompanyName', name: 'Insurance Company' },
    { prop: 'manufactureName', name: 'Manufacture' },
    { prop: 'modelName', name: 'Model' },
    { prop: 'fuelTypeName', name: 'Fuel' },
    { prop: 'vehicleClassName', name: 'Vehicle Class' },
    { prop: 'policyTypeName', name: 'Policy Type' },
    { prop: 'spldiscountslab', name: 'Spl Discount Slab' },
    { prop: 'spldiscountslabUpto', name: 'Spl Discount Slab Upto' },
    { prop: 'exShowroomStart', name: 'Ex Showroom Start' },
    { prop: 'exShowroomUpTo', name: 'Ex Showroom Up To' },
    { prop: 'slabStartRs', name: 'Slab Start' },
    { prop: 'slabUptoRs', name: 'Slab Upto' },
    { prop: 'commapplicable', name: 'Comm Applicable' },
  ]
  
  commisionslab = new FormGroup({
    insuranceCompanyId: new FormControl(''),
    policyType: new FormControl(''),
    verticalId: new FormControl(''),
    vehicleClassTypeId: new FormControl(''),
    manufacturerId: new FormControl(''),
    modelId: new FormControl(''),
    spldiscountslab: new FormControl(''),
    spldiscountslabupto: new FormControl(''),
    packageType: new FormControl(''),
    fuelTypeId: new FormControl(''),
    ncb: new FormControl(''),
    volumeCriteria: new FormControl(''),
    slabStartRs: new FormControl(''),
    exShowroomStart: new FormControl(''),
    slabUptoRs: new FormControl(''),
    exShowroomUpTo: new FormControl(''),
    commapplicable: new FormControl(''),
    insuranceCompanyName: new FormControl(''),
    vehicleClassName: new FormControl(''),
    manufactureName: new FormControl(''),
    modelName: new FormControl(''),
    ncbName: new FormControl(''),
    policyTypeName: new FormControl(''),
    fuelTypeName: new FormControl(''),
    packageTypeName: new FormControl(''),
    branchId :  new FormControl('')
 })
  constructor(
    private commonService: ICommonService,
    private reportService: ReportService,
    private datePipe: DatePipe,
    private voucherService: VoucherService
  ) { 
    this._branchId = sessionStorage.getItem("branchId");
  }

  ngOnInit(): void {
   
    this.commisionslab.get("insuranceCompanyId")?.valueChanges.subscribe(input => {
      this.commisionslab.patchValue({
        insuranceCompanyName : this.convertIdsToCommaSeperatedString(input, this._insuranceCompanies)
      });
    });
    this.commisionslab.get("vehicleClassTypeId")?.valueChanges.subscribe(input => {
    
      this.commisionslab.patchValue({
        vehicleClassName : this.convertIdsToCommaSeperatedString(input, this._vehicleClass)
      });

      
    });
    this.commisionslab.get("manufacturerId")?.valueChanges.subscribe(input => {
    
      this.commisionslab.patchValue({
        manufactureName : this.convertIdsToCommaSeperatedString(input, this._manufactures)
      });

      
    });
    this.commisionslab.get("modelId")?.valueChanges.subscribe(input => {
    
      this.commisionslab.patchValue({
        modelName : this.convertIdsToCommaSeperatedString(input, this._model)
      });

      
    });
    this.commisionslab.get("ncb")?.valueChanges.subscribe(input => {
      this.commisionslab.patchValue({
        ncbName : this.convertIdsToCommaSeperatedString(input, this._ncbs)
      });

    });
    this.commisionslab.get("packageType")?.valueChanges.subscribe(input => {
      this.commisionslab.patchValue({
        packageTypeName : this.convertIdsToCommaSeperatedString(input, this._packageTypes)
      });

    });
    this.commisionslab.get("policyType")?.valueChanges.subscribe(input => {
      this.commisionslab.patchValue({
        policyTypeName : this.convertIdsToCommaSeperatedString(input, this._policyTypes)
      });
    });
    this.commisionslab.get("fuelTypeId")?.valueChanges.subscribe(input => {
      this.commisionslab.patchValue({
        fuelTypeName : this.convertIdsToCommaSeperatedString(input, this._fuelType)
      });
    });

    
    this.getInsuranceCompanies();
    this.getPolicyTypes();
    this.getVehicleClasses();
    this.getNcbs();
    this.getFuelType();
    this.getPackageTypes();
    this.getCommisonSlabType();
    this.getManufacturers();
  }

  getInsuranceCompanyName(value: number): string {
    return value ? this._insuranceCompanies.filter(f => f.Value == value)[0].Name : '';
  }

  
  
  getInsuranceCompanies(): any {
    this.commonService.getInsuranceCompanies(Vertical.Motor).subscribe((response: any[]) => {
      this._insuranceCompanies =  response;
    });
  }


  
  filterInsurancerCompaniesData(input: any) {
    if (input === undefined)
      return;
    this._filteredInsuranceCompaniesOptions = this._insuranceCompanies.filter(item => {
      return item.Name?.toLowerCase().indexOf(input.toLowerCase()) > -1
    });
  }

  getPackageTypes(): any {
    this.commonService.getPackageTypes().subscribe((response: IDropDownDto<number>[]) => {
      this._packageTypes = response;
    });
  }
  
  submit(){
    this.commisionslab.get("branchId").setValue(this._branchId);
    let policyStartDate = this.commonService.getDateInString(new Date(this.commisionslab.value.expiryDateFrom_dump));
    let policyEndDate = this.commonService.getDateInString(new Date(this.commisionslab.value.expiryDateTo_dump));

    this.commisionslab.patchValue({
      expiryDateFrom: policyStartDate,
      expiryDateTo :policyEndDate
    });

    this.voucherService.addCommisionSlab(this.rows).subscribe((response: ICommonDto<any>) => {
     
    });

  }

  reset(){
    this.commisionslab.reset()
  }

  getPolicyTypes(): any {
    this.commonService.getPolicyTypes(Vertical.Motor).subscribe((response: any) => {
      this._policyTypes = response;
     
      this.getPolicyTerms()
    });
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  getPolicyTerms(): any {
    this.commonService.getAllPolicyTerms(this.commisionslab.value.policyType).subscribe((response: IDropDownDto<any>[]) => {
      this._policyTerms =  response;
    });
  }

  

  

  getModels(): any {
    this.commonService.getManufacturersModelMulti(this.commisionslab.value.manufacturerId).subscribe((response: IDropDownDto<number>[]) => {
      this._model  = response;
      
    });
  }

    
  getNcbs(): any {
    this.commonService.getNcbs().subscribe((response: any) => {
      this._ncbs = response;
    });
  }

  onRadioChange(event: MatRadioChange): void {
    if(event.value == 1){
      this.isMotor = true;
    }else{
      this.isMotor = false;
    }
  }

  getFuelType(): any {
    this.commonService.getFuelType().subscribe((response: IDropDownDto<number>[]) => {
      this._fuelType  = response;
      
    });
  }
  addcommision(){
    const formData = this.commisionslab.value;
    // Add formData to your ngx-datatable rows or handle as needed
    this.rows = [...this.rows, formData]; // Create a new array with updated data

    // Optional: Clear the form after submission
    this.commisionslab.reset();
  }

  
  getCommisonSlabType(): any {
    this.commonService.getCommisonSlabType().subscribe((response: IDropDownDto<number>[]) => {
      this._commisonSlabType  = response;
    });
  }
  getVehicleClasses(): any {
    this.commonService.getVehicleClasses().subscribe((response: IDropDownDto<number>[]) => {
      this._vehicleClass  = response;
      
    });
  }

  convertIdsToCommaSeperatedString(ids: number[], data: any[]): string {
    // Filter data based on IDs passed
    if(ids!= null && ids.length >0){
    const filteredData = data.filter(item => ids.includes(item.Value));
  
    // Extract names from filtered data
    const names = filteredData.map(item => item.Name);
  
    // Join names into comma-separated string
    const csvString = names.join(', ');
  
    return csvString;
    }
    return "";
  }

  getManufacturers(): void {
    this.commonService.getManufacturers().subscribe((response: any) => {
      this._manufacturers = response;
    });
  }


  onActivate(event) {
    if (event.type === 'dblclick') {
      this.onRowDoubleClick(event.row);
    }
  }

  onRowDoubleClick(row) {
    this.commisionslab.patchValue({
      ...row
    });
  }
  
  


}
