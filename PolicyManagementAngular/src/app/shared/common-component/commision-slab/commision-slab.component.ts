import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { ColumnMode, id } from '@swimlane/ngx-datatable';
import { ICommonDto } from 'src/app/app-entites/dtos/common/common-dto';
import { IDropDownDto } from 'src/app/app-entites/dtos/common/drop-down-dto';
import { ICommonService } from 'src/app/app-services/common-service/abstracts/common.iservice';
import { ReportService } from 'src/app/app-services/report-service/report.service';
import { Vertical } from 'src/app/shared/utilities/enums/enum';
import { DatePipe } from '@angular/common';
import { VoucherService } from 'src/app/app-services/voucher/voucher.service';
import { CommonFunction } from '../../utilities/helpers/common-function';
import Swal from 'sweetalert2';

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
  public _commisonSlabTurnOverRation: IDropDownDto<number>[] = [];
  public _manufactures: IDropDownDto<number>[] = [];
  public _ncbs: IDropDownDto<number>[] = [];
  public _model: IDropDownDto<number>[] = [];
  public _allmodel: IDropDownDto<number>[] = [];
  public _manufacturers: IDropDownDto<number>[] = [];
  public _products: IDropDownDto<number>[] = [];
  public _verticals: IDropDownDto<number>[] = [];
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
    insuranceCompanyId: new FormControl('', [Validators.required]),
    policyType: new FormControl(''),
    verticalId: new FormControl(''),
    verticalClassId: new FormControl(1),
    vehicleClassTypeId: new FormControl(''),
    manufacturerId: new FormControl(''),
    modelId: new FormControl(''),
    spldiscountslab: new FormControl('', [Validators.required]),
    spldiscountslabupto: new FormControl('', [Validators.required]),
    packageType: new FormControl(''),
    fuelTypeId: new FormControl(''),
    ncb: new FormControl(''),
    volumeCriteria: new FormControl('', [Validators.required]),
    slabStartRs: new FormControl('', [Validators.required]),
    exShowroomStart: new FormControl(''),
    slabUptoRs: new FormControl('', [Validators.required]),
    exShowroomUpTo: new FormControl(''),
    commapplicable: new FormControl('', [Validators.required]),
    insuranceCompanyName: new FormControl(''),
    vehicleClassName: new FormControl(''),
    manufactureName: new FormControl(''),
    modelName: new FormControl(''),
    ncbName: new FormControl(''),
    policyTypeName: new FormControl(''),
    fuelTypeName: new FormControl(''),
    packageTypeName: new FormControl(''),
    branchId :  new FormControl(''),
    turnOverRatio :  new FormControl(''),
    productId :  new FormControl(''),
    rowIndex :  new FormControl(0),
    commisionSlabId :  new FormControl(null)
 })
  constructor(
    private commonService: ICommonService,
    private reportService: ReportService,
    private datePipe: DatePipe,
    private voucherService: VoucherService,
    private commonFunction :CommonFunction
  ) { 
    this._branchId = sessionStorage.getItem("branchId");
  }

  async ngOnInit(): Promise<void> {
   
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
        manufactureName : this.convertIdsToCommaSeperatedString(input, this._manufacturers)
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

    
  await  this.getInsuranceCompanies();
  await  this.getPolicyTypes();
  await  this.getVehicleClasses();
  await  this.getNcbs();
  await  this.getFuelType();
  await  this.getPackageTypes();
  await  this.getCommisonSlabType();
  await  this.getManufacturers();
  await  this.getCommsionTurnOverType();
  await this.getAllModels();
  await  this.getCommisionSlab(true);

  }

  getInsuranceCompanyName(value: number): string {
    return value ? this._insuranceCompanies.filter(f => f.Value == value)[0].Name : '';
  }

  
  
  getInsuranceCompanies(): any {
    this.commonService.getInsuranceCompanies(Vertical.Motor).subscribe((response: any[]) => {
      this._insuranceCompanies =  response;
    });
  }
  getCommsionTurnOverType(): any {
    this.commonService.getCommsionTurnOverType().subscribe((response: any[]) => {
      this._commisonSlabTurnOverRation =  response;
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
    let policyStartDate = this.commonService.getDateInString(new Date(this.commisionslab.value.expiryDateFrom_dump));
    let policyEndDate = this.commonService.getDateInString(new Date(this.commisionslab.value.expiryDateTo_dump));

    this.commisionslab.patchValue({
      expiryDateFrom: policyStartDate,
      expiryDateTo :policyEndDate
    });

    this.voucherService.addCommisionSlab(this.rows).subscribe((response: ICommonDto<any>) => {
      if (response.IsSuccess) {
        Swal.fire({
          icon: 'success',
          title: 'Done',
          text: response.Message,
        }).then((result) => {
          if (result.isConfirmed) {
            this.reset();
            this.getCommisionSlab(this.isMotor);
          };
        })
      }
      else {
        if (response.Response == null) {
          Swal.fire({
            icon: 'error',
            title: 'Sorry',
            text: response.Message,
          });
        }
        else {
          if (response.Response.IsError) {
            Swal.fire({
              icon: 'error',
              title: 'Sorry',
              text: response.Message,
            });
          }
          else {
            Swal.fire({
              title: 'Warning',
              text: response.Message,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes, Save it!',
              cancelButtonText: 'Cancel'
            }).then(async (result) => {
              if (result.isConfirmed) {
                

              }
            })
          }
        }
      }
    });

  }

  reset(){
    this.commisionslab.reset();
    this.isUpdate = false;
    this.commisionslab.patchValue({
      verticalClassId: 1
    });
  }

  getPolicyTypes(): any {
    this.commonService.getPolicyTypes(6).subscribe((response: any) => {
      this._policyTypes = response;
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
  getModelsValue(value): any {
    this.commonService.getManufacturersModelMulti(value).subscribe((response: IDropDownDto<number>[]) => {
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
      this.commisionslab.patchValue({
        verticalClassId: 1
      });
    }else{
      this.getProducts();
      this.getVerticals();
      this.commisionslab.patchValue({
        verticalClassId: 2
      });
      this.isMotor = false;
    }
  }

  getFuelType(): any {
    this.commonService.getFuelType().subscribe((response: IDropDownDto<number>[]) => {
      this._fuelType  = response;
      
    });
  }
  addcommision(){
    if( this.commisionslab.value.verticalClassId == 1){
      this.commisionslab.patchValue({
        verticalId: 1,
      });
    }
    this.commisionslab.get("branchId").setValue(this._branchId);
    const formData = this.commisionslab.value;
    if(!this.isUpdate){
      var rowIndex = this.rows.length  == 0 ? 0 :this.rows.length + 1;
      this.rows = [...this.rows,formData];

    }else{
    this.rows.splice(this.commisionslab.value.rowIndex, 1, formData);
    this.rows = [...this.rows];
    }
    this.commisionslab.patchValue({
      rowIndex : rowIndex
    })

    this.reset();
  }


   updateCommision(index: any) {
    this.rows.splice(index, 1);
    this.rows = [...this.rows]; 
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
    const filteredData = data.filter(item => ids.some(id => id === item.Value));
  
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


  getAllModels(): void {
    this.commonService.getAllModels().subscribe((response: any) => {
      this._allmodel = response;
    });
  }


  getCommisionSlab(boolean): void {
    this.commisionslab.patchValue({
      verticalId: 1
    });
    this.voucherService.getCommisionSlab(this._branchId,this.commisionslab.value.verticalId).subscribe(async (response: any) => {
      let incrementNumber = 0
      let models = this.commonFunction.mergeArrays(response,['ManufacturerId'])
      await this.getModelsValue(models);
      this.rows = await response.map(x => ({
        insuranceCompanyName: this.convertIdsToCommaSeperatedString(JSON.parse(x.InsureCompanyId), this._insuranceCompanies),
        vehicleClassName: this.convertIdsToCommaSeperatedString(JSON.parse(x.VehicleClassId), this._vehicleClass),
        manufactureName: this.convertIdsToCommaSeperatedString(JSON.parse(x.ManufacturerId), this._manufacturers),
        modelName: this.convertIdsToCommaSeperatedString(JSON.parse(x.ModelId), this._allmodel),
        fuelTypeName: this.convertIdsToCommaSeperatedString(JSON.parse(x.FuelTypeId), this._fuelType),
        policyTypeName: this.convertIdsToCommaSeperatedString(JSON.parse(x.PolicyTypeId), this._policyTypes),
        insuranceCompanyId: JSON.parse(x.InsureCompanyId),
        policyType: JSON.parse(x.PolicyTypeId),
        verticalId: JSON.parse(x.VerticalId),
        vehicleClassTypeId: JSON.parse(x.VehicleClassId),
        manufacturerId: JSON.parse(x.ManufacturerId),
        modelId: JSON.parse(x.ModelId),
        spldiscountslab: x.SplDiscountFrom,
        spldiscountslabupto: x.SplDiscountUpTo,
        packageType:JSON.parse(x.PackageTypeId),
        fuelTypeId:JSON.parse(x.FuelTypeId),
        ncb: JSON.parse(x.NcbId),
        volumeCriteria: x.CommissionSlabTypeId,
        slabStartRs:x.SlabStart,
        exShowroomStart: x.ExshowroomValueStart,
        slabUptoRs: x.SlabEnd ,
        exShowroomUpTo: x.ExshowroomValueEnd,
        commapplicable:x.CommissionPercent,
        turnOverRatio: x.CommissionTurnoverTypeId,
        rowIndex :  incrementNumber++,
        commisionSlabId: x.CommissionSlabId,
        branchId: x.BranchId
      }));
      this.rows = [...this.rows];
    });
  }


  
  onActivate(event) {
    if (event.type === 'dblclick') {
      this.onRowDoubleClick(event.row);
    }
  }

  isUpdate: boolean =  false
  onRowDoubleClick(row:any) {
    const lowerCaseFormValues:any =this.commonFunction.lowerCaseFirstCharacter(row);
    this.commisionslab.patchValue({
      ...lowerCaseFormValues
    });
    this.getModels();
    this.commisionslab.patchValue({
      modelId: row.modelId
    });
    this.isUpdate = true
  }

  
  getProducts(): void {
    this.commonService.getProduct().subscribe((response: any) => {
      this._products = response;
    });
  }

  getVerticals(): void {
    this.commonService.getVerticals().subscribe((response: any) => {
      this._verticals = response;
    });
  }


}
