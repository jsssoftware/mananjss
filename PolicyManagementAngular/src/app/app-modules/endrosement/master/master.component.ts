import { Component, OnInit, ViewChild } from '@angular/core';
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
import Swal from 'sweetalert2';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})

export class EndrosementMasterComponent implements OnInit {
  @ViewChild('endrosepanel') endrosepanel!: MatExpansionPanel;


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
  public _bounceReason: IDropDownDto<number>[] = [];;
  public _varients: IVarientDto[] = [];
  public _filteredManufacturerOptions: IDropDownDto<number>[] = [];
  public _selectedEndrosementReason: number;
  public _isCancellationEndrosementReason: boolean = false;
  public _insuranceCompanies: IDropDownDto<number>[] = [];
  public _filteredInsuranceCompaniesOptions: IDropDownDto<number>[] = [];
  public _branchId: string;
  ColumnMode = ColumnMode;
  loadingIndicator = false;
  reorderable = true;
  previousPolicyrows :any[] = [];

  columns = [
    { name: 'Endrosement Reason', prop: 'EndorsementReason' },
    { name: 'Entry Date', prop: 'EndorsementEntryDate'},
    { name: 'OD Change', prop: 'AmtODChange' },
    { name: 'Gross Premium', prop: 'AmtGrossPremiumChange' },
    { name: 'Remarks', prop: 'EndorsementRemark' }
  ]
  endrosementReason :any = EndorsementReason;
  endrosementType: number = 1;
  isOd: boolean = false;
  isGrossPremium: boolean = false;
  isShortfall: boolean = false;
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
  isShortVoucherNo: boolean = false;
  isPolicyReInstate: boolean = false;
  IsCancelNcbRec: boolean = false;
  IsNcbRecovered: boolean = false;
  IsModified: boolean = false;
  isMotor: boolean = false;


  endrosementMaster = new FormGroup({
   
    endrosementType: new FormControl(1),
    branchId: new FormControl(''),
    policyId: new FormControl(''),
    verticalId: new FormControl(1),
    endrosementDate : new FormControl(''),
    endrosementReason : new FormControl(''),
    manufacturerId : new FormControl(''),
    OD : new FormControl(''),
    grossPremium : new FormControl(''),
    shortfallAmount : new FormControl(''),
    electricAccessoriesIDV : new FormControl(''),
    nonElectricaccessoriesIDV : new FormControl(''),
    cngidv : new FormControl(''),
    vehicleIdv : new FormControl(''),
    ncbPercentage : new FormControl(''),
    bounceReason : new FormControl(''),
    chequeBounceDate : new FormControl(''),
    odRecoverable : new FormControl(''),
    premiumRecoverable : new FormControl(''),
    vehicleClassId : new FormControl(''),
    modelId : new FormControl(''),
    varient : new FormControl(''),
    remark : new FormControl(''),
    addOnRiderId : new FormControl(''),
    riskExpireDate : new FormControl(''),
    rtoZone : new FormControl(''),
    riskZone : new FormControl(''),
    registrationNumber : new FormControl(''),
    alternateInsuranceCompanyId : new FormControl(''),
    alternatePolicyNumber : new FormControl(''),
    alternateInceptionDate : new FormControl(''),
    endorsementId : new FormControl(''),
    shortfallVoucherNo : new FormControl(''),
    policyTypeId : new FormControl(''),
    policyReinstate : new FormControl(''),
    cancelledNCBRecoverable : new FormControl(''),
    nCBRecovered : new FormControl(''),
    isModified : new FormControl(false)
  });
  dateTime :  any =   new Date();
  constructor(private route: Router,private router: ActivatedRoute,private datePipe : DatePipe,
    private commonService: ICommonService,private endrosementService : EndrosementService
  ) { }

