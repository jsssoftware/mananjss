import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ICommonDto } from 'src/app/app-entites/dtos/common/common-dto';
import { IDropDownDto } from 'src/app/app-entites/dtos/common/drop-down-dto';
import { ICommonService } from 'src/app/app-services/common-service/abstracts/common.iservice';
import { ReportService } from 'src/app/app-services/report-service/report.service';
import { EndorsementReason, Vertical } from 'src/app/shared/utilities/enums/enum';
import { Router, ActivatedRoute } from '@angular/router';
import { IDataTableDto } from 'src/app/app-entites/dtos/common/data-table-dto';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { DatePipe } from '@angular/common';
import { EndrosementService } from 'src/app/app-services/endrosement-service/endrosement.service';
import { PolicyDetails } from 'src/app/app-entites/models/endrosement/policy-details-model';
import { map } from 'rxjs/operators';
import { IVarientDto } from 'src/app/app-entites/dtos/motor/varient-dto';
import { IRtoZoneDto } from 'src/app/app-entites/dtos/motor/rto-zone-dto';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})

export class EndrosementMasterComponent implements OnInit {


  //#region
  policyDetails : any ;
  verticalId:number;
  public _endrosementReason: IDropDownDto<number>[] = [];
  public _models: IDropDownDto<number>[] = [];
  panelOpenState = false;
  public _manufacturers: IDropDownDto<number>[] = [];;
  public _addOnRiders: IDropDownDto<number>[] = [];;
  public _ncbs: IDropDownDto<number>[] = [];;
  public _rtoZones: IDropDownDto<number>[] = [];;
  public _varients: IVarientDto[] = [];
  public _filteredManufacturerOptions: IDropDownDto<number>[] = [];
  public _selectedEndrosementReason: number;
  endrosementReason :any = EndorsementReason;
  endrosementType: number = 1;
  isOd: boolean = false;
  isGrossPremium: boolean = false;
  isShortfallAmt: boolean = false;
  isAccesoriesIdv: boolean = false;
  isCngIdv: boolean = false;
  isVehicleIdv: boolean = false;
  isNcb: boolean = false;
  isChequebounce: boolean = false;
  isAddonPlan: boolean = false;
  isVehicleClass: boolean = false;
  isRiskExpire: boolean = false;
  isRemarks: boolean = false;
  isOdRecoverable: boolean = false;
  isPremiumRecoverable: boolean = false;
  isRto: boolean = false;


  endrosementMaster = new FormGroup({
   
    endrosementType: new FormControl(1),
    branchId: new FormControl(''),
    verticalId: new FormControl(1),
    endrosementDate : new FormControl(''),
    endrosementReason : new FormControl(''),
    manufactureId : new FormControl(''),
    OD : new FormControl(''),
    grossPremium : new FormControl(''),
    shortfallAmount : new FormControl(''),
    accessoriesIDV : new FormControl(''),
    cngidv : new FormControl(''),
    vehicleIdv : new FormControl(''),
    ncbPercentage : new FormControl(''),
    bounceReason : new FormControl(''),
    chequeBounceDate : new FormControl(''),
    odRecoverable : new FormControl(''),
    premiumRecoverable : new FormControl(''),
    vehicleClassId : new FormControl(''),
    manufacturerId : new FormControl(''),
    modelId : new FormControl(''),
    varient : new FormControl(''),
    remark : new FormControl(''),
    addOnRiderId : new FormControl(''),
    riskExpireDate : new FormControl(''),
    rtoZone : new FormControl(''),
    riskZone : new FormControl(''),
    registrationNumber : new FormControl(''),
    
  });
  dateTime :  any =   new Date();
  constructor(private route: Router,private router: ActivatedRoute,private datePipe : DatePipe,
    private commonService: ICommonService,
  ) { }

