import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { ICommonDto } from 'src/app/app-entites/dtos/common/common-dto';
import { IDateDto } from 'src/app/app-entites/dtos/common/date-dto';
import { IDropDownDto } from 'src/app/app-entites/dtos/common/drop-down-dto';
import { IAddOnPlanOptionDto } from 'src/app/app-entites/dtos/motor/add-on-plan-option-dto';
import { IRtoZoneDto } from 'src/app/app-entites/dtos/motor/rto-zone-dto';
import { IVarientDto } from 'src/app/app-entites/dtos/motor/varient-dto';
import { IVehicleDto } from 'src/app/app-entites/dtos/motor/vehicle-dto';
import { IYearDto } from 'src/app/app-entites/dtos/motor/year-dto';
import { IDocumentModel } from 'src/app/app-entites/models/common/document-model';
import { IMotorPolicyFormDataModel } from 'src/app/app-entites/models/motor/motor-policy-form-data-model';
import { ICustomerService } from 'src/app/app-services/customer-service/abstracts/customer.iservice';
import { IPaymentFormDataModel } from 'src/app/app-entites/models/motor/payment-form-data-model';
import { PolicyType, SearchPolicyType, Vertical,PackageType } from 'src/app/shared/utilities/enums/enum';
import { IPolicyTermDto } from '../../../../app-entites/dtos/motor/policy-term-dto';
import { ICommonService } from '../../../../app-services/common-service/abstracts/common.iservice';
import { IMotorService } from '../../../../app-services/motor-service/abstracts/motor.iservice';
import { ICustomerShortDetailDto } from 'src/app/app-entites/dtos/customer/customer-short-detail-dto';
import { MatDialog } from '@angular/material/dialog';
import { IAddOnRiderModel } from 'src/app/app-entites/models/motor/add-on-rider-model';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { Moment } from 'moment';
import { IPreviousClaimDto } from 'src/app/app-entites/dtos/common/previous-claims-dto';
import { IPolicyVoucherDto } from 'src/app/app-entites/dtos/common/policy-voucher-dto';
import { IPolicyInspectionDto } from 'src/app/app-entites/dtos/common/policy-inspection-dto';
import { IPolicyDocumentDto } from 'src/app/app-entites/dtos/common/policy-document-dto';
import { v4 as uuidv4 } from 'uuid';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { InspectionDetailComponent } from '../detail/inspection-detail/inspection-detail.component';
import { VoucherDetailComponent } from '../detail/voucher-detail/voucher-detail.component';
import { ViewClaimsComponent } from 'src/app/app-modules/sub-system/claims/view-claims/view-claims.component';
import { MotorService } from 'src/app/app-services/motor-service/motor.service';

export interface PeriodicElement {
  endorsementReason: string;
  entryDate: string;
  odChanges: string;
  premiumChange: string;
  idvChange: string;
  newNcb: string;
  endrosementRemark: string;
  voucherNumber: string;
  shortfallAmount: string;
  action: string;
}



export class PeriodicElement1 {
  public fileName: string = "";
  public remarks: string = "";
  public action: string = "";
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    endorsementReason: 'testing',
    entryDate: 'testing',
    odChanges: 'testing',
    premiumChange: 'testing',
    idvChange: 'testing',
    newNcb: 'testing',
    endrosementRemark: 'testing',
    voucherNumber: 'testing',
    shortfallAmount: 'testing',
    action: 'visibility'
  }
];


interface voucherTransaction {
  voucherNumber: string;
  amount: number,
  voucherType: string,
  date: string,
  status: string,
  remark: string,
  action: string
}


export interface PeriodicElementForInspectionDetail {
  inspectionCompany: string;
  inspectionNumber: number;
  inspectionDate: string;
  inspectionTime: string;
  inspectionRemarks: string;
  action: string;
}

const ELEMENT_DATA_InspectionDetail: PeriodicElementForInspectionDetail[] = [
  {
    inspectionCompany: 'testing', inspectionNumber: 1, inspectionDate: 'testing',
    inspectionTime: 'testing', inspectionRemarks: 'testing', action: 'visibility'
  },
];

@Component({
  selector: 'app-policy-data',
  templateUrl: './policy-data.component.html',
  styleUrls: ['./policy-data.component.css']
})
export class PolicyDataComponent implements OnInit, AfterViewInit, ErrorStateMatcher {
  @Input('MenuVertical') public MenuVertical: string = '';
  @Output() tableNameToDialogBox = new EventEmitter<string>();
  displayedColumnsDocumentTable: string[] = ["Sno", "DocumentTypeName", "FileName", "Remarks", "DocumentTypeId"];
  displayedColumns: string[] = [
    'endorsementReason',
    'entryDate',
    'odChanges',
    'premiumChange',
    'idvChange',
    'newNcb',
    'endrosementRemark',
    'voucherNumber',
    'shortfallAmount',
    'action'
  ];
  _displayedColumnsClaims: string[] = [
    'claimNumber',
    'claimSubmissionDateString',
    'amountApproved',
    'claimStatus',
    'remark',
    'action'
  ];

  dataSource = ELEMENT_DATA;
  public _claims: IPreviousClaimDto[] = [];
  public _vouchers: IPolicyVoucherDto[] = [];
  public _inspections: IPolicyInspectionDto[] = [];

  test: string = "testing";
  panelOpenState = false;
  _totalVoucherAmount: number = 0;
  _enableAddButton: boolean = true;
  _disableFields: boolean = false;
  _addOnRiderArray: string[] = [];
  _commissionPaidOnId: number = 0;
  _isViewPolicyActive: boolean = false;
  _displayedColumnsVouchers: string[] = ['voucherNumber', 'voucherAmount', 'voucherType', 'voucherDateString', 'voucherStatus', 'voucherRemark', 'action'];

  _displayedColumnsInspections: string[] = [
    'dateString',
    'reason',
    'status',
    'subStatus',
    'action'
  ];
  dataSourceInspectionDetail = ELEMENT_DATA_InspectionDetail;



  //#region Customer Form
  customerForm = new FormGroup({
    nameInPolicy: new FormControl('', [Validators.required]),
    addressInPolicy: new FormControl(''),
    customerCode: new FormControl(''),
    clusterCode: new FormControl(''),
    email: new FormControl(''),
    cluster: new FormControl(''),
    customerType: new FormControl(''),
    contactPerson: new FormControl(''),
    contactNumber: new FormControl(''),
    pan: new FormControl(''),
    gstin: new FormControl(''),
    gender: new FormControl(''),
    dateOfBirth: new FormControl(''),
    passportNumber: new FormControl(''),
    customerId: new FormControl(0)
  });
  //#endregion

  //#region Policy Term Form
  policyTermForm = new FormGroup({
    policyType: new FormControl('', [Validators.required]),
    vehicleClass: new FormControl([Validators.required]),
    packageType: new FormControl('', [Validators.required]),
    policyTerm: new FormControl('', [Validators.required]),
    acknowledgementSlipNumber: new FormControl(''),
    acknowledgementSlipIssueDate: new FormControl('')
  });
  //#endregion

  //#region Policy Form
  policyForm = new FormGroup({
    coverNoteNumber: new FormControl(''),
    coverNoteIssueDate: new FormControl(''),
    tpInsuranceCompany: new FormControl('', [Validators.required]),
    policyNumber: new FormControl('', [Validators.required]),
    tpStartDate: new FormControl(''),
    tpNumberOfYear: new FormControl('', [Validators.required]),
    tpExpiryDate: new FormControl(''),
    odInsuranceCompany: new FormControl('', [Validators.required]),
    odPolicyNumber: new FormControl('', [Validators.required]),
    odStartDate: new FormControl(''),
    odNumberOfYear: new FormControl('', [Validators.required]),
    odExpiryDate: new FormControl(''),
    insuranceBranch: new FormControl('', [Validators.required]),
    isAll: new FormControl(false),
    numberOfKiloMeterCovered: new FormControl(''),
    extendedKiloMeterCovered: new FormControl(''),
    financeBy: new FormControl('', [Validators.required]),
    lastYearInsuranceCompany: new FormControl('', [Validators.required]),
    previousCnPolicyNumber: new FormControl('', [Validators.required]),
    lastPolicyExpiryDate: new FormControl(''),
    isBlockAgent: new FormControl(false),
    isChangeAgent: new FormControl(false),
    // inspectionDate: new FormControl(''),
    // inspectionTime: new FormControl(''),
    // inspectionRemarks: new FormControl('')
    portability: new FormControl('', [Validators.required]),
    continutyStartDate: new FormControl(''),
    previousPolicyPlan: new FormControl(''),
    previousPolicySumInsured: new FormControl('', [Validators.pattern('^[0-9]+$')]),
  });
  //#endregion

  //#region Vehicle Form
  vehicleForm = new FormGroup({
    vehicle: new FormControl('', [Validators.required]),
    manufacturer: new FormControl('', [Validators.required]),
    model: new FormControl('', [Validators.required]),
    varient: new FormControl('', [Validators.required]),
    fuelType: new FormControl(''),
    cc: new FormControl(''),
    seating: new FormControl(''),
    gvw: new FormControl(''),
    kw: new FormControl(''),
    exShowRoomValue: new FormControl(''),
    registrationNumber: new FormControl(''),
    engineNumber: new FormControl(''),
    chassisNumber: new FormControl(''),
    vehicleSegment: new FormControl(''),
    rtoZone: new FormControl(''),
    riskZone: new FormControl(''),
    makeYear: new FormControl(''),
    dateOfRegistration: new FormControl(''),
    usage: new FormControl(''),
    isSpecialRegistrationNumber: new FormControl()
  });
  //#endregion

  //#region Premium Form
  premiumForm = new FormGroup({
    vehicleIdv: new FormControl('', [Validators.required]),
    electricAccessoriesIdv: new FormControl(''),
    nonElectricAccessoriesIdv: new FormControl(''),
    cngLpgIdv: new FormControl(''),
    totalIdv: new FormControl(''),
    od: new FormControl('', [Validators.required]),
    addOnRiderOd: new FormControl(''),
    endorseOd: new FormControl(''),
    totalOd: new FormControl(''),
    tp: new FormControl('', [Validators.required]),
    passengerCover: new FormControl(''),
    endorseTp: new FormControl(''),
    totalTp: new FormControl(''),
    nonCommissionComponentPremium: new FormControl(0),
    gst: new FormControl(18),
    gstValue: new FormControl(''),
    grossPremium: new FormControl(''),
    endorseGrossPremium: new FormControl(''),
    totalGrossPremium: new FormControl(''),
    specialDiscount: new FormControl('', [Validators.required]),
    loading: new FormControl(''),
    ncb: new FormControl('', [Validators.required]),
    commissionPaidOn: new FormControl(''),
    commissionablePremium: new FormControl(''),
    basicTPgstPercent: new FormControl('', [Validators.required]),
    netpremium: new FormControl(0),
  });
  //#endregion

  //#region Add-On Rider Form
  addOnRiderForm = new FormGroup({
    addOnPlan: new FormControl(''),
    addOnPlanOption: new FormArray([])
  });
  //#endregion

  //#region Nomination Form
  nominationForm = new FormGroup({
    nominationName: new FormControl(''),
    relation: new FormControl(''),
    age: new FormControl(''),
    guardianName: new FormControl('')
  });
  //#endregion

  //#region Policy Source Form
  policySourceForm = new FormGroup({
    teleCaller: new FormControl(''),
    fosName: new FormControl(''),
    posName: new FormControl(''),
    reference: new FormControl(''),
    businessDoneBy: new FormControl(''),
    posManagedBy: new FormControl(''),
    policyRemarks: new FormControl(''),
    isAllReference: new FormControl(false),
    isAllPos: new FormControl(false),
    isAllFos: new FormControl(false),
    isAllTeleCaller: new FormControl(false)
  });
  //#endregion
  private ChequeValidators = [
    Validators.pattern('^[a-zA-Z0-9]+$'),
  ];
  //#region Payment Form
  paymentForm = new FormGroup({
    mode1: new FormControl('', [Validators.required]),
    amount1: new FormControl('', [Validators.required]),
    instrumentNumber1: new FormControl({ value: '', disabled: false }, this.ChequeValidators),
    dated1: new FormControl(''),
    bank1: new FormControl(''),
    mode2: new FormControl(''),
    amount2: new FormControl(''),
    instrumentNumber2: new FormControl({ value: '', disabled: false }, [Validators.pattern('^[a-zA-Z0-9]+$')]),
    dated2: new FormControl(''),
    bank2: new FormControl(''),
    mode3: new FormControl(''),
    amount3: new FormControl(''),
    instrumentNumber3: new FormControl({ value: '', disabled: false }, [Validators.pattern('^[a-zA-Z0-9]+$')]),
    dated3: new FormControl(''),
    bank3: new FormControl(''),
  });
  //#endregion

  //#region Voucher Form
  voucherForm = new FormGroup({
    voucherNumber1: new FormControl(''),
    amount1: new FormControl(''),
    voucherType1: new FormControl(''),
    date1: new FormControl(''),
    voucherNumber2: new FormControl(''),
    amount2: new FormControl(''),
    voucherType2: new FormControl(''),
    date2: new FormControl(''),
    voucherNumber3: new FormControl(''),
    amount3: new FormControl(''),
    voucherType3: new FormControl(''),
    date3: new FormControl(''),
  });
  //#endregion

  //#region Upload Document Form
  uploadDocumentForm = new FormGroup({
    browse: new FormControl(''),
    documentType: new FormControl(''),
    remarks: new FormControl('')
  });
  //#endregion