  ngOnInit(): void {
   this.dateTime = this.datePipe.transform(this.dateTime, 'dd-MM-yyyy');
   this._branchId = sessionStorage.getItem("branchId");
   this.endrosementMaster.get("endrosementDate").setValue(this.dateTime);
   this.router.paramMap
      .pipe(map(() => window.history.state))
      .subscribe(state => {
        this.policyDetails = state;
    });


    if(this.policyDetails.VerticalId == Vertical.Motor){
      this.isMotor =  true
    }else{
      this.isMotor =  false
    }
    this.endrosementMaster.get("manufacturerId")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterdManufacturerData(input);
      else
        this.filterdManufacturerData(input.Name);
    });

    this.endrosementMaster.get("alternateInsuranceCompany")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterInsurancerCompaniesData(input);
      else
        this.filterInsurancerCompaniesData(input.Name);
    });
    this.getAllEndrosementReason();
    this.getAddOnRiders();
    this.getNcbs();
    this.getManufacturers();
    this.getRtoZones();
    this.getBounceReason();
    this.getInsuranceCompanies();
    this.getPreviousEndrosementInfo();
  }

  filterInsurancerCompaniesData(input: any) {
    if (input === undefined)
      return;
    this._filteredInsuranceCompaniesOptions = this._insuranceCompanies.filter(item => {
      return item.Name?.toLowerCase().indexOf(input.toLowerCase()) > -1
    });
  }
  
  getAllEndrosementReason(): void {
    let endrosementType = this.endrosementMaster.value.endrosementType;
    let insuranceSegementId =  1
    if(this.policyDetails.VerticalId == Vertical.Motor){
      insuranceSegementId =  2
    }else{
      insuranceSegementId =  3
    }
    this.commonService.getAllEndrosementReason(insuranceSegementId,endrosementType).subscribe((response: IDropDownDto<number>[]) => {
      this._endrosementReason = response;
    })
  }


  getInsuranceCompanies(): any {
    this.commonService.getInsuranceCompanies(this.policyDetails.VerticalId).subscribe((response: IDropDownDto<number>[]) => {
      this._insuranceCompanies =  response;
    });
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
    debugger
    let manufacturerId = this.endrosementMaster.value.manufacturerId;
    this.commonService.getModels(manufacturerId).subscribe((response: IDropDownDto<number>[]) => {
      this._models = response;
    });
  }

  onEndrosementReasonChange(){
    this._selectedEndrosementReason = this.endrosementMaster.value.endrosementReason;
    this._isCancellationEndrosementReason = this.isCancellationReason(this._selectedEndrosementReason)
    this.resetFields()
    if(this._selectedEndrosementReason ==  EndorsementReason.AdditionOfAccessoriesPassengerDiscount
      || this._selectedEndrosementReason ==  EndorsementReason.RemovalOfAccessoriesPassengerDiscount
    ){
      this.isOd =  true;
      this.isGrossPremium = true;
      this.isShortfall=  true;
      this.isAccesoriesIdv=  true;
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.AdditionOfAddOnPlan){
      this.isOd =  true;
      this.isGrossPremium = true;
      this.isShortfall=  true;
      this.isAddonPlan =  true;
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.AdditionOfCNGLPG
      || this._selectedEndrosementReason ==  EndorsementReason.RemovalOfCNGLPG
    ){
      this.isOd =  true;
      this.isGrossPremium = true;
      this.isShortfall=  true;
      this.isCngIdv =  true;
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.AdditionOfIDV
      || this._selectedEndrosementReason ==  EndorsementReason.RemovalOfIDV
    ){
      this.isOd =  true;
      this.isGrossPremium = true;
      this.isShortfall=  true;
      this.isVehicleIdv =  true;
    }
    debugger
    if(this._selectedEndrosementReason ==  EndorsementReason.CancellationCaseRejectedByCompany || 
      this._selectedEndrosementReason ==  EndorsementReason.CancellationCustomerRequest || 
      this._selectedEndrosementReason ==  EndorsementReason.CancellationDoubleEntryMistakeInSoftware || 
      this._selectedEndrosementReason ==  EndorsementReason.CancellationDoubleInsuranceByInsCo || 
      this._selectedEndrosementReason ==  EndorsementReason.CancellationNCBReservingFalsificationRefund || 
      this._selectedEndrosementReason ==  EndorsementReason.CancellationVehicleNotDelivered || 
      this._selectedEndrosementReason ==  EndorsementReason.CancellationVehicleSold || 
      this._selectedEndrosementReason ==  EndorsementReason.CancellationWrongRiskDate ||
      this._selectedEndrosementReason ==  EndorsementReason.CancellationNCBFalsificationForfeit
    ){
      this.isOd =  true;
      this.isGrossPremium = true;
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.CancellationChequeBounce){
      this.isChequebounce =  true;
      this.isPolicyReInstate =  true;
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.ChangeOfOwnershipNCBAdjustment
       || this._selectedEndrosementReason ==  EndorsementReason.NCBPercentAddedClientRequest
    ){
      this.isOd =  true;
      this.isGrossPremium = true;
      this.isShortfall=  true;
      this.isNcb =  true;    
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.NCBRecoverable){
      this.isOdRecoverable =  true;
      this.isPremiumRecoverable = true;
      this.IsCancelNcbRec =  true;
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.RemovalOfAccessoriesPassengerDiscount){
      this.isOd =  true;
      this.isGrossPremium = true;
      this.isShortfall=  true;
      this.isAccesoriesIdv =  true;  
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.NCBRecovered){
      this.isOdRecoverable =  true;
      this.isPremiumRecoverable = true;
      this.IsNcbRecovered =  true;
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.RTOLocationChange){
      this.isOd =  true;
      this.isGrossPremium = true;
      this.isShortfall=  true;
      this.isRto =  true;
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.VehicleModelOrVariantOrClassChange){
      this.isOd =  true;
      this.isGrossPremium = true;
      this.isShortfall=  true;
      this.isVehicleClass =  true;
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.CancellationNCBFalsificationShortScale){
      this.isRiskExpire =  true;
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.AdditionOfSumInsuredFire || 
      this._selectedEndrosementReason ==  EndorsementReason.AdditionOfLocationFire
    ){
      this.isGrossPremium = true;
      this.isShortfall=  true;    
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.ChangeOfDOBDecreaseSlabHealth
    ){
      this.isGrossPremium = true;
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.ChangeOfDOBIncreaseSlabHealth
    ){
      this.isGrossPremium = true;
      this.isShortfall=  true;    
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
      this.isShortfall=  true;    
    }
    this.isRemarks =  true;

  }

  getVarients(): void {
    debugger
    let manufacturerId = this.endrosementMaster.value.manufacturerId;
    let modelId = this.endrosementMaster.value.modelId;
    let vehicleClassId = this.endrosementMaster.value.vehicleClassId;
    if(manufacturerId && modelId && vehicleClassId){
      this.commonService.getVarients(manufacturerId, modelId, vehicleClassId).subscribe((response: IVarientDto[]) => {
        this._varients = response;
      });
    }
  }

  onEndrosementChange(event: MatRadioChange): void {
    if(event.value == 1){
      this.endrosementType = 1;
    }else{
      this.endrosementType = 2;
    }

    this.getAllEndrosementReason()
  }


  getAddOnRiders(): void {    
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
  
  getBounceReason(): void {
    this.commonService.getBounceReason().subscribe((response: any[]) => {
      this._bounceReason = response;
    });
  }

   
  getPreviousEndrosementInfo(): void {
    this.endrosementService.getPreviousEndrosement(this.policyDetails.PolicyId).subscribe((response: any[]) => {
      this.previousPolicyrows= response;
      this.previousPolicyrows = this.previousPolicyrows.map(row => ({
        ...row,
        EndorsementEntryDate: this.datePipe.transform(row.EndorsementEntryDate, 'dd/MM/yyyy')
      }));
    });
  }

  submit(){
    this.endrosementMaster.get("branchId").setValue(this._branchId);
    this.endrosementMaster.get("policyId").setValue(this.policyDetails.PolicyId);
    this.endrosementMaster.get("policyTypeId").setValue(this.policyDetails.PolicyTypeId);
    this.endrosementMaster.patchValue({
      isModified : this.IsModified
    });
    this.endrosementService.createUpdateEndrosmentMaster(this.endrosementMaster.getRawValue()).subscribe((response: ICommonDto<any>) => {
      if (response.IsSuccess) {
        Swal.fire({
          icon: 'success',
          title: 'Done',
          text: response.Message,
        }).then((result) => {
          if (result.isConfirmed) {
            this.reset();
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


  resetFields(){
    this.isOd= false;
    this.isGrossPremium= false;
    this.isShortfall= false;
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
    this.isPolicyReInstate = false;
    this.IsNcbRecovered =  false;
    this.IsCancelNcbRec =  false;
  }

    
  getInsuranceCompanyName(value: number): string {
    return value ? this._insuranceCompanies.filter(f => f.Value == value)[0].Name : '';
  }




  onRowDoubleClick(row) {
    this.endrosementMaster.patchValue({
      endrosementReason: row.T1.EndorsementReasonId,
      endorsementId: row.T1.EndorsementId,
    });
    this.IsModified =  true;
    this.endrosepanel.open();
    this.onEndrosementReasonUpdate(row?.T1);
    this.onEndrosementReasonChange();
  }

  reset() {
    this.endrosementMaster.reset();
    this.IsModified = false; 
    this.route.navigate(['./pms/endrosement/searchpolicy']);

  }

  isCancellationReason(reason: EndorsementReason): boolean {
    const cancellationReasons: EndorsementReason[] = [
      EndorsementReason.CancellationChequeBounce,
      EndorsementReason.CancellationTheft,
      EndorsementReason.CancellationTotalLoss,
      EndorsementReason.CancellationNCBFalsificationForfeit,
      EndorsementReason.CancellationCustomerRequest,
      EndorsementReason.CancellationDoubleInsuranceByInsCo,
      EndorsementReason.CancellationVehicleNotDelivered,
      EndorsementReason.CancellationByInsuranceCompany,
      EndorsementReason.CancellationNCBReservingFalsificationRefund,
      EndorsementReason.CancellationDoubleEntryMistakeInSoftware,
      EndorsementReason.CancellationWrongRiskDate,
      EndorsementReason.CancellationVehicleSold,
      EndorsementReason.CancellationAsPerCommissionStatementSMS,
      EndorsementReason.CancellationNonDisclosureHealth,
      EndorsementReason.CancellationChangeOfPlanTravel,
      EndorsementReason.CancellationTripCancelledTravel,
      EndorsementReason.CancellationCaseRejectedByCompany,
      EndorsementReason.CancellationNCBFalsificationShortScale
    ];
  
    return cancellationReasons.includes(reason);
  }


  
  onActivate(event) {
    if (event.type === 'dblclick') {
      this.onRowDoubleClick(event.row);
    }
  }


  onEndrosementReasonUpdate(endroseData){
    debugger
    this._selectedEndrosementReason = this.endrosementMaster.value.endrosementReason;
    if(this._selectedEndrosementReason ==  EndorsementReason.AdditionOfAccessoriesPassengerDiscount
      || this._selectedEndrosementReason ==  EndorsementReason.RemovalOfAccessoriesPassengerDiscount
    ){

      this.endrosementMaster.patchValue({
        OD :  endroseData.AmtODChange,
        grossPremium : endroseData.AmtODChange,
        shortfallAmount:   endroseData.EndoresementShortfallAmt,
        electricAccessoriesIDV : endroseData.ElectricAssessoriesIDV,
        nonElectricAccessoriesIDV : endroseData.NonElectricAssessoriesIDV,
        shortfallVoucherNo : endroseData.EndoresementShortfallVoucherNo
      });
     
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.AdditionOfAddOnPlan){
    
      this.endrosementMaster.patchValue({
        OD :  endroseData.AmtODChange,
        grossPremium : endroseData.AmtODChange,
        shortfallAmount:   endroseData.EndoresementShortfallAmt,
        addOnRiderId : endroseData.NewAddOnPlanId,
        shortfallVoucherNo : endroseData.EndoresementShortfallVoucherNo

      });
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.AdditionOfCNGLPG
      || this._selectedEndrosementReason ==  EndorsementReason.RemovalOfCNGLPG
    ){
     

      this.endrosementMaster.patchValue({
        OD :  endroseData.AmtODChange,
        grossPremium : endroseData.AmtODChange,
        shortfallAmount:   endroseData.EndoresementShortfallAmt,
        cngidv : endroseData.IDVChange,
        shortfallVoucherNo : endroseData.EndoresementShortfallVoucherNo
      });
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.AdditionOfIDV
      || this._selectedEndrosementReason ==  EndorsementReason.RemovalOfIDV
    ){
    

      this.endrosementMaster.patchValue({
        OD :  endroseData.AmtODChange,
        grossPremium : endroseData.AmtODChange,
        shortfallAmount:   endroseData.EndoresementShortfallAmt,
        vehicleIdv : endroseData.VehicleIDV,
        shortfallVoucherNo : endroseData.EndoresementShortfallVoucherNo
      });
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
     
      this.endrosementMaster.patchValue({
        OD :  endroseData.AmtODChange,
        grossPremium : endroseData.AmtODChange,
      });
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.CancellationChequeBounce){
      
      this.endrosementMaster.patchValue({
        chequeBounceDate :  endroseData.BounceDate,
        bounceReason : endroseData.BounceReasonId,
        policyReinstate:   endroseData.PolicyReinstate,
      });
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.ChangeOfOwnershipNCBAdjustment
       || this._selectedEndrosementReason ==  EndorsementReason.NCBPercentAddedClientRequest
    ){
     
      this.endrosementMaster.patchValue({
        OD :  endroseData.AmtODChange,
        grossPremium : endroseData.AmtGrossPremiumChange,
        shortfallAmount:   endroseData.EndoresementShortfallAmt,
        ncbPercentage : endroseData.NewNCBId,
        shortfallVoucherNo : endroseData.EndoresementShortfallVoucherNo

      });
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.NCBRecoverable){
    
      this.endrosementMaster.patchValue({
        odRecoverable :  endroseData.AmtODChange,
        premiumRecoverable : endroseData.AmtGrossPremiumChange,
        odRecobe: this.IsModified ?  endroseData.NCBRecovredCancel : null,

      });
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.RemovalOfAccessoriesPassengerDiscount){
      this.endrosementMaster.patchValue({
        OD :  endroseData.AmtODChange,
        grossPremium : endroseData.AmtGrossPremiumChange,
        shortfallAmount:   endroseData.EndoresementShortfallAmt,
        electricAccessoriesIDV : endroseData.ElectricAssessoriesIDV,
        nonElectricAccessoriesIDV : endroseData.NonElectricAssessoriesIDV,
        shortfallVoucherNo : endroseData.EndoresementShortfallVoucherNo
      });
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.NCBRecoverable){
      debugger
      this.endrosementMaster.patchValue({
        odRecoverable :  endroseData.AmtODChange,
        premiumRecoverable : endroseData.AmtGrossPremiumChange,
        nCBRecovered: this.IsModified ?  endroseData.NCBRecovered : null,
      });
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.RTOLocationChange){
      this.endrosementMaster.patchValue({
        OD :  endroseData.AmtODChange,
        grossPremium : endroseData.AmtGrossPremiumChange,
        shortfallAmount:   endroseData.EndoresementShortfallAmt,
        rtoZone : endroseData.RTOZoneId,
        shortfallVoucherNo : endroseData.EndoresementShortfallVoucherNo
      });
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.VehicleModelOrVariantOrClassChange){
     
      this.endrosementMaster.patchValue({
        OD :  endroseData.AmtODChange,
        grossPremium : endroseData.AmtGrossPremiumChange,
        shortfallAmount:   endroseData.EndoresementShortfallAmt,
        vehicleClassId : endroseData.NewVehicleClassId,
        shortfallVoucherNo : endroseData.EndoresementShortfallVoucherNo
      });
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.CancellationNCBFalsificationShortScale){
      this.isRiskExpire =  true;
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.AdditionOfSumInsuredFire || 
      this._selectedEndrosementReason ==  EndorsementReason.AdditionOfLocationFire
    ){
       
      this.endrosementMaster.patchValue({
        grossPremium : endroseData.AmtGrossPremiumChange,
        shortfallAmount:   endroseData.EndoresementShortfallAmt,
        shortfallVoucherNo : endroseData.EndoresementShortfallVoucherNo
      });
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.ChangeOfDOBDecreaseSlabHealth
    ){
      this.endrosementMaster.patchValue({
        grossPremium : endroseData.AmtGrossPremiumChange,
      });
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.ChangeOfDOBIncreaseSlabHealth
    ){
    
      this.endrosementMaster.patchValue({
        grossPremium : endroseData.AmtGrossPremiumChange,
        shortfallAmount:   endroseData.EndoresementShortfallAmt,
        shortfallVoucherNo : endroseData.EndoresementShortfallVoucherNo
      });
    }
    if(this._selectedEndrosementReason ==  EndorsementReason.ChangeOfPolicyPeriodDecreaseTravel
    ||  this._selectedEndrosementReason ==  EndorsementReason.ChangeRiskClassToLowerPA
    ||  this._selectedEndrosementReason ==  EndorsementReason.CollectionAtEndMarineOpen
  ||  this._selectedEndrosementReason ==  EndorsementReason.DeletionOfLocationFire
  ||  this._selectedEndrosementReason ==  EndorsementReason.DeletionOfSumInsuredFireMarine
  ||  this._selectedEndrosementReason ==  EndorsementReason.MemberDeletionHealth){
      this.endrosementMaster.patchValue({
        grossPremium : endroseData.AmtGrossPremiumChange,
      });
    }

    if(this._selectedEndrosementReason ==  EndorsementReason.ChangeOfPolicyPeriodIncreaseTravel
      ||  this._selectedEndrosementReason ==  EndorsementReason.EnhancedSumInsuredMarineOpen
    ||  this._selectedEndrosementReason ==  EndorsementReason.ExtensionOfTripTravel
    ||  this._selectedEndrosementReason ==  EndorsementReason.MemberAdditionHealth
    ||  this._selectedEndrosementReason ==  EndorsementReason.MemberAdditionAndDeletionGPAMisc 
    ||  this._selectedEndrosementReason ==  EndorsementReason.ReturnExtensionDateChangeTravel){
      this.endrosementMaster.patchValue({
        grossPremium : endroseData.AmtGrossPremiumChange,
        shortfallAmount:   endroseData.EndoresementShortfallAmt,
        shortfallVoucherNo : endroseData.EndoresementShortfallVoucherNo
      
      });
    }

    this.endrosementMaster.patchValue({
      remark:   endroseData.EndorsementRemark
    });

  }



}