  ngOnInit(): void {
   this.dateTime = this.datePipe.transform(this.dateTime, 'dd-MM-yyyy');
   this.endrosementMaster.get("endrosementDate").setValue(this.dateTime);
   debugger
   this.router.paramMap
      .pipe(map(() => window.history.state))
      .subscribe(state => {
        this.policyDetails = state;
    });

    this.endrosementMaster.get("manufacturer")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterdManufacturerData(input);
      else
        this.filterdManufacturerData(input.Name);
    });
    this.getAllEndrosementReason();
    this.getAddOnRiders();
    this.getNcbs();
    this.getManufacturers();
    this.getRtoZones();
  }

  
  
  getAllEndrosementReason(): void {
    this.commonService.getAllEndrosementReason(this.policyDetails.VerticalSegmentId).subscribe((response: IDropDownDto<number>[]) => {
      this._endrosementReason = response;
    })
  }


  
  getManufacturers(): void {
    this.commonService.getManufacturers().subscribe((response: any) => {
      this._manufacturers = response;
    });
  }
  
  getManufacturerForBind(value: number): string {
    return value ? this._manufacturers.filter(f => f.Value == value)[0].Name : '';
  }

  
  filterdManufacturerData(input: any) {
    if (input === undefined)
      return;
    this._filteredManufacturerOptions = this._manufacturers.filter(item => {
      return item.Name?.toLowerCase().indexOf(input.toLowerCase()) > -1
    });
  }

  getModels(): any {
    let manufacturerId = this.endrosementMaster.value.manufactureId;
    this.commonService.getModels(manufacturerId).subscribe((response: IDropDownDto<number>[]) => {
      this._models = response;
    });
  }

  onEndrosementReasonChange(){
    this._selectedEndrosementReason = this.endrosementMaster.value.endrosementReason;
    this.resetFields()
    if(this._selectedEndrosementReason ==  EndorsementReason.AdditionOfAccessoriesPassengerDiscount
      || this._selectedEndrosementReason ==  EndorsementReason.RemovalOfAccessoriesPassengerDiscount
    ){
      this.isOd =  true;
      this.isGrossPremium = true;
      this.isShortfallAmt=  true;
      this.isAccesoriesIdv=  true;
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.AdditionOfAddOnPlan){
      this.isOd =  true;
      this.isGrossPremium = true;
      this.isShortfallAmt=  true;
      this.isAddonPlan =  true;
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.AdditionOfCNGLPG
      || this._selectedEndrosementReason ==  EndorsementReason.RemovalOfCNGLPG
    ){
      this.isOd =  true;
      this.isGrossPremium = true;
      this.isShortfallAmt=  true;
      this.isCngIdv =  true;
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.AdditionOfIDV
      || this._selectedEndrosementReason ==  EndorsementReason.RemovalOfIDV
    ){
      this.isOd =  true;
      this.isGrossPremium = true;
      this.isShortfallAmt=  true;
      this.isVehicleIdv =  true;
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.CancellationCaseRejectedByCompany || 
      this._selectedEndrosementReason ==  EndorsementReason.CancellationCustomerRequest || 
      this._selectedEndrosementReason ==  EndorsementReason.CancellationDoubleEntryMistakeInSoftware || 
      this._selectedEndrosementReason ==  EndorsementReason.CancellationDoubleInsuranceByInsCo || 
      this._selectedEndrosementReason ==  EndorsementReason.CancellationNCBReservingFalsificationRefund || 
      this._selectedEndrosementReason ==  EndorsementReason.CancellationVehicleNotDelivered || 
      this._selectedEndrosementReason ==  EndorsementReason.CancellationVehicleSold || 
      this._selectedEndrosementReason ==  EndorsementReason.CancellationWrongRiskDate
    ){
      this.isOd =  true;
      this.isGrossPremium = true;
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.CancellationChequeBounce){
      this.isChequebounce =  true;
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.ChangeOfOwnershipNCBAdjustment
       || this._selectedEndrosementReason ==  EndorsementReason.NCBPercentAddedClientRequest
    ){
      this.isOd =  true;
      this.isGrossPremium = true;
      this.isShortfallAmt=  true;
      this.isNcb =  true;    
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.NCBRecoverable){
      this.isOdRecoverable =  true;
      this.isPremiumRecoverable = true;
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.RemovalOfAccessoriesPassengerDiscount){
      this.isOd =  true;
      this.isGrossPremium = true;
      this.isShortfallAmt=  true;
      this.isAccesoriesIdv =  true;  
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.NCBRecoverable){
      this.isOdRecoverable =  true;
      this.isPremiumRecoverable = true;
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.RTOLocationChange){
      this.isOd =  true;
      this.isGrossPremium = true;
      this.isShortfallAmt=  true;
      this.isRto =  true;
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.VehicleModelOrVariantOrClassChange){
      this.isOd =  true;
      this.isGrossPremium = true;
      this.isShortfallAmt=  true;
      this.isVehicleClass =  true;
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.CancellationNCBFalsificationShortScale){
      this.isRiskExpire =  true;
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.AdditionOfSumInsuredFire || 
      this._selectedEndrosementReason ==  EndorsementReason.AdditionOfLocationFire
    ){
      this.isGrossPremium = true;
      this.isShortfallAmt=  true;    
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.ChangeOfDOBDecreaseSlabHealth
    ){
      this.isGrossPremium = true;
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.ChangeOfDOBIncreaseSlabHealth
    ){
      this.isGrossPremium = true;
      this.isShortfallAmt=  true;    
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.ChangeOfPolicyPeriodDecreaseTravel
    ||  this._selectedEndrosementReason ==  EndorsementReason.ChangeRiskClassToLowerPA
    ||  this._selectedEndrosementReason ==  EndorsementReason.CollectionAtEndMarineOpen
  ||  this._selectedEndrosementReason ==  EndorsementReason.DeletionOfLocationFire
  ||  this._selectedEndrosementReason ==  EndorsementReason.DeletionOfSumInsuredFireMarine
  ||  this._selectedEndrosementReason ==  EndorsementReason.MemberDeletionHealth){
      this.isGrossPremium = true;
    }

    if(this._selectedEndrosementReason ==  EndorsementReason.ChangeOfPolicyPeriodIncreaseTravel
      ||  this._selectedEndrosementReason ==  EndorsementReason.EnhancedSumInsuredMarineOpen
    ||  this._selectedEndrosementReason ==  EndorsementReason.ExtensionOfTripTravel
    ||  this._selectedEndrosementReason ==  EndorsementReason.MemberAdditionHealth
    ||  this._selectedEndrosementReason ==  EndorsementReason.MemberAdditionAndDeletionGPAMisc 
    ||  this._selectedEndrosementReason ==  EndorsementReason.ReturnExtensionDateChangeTravel){
      this.isGrossPremium = true;
      this.isShortfallAmt=  true;    
    }
    this.isRemarks =  true;

  }

  getVarients(): void {
    let manufacturerId = this.endrosementMaster.value.manufacturer;
    let modelId = this.endrosementMaster.value.model;
    let vehicleClassId = this.endrosementMaster.value.vehicleClassId;
    this.commonService.getVarients(manufacturerId, modelId, vehicleClassId).subscribe((response: IVarientDto[]) => {
      this._varients = response;
    });
  }

  onEndrosementChange(event: MatRadioChange): void {
    if(event.value == 1){
      this.endrosementType = 1;
    }else{
      this.endrosementType = 2;
    }
  }


  getAddOnRiders(): void {    
    debugger
      this.commonService.getAddOnRiders(this.policyDetails.InsuranceCompanyId,this.policyDetails.VerticalId).subscribe((response: IDropDownDto<number>[]) => {
        this._addOnRiders = response;
      });
  }

  
  getNcbs(): any {
    this.commonService.getNcbs().subscribe((response: any) => {
      this._ncbs = response;
    });
  }

  
  setRiskZone(rtoZone: IRtoZoneDto): void {
    this.endrosementMaster.patchValue({
      riskZone: rtoZone.RiskZone
    });
  }

  
  getRtoZones(): void {
    this.commonService.getRtoZones().subscribe((response: IRtoZoneDto[]) => {
      this._rtoZones = response;
    });
  }


  resetFields(){
    this.isOd= false;
    this.isGrossPremium= false;
    this.isShortfallAmt= false;
    this.isAccesoriesIdv= false;
    this.isCngIdv= false;
    this.isVehicleIdv= false;
    this.isNcb= false;
    this.isChequebounce= false;
    this.isAddonPlan= false;
    this.isVehicleClass= false;
    this.isRiskExpire= false;
    this.isRemarks= false;
    this.isOdRecoverable =  false;
    this.isPremiumRecoverable = false;
    this.isRto = false;
  }


}