  //product  plan form 
  productPlanForm = new FormGroup({
    product: new FormControl(''),
    plan: new FormControl(''),
    planTypes: new FormControl('')
  });
  // product plan form
  //#region 
  insurancePersonForm = new FormGroup({
    nameInsuredPerson: new FormControl(''),
    plan: new FormControl(''),
    planTypes: new FormControl('')
  });
  //endregion
  //#region Variables
  matcher = new ErrorStateMatcher();
  public _banks: any;
  public _policyTypes: any;
  public _vehicleClasses: any;
  public _policyTerms: IPolicyTermDto[] = [];
  public _tpInsuranceCompanies: IDropDownDto<number>[] = [];
  public _odInsuranceCompanies: IDropDownDto<number>[] = [];
  public _lastInsuranceCompanies: IDropDownDto<number>[] = [];
  public _insuranceCompanies: IDropDownDto<number>[] = [];
  public _insuranceCompanyBranches: IDropDownDto<number>[] = [];
  public _numberOfYears: IYearDto[] = [];
  public _financers: any;
  public _inspectionCompanies: any;
  public _manufacturers: IDropDownDto<number>[] = [];;
  public _models: IDropDownDto<number>[] = [];
  public _varients: IVarientDto[] = [];
  public _makeYears: IDropDownDto<number>[] = [];
  public _usages: any;
  public _ncbs: any;
  public _commissionPaidOn: any;
  public _addOnRiders: IDropDownDto<number>[] = [];
  public _addOnPlanOptions: IAddOnPlanOptionDto[] = [];
  public _vehicles: IDropDownDto<number>[] = [];
  public _rtoZones: IRtoZoneDto[] = [];
  public _relations: any;
  public _teleCallers: any;
  public _references: any;
  public _fosNames: any;
  public _dsaNames: any;
  public _type: number;
  private _branchId: any;
  public _packageTypes: IDropDownDto<number>[] = [];
  public _isOdPolicyEnable: boolean = false;
  public _isAddOnRiderEnable: boolean = true;
  public _posDatas: IDropDownDto<number>[] = [];
  public _documentTypes: IDropDownDto<number>[] = [];
  public _paymentTypes: IDropDownDto<number>[] = [];

  public _customerId: any;
  public _policyTypeId: any;
  public _policyType: any;
  public _policyId: any;
  public _uploadDocuments: IDocumentModel[] = [];
  public _filteredOptions: IDropDownDto<number>[] = [];
  public _tableName: string = "";
  public _dataSourceUploadDocuments: MatTableDataSource<IPolicyDocumentDto> = new MatTableDataSource<IPolicyDocumentDto>();
  public _controlNumber: string = "";
  public _headerTitle: string = "";
  public _previousControlNumber: string = "";
  public _renewalCounter: number = 0;
  public isTpInsuranceDisable: boolean = false;
  public _addOnRiderModel: IAddOnRiderModel

  public _isDisableBlockAgentCheckbox: boolean = false;
  public _isDisableChangeAgentCheckbox: boolean = false;

  public _isDisableOdPolicyDetails: boolean = false;
  public _policyData?: IMotorPolicyFormDataModel;
  public _verticalName: any = "";
  public _policyStatus: string = "";
  public _policyStatusColor: string = "";
  public _posManagedBy?: IDropDownDto<number>;
  public _verticalDetail: any;
  public _policyDocuments: IPolicyDocumentDto[] = [];
  public _filteredInsuranceCompaniesOptions: IDropDownDto<number>[] = [];
  public _filteredInsuranceCompaniesLastOptions: IDropDownDto<number>[] = [];
  public _filteredInsuranceCompaniesOdOptions: IDropDownDto<number>[] = [];

  public _filteredPosOptions: IDropDownDto<number>[] = [];
  public _filteredManufacturerOptions: IDropDownDto<number>[] = [];


  public _products: IDropDownDto<number>[] = [];
  public _plans: IDropDownDto<number>[] = [];
  public _planTypes: IDropDownDto<number>[] = [];
  public _selectedProductId: number = 0;
  public _portability: IDropDownDto<number>[] = [];
  public get SearchPolicyType(): typeof SearchPolicyType {
    return SearchPolicyType;
  }
  public get PackageType(): typeof PackageType {
    return PackageType;
  }

  //#endregion

  constructor(
    private commonService: ICommonService,
    private motorService: IMotorService,
    private customerService: ICustomerService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    public mainmotorService : MotorService
  ) {
    this._type = 1;
    this._branchId = sessionStorage.getItem("branchId");
    this._addOnRiderModel = {
      AddOnRiderId: 0,
      AddOnRiderOptionId: [],
      AddOnValue: []
    };
  }

  ngOnInit(): void {
    this.vehicleForm.get("vehicle")?.valueChanges.subscribe(input => {
      if (typeof (input) == "string")
        this.filterData(input);
      else
        this.filterData(input.Name);
    })
    this._verticalName =  this.mainmotorService.vertical$.getValue();
    this._headerTitle =  this.mainmotorService._headerTitle$.getValue();
    this._customerId = this.route.snapshot.paramMap.get('customerId');
    this._policyTypeId =Number(this.route.snapshot.paramMap.get('policyTypeId'));//is the id when customer saved
    this._policyId = Number(this.route?.snapshot?.paramMap.get('policyId') || 0);
    this._policyType = Number(this.route?.snapshot?.paramMap.get('policyType') ||0);
    switch (this._policyTypeId ) {
      case 1:
        this._type = SearchPolicyType.Motor_New;
        this._isDisableBlockAgentCheckbox = this._isDisableChangeAgentCheckbox = true;
        break;
      case 2:
        this._type = SearchPolicyType.Motor_Renew;
        break;
      case 3:
          this._type = SearchPolicyType.Motor_rollover;
          break;
      case 4:
        this._type = 4;
        break;
      case 5:
        this._type = SearchPolicyType.Motor_Verify;
        break;
      case 6:
        this._type = 6;
        break;
      case 7:
        this._type = 7;
        break;
      case 8:
        this._type = SearchPolicyType.Motor_rollover;
        break;
    }

    if(this._policyType == 2){
      this._type = SearchPolicyType.Motor_Renew;
    }

    if(this._policyType == SearchPolicyType.Motor_View){
      this._isViewPolicyActive = true
    }

    this.policyForm.get("numberOfKiloMeterCovered")?.disable();
    this.policyForm.get("extendedKiloMeterCovered")?.disable();
  }

  async ngAfterViewInit(): Promise<void> {
    if (this._customerId) {
      await this.getCustomerShortDetailById(this._customerId);

    }
    await this.getVehicleClasses();
    await this.getPackageTypes();
    await this.getPolicyTypes();
    await this.getInsuranceCompanies();
    await this.getNumberOfYears();
    await this.getFinancers();
    await this.getInspectionCompanies();
    await this.getManufacturers();
    await this.getMakeYears();
    await this.getRtoZones();
    await this.getDocumentTypes();
    await this.getPaymentModes();
    await this.getRelations();
    await this.getTeleCallers(this._branchId);
    await this.getReferences(this._branchId);
    await this.getFosNames(this._branchId);
    await this.getPos(this._branchId);
    await this.getBanks();
    await this.getUsages();
    await this.getCommissionPaidOn();
    await this.getNcbs();
    await this.getVerticalDetail();
    await this.getProduct();
    await this.getPlanType();
    await this.getPortability();
    await this.getPolicyClaims();
    await this.getPolicyVouchers();
    await this.getPolicyInspections();
    await this.getPolicyDocuments();
    //Not calling on edit
    if (this._policyId == 0) {
//      await this.getAddOnRiders();
      await this.getAddOnPlanOptions(-1);
    }
    if (this._policyId != 0) {
      await this.getMotorPolicyById(this._policyId);
    }

    this.policyForm.get("tpInsuranceCompany")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterInsurancerCompaniesData(input);
      else
        this.filterInsurancerCompaniesData(input.Name);
    });

    this.policyForm.get("lastYearInsuranceCompany")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterInsurancerCompaniesLastData(input);
      else
        this.filterInsurancerCompaniesLastData(input.Name);
    });

    this.policyForm.get("odInsuranceCompany")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterInsurancerCompaniesOdData(input);
      else
        this.filterInsurancerCompaniesOdData(input.Name);
    });

    this.policySourceForm.get("posName")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterPosdData(input);
      else
        this.filterPosdData(input.Name);
    });

    this.vehicleForm.get("manufacturer")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterdManufacturerData(input);
      else
        this.filterdManufacturerData(input.Name);
    });
    const CHEQUE = "1";
    const AGENTCHEQUE = "3"
    const CASH = "2"
    this.paymentForm.get('mode1')?.valueChanges
      .subscribe(value => {
        this.paymentForm.get('instrumentNumber1')?.enable({ onlySelf: true });
        this.paymentForm.get('bank1')?.enable({ onlySelf: true });

        if (value == CASH) {
          this.paymentForm.get('instrumentNumber1')?.disable({ onlySelf: true });
          this.paymentForm.get('bank1')?.disable({ onlySelf: true });
        }

        if (value == CHEQUE || value == AGENTCHEQUE) {
          this.paymentForm.get('instrumentNumber1')?.setValidators(this.ChequeValidators.concat(Validators.maxLength(6)))
        } else {
          this.paymentForm.get('instrumentNumber1')?.setValidators(this.ChequeValidators);
        }

        this.paymentForm.get('instrumentNumber1')?.updateValueAndValidity();
        this.paymentForm.get('bank1')?.updateValueAndValidity();
      });

    this.paymentForm.get('mode2')?.valueChanges
      .subscribe(value => {
        this.paymentForm.get('instrumentNumber2')?.enable();
        this.paymentForm.get('bank2')?.enable();
        if (value == CASH) {
          this.paymentForm.get('instrumentNumber2')?.disable({ onlySelf: true });
          this.paymentForm.get('bank2')?.disable({ onlySelf: true });
        }
        if (value == CHEQUE || value == AGENTCHEQUE) {
          this.paymentForm.get('instrumentNumber2')?.setValidators(this.ChequeValidators.concat(Validators.maxLength(6)))
        } else {
          this.paymentForm.get('instrumentNumber2')?.setValidators(this.ChequeValidators);
        }
        this.paymentForm.get('instrumentNumber2')?.updateValueAndValidity();
        this.paymentForm.get('bank2')?.updateValueAndValidity();

      });

    this.paymentForm.get('mode3')?.valueChanges
      .subscribe(value => {
        this.paymentForm.get('instrumentNumber3')?.enable();
        this.paymentForm.get('bank3')?.enable();
        if (value == CASH) {
          this.paymentForm.get('instrumentNumber3')?.disable({ onlySelf: true });
          this.paymentForm.get('bank3')?.disable({ onlySelf: true });
        }
        if (value == CHEQUE || value == AGENTCHEQUE) {
          this.paymentForm.get('instrumentNumber3')?.setValidators(this.ChequeValidators.concat(Validators.maxLength(6)))
        } else {
          this.paymentForm.get('instrumentNumber3')?.setValidators(this.ChequeValidators);
        }
        this.paymentForm.get('instrumentNumber3')?.updateValueAndValidity();
        this.paymentForm.get('bank3')?.updateValueAndValidity();

      });

  }



  setvalues() {

    this._verticalName = this._policyData != undefined ? this._policyData.Vertical : "MOTOR";
    this._policyStatus = this._policyData != undefined ? this._policyData.PolicyStatus : "Active";
    this._policyStatusColor = this._policyData != undefined ? this._policyData.PolicyStatusColor : '#fdcb6e'
  }
  filterData(input: any) {
    this._filteredOptions = this._vehicles.filter(item => {
      return item.Name.toLowerCase().indexOf(input.toLowerCase()) > -1
    });
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

  getBanks(): any {
    this.commonService.getBanks().subscribe((response: any) => {
      this._banks = response;
    });
  }

  getVerticalDetail(): void {
    this.commonService.getVerticalById(Vertical.Motor).subscribe((response: any) => {
      this._verticalDetail = response;
    });
  }

  getPolicyTypes(): any {
    this.commonService.getPolicyTypes(this._type).subscribe((response: any) => {
      this._policyTypes = response;
      if (this._type == SearchPolicyType.Motor_New) {
        this.policyTermForm.patchValue({ policyType: PolicyType.New });
      }
      if (this._type ==  SearchPolicyType.Motor_rollover) {
        this.policyTermForm.patchValue({ policyType: PolicyType.Rollover });
      }
      if (this._type == SearchPolicyType.Motor_Renew) {
        this.policyTermForm.patchValue({ policyType: PolicyType.Renewal });
      }
    //  this.getPolicyTerms()
    });
  }

  getPackageTypes(): any {
    this.commonService.getPackageTypes().subscribe((response: IDropDownDto<number>[]) => {
      this._packageTypes = response;
    });
  }

  getVehicleClasses(): any {
    this.commonService.getVehicleClasses().subscribe((response: any) => {
      this._vehicleClasses = response;
    });
  }

  async getPolicyTerms(): Promise<void> {
    this.policyForm.reset();
    this.policyTermForm.patchValue({ policyTerm: undefined });
    let model = this.getPolicyFormData();
    if (model.PolicyTypeId == undefined ||
      model.VehicleClassId == undefined ||
      model.PackageTypeId == undefined ||
      model.PolicyTypeId == "" ||
      model.VehicleClassId == "" ||
      model.PackageTypeId == "") return;

   
    if (model.PackageTypeId === PackageType.COMPREHENSIVE|| model.PackageTypeId === PackageType.USAGE_BASE) {
      this._isDisableOdPolicyDetails = true;
      this._isOdPolicyEnable = true;
      this._isAddOnRiderEnable = true;
    }
    else if (model.PackageTypeId === PackageType.TP_ONLY) {
      this._isDisableOdPolicyDetails = false;
      this._isOdPolicyEnable = false;
      this._isAddOnRiderEnable = false;
    }else if(model.PackageTypeId === PackageType.OD_ONLY){
      this._isDisableOdPolicyDetails = false;
      this._isOdPolicyEnable = true;
      this._isAddOnRiderEnable = true;
    }

    if (model.PackageTypeId ===PackageType.USAGE_BASE) {
      this.policyForm.get("numberOfKiloMeterCovered")?.enable();
      this.policyForm.get("extendedKiloMeterCovered")?.enable();
    }
    else {
      this.policyForm.get("numberOfKiloMeterCovered")?.disable();
      this.policyForm.get("extendedKiloMeterCovered")?.disable();
    }

    this.commonService.getPolicyTerms(model.PolicyTypeId, model.VehicleClassId, model.PackageTypeId).subscribe((response: IPolicyTermDto[]) => {
      this._policyTerms = response;
    });

    if(this._type == SearchPolicyType.Motor_Renew){
     await this.setPolicySourceRenewal()
     await this.setPreviousInsuranceCompany()
     this.removePrevTpOdInsurance()
    }
    this.setOdPolicyDetail()
    this.getVehicles();
   
  }
  async setPolicySourceRenewal(){
    
    if (this.policyTermForm.value.policyType == PolicyType.SameCompanyRetention ) {
      if(this.policyTermForm.value.packageType == PackageType.OD_ONLY){
       await this.setDataForSameCompanyRetentionPolicyTypeOd();
      }
      if(this.policyTermForm.value.packageType == PackageType.TP_ONLY){
        this.setDataForSameCompanyRetentionPolicyTypeTp();
      }
      if(this.policyTermForm.value.packageType == PackageType.COMPREHENSIVE || this.policyTermForm.value.packageType == PackageType.USAGE_BASE){
      await  this.setDataForSameCompanyRetentionPolicyTypeComprehensiveOrUsageBased();
      }
    }

    if (this.policyTermForm.value.policyType == PolicyType.OtherCompanyRetention ) {
      if(this.policyTermForm.value.packageType == PackageType.TP_ONLY){
      await  this.setDataForOtherCompanyRetentionPolicyTypeTp();
      }
      if(this.policyTermForm.value.packageType == PackageType.OD_ONLY){
      await this.setDataForOtherCompanyRetentionPolicyTypeOd();
      }
    }
    console.log("over")
  }

  getInsuranceCompanies(): any {
    this.commonService.getInsuranceCompanies(Vertical.Motor).subscribe((response: IDropDownDto<number>[]) => {
      this._insuranceCompanies = this._tpInsuranceCompanies = this._odInsuranceCompanies = this._lastInsuranceCompanies = response;
    });
  }

  getNumberOfYears(): any {
    this.commonService.getNumberOfYears().subscribe((response: IYearDto[]) => {
      this._numberOfYears = response;
    });
  }

  getFinancers(): any {
    this.commonService.getFinancers().subscribe((response: any) => {
      this._financers = response;
    });
  }

  getInspectionCompanies(): any {
    this.commonService.getInspectionCompanies().subscribe((response: any) => {
      this._inspectionCompanies = response;
    });
  }

  getInsuranceCompanyBranches(): void {
    let insuranceCompanyId: number = 0;
    this.setOdPolicyDetail();
  

    if (this._isOdPolicyEnable) {
      if (this.policyForm.value.odInsuranceCompany == undefined || this.policyForm.value.odInsuranceCompany == "") return;
      insuranceCompanyId = this.policyForm.value.odInsuranceCompany;
    }
    else
      insuranceCompanyId = this.policyForm.value.tpInsuranceCompany;

    let branchId: number = this.PolicyForm.isAll ? -1 : this._branchId;

    this.commonService.getInsuranceCompanyBranches(Vertical.Motor, insuranceCompanyId, branchId).subscribe((response: IDropDownDto<number>[]) => {
      this._insuranceCompanyBranches = response;
    });
    this.getAddOnRiders();
    if(this._policyId == 0){
      this.setPreviousInsuranceCompany();

    }
  }

  

  getVehicles(): void {
    let vehicleClassId =  this.policyTermForm.value.vehicleClass;
    this.commonService.getVehicles(vehicleClassId).subscribe((response: IDropDownDto<number>[]) => {
      this._vehicles = response;
    });
  }

  getManufacturers(): void {
    this.commonService.getManufacturers().subscribe((response: any) => {
      this._manufacturers = response;
    });
  }

  getModels(): any {
    let manufacturerId = this.vehicleForm.value.manufacturer;
    console.log(manufacturerId, "manufacturerId");
    this.commonService.getModels(manufacturerId).subscribe((response: IDropDownDto<number>[]) => {
      this._models = response;
    });
  }

  getVarients(): void {
    let manufacturerId = this.vehicleForm.value.manufacturer;
    let modelId = this.vehicleForm.value.model;
    let vehicleClassId = this.policyTermForm.value.vehicleClass;

    if (manufacturerId == undefined ||
      modelId == undefined ||
      vehicleClassId == undefined ||
      manufacturerId == "" ||
      modelId == "" ||
      vehicleClassId == "") return;

    this.commonService.getVarients(manufacturerId, modelId, vehicleClassId).subscribe((response: IVarientDto[]) => {
      this._varients = response;
    });
  }

  getMakeYears(): any {
    this.commonService.getMakeYears(this._type).subscribe((response: IDropDownDto<number>[]) => {
      this._makeYears = response;
    });
  }

  getRtoZones(): void {
    this.commonService.getRtoZones().subscribe((response: IRtoZoneDto[]) => {
      this._rtoZones = response;
    });
  }

  getUsages(): any {
    this.commonService.getUsages().subscribe((response: any) => {
      this._usages = response;
    });
  }

  getNcbs(): any {
    this.commonService.getNcbs().subscribe((response: any) => {
      this._ncbs = response;
    });
  }

  getCommissionPaidOn(): any {
    this.commonService.getCommissionPaidOn().subscribe((response: any) => {
      this._commissionPaidOn = response;
    });
  }

  getAddOnRiders(): void {
    let insuranceCompanyId:number =0
    
    if(this.policyForm.value.PackageTypeId == PackageType.TP_ONLY){
      insuranceCompanyId = this.PolicyForm.tpInsuranceCompany
    }else{
      insuranceCompanyId = this.PolicyForm.odInsuranceCompany
    }

    this.commonService.getAddOnRiders(insuranceCompanyId, Vertical.Motor).subscribe((response: IDropDownDto<number>[]) => {
      this._addOnRiders = response;
    });
  }

  getAddOnPlanOptions(addOnRiderId: number): void {
    this.commonService.getAddOnPlanOptions(addOnRiderId, Vertical.Motor, 0).subscribe((response: IAddOnPlanOptionDto[]) => {
      response.forEach((value, index) => {
        value.IsDisabled = value.IsPlanAvailable;
        if (value.IsPlanAvailable) {
          this._addOnRiderArray.push(value.AddonPlanOptionName);
        }
      });
      this._addOnPlanOptions = response;
    });
    this._addOnRiderArray = [];
  }

  getRelations(): any {
    this.commonService.getRelations().subscribe((response: any) => {
      this._relations = response;
    });
  }

  getTeleCallers(branchId: number): any {
    this.commonService.getTeleCallers(Vertical.Motor, branchId).subscribe((response: any) => {
      this._teleCallers = response;
    });
  }

  getReferences(branchId: number): any {
    this.commonService.getReferences(branchId).subscribe((response: any) => {
      this._references = response;
    });
  }

  getFosNames(branchId: number): any {
    this.commonService.getFosNames(Vertical.Motor, branchId).subscribe((response: any) => {
      this._fosNames = response;
    });
  }

  getDsaNames(): any {
    this.commonService.getDsaNames().subscribe((response: any) => {
      this._dsaNames = response;
    });
  }

  getPosManagedBy(posId: number) {
    if (posId > 0) {
      this.commonService.getPosManagedByPosId(posId).subscribe((response: IDropDownDto<number>) => {
        this._posManagedBy = response;
        this.policySourceForm.patchValue({
          posManagedBy: this._posManagedBy.Name
        });
      });
    }
    else {
      this.policySourceForm.patchValue({
        posManagedBy: ""
      });
    }
  }


  createPolicy(): any {
    let menu = this.MenuVertical;
    let IsVerified = false
    if(this._policyType == SearchPolicyType.Motor_Verify){
      IsVerified = true 
    }
    
    let model: IMotorPolicyFormDataModel = {
      PolicyId: this._policyId,
      BranchId: this._branchId,
      VerticalCode: this._verticalDetail.VerticalCode,
      CoverNoteIssueDateString: this.commonService.getDateInString(this.PolicyForm.coverNoteIssueDate),
      CoverNoteIssueDateDto: null,
      CoverNoteNumber: this.PolicyForm.coverNoteNumber,
      Customer: {
        CustomerId: this.CustomerForm.customerId,
        AddressInPolicy: this.CustomerForm.addressInPolicy,
        Cluster: this.CustomerForm.cluster,
        ClusterCode: this.CustomerForm.clusterCode,
        ContactNumber: this.CustomerForm.contactNumber,
        ContactPerson: this.CustomerForm.contactPerson,
        CustomerCode: this.CustomerForm.customerCode,
        CustomerType: this.CustomerForm.customerType,
        Email: this.CustomerForm.email,
        Gstin: this.CustomerForm.gstin,
        Gender: this.CustomerForm.gender,
        DateOfBirth: this.CustomerForm.dateOfBirth,
        PassportNumber: this.CustomerForm.passportNumber,
        NameInPolicy: this.CustomerForm.nameInPolicy,
        Pan: this.CustomerForm.pan
      },
      ExtendedKiloMeterCovered: this.PolicyForm.extendedKiloMeterCovered,
      NumberOfKiloMeterCovered: this.PolicyForm.numberOfKiloMeterCovered,
      TpPolicy: {
        ExpiryDateString: this.commonService.getDateInString(this.PolicyForm.tpExpiryDate),
        ExpiryDateDto: null,
        InsuranceCompany: this.PolicyForm.tpInsuranceCompany,
        NumberOfYear: this.PolicyForm.tpNumberOfYear,
        PolicyNumber: this.PolicyForm.policyNumber,
        StartDateString: this.commonService.getDateInString(this.PolicyForm.tpStartDate),
        StartDateDto: null
      },
      OdPolicy: {
        StartDateString: this.commonService.getDateInString(this.PolicyForm.odStartDate),
        StartDateDto: null,
        ExpiryDateString: this.commonService.getDateInString(this.PolicyForm.odExpiryDate),
        ExpiryDateDto: null,
        InsuranceCompany: this.PolicyForm.odInsuranceCompany,
        NumberOfYear: this.PolicyForm.odNumberOfYear,
        PolicyNumber: this.PolicyForm.odPolicyNumber
      },
      InsuranceBranch: this.PolicyForm.insuranceBranch,
      FinanceBy: this.PolicyForm.financeBy,
      PreviousPolicy: {
        LastPolicyExpiryDateString: this.commonService.getDateInString(this.PolicyForm.lastPolicyExpiryDate),
        LastPolicyExpiryDateDto: null,
        LastYearInsuranceCompany: this.PolicyForm.lastYearInsuranceCompany,
        PreviousPolicyNumber: this.PolicyForm.previousCnPolicyNumber
      },
      InspectionData: {
        InspectionCompany: this.PolicyForm.inspectionCompany,
        InspectionDateString: this.commonService.getDateInString(this.PolicyForm.inspectionDate),
        InspectionDateDto: null,
        InspectionNumber: this.PolicyForm.inspectionNumber,
        InspectionRemarks: this.PolicyForm.inspectionRemarks,
        InspectionTime: this.commonService.getDateInString(this.PolicyForm.inspectionTime)
      },
      Nomination: {
        Age: this.NominationForm.age,
        Name: this.NominationForm.nominationName,
        Relation: this.NominationForm.relation,
        GuardianName: this.NominationForm.guardianName
      },
      PolicySource: {
        BusinessDoneBy: this.PolicySourceForm.businessDoneBy,
        Fos: this.PolicySourceForm.fosName,
        Pos: this.PolicySourceForm.posName,
        PolicyRemarks: this.PolicySourceForm.policyRemarks,
        PosManagedBy: this._posManagedBy != undefined ? this._posManagedBy.Value : 0,
        Reference: this.PolicySourceForm.reference,
        TeleCaller: this.PolicySourceForm.teleCaller
      },
      PaymentData: this.getPaymentFormData(),
      PolicyTerm: {
        AcknowledgementSlipIssueDateString: this.commonService.getDateInString(this.PolicyTermForm.acknowledgementSlipIssueDate),
        AcknowledgementSlipIssueDateDto: null,
        AcknowledgementSlipNumber: this.PolicyTermForm.acknowledgementSlipNumber,
        PackageTypeId: (this.MenuVertical == 'Motor') ? this.PolicyTermForm.packageType : 0,
        PolicyTerm: (this.MenuVertical == 'Motor') ? this.PolicyTermForm.policyTerm?.Id : 0,
        PolicyType: this.PolicyTermForm.policyType,
        VehicleClass: this.PolicyTermForm.vehicleClass,
        PackageType: (this.MenuVertical == 'Motor') ? this._packageTypes.filter(f => f.Value == this.PolicyTermForm.packageType)[0]?.Name : '',
      },
      Premium: {
        AddOnRiderOd: this.PremiumForm.addOnRiderOd,
        CngLpgIdv: this.PremiumForm.cngLpgIdv,
        CommissionPaidOn: this.PremiumForm.commissionPaidOn,
        CommissionablePremium: this.PremiumForm.commissionablePremium,
        ElectricAccessoriesIdv: this.PremiumForm.electricAccessoriesIdv,
        EndorseGrossPremium: this.PremiumForm.endorseGrossPremium,
        EndorseOd: this.PremiumForm.endorseOd,
        EndorseTp: this.PremiumForm.endorseTp,
        GrossPremium: this.PremiumForm.grossPremium,
        GstPercentage: this.PremiumForm.gst,
        GstValue: this.PremiumForm.gstValue,
        Loading: this.PremiumForm.loading,
        Ncb: this.PremiumForm.ncb,
        NonCommissionComponentPremium: this.PremiumForm.nonCommissionComponentPremium,
        NonElectricAccessoriesIdv: this.PremiumForm.nonElectricAccessoriesIdv,
        Od: this.PremiumForm.od,
        PassengerCover: this.PremiumForm.passengerCover,
        SpecialDiscount: this.PremiumForm.specialDiscount,
        TotalGrossPremium: this.PremiumForm.totalGrossPremium,
        TotalIdv: this.PremiumForm.totalIdv,
        TotalOd: this.PremiumForm.totalOd,
        TotalTp: this.PremiumForm.totalTp,
        Tp: this.PremiumForm.tp,
        VehicleIdv: this.PremiumForm.vehicleIdv,
        BasicTpGstPercentage: this.PremiumForm.basicTPgstPercent,
        NetPremium: this.PremiumForm.netpremium
      },
      Vehicle: {
        Cc: this.VehicleForm.cc,
        ChassisNumber: this.VehicleForm.chassisNumber,
        EngineNumber: this.VehicleForm.engineNumber,
        ExShowRoomValue: this.VehicleForm.exShowRoomValue,
        FuelType: this.VehicleForm.fuelType,
        Gvw: this.VehicleForm.gvw,
        Kw: this.VehicleForm.kw,
        MakeYear: this.VehicleForm.makeYear,
        Manufacturer: this.VehicleForm.manufacturer,
        Model: this.VehicleForm.model,
        RegistrationDateString: this.commonService.getDateInString(this.VehicleForm.dateOfRegistration),
        RegistrationDateDto: null,
        RegistrationNumber: this.VehicleForm.registrationNumber,
        RiskZone: this.VehicleForm.riskZone,
        RtoZone: this.VehicleForm.rtoZone.Value,
        Seating: this.VehicleForm.seating,
        Usage: this.VehicleForm.usage,
        Varient: this.VehicleForm.varient.VarientId,
        VehicleSegment: this.VehicleForm.vehicleSegment,
        IsSpecialRegistrationNumber: this.VehicleForm.isSpecialRegistrationNumber
      },
      Document: this._uploadDocuments,
      AddOnRider: this.getAddOnRiderFormData(),
      ControlNumber: "", // not save in api
      CommissionStatus: "",
      PolicyCancelReason: "",
      PolicyStatus: "",
      PreviousControlNumber: "",
      ReconStatus: "",
      Vertical: this._verticalDetail.VerticalName,
      RenewalCounter: this._renewalCounter,
      PolicyStatusId: 0,
      CommissionStatusColor: "",
      DataEntryStatus: "",
      DataEntryStatusColor: "",
      PolicyCancelReasonColor: "",
      PolicyStatusColor: "",
      ReconStatusColor: "",
      Condition1: false,
      Condition2: false,
      IsBlockAgent: this.PolicyForm.isBlockAgent,
      IsChangeAgent: this.PolicyForm.isChangeAgent,
      AddOnSelected: this._addOnRiderArray.join(', '),
      VerticalId: this._verticalDetail.VerticalId,
      VerticalSegmentId: this._verticalDetail.VerticalSegmentId,
      IsVerified:IsVerified
    }

    if (this._policyId == 0 || this._type == SearchPolicyType.Motor_Renew) {
      console.log(model, 'model')
      this.motorService.createPolicy(model).subscribe((response: ICommonDto<any>) => {
        if (response.IsSuccess) {
          Swal.fire({
            icon: 'success',
            title: 'Done',
            text: response.Message,
          }).then((result) => {
            if (result.isConfirmed) {
              this.redirectRoute();
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
              }).then((result) => {
                if (result.isConfirmed) {
                  //this.createPolicyAfterWarning(response);
                  this.redirectRoute();

                }
              })
            }
          }
        }
      });
    }
    else 
      {
      this.motorService.updatePolicy(this._policyId, model).subscribe((response: ICommonDto<any>) => {

        if (response.IsSuccess) {
          Swal.fire({
            icon: 'success',
            title: 'Done',
            text: response.Message,
          }).then((result) => {
            if (result.isConfirmed) {
              this.redirectRoute();
            }
          });
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
          }
        }
      });

    }
  }

  private getPolicyFormData(): any {
    return {
      PolicyTypeId: this.policyTermForm.value.policyType,
      VehicleClassId: this._policyTypeId === "2" ? this._policyData?.PolicyTerm.VehicleClass : this.policyTermForm.value.vehicleClass,
      PackageTypeId: this.policyTermForm.value.packageType,
      PolicyTermId: this.policyTermForm.value.policyTerm
    };
  }

  async setPolicyTermDetails(policyTerm: IPolicyTermDto): Promise<void> {
    
    if (policyTerm === undefined || policyTerm == null) return;
    let tpYear = this._numberOfYears.filter(f => f.Year == policyTerm.TpYear)[0];
    let odYear = this._numberOfYears.filter(f => f.Year == policyTerm.OdYear)[0];

    this.policyForm.patchValue({
      tpNumberOfYear: tpYear?.Value,
      odNumberOfYear: odYear?.Value,
      tpStartDate: moment(new Date(2022, 3, 1)),
      odStartDate: moment(new Date(2022, 3, 1)),
      continutyStartDate: moment(new Date(2021, 3, 1))
    });

    if (policyTerm.OdYear > 0) {
      this._isOdPolicyEnable = true;
      this.commonService.getDate(this.commonService.getDateInString(this.policyForm.value.odStartDate),  odYear?.Year).subscribe((response: IDateDto) => {
        this.policyForm.patchValue({
          odExpiryDate: moment(new Date(`${response.Year}-${response.Month}-${response.Day}`))
        });
      });
    }
    else {
      this._isOdPolicyEnable = false;
    }
    if(tpYear?.Year){
      this.commonService.getDate(this.commonService.getDateInString(this.policyForm.value.tpStartDate), tpYear?.Year).subscribe((response: IDateDto) => {
        this.policyForm.patchValue({
          tpExpiryDate: moment(new Date(`${response.Year}-${response.Month}-${response.Day}`))
        });
      });
    }

   await this.setPolicySourceRenewal()
    this.setPreviousInsuranceCompany()
    //this.getInsuranceCompanyBranches();
  }



  setExpiryDate(policy: string) {
    let policyTerm: IPolicyTermDto = this.policyTermForm.value.policyTerm as IPolicyTermDto;
  
    if (this.policyForm.value.tpNumberOfYear == undefined
      || this.policyForm.value.tpNumberOfYear === ""
      || this.policyForm.value.odNumberOfYear == undefined
      || this.policyForm.value.odNumberOfYear === ""
      || policyTerm === undefined
      || policyTerm == null) return;
      let tpYear = this._numberOfYears.filter(f => f.Value == this.policyForm.value.tpNumberOfYear)[0];
      let odYear = this._numberOfYears.filter(f => f.Value == this.policyForm.value.odNumberOfYear)[0];
    this.setOdPolicyDetail();
    if (policy === "tp") {

      if (this.policyTermForm.value.policyType === PolicyType.SameCompanyRetention || this.policyTermForm.value.policyType === PolicyType.OtherCompanyRetention) {
        let startDate: Date = this.commonService.getDateFromIDateDto(this._policyData?.TpPolicy.ExpiryDateDto as IDateDto) as Date;
        //startDate = new Date(startDate.setDate(startDate.getDate() + 1));

        if (startDate != null && !moment(startDate).isBefore(this.policyForm.value.tpStartDate)) {
          this.policyForm.patchValue({
            tpStartDate: undefined
          });

          Swal.fire({
            icon: 'error',
            title: 'Sorry',
            text: "Previous date is not allowed",
          });
          return;
        }

        if (startDate != null && !this.isDateValid(moment(startDate), this.policyForm.value.tpStartDate)) {
          this.policyForm.patchValue({
            tpStartDate: undefined
          });

          Swal.fire({
            icon: 'error',
            title: 'Sorry',
            text: "Please select date less than 93 days"
          });
          return;
        }
      }
      this.commonService.getDate(this.commonService.getDateInString(this.policyForm.value.tpStartDate),tpYear?.Year).subscribe((response: IDateDto) => {
        this.policyForm.patchValue({
          tpExpiryDate: moment(new Date(`${response.Year}-${response.Month}-${response.Day}`))
        });
      });
    }

    if (policy === "od" ) {

      if (this.policyTermForm.value.policyType === PolicyType.SameCompanyRetention || this.policyTermForm.value.policyType === PolicyType.OtherCompanyRetention) {
        let startDate: Date = this.commonService.getDateFromIDateDto(this._policyData?.OdPolicy.ExpiryDateDto as IDateDto) as Date;
        //startDate = new Date(startDate.setDate(startDate.getDate() + 1));

        if (startDate != null && !moment(startDate).isBefore(this.policyForm.value.odStartDate)) {
          this.policyForm.patchValue({
            odStartDate: undefined
          });
          Swal.fire({
            icon: 'error',
            title: 'Sorry',
            text: "Previous date is not allowed",
          });
          return;
        }

        if (startDate != null && !this.isDateValid(moment(startDate), this.policyForm.value.odStartDate)) {
          this.policyForm.patchValue({
            odStartDate: undefined
          });
          Swal.fire({
            icon: 'error',
            title: 'Sorry',
            text: "Please select date less than 93 days"
          });
          return;
        }
      }

      this.commonService.getDate(this.commonService.getDateInString(this.policyForm.value.odStartDate), odYear?.Year).subscribe((response: IDateDto) => {
        this.policyForm.patchValue({
          odExpiryDate: moment(new Date(`${response.Year}-${response.Month}-${response.Day}`))
        });
      });
    }
  }

  setVehicleDetails(varientData: IVarientDto): void {
    let vehicle = this._vehicles.filter(f => f.Value == varientData.VarientId)[0];

    this.vehicleForm.patchValue({
      vehicle: vehicle.Name,
      fuelType: varientData.FuelType,
      cc: varientData.CubicCapacity,
      seating: varientData.SeatCapacity,
      gvw: varientData.Gvw,
      kw: varientData.Kw,
      exShowRoomValue: varientData.ExShowroomValue
    });
  }

  setCompleteVehicleDetails(vehicle: MatAutocompleteSelectedEvent): void {
    this.getSetCompleteVehicleDetails(<IDropDownDto<number>>{
      Name: vehicle.option.value.Name,
      Value: vehicle.option.value.Value
    });
  }

  getSetCompleteVehicleDetails(value: IDropDownDto<number>) {
    if (value != undefined) {
      this.vehicleForm.patchValue({ vehicle: value.Name });
      this.commonService.getVehicleDetails(value.Value).subscribe((response: IVehicleDto) => {
        this.commonService.getModels(response.ManufacturerId).subscribe((modelResponse: IDropDownDto<number>[]) => {
          this._models = modelResponse;
          let vehicleClassId = this.policyTermForm.value.vehicleClass;
          this.commonService.getVarients(response.ManufacturerId, response.ModelId, vehicleClassId).subscribe((varientResponse: IVarientDto[]) => {
            this._varients = varientResponse;
            let varient: IVarientDto = varientResponse.filter(f => f.VarientId == response.VarientId)[0];
            this.vehicleForm.patchValue({
              manufacturer: response.ManufacturerId,
              model: response.ModelId,
              varient: varient,
              fuelType: response.FuelType,
              cc: response.CubicCapacity,
              seating: response.SeatCapacity,
              gvw: response.Gvw,
              kw: response.Kw,
              exShowRoomValue: response.ExShowroomValue
            });
          });
        });
      });
    }
  }


  createPolicyAfterWarning(response: ICommonDto<any>) {
    let IsVerified = false
    if(this._policyType == SearchPolicyType.Motor_Verify){
      IsVerified = true 
    }
    
    let model: IMotorPolicyFormDataModel = {
      PolicyId: this._policyId,
      BranchId: this._branchId,
      VerticalCode: this._verticalDetail.VerticalCode,
      CoverNoteIssueDateString: this.commonService.getDateInString(this.PolicyForm.coverNoteIssueDate),
      CoverNoteIssueDateDto: null,
      CoverNoteNumber: this.PolicyForm.coverNoteNumber,
      Customer: {
        CustomerId: this.CustomerForm.customerId,
        AddressInPolicy: this.CustomerForm.addressInPolicy,
        Cluster: this.CustomerForm.cluster,
        ClusterCode: this.CustomerForm.clusterCode,
        ContactNumber: this.CustomerForm.contactNumber,
        ContactPerson: this.CustomerForm.contactPerson,
        CustomerCode: this.CustomerForm.customerCode,
        CustomerType: this.CustomerForm.customerType,
        Email: this.CustomerForm.email,
        Gstin: this.CustomerForm.gstin,
        Gender: this.CustomerForm.gender,
        DateOfBirth: this.CustomerForm.dateOfBirth,
        PassportNumber: this.CustomerForm.passportNumber,
        NameInPolicy: this.CustomerForm.nameInPolicy,
        Pan: this.CustomerForm.pan
      },
      ExtendedKiloMeterCovered: this.PolicyForm.extendedKiloMeterCovered,
      NumberOfKiloMeterCovered: this.PolicyForm.numberOfKiloMeterCovered,
      TpPolicy: {
        ExpiryDateString: this.commonService.getDateInString(this.PolicyForm.tpExpiryDate),
        ExpiryDateDto: null,
        InsuranceCompany: this.PolicyForm.tpInsuranceCompany,
        NumberOfYear: this.PolicyForm.tpNumberOfYear,
        PolicyNumber: this.PolicyForm.policyNumber,
        StartDateString: this.commonService.getDateInString(this.PolicyForm.tpStartDate),
        StartDateDto: null
      },
      OdPolicy: {
        StartDateString: this.commonService.getDateInString(this.PolicyForm.odStartDate),
        StartDateDto: null,
        ExpiryDateString: this.commonService.getDateInString(this.PolicyForm.odExpiryDate),
        ExpiryDateDto: null,
        InsuranceCompany: this.PolicyForm.odInsuranceCompany,
        NumberOfYear: this.PolicyForm.odNumberOfYear,
        PolicyNumber: this.PolicyForm.odPolicyNumber
      },
      InsuranceBranch: this.PolicyForm.insuranceBranch,
      FinanceBy: this.PolicyForm.financeBy,
      PreviousPolicy: {
        LastPolicyExpiryDateString: this.commonService.getDateInString(this.PolicyForm.lastPolicyExpiryDate),
        LastPolicyExpiryDateDto: null,
        LastYearInsuranceCompany: this.PolicyForm.lastYearInsuranceCompany,
        PreviousPolicyNumber: this.PolicyForm.previousCnPolicyNumber
      },
      InspectionData: {
        InspectionCompany: this.PolicyForm.inspectionCompany,
        InspectionDateString: this.commonService.getDateInString(this.PolicyForm.inspectionDate),
        InspectionDateDto: null,
        InspectionNumber: this.PolicyForm.inspectionNumber,
        InspectionRemarks: this.PolicyForm.inspectionRemarks,
        InspectionTime: this.commonService.getDateInString(this.PolicyForm.inspectionTime)
      },
      Nomination: {
        Age: this.NominationForm.age,
        Name: this.NominationForm.nominationName,
        Relation: this.NominationForm.relation,
        GuardianName: this.NominationForm.guardianName
      },
      PolicySource: {
        BusinessDoneBy: this.PolicySourceForm.businessDoneBy,
        Fos: this.PolicySourceForm.fosName,
        Pos: this.PolicySourceForm.posName,
        PolicyRemarks: this.PolicySourceForm.policyRemarks,
        PosManagedBy: this._posManagedBy != undefined ? this._posManagedBy.Value : 0,
        Reference: this.PolicySourceForm.reference,
        TeleCaller: this.PolicySourceForm.teleCaller
      },
      PaymentData: this.getPaymentFormData(),
      PolicyTerm: {
        AcknowledgementSlipIssueDateString: this.commonService.getDateInString(this.PolicyTermForm.acknowledgementSlipIssueDate),
        AcknowledgementSlipIssueDateDto: null,
        AcknowledgementSlipNumber: this.PolicyTermForm.acknowledgementSlipNumber,
        PackageTypeId: this.PolicyTermForm.packageType,
        PolicyTerm: this.PolicyTermForm.policyTerm.Id,
        PolicyType: this.PolicyTermForm.policyType,
        VehicleClass: this.PolicyTermForm.vehicleClass,
        PackageType: this._packageTypes.filter(f => f.Value == this.PolicyTermForm.packageType)[0].Name
      },
      Premium: {
        AddOnRiderOd: this.PremiumForm.addOnRiderOd,
        CngLpgIdv: this.PremiumForm.cngLpgIdv,
        CommissionPaidOn: this.PremiumForm.commissionPaidOn,
        CommissionablePremium: this.PremiumForm.commissionablePremium,
        ElectricAccessoriesIdv: this.PremiumForm.electricAccessoriesIdv,
        EndorseGrossPremium: this.PremiumForm.endorseGrossPremium,
        EndorseOd: this.PremiumForm.endorseOd,
        EndorseTp: this.PremiumForm.endorseTp,
        GrossPremium: this.PremiumForm.grossPremium,
        GstPercentage: this.PremiumForm.gst,
        GstValue: this.PremiumForm.gstValue,
        Loading: this.PremiumForm.loading,
        Ncb: this.PremiumForm.ncb,
        NonCommissionComponentPremium: this.PremiumForm.nonCommissionComponentPremium,
        NonElectricAccessoriesIdv: this.PremiumForm.nonElectricAccessoriesIdv,
        Od: this.PremiumForm.od,
        PassengerCover: this.PremiumForm.passengerCover,
        SpecialDiscount: this.PremiumForm.specialDiscount,
        TotalGrossPremium: this.PremiumForm.totalGrossPremium,
        TotalIdv: this.PremiumForm.totalIdv,
        TotalOd: this.PremiumForm.totalOd,
        TotalTp: this.PremiumForm.totalTp,
        Tp: this.PremiumForm.tp,
        VehicleIdv: this.PremiumForm.vehicleIdv,
        BasicTpGstPercentage: this.PremiumForm.basicTPgstPercent,
        NetPremium: this.PremiumForm.netpremium
      },
      Vehicle: {
        Cc: this.VehicleForm.cc,
        ChassisNumber: this.VehicleForm.chassisNumber,
        EngineNumber: this.VehicleForm.engineNumber,
        ExShowRoomValue: this.VehicleForm.exShowRoomValue,
        FuelType: this.VehicleForm.fuelType,
        Gvw: this.VehicleForm.gvw,
        Kw: this.VehicleForm.kw,
        MakeYear: this.VehicleForm.makeYear,
        Manufacturer: this.VehicleForm.manufacturer,
        Model: this.VehicleForm.model,
        RegistrationDateString: this.commonService.getDateInString(this.VehicleForm.dateOfRegistration),
        RegistrationDateDto: null,
        RegistrationNumber: this.VehicleForm.registrationNumber,
        RiskZone: this.VehicleForm.riskZone,
        RtoZone: this.VehicleForm.rtoZone.Value,
        Seating: this.VehicleForm.seating,
        Usage: this.VehicleForm.usage,
        Varient: this.VehicleForm.varient.VarientId,
        VehicleSegment: this.VehicleForm.vehicleSegment,
        IsSpecialRegistrationNumber: this.VehicleForm.isSpecialRegistrationNumber
      },
      Document: this._uploadDocuments,
      AddOnRider: this.getAddOnRiderFormData(),
      ControlNumber: "", // not save in api
      CommissionStatus: "",
      PolicyCancelReason: "",
      PolicyStatus: "",
      PreviousControlNumber: "",
      ReconStatus: "",
      Vertical: this._verticalDetail.VerticalName,
      RenewalCounter: this._renewalCounter,
      PolicyStatusId: 0,
      CommissionStatusColor: "",
      DataEntryStatus: "",
      DataEntryStatusColor: "",
      PolicyCancelReasonColor: "",
      PolicyStatusColor: "",
      ReconStatusColor: "",
      Condition1: false,
      Condition2: false,
      IsBlockAgent: this.PolicyForm.isBlockAgent,
      IsChangeAgent: this.PolicyForm.isChangeAgent,
      AddOnSelected: this._addOnRiderArray.join(', '),
      VerticalId: this._verticalDetail.VerticalId,
      VerticalSegmentId: this._verticalDetail.VerticalSegmentId,
      IsVerified:IsVerified
    }

    if (response.Response?.Condition === 1) {
      model.Condition1 = true;
    }
    else {
      model.Condition1 = true;
      model.Condition2 = true;
    }

    this.motorService.createPolicy(model).subscribe((response: ICommonDto<any>) => {

      if (response.IsSuccess) {
        Swal.fire({
          icon: 'success',
          title: 'Done',
          text: response.Message,
        }).then((result) => {
          if (result.isConfirmed) {
            this.redirectRoute();
          }
        });
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
            }).then((result) => {
              if (result.isConfirmed) {
                this.createPolicyAfterWarning(response);
              }
            })
          }
        }
      }
    });
  }

  getPaymentFormData(): IPaymentFormDataModel[] {
    //later change with dynamic form builder approach

    let payments: IPaymentFormDataModel[] = [];

    let payment1: IPaymentFormDataModel = {
      Amount: this.PaymentForm.amount1,
      Bank: this.PaymentForm.bank1,
      DatedString: this.commonService.getDateInString(this.PaymentForm.dated1),
      InstrumentNumber: this.PaymentForm.instrumentNumber1,
      Mode: this.PaymentForm.mode1,
      DatedDto: null
    };

    let payment2: IPaymentFormDataModel = {
      Amount: this.PaymentForm.amount2,
      Bank: this.PaymentForm.bank2,
      DatedString: this.commonService.getDateInString(this.PaymentForm.dated2),
      InstrumentNumber: this.PaymentForm.instrumentNumber2,
      Mode: this.PaymentForm.mode2,
      DatedDto: null
    };

    let payment3: IPaymentFormDataModel = {
      Amount: this.PaymentForm.amount3,
      Bank: this.PaymentForm.bank3,
      DatedString: this.commonService.getDateInString(this.PaymentForm.dated3),
      InstrumentNumber: this.PaymentForm.instrumentNumber3,
      Mode: this.PaymentForm.mode3,
      DatedDto: null
    };

    if (payment1.Amount > 0 && payment1.Mode > 0) {
      payments.push(payment1);
    }

    if (payment2.Amount > 0 && payment2.Mode > 0) {
      payments.push(payment2);
    }

    if (payment3.Amount > 0 && payment3.Mode > 0) {
      payments.push(payment3);
    }

    return payments;
  }

  setRiskZone(rtoZone: IRtoZoneDto): void {
    this.vehicleForm.patchValue({
      riskZone: rtoZone.RiskZone
    });
  }

  findRtoZone(event: Event): void {
    let input: string = (<HTMLInputElement>event.target).value;
    if (input.length == 4) {
      let rtoZone = this._rtoZones.filter(f => f.RtoZoneCode.toLowerCase().substring(0, 4) == input.toLowerCase())[0];
      if (rtoZone != undefined) {
        this.vehicleForm.patchValue({
          rtoZone: rtoZone,
          riskZone: rtoZone.RiskZone
        });
      }
    }
  }

  getPos(branchId: number): void {
    this.commonService.getPos(Vertical.Motor, branchId).subscribe((response: IDropDownDto<number>[]) => {
      this._posDatas = response;
    })
  }

  getDocumentTypes(): void {
    this.commonService.getDocumentTypes('all').subscribe((response: IDropDownDto<number>[]) => {
      this._documentTypes = response;
    });
  }

  getPaymentModes(): void {
    this.commonService.getPaymentModes().subscribe((response: IDropDownDto<number>[]) => {
      this._paymentTypes = response;
    });
  }

  refresh(isAll: boolean, source: string): void {
    let branchId: number = isAll ? -1 : parseInt(this._branchId);

    switch (source) {
      case "teleCaller":
        this.getTeleCallers(branchId);
        break;
      case "fos":
        this.getFosNames(branchId);
        break;
      case "pos":
        this.getPos(branchId);
        break;
      case "reference":
        this.getReferences(branchId);
        break;
    }
  }

  addDocument(): void {
    let reader = new FileReader();
    reader.onload = () => {
      const uniqueId = uuidv4();
      let document: IDocumentModel = {
        DocumentId: 0,
        UniqueId: uniqueId,
        DocumentBase64: reader.result as string,
        DocumentTypeId: this.uploadDocumentForm.value.documentType.Value,
        DocumentTypeName: this.uploadDocumentForm.value.documentType.Name,
        FileName: this.uploadDocumentForm.value.browse._fileNames,
        Remarks: this.uploadDocumentForm.value.remarks == "" ? "NA" : this.uploadDocumentForm.value.remarks
      };

      this._uploadDocuments.push(document);
      this._policyDocuments.push({
        Id: 0,
        UniqueId: document.UniqueId,
        DocumentTypeName: this.uploadDocumentForm.value.documentType?.Name,
        FileName: document.FileName,
        Remarks: document.Remarks
      });
      this._dataSourceUploadDocuments = new MatTableDataSource<IPolicyDocumentDto>(this._policyDocuments.reverse());
    }

    reader.readAsDataURL(this.uploadDocumentForm.value.browse._files[0]);
  }

  getAddOnRiderFormData(): IAddOnRiderModel {
    this._addOnPlanOptions.forEach(f => {
      if (f.IsPlanAvailable) {
        this._addOnRiderModel.AddOnRiderOptionId.push(f.AddonPlanOptionId);
        this._addOnRiderModel.AddOnValue.push(Number(f.AddonValue));
      }
    });
    return this._addOnRiderModel;
  }

  get CustomerForm() {
    return this.customerForm.value;
  }

  get PolicyForm() {
    return this.policyForm.value;
  }

  get PolicyTermForm() {
    return this.policyTermForm.value;
  }

  get VehicleForm() {
    return this.vehicleForm.value;
  }

  get PremiumForm() {
    return this.premiumForm.value;
  }

  get AddOnRiderForm() {
    return this.addOnRiderForm.value;
  }

  get NominationForm() {
    return this.nominationForm.value;
  }

  get PolicySourceForm() {
    return this.policySourceForm.value;
  }

  get PaymentForm() {
    return this.paymentForm.value;
  }

  get VoucherForm() {
    return this.voucherForm.value;
  }

  get AddOnRiderOption() {
    return this.addOnRiderForm.controls.addOnPlanOption as FormArray;
  }

  calculateTotalIdv() {
    let vehicleIdv: any = this.premiumForm.controls.vehicleIdv.value;
    let electricAccessoriesIdv: any = this.premiumForm.controls.electricAccessoriesIdv.value;
    let nonElectricAccessoriesIdv: any = this.premiumForm.controls.nonElectricAccessoriesIdv.value;
    let cngLpgIdv: any = this.premiumForm.controls.cngLpgIdv.value;

    let sum = parseInt(vehicleIdv == "" ? 0 : vehicleIdv) + parseInt(electricAccessoriesIdv == "" ? 0 : electricAccessoriesIdv)
      + parseInt(nonElectricAccessoriesIdv == "" ? 0 : nonElectricAccessoriesIdv) + parseInt(cngLpgIdv == "" ? 0 : cngLpgIdv);
    this.premiumForm.patchValue({ totalIdv: sum });

    this.calculateCommissionablePremium(this._commissionPaidOnId);
  }

  calculateTotalOd() {
    let od: any = this.premiumForm.controls.od.value;
    let addOnRiderOd: any = this.premiumForm.controls.addOnRiderOd.value;
    let endorseOd: any = this.premiumForm.controls.endorseOd.value;

    let sum = parseInt(od == "" ? 0 : od) + parseInt(addOnRiderOd == "" ? 0 : addOnRiderOd)
      + parseInt(endorseOd == "" ? 0 : endorseOd);
    this.premiumForm.patchValue({ totalOd: sum });

    this.calculateGrossPremium();
    this.calculateCommissionablePremium(this._commissionPaidOnId);
    this.calculateNetPremium();
  }

  calculateTotalTp() {
    let tp: any = this.premiumForm.controls.tp.value;
    let passengerCover: any = this.premiumForm.controls.passengerCover.value;
    let endorseTp: any = this.premiumForm.controls.endorseTp.value;

    let sum = parseInt(tp == "" ? 0 : tp) + parseInt(passengerCover == "" ? 0 : passengerCover)
      + parseInt(endorseTp == "" ? 0 : endorseTp);
    this.premiumForm.patchValue({ totalTp: sum });

    this.calculateGrossPremium();
    this.calculateCommissionablePremium(this._commissionPaidOnId);
    this.calculateNetPremium();

  }

  calculateTotalGrossPremium() {
    let grossPremium: any = this.premiumForm.controls.grossPremium.value;
    let endorseGrossPremium: any = this.premiumForm.controls.endorseGrossPremium.value;

    let sum = parseInt(grossPremium == "" ? 0 : grossPremium) + parseInt(endorseGrossPremium == "" ? 0 : endorseGrossPremium);
    this.premiumForm.patchValue({ totalGrossPremium: sum });
  }

  calculateTotalVoucherAmount() {
    let amount1: any = this.voucherForm.controls.amount1.value;
    let amount2: any = this.voucherForm.controls.amount2.value;
    let amount3: any = this.voucherForm.controls.amount3.value;

    let sum = parseInt(amount1 == "" ? 0 : amount1) + parseInt(amount2 == "" ? 0 : amount2) + parseInt(amount3 == "" ? 0 : amount3);
    this._totalVoucherAmount = sum;
  }

  calculateGrossPremium() {
    let od: any = this.premiumForm.controls.od.value;
    let addOnRiderOd: any = this.premiumForm.controls.addOnRiderOd.value;
    let basictp: any = this.premiumForm.controls.tp.value;
    let passengerCover: any = this.premiumForm.controls.passengerCover.value;
    let nonCommissionComponentPremium: any = this.premiumForm.controls.nonCommissionComponentPremium.value;
    let gstValue: any = this.premiumForm.controls.gstValue.value;
    let gst: any = this.premiumForm.controls.gst.value;
    let basicTPgstPercent: any = this.premiumForm.controls.basicTPgstPercent.value;
    let endroseTp: any = this.premiumForm.controls.endorseTp.value;
    let endorseOd: any = this.premiumForm.controls.endorseOd.value;

    let sum = parseInt(od == "" ? 0 : od) + parseInt(addOnRiderOd == "" ? 0 : addOnRiderOd) +
      parseInt(endorseOd == "" ? 0 : endorseOd) +
      + parseInt(endroseTp == "" ? 0 : endroseTp) + parseInt(passengerCover == "" ? 0 : passengerCover)
      + parseInt(nonCommissionComponentPremium == "" ? 0 : nonCommissionComponentPremium);

    let sum2 = parseInt(basictp == "" ? 0 : basictp)
    let sum2gst = (basicTPgstPercent / 100) * sum2;
    gstValue = ((gst / 100) * sum);
    let gstFinalValue = gstValue + sum2gst
    this.premiumForm.patchValue({ gstValue: gstFinalValue.toFixed(2) });
    this.calculateNetPremium();
    // Calculating gross premium after updating net
    let netpremium: any = this.premiumForm.controls.netpremium.value || 0;
    let grossPremiumAmt = parseInt(gstFinalValue == "" ? 0 : gstFinalValue) + parseInt(netpremium);
    this.premiumForm.patchValue({ grossPremium: grossPremiumAmt.toFixed(2) });
    this.calculateTotalGrossPremium();

  }

  getCustomerShortDetailById(customerId: number) {
    this.customerService.getCustomerShortDetailById(customerId).subscribe((response: ICustomerShortDetailDto) => {
      this.setCustomerDetail(response);
    });
  }

  setCustomerDetail(response: ICustomerShortDetailDto): void {
    this.customerForm.patchValue({
      nameInPolicy: response.NameInPolicy,
      addressInPolicy: response.AddressInPolicy,
      customerCode: response.CustomerCode,
      clusterCode: response.ClusterCode,
      email: response.Email,
      cluster: response.Cluster,
      customerType: response.CustomerType,
      contactPerson: response.ContactPerson,
      contactNumber: response.ContactNumber,
      pan: response.Pan,
      gstin: response.Gstin,
      gender: response.Gender,
      dateOfBirth: response.DateOfBirth,
      passportNumber: response.PassportNumber,
      customerId: response.CustomerId
    });
  }

  getMotorPolicyById(policyId: number) {
    this.motorService.getMotorPolicyById(policyId).subscribe((response: IMotorPolicyFormDataModel) => {
      
      this._policyData = response;
      this.setMotorPolicyData(response);
    });
  }


  async setMotorPolicyData(response: IMotorPolicyFormDataModel): Promise<void> {

    // if (this._type == 6)
    //    this._policyTypes = (<IDropDownDto<number>[]>this._policyTypes).filter(f => f.Value == response.PolicyTerm.PolicyType);
    this.setCompanyInsuranceBranch(response)
    this.setCustomerDetail(<ICustomerShortDetailDto>{
      AddressInPolicy: response.Customer.AddressInPolicy,
      Cluster: response.Customer.Cluster,
      ClusterCode: response.Customer.ClusterCode,
      ContactNumber: response.Customer.ContactNumber,
      ContactPerson: response.Customer.ContactPerson,
      CustomerCode: response.Customer.CustomerCode,
      CustomerId: response.Customer.CustomerId,
      CustomerType: response.Customer.CustomerType,
      Email: response.Customer.Email,
      Gstin: response.Customer.Gstin,
      Gender: response.Customer.Gender,
      DateOfBirth: response.Customer.DateOfBirth,
      PassportNumber: response.Customer.PassportNumber,
      NameInPolicy: response.Customer.NameInPolicy,
      Pan: response.Customer.Pan,
    });

    if (this._type == SearchPolicyType.Motor_New || this._type == SearchPolicyType.Motor_rollover) {
      this._controlNumber = response.ControlNumber
      this.policyTermForm.patchValue({
        policyType: response.PolicyTerm.PolicyType,
        vehicleClass: response.PolicyTerm.VehicleClass,
        packageType: response.PolicyTerm.PackageTypeId,
        policyTerm: response.PolicyTerm.PolicyTerm,
        acknowledgementSlipNumber: response.PolicyTerm.AcknowledgementSlipNumber,
        acknowledgementSlipIssueDate: this.commonService.getDateFromIDateDto(response.PolicyTerm.AcknowledgementSlipIssueDateDto as IDateDto)
      });

      this.policyForm.patchValue({
        tpInsuranceCompany: response.TpPolicy.InsuranceCompany,
        coverNoteNumber: response.CoverNoteNumber,
        coverNoteIssueDate: this.commonService.getDateFromIDateDto(response.CoverNoteIssueDateDto as IDateDto),
        policyNumber: response.TpPolicy.PolicyNumber,
        tpStartDate: this.commonService.getDateFromIDateDto(response.TpPolicy.StartDateDto as IDateDto),
        tpNumberOfYear: response.TpPolicy.NumberOfYear,
        tpExpiryDate: this.commonService.getDateFromIDateDto(response.TpPolicy.ExpiryDateDto as IDateDto),
//        insuranceBranch: response.InsuranceBranch,
        numberOfKiloMeterCovered: response.NumberOfKiloMeterCovered,
        extendedKiloMeterCovered: response.ExtendedKiloMeterCovered,
        financeBy: response.FinanceBy,
        odInsuranceCompany: response.OdPolicy.InsuranceCompany,
        odPolicyNumber: response.OdPolicy.PolicyNumber,
        odStartDate: this.commonService.getDateFromIDateDto(response.OdPolicy.StartDateDto as IDateDto),
        odNumberOfYear: response.OdPolicy.NumberOfYear,
        odExpiryDate: this.commonService.getDateFromIDateDto(response.OdPolicy.ExpiryDateDto as IDateDto),
      });
      this.premiumForm.patchValue({
        vehicleIdv: response.Premium.VehicleIdv,
        electricAccessoriesIdv: response.Premium.ElectricAccessoriesIdv,
        nonElectricAccessoriesIdv: response.Premium.NonCommissionComponentPremium,
        cngLpgIdv: response.Premium.CngLpgIdv,
        totalIdv: response.Premium.TotalIdv,
        od: response.Premium.Od,
        addOnRiderOd: response.Premium.AddOnRiderOd,
        endorseOd: response.Premium.EndorseOd,
        totalOd: response.Premium.TotalOd,
        tp: response.Premium.Tp,
        passengerCover: response.Premium.PassengerCover,
        endorseTp: response.Premium.EndorseTp,
        totalTp: response.Premium.TotalTp,
        nonCommissionComponentPremium: response.Premium.NonCommissionComponentPremium,
        gst: response.Premium.GstPercentage,
        gstValue: response.Premium.GstValue,
        grossPremium: response.Premium.GrossPremium,
        endorseGrossPremium: response.Premium.EndorseGrossPremium,
        totalGrossPremium: response.Premium.TotalGrossPremium,
        specialDiscount: response.Premium.SpecialDiscount,
        loading: response.Premium.Loading,
        ncb: response.Premium.Ncb,
        commissionPaidOn: response.Premium.CommissionPaidOn,
        commissionablePremium: response.Premium.CommissionablePremium,
        basicTPgstPercent: response.Premium.BasicTpGstPercentage,
        netpremium: response.Premium.NetPremium
      });

      this.policySourceForm.patchValue({
        teleCaller: response.PolicySource.TeleCaller,
        fosName: response.PolicySource.Fos,
        posName: response.PolicySource.Pos,
        reference: response.PolicySource.Reference,
        businessDoneBy: response.PolicySource.BusinessDoneBy,
        posManagedBy: response.PolicySource.PosManagedBy,
        policyRemarks: response.PolicySource.PolicyRemarks
      });
      this.businessDoneBy();

      this.commonService.getPolicyTerms(response.PolicyTerm.PolicyType, response.PolicyTerm.VehicleClass, response.PolicyTerm.PackageTypeId).subscribe((responsePolicyTerms: IPolicyTermDto[]) => {
        this._policyTerms = responsePolicyTerms;
        let policyTerm = responsePolicyTerms.filter(f => f.Id == response.PolicyTerm.PolicyTerm)[0]
        this.policyTermForm.patchValue({
          policyTerm: policyTerm
        });
      });

       //Updating add on rider value
      this._addOnRiderModel.AddOnRiderId = response?.AddOnRider?.AddOnRiderId;
      this.commonService.getAddOnPlanOptions(this._addOnRiderModel.AddOnRiderId, Vertical.Motor, 0).subscribe((addOnResponse: IAddOnPlanOptionDto[]) => {
        addOnResponse.forEach((value, index) => {
          value.IsDisabled = value.IsPlanAvailable;
          if (value.IsPlanAvailable) {
            this._addOnRiderArray.push(value.AddonPlanOptionName);
          }
        });
        this._addOnPlanOptions = addOnResponse;
        this.UpdateAddonPlanValue(response)
      });
    }
    //For previous value
    if (this._type == SearchPolicyType.Motor_rollover || this._type == SearchPolicyType.Motor_Renew) {
      this.policyForm.patchValue({
        lastYearInsuranceCompany:  response.PreviousPolicy.LastYearInsuranceCompany,
        previousCnPolicyNumber: response.TpPolicy.PolicyNumber ,
        lastPolicyExpiryDate:  this.commonService.getDateFromIDateDto(response.TpPolicy?.ExpiryDateDto as IDateDto),
        isBlockAgent: false,
        isChangeAgent: false,
      });
    }

    if (this._type == SearchPolicyType.Motor_Renew) {
      this._previousControlNumber = response.ControlNumber;
      this._controlNumber = '';
      this._renewalCounter = response.RenewalCounter + 1;
      this.policyTermForm.patchValue({
        vehicleClass: response.PolicyTerm.VehicleClass,
      });

      this.policyForm.get("lastYearInsuranceCompany")?.disable();
      this.policyForm.get("previousCnPolicyNumber")?.disable();
      this.policyForm.get("lastPolicyExpiryDate")?.disable();
    }

    this.nominationForm.patchValue({
      nominationName: response.Nomination.Name,
      relation: response.Nomination.Relation,
      age: response.Nomination.Age,
      guardianName: response.Nomination.GuardianName
    });

    this.commonService.getVehicles(response.PolicyTerm.VehicleClass).subscribe((responseVehicle: IDropDownDto<number>[]) => {
      this._vehicles = responseVehicle;
      this.getSetCompleteVehicleDetails(this._vehicles.filter(f => f.Value == response.Vehicle.Varient)[0]);
      this.vehicleForm.patchValue({
        registrationNumber: response.Vehicle.RegistrationNumber,
        engineNumber: response.Vehicle.EngineNumber,
        chassisNumber: response.Vehicle.ChassisNumber,
        vehicleSegment: response.Vehicle.VehicleSegment,
        rtoZone: this._rtoZones.filter(f => f.Value == response.Vehicle.RtoZone)[0],
        riskZone: response.Vehicle.RiskZone,
        makeYear: response.Vehicle.MakeYear,
        dateOfRegistration: this.commonService.getDateFromIDateDto(response.Vehicle.RegistrationDateDto as IDateDto),
        usage: response.Vehicle.Usage,
        IsSpecialRegistrationNumber: response.Vehicle.IsSpecialRegistrationNumber
      });
    });

    if (this._type !== PolicyType.SameCompanyRetention) {
      for (var i = 0; i < response.PaymentData.length; i++) {
        if (i == 0) {
          this.paymentForm.patchValue({
            mode1: response.PaymentData[i].Mode,
            amount1: response.PaymentData[i].Amount,
            instrumentNumber1: response.PaymentData[i].InstrumentNumber,
            dated1: moment(this.commonService.getDateFromIDateDto(response.PaymentData[i].DatedDto as IDateDto)),
            bank1: response.PaymentData[i].Bank
          });
        }
        if (i == 1) {
          this.paymentForm.patchValue({
            mode2: response.PaymentData[i].Mode,
            amount2: response.PaymentData[i].Amount,
            instrumentNumber2: response.PaymentData[i].InstrumentNumber,
            dated2: moment(this.commonService.getDateFromIDateDto(response.PaymentData[i].DatedDto as IDateDto)),
            bank2: response.PaymentData[i].Bank
          });
        }
        if (i == 2) {
          this.paymentForm.patchValue({
            mode3: response.PaymentData[i].Mode,
            amount3: response.PaymentData[i].Amount,
            instrumentNumber3: response.PaymentData[i].InstrumentNumber,
            dated3: moment(this.commonService.getDateFromIDateDto(response.PaymentData[i].DatedDto as IDateDto)),
            bank3: response.PaymentData[i].Bank
          });
        }
      }

    }
      //Calling insurance company branch api location
    
    this.setPolicyDetails()
    this.getAddOnRiders()
    this.setvalues();
  }

  getTotalCost() {
    return this._vouchers.map(t => t.VoucherAmount).reduce((acc, value) => acc + value, 0);
  }

  enableAddButton() {
    this._enableAddButton = false;
  }

  reset() {
    this._enableAddButton = true;
  }

  searchCustomer() {
    this.router.navigate(["/master/customer/" + SearchPolicyType.Motor_New + "/" + Vertical.Motor + ""]);
    // this.router.navigate(["/master/customer", 1]);
  }

  businessDoneBy() {

    let fosNameId: any = this.policySourceForm.controls.fosName.value;
    let posNameId: any = this.policySourceForm.controls.posName.value;



    if (fosNameId > 0 && posNameId > 0) {
      this.policySourceForm.patchValue({
        businessDoneBy: "Joint"
      });
    }
    else if (fosNameId == 0 && posNameId > 0) {
      this.policySourceForm.patchValue({
        businessDoneBy: "POS"
      });
    }
    else if ((fosNameId > 0 && posNameId == 0) || posNameId == 0) {
      this.policySourceForm.patchValue({
        businessDoneBy: "In House"
      });
    }

    this.getPosManagedBy(posNameId);
  }

  disableFields(event: any) {
    if (event.checked) {
      this._disableFields = true;
    }
    else {
      this._disableFields = false;
    }
    this.setPreviousInsuranceCompany();
  }

  openDialog(tableName: string, json: any) {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: {
        tableNamedata: tableName,
        jsonValue: json
      }
    });
  }

  openClaimsDialog(data: IPreviousClaimDto) {
    const dialogRef = this.dialog.open(ViewClaimsComponent, {
      width: '50%',
      data: { claimsId: data.ClaimId, verticalId: Vertical.Motor }
    });
  }

  openVoucherDialog(data: IPolicyVoucherDto): void {
    const dialogRef = this.dialog.open(VoucherDetailComponent, {
      width: '50%',
      data: { voucherId: data.VoucherId, verticalId: Vertical.Motor }
    });
  }

  openInspectionDialog(data: IPolicyInspectionDto): void {
    const dialogRef = this.dialog.open(InspectionDetailComponent, {
      width: '50%',
      data: { inspectionId: data.Id, verticalId: Vertical.Motor }
    });
  }

  checkboxSelection(checkboxName: string) {
    switch (checkboxName) {
      case "blockAgent":
        this.policyForm.patchValue({ isChangeAgent: false });
        break;
      case "changeAgent":
        this.policyForm.patchValue({ isBlockAgent: false });
        break;
    }
    this.setPreviousInsuranceCompany();
  }

  setPreviousInsuranceCompany() {    
      if ( this._type == SearchPolicyType.Motor_Renew ) {
      let insuranceCompany = this.policyTermForm.value.packageType === 1 ? this._policyData?.TpPolicy.InsuranceCompany : this._policyData?.OdPolicy.InsuranceCompany;
      let policyNumber = this.policyTermForm.value.packageType === 1 ? this._policyData?.TpPolicy.PolicyNumber : this._policyData?.OdPolicy.PolicyNumber;
      let policyExpiryDate = this.policyTermForm.value.packageType === 1 ? this.commonService.getDateFromIDateDto(this._policyData?.TpPolicy.ExpiryDateDto as IDateDto)
        : this.commonService.getDateFromIDateDto(this._policyData?.OdPolicy.ExpiryDateDto as IDateDto);

      this.policyForm.patchValue({
        lastYearInsuranceCompany: insuranceCompany,
        previousCnPolicyNumber: policyNumber,
        lastPolicyExpiryDate: policyExpiryDate
      });
    }
    else {
      this.refreshLastInsuranceCompanies();
    /*   this.policyForm.patchValue({
        lastYearInsuranceCompany: undefined
      }); */
    }

   
  }

  resetPreviousInsuranceCompany() {
    this.refreshLastInsuranceCompanies();
    this.policyForm.patchValue({ isChangeAgent: false });
    this.policyForm.patchValue({ isBlockAgent: false });
    if (!this._disableFields) {
      this.policyForm.patchValue({
        lastYearInsuranceCompany: undefined
      });
    }
  }

  setDataForSameCompanyRetentionPolicyTypeTp() {
    if (this.policyTermForm.value.policyType === PolicyType.SameCompanyRetention && this.policyTermForm.value.packageType === PackageType.TP_ONLY) {

      let startDate: Date = this.commonService.getDateFromIDateDto(this._policyData?.TpPolicy.ExpiryDateDto as IDateDto) as Date;

      try {
        startDate = new Date(startDate.setDate(startDate.getDate() + 1));
      } catch (error) {
        startDate = new Date();
      }

      let policyTerm: IPolicyTermDto = this.policyTermForm.value.policyTerm as IPolicyTermDto;

      if (policyTerm === undefined || policyTerm == null) return;
      
      this.policyForm.patchValue({
        tpInsuranceCompany: this._policyData?.TpPolicy.InsuranceCompany,
        tpStartDate: moment(startDate),
        insuranceCompanyBranches: this._policyData?.TpPolicy
      });

      this.isTpInsuranceDisable = true;
      this.commonService.getDate(this.commonService.getDateInString(this.policyForm.value.tpStartDate), policyTerm?.TpYear).subscribe((response: IDateDto) => {
        this.policyForm.patchValue({
          tpExpiryDate: new Date(`${response.Year}-${response.Month}-${response.Day}`)
        });
      });
    }
    else {
      this.policyForm.get("tpInsuranceCompany")?.enable();
      this.isTpInsuranceDisable = false
    }
  }

  setDataForSameCompanyRetentionPolicyTypeOd() {
    if (this.policyTermForm.value.policyType == PolicyType.SameCompanyRetention && this.policyTermForm.value.packageType == PackageType.OD_ONLY) {
      let policyTerm: IPolicyTermDto = this.policyTermForm.value.policyTerm as IPolicyTermDto;

       if (policyTerm === undefined || policyTerm == null) return;
      this.policyForm.patchValue({
        tpInsuranceCompany: this._policyData?.TpPolicy.InsuranceCompany,
        policyNumber: this._policyData?.TpPolicy.PolicyNumber,
        tpStartDate: this.commonService.getDateFromIDateDto(this._policyData?.TpPolicy.StartDateDto as IDateDto),
        tpNumberOfYear: this._policyData?.TpPolicy.NumberOfYear,
        tpExpiryDate: this.commonService.getDateFromIDateDto(this._policyData?.TpPolicy.ExpiryDateDto as IDateDto)
      });
      console.log(this.policyForm)
      this.policyForm.get("tpInsuranceCompany")?.disable();
      this.policyForm.get("policyNumber")?.disable();
      this.policyForm.get("tpStartDate")?.disable();

      let startDate: Date = this.commonService.getDateFromIDateDto(this._policyData?.OdPolicy.ExpiryDateDto as IDateDto) as Date;

      try {
        startDate = new Date(startDate.setDate(startDate.getDate() + 1));
      } catch (error) {
        startDate = new Date();
      }

      this.policyForm.patchValue({
        odInsuranceCompany: this._policyData?.OdPolicy.InsuranceCompany,
        odStartDate: moment(startDate)
      });

      this.policyForm.get("odInsuranceCompany")?.disable();

      this.commonService.getDate(this.commonService.getDateInString(this.policyForm.value.odStartDate), policyTerm.OdYear).subscribe((response: IDateDto) => {
        this.policyForm.patchValue({
          odExpiryDate: new Date(`${response.Year}-${response.Month}-${response.Day}`)
        });
      });
    }
    else {
      this.policyForm.get("tpInsuranceCompany")?.enable();
      this.policyForm.get("policyNumber")?.enable();
      this.policyForm.get("tpStartDate")?.enable();
      this.policyForm.get("odInsuranceCompany")?.enable();
    }
  }

  async setDataForSameCompanyRetentionPolicyTypeComprehensiveOrUsageBased() {
    
    if (this.policyTermForm.value.policyType === PolicyType.SameCompanyRetention && (this.policyTermForm.value.packageType === 3 || this.policyTermForm.value.packageType === 4)) {
      let startDate: Date = this.commonService.getDateFromIDateDto(this._policyData?.TpPolicy.ExpiryDateDto as IDateDto) as Date;

      try {
        startDate = new Date(startDate.setDate(startDate.getDate() + 1));
      } catch (error) {
        startDate = new Date();
      }

      let policyTerm: IPolicyTermDto = this.policyTermForm.value.policyTerm as IPolicyTermDto;

      if (policyTerm === undefined || policyTerm == null) return;

      await  this.policyForm.patchValue({
        tpInsuranceCompany: this._policyData?.TpPolicy.InsuranceCompany,
        tpStartDate: moment(startDate),
        insuranceBranch : this._policyData?.InsuranceBranch
      });
      
      this._odInsuranceCompanies =   this._insuranceCompanies

      this.commonService.getDate(this.commonService.getDateInString(this.policyForm.value.tpStartDate), policyTerm?.TpYear).subscribe((response: IDateDto) => {
        this.policyForm.patchValue({
          tpExpiryDate: new Date(`${response.Year}-${response.Month}-${response.Day}`)
        });
      });
      this.setOdPolicyDetail()
    }
    else {
      this.policyForm.get("tpInsuranceCompany")?.enable();
    }
  }

  setDataForOtherCompanyRetentionPolicyTypeTp() {
    if (this.policyTermForm.value.policyType === PolicyType.OtherCompanyRetention && this.policyTermForm.value.packageType === 1) {

      let startDate: Date = this.commonService.getDateFromIDateDto(this._policyData?.TpPolicy.ExpiryDateDto as IDateDto) as Date;
      try {
        startDate = new Date(startDate.setDate(startDate.getDate() + 1));
      } catch (error) {
        startDate = new Date();
      }
      let policyTerm: IPolicyTermDto = this.policyTermForm.value.policyTerm as IPolicyTermDto;

     // if (policyTerm === undefined || policyTerm == null) return;

      this.policyForm.patchValue({
        policyNumber: undefined,
        tpStartDate: moment(startDate)
      });

      this.commonService.getDate(this.commonService.getDateInString(this.policyForm.value.tpStartDate), policyTerm?.TpYear).subscribe((response: IDateDto) => {
        this.policyForm.patchValue({
          tpExpiryDate: new Date(`${response.Year}-${response.Month}-${response.Day}`)
        });
      });
    }
    else {
      this._tpInsuranceCompanies = this._insuranceCompanies;
    }
  }

  setDataForOtherCompanyRetentionPolicyTypeOd() {
    if (this.policyTermForm.value.policyType === PolicyType.OtherCompanyRetention && this.policyTermForm.value.packageType === 2) {

      let policyTerm: IPolicyTermDto = this.policyTermForm.value.policyTerm as IPolicyTermDto;

      //if (policyTerm === undefined || policyTerm == null) return;

      this.policyForm.patchValue({
        tpInsuranceCompany: this._policyData?.TpPolicy.InsuranceCompany,
        policyNumber: this._policyData?.TpPolicy.PolicyNumber,
        tpStartDate: this.commonService.getDateFromIDateDto(this._policyData?.TpPolicy.StartDateDto as IDateDto),
        tpNumberOfYear: this._policyData?.TpPolicy.NumberOfYear,
        tpExpiryDate: this.commonService.getDateFromIDateDto(this._policyData?.TpPolicy.ExpiryDateDto as IDateDto)
      });

      this.policyForm.get("tpInsuranceCompany")?.disable();
      this.policyForm.get("policyNumber")?.disable();
      this.policyForm.get("tpStartDate")?.disable();

      let startDate: Date = this.commonService.getDateFromIDateDto(this._policyData?.OdPolicy.ExpiryDateDto as IDateDto) as Date;
      try {
        startDate = new Date(startDate.setDate(startDate.getDate() + 1));
      } catch (error) {
        startDate = new Date();
      }

      this.policyForm.patchValue({
        odStartDate: moment(startDate)
      });

      this.commonService.getDate(this.commonService.getDateInString(this.policyForm.value.odStartDate), policyTerm.OdYear).subscribe((response: IDateDto) => {
        this.policyForm.patchValue({
          odExpiryDate: new Date(`${response.Year}-${response.Month}-${response.Day}`)
        });
      });

      this._odInsuranceCompanies = this._insuranceCompanies.filter(f => f.Value != this._policyData?.OdPolicy.InsuranceCompany);
    }
    else {
      this.policyForm.get("tpInsuranceCompany")?.enable();
      this.policyForm.get("policyNumber")?.enable();
      this.policyForm.get("tpStartDate")?.enable();
      this._odInsuranceCompanies = this._insuranceCompanies;
    }
  }

  setDataForOtherCompanyRetentionPolicyTypeComprehensiveOrUsageBased() {
    if (this.policyTermForm.value.policyType === PolicyType.OtherCompanyRetention && (this.policyTermForm.value.packageType === 3 || this.policyTermForm.value.packageType === 4)) {
      this._tpInsuranceCompanies = this._insuranceCompanies.filter(f => f.Value != this._policyData?.TpPolicy.InsuranceCompany);
      let startDate: Date = this.commonService.getDateFromIDateDto(this._policyData?.TpPolicy.ExpiryDateDto as IDateDto) as Date;

      try {
        startDate = new Date(startDate.setDate(startDate.getDate() + 1));
      } catch (error) {
        startDate = new Date();
      }

      let policyTerm: IPolicyTermDto = this.policyTermForm.value.policyTerm as IPolicyTermDto;

      if (policyTerm === undefined || policyTerm == null) return;

      this.policyForm.patchValue({
        tpInsuranceCompany: this._policyData?.TpPolicy.InsuranceCompany,
        tpStartDate: moment(startDate)
      });

      this.commonService.getDate(this.commonService.getDateInString(this.policyForm.value.tpStartDate), policyTerm?.TpYear).subscribe((response: IDateDto) => {
        this.policyForm.patchValue({
          tpExpiryDate: new Date(`${response.Year}-${response.Month}-${response.Day}`)
        });
      });

    }
    else {
      this.policyForm.get("tpInsuranceCompany")?.enable();
      this._tpInsuranceCompanies = this._insuranceCompanies;
    }
  }

  isDateValid(date1: Moment, date2: Moment): boolean {
    let diffInDays = Math.abs(date1.diff(date2, 'days'));
    return diffInDays <= 93;
  }

  setOdPolicyDetail() {
    
    if(this.policyTermForm.value.packageType ==  PackageType.COMPREHENSIVE){
      this.policyForm.patchValue({
        odInsuranceCompany: this.policyForm.value.tpInsuranceCompany,
        odPolicyNumber: this.policyForm.value.policyNumber,
        odStartDate: this.policyForm.value.tpStartDate
      });
    }
  }

  getCheckboxValue(index: number, IsPlanAvailable: boolean, AddOnPlanOptionName: string) {
    if (IsPlanAvailable) {
      this._addOnRiderArray.push(AddOnPlanOptionName);
    }
    else if (!IsPlanAvailable) {
      // this._addOnRiderArray.splice(index, 1);
      this._addOnRiderArray = this._addOnRiderArray.filter(x => x != AddOnPlanOptionName);
    }
  }

  calculateCommissionablePremium(commissionPaidOnId: number) {
    this._commissionPaidOnId = commissionPaidOnId;
    switch (commissionPaidOnId) {
      case 1:
        this.calculateCommissionablePremiumOd();
        break;
      case 2:
        this.calculateCommissionablePremiumTp();
        break;
      case 3:
        this.calculateCommissionablePremiumNet();
        break;
      case 4:
        this.calculateCommissionablePremiumNoCommission();
        break;
      case 5:
        this.calculateCommissionablePremiumOdAddon();
        break;
    }
  }

  calculateCommissionablePremiumNet() {
    let od: any = this.premiumForm.controls.od.value;
    let addOnRiderOd: any = this.premiumForm.controls.addOnRiderOd.value;
    let tp: any = this.premiumForm.controls.tp.value;
    let passengerCover: any = this.premiumForm.controls.passengerCover.value;

    let sum = parseInt(od == "" ? 0 : od) + parseInt(addOnRiderOd == "" ? 0 : addOnRiderOd)
      + parseInt(tp == "" ? 0 : tp) + parseInt(passengerCover == "" ? 0 : passengerCover);

    this.premiumForm.patchValue({ commissionablePremium: sum.toFixed(2) });
  }

  calculateCommissionablePremiumNoCommission() {
    this.premiumForm.patchValue({ commissionablePremium: 0 });
  }

  calculateCommissionablePremiumOd() {
    let od: any = this.premiumForm.controls.od.value;
    this.premiumForm.patchValue({ commissionablePremium: od });
  }

  calculateCommissionablePremiumOdAddon() {
    let od: any = this.premiumForm.controls.od.value;
    let addOnRiderOd: any = this.premiumForm.controls.addOnRiderOd.value;

    let sum = parseInt(od == "" ? 0 : od) + parseInt(addOnRiderOd == "" ? 0 : addOnRiderOd);
    this.premiumForm.patchValue({ commissionablePremium: sum.toFixed(2) });
  }

  calculateCommissionablePremiumTp() {
    let tp: any = this.premiumForm.controls.tp.value;
    let passengerCover: any = this.premiumForm.controls.passengerCover.value;

    let sum = parseInt(tp == "" ? 0 : tp) + parseInt(passengerCover == "" ? 0 : passengerCover);
    this.premiumForm.patchValue({ commissionablePremium: sum.toFixed(2) });
  }

  resetForm() {
    this.customerForm.reset();
    this.policyTermForm.reset();
    this.policyForm.reset();
    this.vehicleForm.reset();
    this.premiumForm.reset();
    this.addOnRiderForm.reset();
    this.nominationForm.reset();
    this.policySourceForm.reset();
    this.paymentForm.reset();
    this.voucherForm.reset();
    this.uploadDocumentForm.reset();
  }

  refreshLastInsuranceCompanies() {
    if (this.policyTermForm.value.policyType == undefined ||
      this.policyTermForm.value.packageType == undefined) return;

    if (this.policyTermForm.value.policyType == PolicyType.Rollover && this.policyTermForm.value.packageType == PolicyType.New) {
      this._lastInsuranceCompanies = this._insuranceCompanies.filter(f => f.Value != this.policyForm.value.tpInsuranceCompany);
    } else {
      this._lastInsuranceCompanies = this._insuranceCompanies.filter(f => f.Value != this.policyForm.value.odInsuranceCompany);
    }
  }

  getPolicyClaims(): void {
    this.commonService.getPolicyClaimsByPolicyId(this._policyId).subscribe((response: IPreviousClaimDto[]) => {
      this._claims = response;
    });
  }

  getPolicyVouchers(): void {
    this.commonService.getPolicyVoucherByPolicyId(this._policyId).subscribe((response: IPolicyVoucherDto[]) => {
      this._vouchers = response;
    });
  }

  getPolicyInspections(): void {
    this.commonService.getPolicyInspectionByPolicyId(this._policyId).subscribe((response: IPolicyInspectionDto[]) => {
      this._inspections = response;
    });
  }

  getPolicyDocuments(): void {
    this.commonService.getPolicyDocumentsByPolicyId(this._policyId).subscribe((response: IPolicyDocumentDto[]) => {
      this._policyDocuments = response;
      this._dataSourceUploadDocuments = new MatTableDataSource<IPolicyDocumentDto>(this._policyDocuments);
    });
  }

  getInsuranceCompanyName(value: number): string {
    return value ? this._insuranceCompanies.filter(f => f.Value == value)[0].Name : '';
  }

  getInsuranceCompanyLastName(value: number): string {
    return value ? this._lastInsuranceCompanies.filter(f => f.Value == value)[0]?.Name : '';
  }

  getInsuranceCompanyOd(value: number): string {
    return value ? this._odInsuranceCompanies.filter(f => f.Value == value)[0].Name : '';
  }

  getManufacturerForBind(value: number): string {
    return value ? this._manufacturers.filter(f => f.Value == value)[0].Name : '';
  }

  getPosForBind(value: number): string {
    return value ? this._posDatas.filter(f => f.Value == value)[0].Name : '';
  }


  filterInsurancerCompaniesData(input: any) {
    if (input === undefined)
      return;
    this._filteredInsuranceCompaniesOptions = this._insuranceCompanies.filter(item => {
      return item.Name.toLowerCase().indexOf(input.toLowerCase()) > -1
    });
  }

  filterInsurancerCompaniesLastData(input: any) {
    if (input === undefined)
      return;
    this._filteredInsuranceCompaniesLastOptions = this._lastInsuranceCompanies.filter(item => {
      return item.Name.toLowerCase().indexOf(input.toLowerCase()) > -1
    });
  }

  filterInsurancerCompaniesOdData(input: any) {
    if (input === undefined)
      return;
    this._filteredInsuranceCompaniesOdOptions = this._odInsuranceCompanies.filter(item => {
      return item.Name.toLowerCase().indexOf(input.toLowerCase()) > -1
    });
  }

  filterPosdData(input: any) {
    if (input === undefined)
      return;
    this._filteredPosOptions = this._posDatas.filter(item => {
      return item.Name.toLowerCase().indexOf(input.toLowerCase()) > -1
    });
  }

  filterdManufacturerData(input: any) {
    if (input === undefined)
      return;
    this._filteredManufacturerOptions = this._manufacturers.filter(item => {
      return item.Name.toLowerCase().indexOf(input.toLowerCase()) > -1
    });
  }

  getProduct() {
    this.commonService.getProduct().subscribe((response: any) => {
      this._products = response;
    });
  }

  getPlan() {
    this._selectedProductId = this.productPlanForm.value.product;
    this.commonService.getPlan(this._selectedProductId).subscribe((response: any) => {
      this._plans = response;
    });
  }

  getPlanType() {
    this.commonService.getPlanType().subscribe((response: any) => {
      this._planTypes = response;
    });
  }

  getPortability() {
    this.commonService.getPortability().subscribe((response: any) => {
      this._portability = response;
    });
  }

  calculateChanges() {

  }

  calculateNetPremium() {
    let sm = parseInt(this.premiumForm.controls.nonCommissionComponentPremium.value) + parseInt(this.premiumForm.controls.totalTp.value) + parseInt(this.premiumForm.controls.totalOd.value);
    this.premiumForm.patchValue({ netpremium: sm });

  }

  verticalData: any;
  routeWithEnum(enumName: string) {

    if (this.MenuVertical == 'Motor') {
      this.verticalData = Vertical.Motor;
    }
    else if (this.MenuVertical == 'Health') {
      this.verticalData = Vertical.Health;
    }
  }


  UpdateAddonPlanValue(response: any) {
    this._addOnPlanOptions.forEach(f => {
      let addonPlanOptionIdIndex = response?.AddOnRider?.AddOnRiderOptionId.findIndex((x: number) => x == f.AddonPlanOptionId);
      if (addonPlanOptionIdIndex >= 0) {
        let addOnValue = response?.AddOnRider?.AddOnValue[addonPlanOptionIdIndex].toString();
        f.AddonValue = addOnValue;
        f.IsPlanAvailable = true;
        this._addOnRiderArray.push(f.AddonPlanOptionName);

      }
    });
  }

  redirectRoute() {
    if (this.MenuVertical == 'Motor') {
      this.router.navigate(["../pms/motor/motor-policy-management"]);
    }
    else if (this.MenuVertical == 'Health') {
      this.verticalData = Vertical.Health;
    }
  }

  getCustomerDataByClusterId(clusterId: number) {
    this.customerService.getCustomerDataByClusterId(clusterId).subscribe((response: ICustomerShortDetailDto) => {
      this.setCustomerDetail(response);
    });
  }

  
  setPolicyDetails(): void {
    let model = this.getPolicyFormData();
    if (model.PackageTypeId === PackageType.COMPREHENSIVE|| model.PackageTypeId === PackageType.USAGE_BASE) {
      this._isDisableOdPolicyDetails = true;
      this._isOdPolicyEnable = true;
      this._isAddOnRiderEnable = true;
    }
    else if (model.PackageTypeId === PackageType.TP_ONLY) {
      this._isDisableOdPolicyDetails = false;
      this._isOdPolicyEnable = false;
      this._isAddOnRiderEnable = false;
    }else if(model.PackageTypeId === PackageType.OD_ONLY){
      this._isDisableOdPolicyDetails = false;
      this._isOdPolicyEnable = true;
      this._isAddOnRiderEnable = true;
    }

    if (model.PackageTypeId ===PackageType.USAGE_BASE) {
      this.policyForm.get("numberOfKiloMeterCovered")?.enable();
      this.policyForm.get("extendedKiloMeterCovered")?.enable();
    }
    else {
      this.policyForm.get("numberOfKiloMeterCovered")?.disable();
      this.policyForm.get("extendedKiloMeterCovered")?.disable();
    }


    this.setDataForSameCompanyRetentionPolicyTypeTp();
    this.setDataForSameCompanyRetentionPolicyTypeOd();
    this.setDataForSameCompanyRetentionPolicyTypeComprehensiveOrUsageBased();
    this.setDataForOtherCompanyRetentionPolicyTypeTp();
    this.setDataForOtherCompanyRetentionPolicyTypeOd();
    this.setOdPolicyDetail()
    this.removePrevTpOdInsurance()
  }

  setCompanyInsuranceBranch(response:any){
    let insuranceCompanyId:number =0
    let insuranceBranch = response.InsuranceBranch;
    if(response.PolicyTerm.PackageTypeId == PackageType.TP_ONLY){
      insuranceCompanyId = response.TpPolicy.InsuranceCompany
    }else{
      insuranceCompanyId = response.OdPolicy.InsuranceCompany
    }
    this.commonService.getInsuranceCompanyBranches(Vertical.Motor, insuranceCompanyId, insuranceBranch).subscribe((data: IDropDownDto<number>[]) => {
      this._insuranceCompanyBranches = data;
      this.policyForm.patchValue({
        insuranceBranch: response.InsuranceBranch,
      });

    });
  }

  removePrevTpOdInsurance(){
    if (this.policyTermForm.value.policyType === PolicyType.OtherCompanyRetention && (this.policyTermForm.value.packageType === 3 || this.policyTermForm.value.packageType === 4)) {
    this._insuranceCompanies = this._insuranceCompanies.filter(f => f.Value != this._policyData?.TpPolicy.InsuranceCompany);
    } else  if (this.policyTermForm.value.policyType === PolicyType.OtherCompanyRetention && this.policyTermForm.value.packageType === 1) {
      this._insuranceCompanies = this._insuranceCompanies.filter(f => f.Value != this._policyData?.TpPolicy.InsuranceCompany);
    }
  }
  

 
}

