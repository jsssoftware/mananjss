import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, Validators } from '@angular/forms';
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
import { PolicyType, SearchPolicyType, Vertical, PackageType, Common } from 'src/app/shared/utilities/enums/enum';
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
import { TwoDigitDecimaNumberDirective } from 'src/app/shared/utilities/directive/twodecimal.directive';
import { Observable, ReplaySubject } from 'rxjs';
import { saveAs } from 'file-saver';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { MatDialogRef } from '@angular/material/dialog';
import { PreviewDialogComponent } from 'src/app/shared/utilities/dialog/preview-dialog/preview-dialog.component';
import { CommonFunction } from 'src/app/shared/utilities/helpers/common-function';

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
  styleUrls: ['./policy-data.component.css'],

})
export class PolicyDataComponent implements OnInit, AfterViewInit, ErrorStateMatcher {
  @Input('MenuVertical') public MenuVertical: string = '';
  @Output() tableNameToDialogBox = new EventEmitter<string>();
  displayedColumnsDocumentTable: string[] = ["Sno", "DocumentTypeName", "FileName", "Remarks", "DocumentTypeId"];
  displayedColumnsCustomerCluster: string[] = ["Sno", "NameInPolicy", "DateOfBirth", "Gender", "Mobile", "Code", "Action"];
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
  IsVerified: boolean = false;
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
    isPreviousPolicyApplicable: new FormControl(false),
    // inspectionDate: new FormControl(''),
    // inspectionTime: new FormControl(''),
    // inspectionRemarks: new FormControl('')
    portability: new FormControl(''),
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
  insuranceCustomerForm = new FormGroup({
    cnameInsuredPerson: new FormControl(''),
    cdob: new FormControl(''),
    cgender: new FormControl(''),
    cmobile: new FormControl(''),
    cemail: new FormControl(''),
    cpassport: new FormControl(''),
    cpan: new FormControl(''),
    caadhar: new FormControl(''),
    cprofession: new FormControl('')
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
  public _savedinsuranceCompanies: IDropDownDto<number>[] = [];
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
  public _dataSourceCustomerCluster: MatTableDataSource<ICustomerShortDetailDto> = new MatTableDataSource<ICustomerShortDetailDto>();

  public _controlNumber: string = "";
  public _headerTitle: string = "";
  public _previousControlNumber: string = "";
  public _renewalCounter: number = 0;
  public isTpInsuranceDisable: boolean = false;
  public isSameModelAllowed: boolean = false;
  public _addOnRiderModel: IAddOnRiderModel

  public _isDisableBlockAgentCheckbox: boolean = false;
  public _isDisableChangeAgentCheckbox: boolean = false;
  public _isTpPremiumDetailsDisabled: boolean = false;
  public _isOdPremiumDetailsDisabled: boolean = false;
  public _isDisableOdPolicyDetails: boolean = false;
  public _showErrors: boolean = false;
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
  public maxValueAllowedNumber: number = 99999999.99
  public maxValueAllowedPercentage: number = 999.99;
  public listAccepts: string =
    ".png,.jpg,.jpeg,.pdf";

  public rtoNotAvailable: number = 1;
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
    public mainmotorService: MotorService,
    public _sanitizer: DomSanitizer,
    public _commonFunction: CommonFunction
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
    this._verticalName = this.mainmotorService.vertical$.getValue();
    this._headerTitle = this.mainmotorService._headerTitle$.getValue();
    this._customerId = this.route.snapshot.paramMap.get('customerId');
    this._policyTypeId = Number(this.route.snapshot.paramMap.get('policyTypeId'));//is the id when customer saved
    this._policyId = Number(this.route?.snapshot?.paramMap.get('policyId') || 0);
    debugger
    this._policyType = Number(this.route?.snapshot?.paramMap.get('policyType') || 0);
    switch (this._policyTypeId) {
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
        this._type = SearchPolicyType.Motor_Modify;
        break;
      case 7:
        this._type = 7;
        break;
      case 8:
        this._type = SearchPolicyType.Motor_rollover;
        break;
    }

    if (this._policyType == 2) {
      this._type = SearchPolicyType.Motor_Renew;
    }

    if (this._policyType == SearchPolicyType.Motor_View) {
      this._isViewPolicyActive = true
    }



    this.policyForm.get("numberOfKiloMeterCovered")?.disable();
    this.policyForm.get("extendedKiloMeterCovered")?.disable();
    /*  this.policyForm.valueChanges.subscribe(change => {
       console.log(this.policyForm)
       this.policyForm = this.policyForm
     })
  */
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
    //Not calling on edit
    if (this._policyId == 0 ||  this._policyType == SearchPolicyType.Motor_Renew) {
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
      if (this._type == SearchPolicyType.Motor_rollover) {
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
    if(this._policyType== SearchPolicyType.Motor_Renew){
      this.policyForm.patchValue({
        financeBy: this._policyData?.FinanceBy,
      });
    }
    //this.premiumForm.reset();
    this._isTpPremiumDetailsDisabled = false;
    this._isOdPremiumDetailsDisabled = false;
    this.policyTermForm.patchValue({ policyTerm: undefined });
    let model = this.getPolicyFormData();
    if (model.PolicyTypeId == undefined ||
      model.VehicleClassId == undefined ||
      model.PackageTypeId == undefined ||
      model.PolicyTypeId == "" ||
      model.VehicleClassId == "" ||
      model.PackageTypeId == "") return;


    if (model.PackageTypeId === PackageType.COMPREHENSIVE || model.PackageTypeId === PackageType.USAGE_BASE) {
      this._isDisableOdPolicyDetails = true;
      this._isOdPolicyEnable = true;
      this._isAddOnRiderEnable = true;
    }
    else if (model.PackageTypeId === PackageType.TP_ONLY) {
      this._isDisableOdPolicyDetails = false;
      this._isOdPolicyEnable = false;
      this._isAddOnRiderEnable = false;
      this._isTpPremiumDetailsDisabled = true
    } else if (model.PackageTypeId === PackageType.OD_ONLY) {
      this._isDisableOdPolicyDetails = false;
      this._isOdPolicyEnable = true;
      this._isAddOnRiderEnable = true;
      this._isOdPremiumDetailsDisabled = true

    }

    if (model.PackageTypeId === PackageType.USAGE_BASE) {
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
    if (this.policyTermForm.value.policyType == PolicyType.OtherCompanyRetention || this.policyTermForm.value.policyType == PolicyType.SameCompanyRetention) {
     
      await this.setPolicySourceRenewal()
      await this.setPreviousInsuranceCompany()
      this.removePrevTpOdInsurance()
    }
    this.setOdPolicyDetail()
    this.getVehicles();

  }

  disabledPremiumfieldonUpdate(PackageTypeId :number){
    this._isTpPremiumDetailsDisabled = false;
    this._isOdPremiumDetailsDisabled = false;
    if (PackageTypeId === PackageType.COMPREHENSIVE || PackageTypeId === PackageType.USAGE_BASE) {
      this._isDisableOdPolicyDetails = true;
      this._isOdPolicyEnable = true;
      this._isAddOnRiderEnable = true;
    }
    else if (PackageTypeId === PackageType.TP_ONLY) {
      this._isDisableOdPolicyDetails = false;
      this._isOdPolicyEnable = false;
      this._isAddOnRiderEnable = false;
      this._isTpPremiumDetailsDisabled = true
    } else if (PackageTypeId === PackageType.OD_ONLY) {
      this._isDisableOdPolicyDetails = false;
      this._isOdPolicyEnable = true;
      this._isAddOnRiderEnable = true;
      this._isOdPremiumDetailsDisabled = true
    }

    if (PackageTypeId === PackageType.USAGE_BASE) {
      this.policyForm.get("numberOfKiloMeterCovered")?.enable();
      this.policyForm.get("extendedKiloMeterCovered")?.enable();
    }
    else {
      this.policyForm.get("numberOfKiloMeterCovered")?.disable();
      this.policyForm.get("extendedKiloMeterCovered")?.disable();
    }
  }
  async setPolicySourceRenewal() {
    this._insuranceCompanies = this._savedinsuranceCompanies
    if (this.policyTermForm.value.policyType == PolicyType.SameCompanyRetention) {
      if (this.policyTermForm.value.packageType == PackageType.OD_ONLY) {

        await this.setDataForSameCompanyRetentionPolicyTypeOd();
      }
      if (this.policyTermForm.value.packageType == PackageType.TP_ONLY) {
        this.setDataForSameCompanyRetentionPolicyTypeTp();
      }
      if (this.policyTermForm.value.packageType == PackageType.COMPREHENSIVE || this.policyTermForm.value.packageType == PackageType.USAGE_BASE) {
        await this.setDataForSameCompanyRetentionPolicyTypeComprehensiveOrUsageBased();
      }
    }

    if (this.policyTermForm.value.policyType == PolicyType.OtherCompanyRetention) {
      if (this.policyTermForm.value.packageType == PackageType.TP_ONLY) {
        await this.setDataForOtherCompanyRetentionPolicyTypeTp();
      }
      if (this.policyTermForm.value.packageType == PackageType.OD_ONLY) {
        await this.setDataForOtherCompanyRetentionPolicyTypeOd();
      } if (this.policyTermForm.value.packageType == PackageType.COMPREHENSIVE || this.policyTermForm.value.packageType == PackageType.USAGE_BASE) {
        await this.setDataForOtherCompanyRetentionPolicyTypeComprehensiveOrUsageBased();
      }
    }
    this.getAddOnRiders();
  }

  getInsuranceCompanies(): any {
    this.commonService.getInsuranceCompanies(Vertical.Motor).subscribe((response: IDropDownDto<number>[]) => {
      this._insuranceCompanies = this._tpInsuranceCompanies = this._odInsuranceCompanies = this._lastInsuranceCompanies = this._savedinsuranceCompanies = response;
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
      insuranceCompanyId = this.policyForm.controls['odInsuranceCompany'].value;
    }
    else
      insuranceCompanyId = this.policyForm.controls['tpInsuranceCompany'].value;

    let branchId: number = this.PolicyForm.isAll ? -1 : this._branchId;

    this.commonService.getInsuranceCompanyBranches(Vertical.Motor, insuranceCompanyId, branchId).subscribe((response: IDropDownDto<number>[]) => {
      this._insuranceCompanyBranches = response;
    });
    this.getAddOnRiders();
    if (this._policyId == 0) {
      this.setPreviousInsuranceCompany();

    }
  }



  getVehicles(): void {
    let vehicleClassId = this.policyTermForm.value.vehicleClass;
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
    let insuranceCompanyId: number = 0

    if (this.policyForm.value.PackageTypeId == PackageType.TP_ONLY) {
      insuranceCompanyId = this.policyForm.controls['tpInsuranceCompany'].value;
    } else {
      insuranceCompanyId = this.policyForm.controls['odInsuranceCompany'].value;
    }
    if (insuranceCompanyId) {
      this.commonService.getAddOnRiders(insuranceCompanyId, Vertical.Motor).subscribe((response: IDropDownDto<number>[]) => {
        this._addOnRiders = response;
      });
    }
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
    if (this._policyType == SearchPolicyType.Motor_Verify) {
      this.IsVerified = true
    }
    this.validationPolicyData
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
        AddOnRiderOd: Number(this.PremiumForm.addOnRiderOd),
        CngLpgIdv: Number(this.PremiumForm.cngLpgIdv),
        CommissionPaidOn: Number(this.PremiumForm.commissionPaidOn),
        CommissionablePremium: Number(this.PremiumForm.commissionablePremium),
        ElectricAccessoriesIdv: Number(this.PremiumForm.electricAccessoriesIdv),
        EndorseGrossPremium: Number(this.PremiumForm.endorseGrossPremium),
        EndorseOd: Number(this.PremiumForm.endorseOd),
        EndorseTp: Number(this.PremiumForm.endorseTp),
        GrossPremium: Number(this.PremiumForm.grossPremium),
        GstPercentage: Number(this.PremiumForm.gst),
        GstValue: Number(this.PremiumForm.gstValue),
        Loading: Number(this.PremiumForm.loading),
        Ncb: Number(this.PremiumForm.ncb),
        NonCommissionComponentPremium: Number(this.PremiumForm.nonCommissionComponentPremium),
        NonElectricAccessoriesIdv: Number(this.PremiumForm.nonElectricAccessoriesIdv),
        Od: Number(this.PremiumForm.od),
        PassengerCover: Number(this.PremiumForm.passengerCover),
        SpecialDiscount: Number(this.PremiumForm.specialDiscount),
        TotalGrossPremium: Number(this.PremiumForm.totalGrossPremium),
        TotalIdv: Number(this.PremiumForm.totalIdv),
        TotalOd: Number(this.PremiumForm.totalOd),
        TotalTp: Number(this.PremiumForm.totalTp),
        Tp: Number(this.PremiumForm.tp),
        VehicleIdv: Number(this.PremiumForm.vehicleIdv),
        BasicTpGstPercentage: Number(this.PremiumForm.basicTPgstPercent),
        NetPremium: Number(this.PremiumForm.netpremium)
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
        RtoZone: this.VehicleForm?.rtoZone?.Value,
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
      PreviousControlNumber: this._type == SearchPolicyType.Motor_Renew ? this._previousControlNumber : "",
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
      Condition1: this.isSameModelAllowed,
      Condition2: false,
      IsBlockAgent: this.PolicyForm.isBlockAgent,
      IsChangeAgent: this.PolicyForm.isChangeAgent,
      IsPreviousPolicyApplicable: this.PolicyForm.isPreviousPolicyApplicable,
      AddOnSelected: this._addOnRiderArray.join(', '),
      VerticalId: this._verticalDetail.VerticalId,
      VerticalSegmentId: this._verticalDetail.VerticalSegmentId,
      IsVerified: this.IsVerified,
      PreviousPolicyId: this._type == SearchPolicyType.Motor_Renew ? this._policyId : ""
    }

    if (this._policyId == 0 || this._policyType == SearchPolicyType.Motor_Renew) {
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
              }).then(async (result) => {
                if (result.isConfirmed) {
                  this.isSameModelAllowed = true
                  await this.createPolicy()
                  this.redirectRoute();

                }
              })
            }
          }
        }
      });
    }
    else {
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
            } else {
              Swal.fire({
                title: 'Warning',
                text: response.Message,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, Save it!',
                cancelButtonText: 'Cancel'
              }).then(async (result) => {
                if (result.isConfirmed) {
                  this.isSameModelAllowed = true
                  await this.createPolicy()
                  this.redirectRoute();

                }
              })
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
    if (this.policyTermForm.value.policyType == PolicyType.SameCompanyRetention || this.policyTermForm.value.policyType == PolicyType.OtherCompanyRetention) {
      await this.setPolicySourceRenewal()
    } else {
      this.policyForm.patchValue({
        tpNumberOfYear: tpYear?.Value,
        odNumberOfYear: odYear?.Value,
        tpStartDate: moment(new Date(2022, 3, 1)),
        odStartDate: moment(new Date(2022, 3, 1)),
        continutyStartDate: moment(new Date(2021, 3, 1))
      });

      if (policyTerm.OdYear > 0) {
        this._isOdPolicyEnable = true;
        this.commonService.getDate(this.commonService.getDateInString(this.policyForm.value.odStartDate), odYear?.Year).subscribe((response: IDateDto) => {
          this.policyForm.patchValue({
            odExpiryDate: moment(new Date(`${response.Year}-${response.Month}-${response.Day}`))
          });
        });
      }
      else {
        this._isOdPolicyEnable = false;
      }
      if (tpYear?.Year) {
        this.commonService.getDate(this.commonService.getDateInString(this.policyForm.value.tpStartDate), tpYear?.Year).subscribe((response: IDateDto) => {
          this.policyForm.patchValue({
            tpExpiryDate: moment(new Date(`${response.Year}-${response.Month}-${response.Day}`))
          });
        });
      }
    }

    await this.setPreviousInsuranceCompany();

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
    let tpYear = this._numberOfYears.filter(f => f.Value == this.policyForm.getRawValue().tpNumberOfYear)[0];
    let odYear = this._numberOfYears.filter(f => f.Value == this.policyForm.getRawValue().odNumberOfYear)[0];
    this.setOdPolicyDetail();
    if (policy === "tp") {

      if (this.policyTermForm.value.policyType === PolicyType.SameCompanyRetention || this.policyTermForm.value.policyType === PolicyType.OtherCompanyRetention) {
        let startDate: Date = this.commonService.getDateFromIDateDto(this._policyData?.TpPolicy.ExpiryDateDto as IDateDto) as Date;
        //startDate = new Date(startDate.setDate(startDate.getDate() + 1));
        if (startDate != null && !moment(startDate).subtract(90, 'days').isBefore(startDate)) {
          this.policyForm.patchValue({
            tpStartDate: undefined
          });

          Swal.fire({
            icon: 'error',
            title: 'Sorry',
            text: "Previous date is not allowed",
          });
        }

        if (startDate != null && !this.isDateValid(moment(startDate), this.policyForm.getRawValue().tpStartDate)) {
          this.policyForm.patchValue({
            tpStartDate: undefined
          });

          Swal.fire({
            icon: 'error',
            title: 'Sorry',
            text: "Please select date less than 93 days"
          });
        }
      }
      this.commonService.getDate(this.commonService.getDateInString(this.policyForm.getRawValue().tpStartDate), tpYear?.Year).subscribe((response: IDateDto) => {
        this.policyForm.patchValue({
          tpExpiryDate: moment(new Date(`${response.Year}-${response.Month}-${response.Day}`))
        });
      });
    }

    if (policy === "od" || (policy === "tp" && this.policyTermForm.value.packageType == PackageType.COMPREHENSIVE)) {

      if (this.policyTermForm.value.policyType === PolicyType.SameCompanyRetention || this.policyTermForm.value.policyType === PolicyType.OtherCompanyRetention
      ) {
        let startDate: Date = this.commonService.getDateFromIDateDto(this._policyData?.OdPolicy.ExpiryDateDto as IDateDto) as Date;
        //startDate = new Date(startDate.setDate(startDate.getDate() + 1));

        if (startDate != null && !moment(startDate).subtract(90, 'days').isBefore(this.policyForm.getRawValue().odStartDate)) {
          this.policyForm.patchValue({
            odStartDate: undefined
          });
          Swal.fire({
            icon: 'error',
            title: 'Sorry',
            text: "Previous date is not allowed",
          });
        }

        if (startDate != null && !this.isDateValid(moment(startDate), this.policyForm.getRawValue().odStartDate)) {
          this.policyForm.patchValue({
            odStartDate: undefined
          });
          Swal.fire({
            icon: 'error',
            title: 'Sorry',
            text: "Please select date less than 93 days"
          });
        }
      }

      this.commonService.getDate(this.commonService.getDateInString(this.policyForm.getRawValue().odStartDate), odYear?.Year).subscribe((response: IDateDto) => {
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


  getPaymentFormData(): IPaymentFormDataModel[] {
    //later change with dynamic form builder approach

    let payments: IPaymentFormDataModel[] = [];
    let payment1: IPaymentFormDataModel = {
      Amount: this.PaymentForm.amount1,
      Bank: this.PaymentForm.bank1,
      DatedString: this.PaymentForm.dated1 ? this.commonService.getDateInString(this.PaymentForm.dated1) : null,
      InstrumentNumber: this.PaymentForm.instrumentNumber1,
      Mode: this.PaymentForm.mode1,
      DatedDto: null
    };

    let payment2: IPaymentFormDataModel = {
      Amount: this.PaymentForm.amount2,
      Bank: this.PaymentForm.bank2,
      DatedString: this.PaymentForm.dated2 ? this.commonService.getDateInString(this.PaymentForm.dated2) : null,
      InstrumentNumber: this.PaymentForm.instrumentNumber2,
      Mode: this.PaymentForm.mode2,
      DatedDto: null
    };

    let payment3: IPaymentFormDataModel = {
      Amount: this.PaymentForm.amount3,
      Bank: this.PaymentForm.bank3,
      DatedString: this.PaymentForm.dated3 ? this.commonService.getDateInString(this.PaymentForm.dated3) : null,
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
  base64Output: any;
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
        Remarks: document.Remarks,
        FileData: this.uploadDocumentForm.value.browse._files,
      });
      this.uploadDocumentForm.reset();
      this._dataSourceUploadDocuments = new MatTableDataSource<IPolicyDocumentDto>(this._policyDocuments.reverse());
    }
    reader.readAsDataURL(this.uploadDocumentForm.value.browse._files[0]);
    // Create a Blog object for selected file & define MIME type
    var blob = new Blob(this.uploadDocumentForm.value.browse._files, { type: this.uploadDocumentForm.value.browse._files[0].type });

    // Create Blog URL 
    this.base64Output = window.URL.createObjectURL(blob);

  }

  createTemporaryUrl() {
    // Create a Blog object for selected file & define MIME type
    var blob = new Blob(this.uploadDocumentForm.value.browse._files, { type: this.uploadDocumentForm.value.browse._files[0].type });
    this.base64Output = window.URL.createObjectURL(blob);

  }

  viewer: any = 'google';
  selectedType = 'docx';
  DemoDoc = "http://www.africau.edu/images/default/sample.pdf"
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
    return this.policyForm.getRawValue();
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
    let vehicleIdv: any = this.premiumForm.controls.vehicleIdv.value || 0;
    let electricAccessoriesIdv: any = this.premiumForm.controls.electricAccessoriesIdv.value || 0;
    let nonElectricAccessoriesIdv: any = this.premiumForm.controls.nonElectricAccessoriesIdv.value || 0;
    let cngLpgIdv: any = this.premiumForm.controls.cngLpgIdv.value || 0;

    let sum = parseInt(vehicleIdv == "" ? 0 : vehicleIdv) + parseInt(electricAccessoriesIdv == "" ? 0 : electricAccessoriesIdv)
      + parseInt(nonElectricAccessoriesIdv == "" ? 0 : nonElectricAccessoriesIdv) + parseInt(cngLpgIdv == "" ? 0 : cngLpgIdv);
    this.premiumForm.patchValue({ totalIdv: sum });

    this.calculateCommissionablePremium(this._commissionPaidOnId);
  }

  calculateTotalOd() {
    let od: any = this.premiumForm.controls.od.value;
    let addOnRiderOd: any = this.premiumForm.controls.addOnRiderOd.value || 0;
    let endorseOd: any = this.premiumForm.controls.endorseOd.value || 0;

    let sum = Math.round(parseFloat(od == "" ? 0 : od) + parseFloat(addOnRiderOd == "" ? 0 : addOnRiderOd)
      + parseFloat(endorseOd == "" ? 0 : endorseOd));
    this.premiumForm.patchValue({ totalOd: sum });

    this.calculateGrossPremium();
    this.calculateCommissionablePremium(this._commissionPaidOnId);
    this.calculateNetPremium();
  }

  calculateTotalTp() {
    let tp: any = this.premiumForm.controls.tp.value || 0;
    let passengerCover: any = this.premiumForm.controls.passengerCover.value || 0;
    let endorseTp: any = this.premiumForm.controls.endorseTp.value || 0;

    let sum = Math.round(parseFloat(tp == "" ? 0 : tp) + parseFloat(passengerCover == "" ? 0 : passengerCover)
      + parseFloat(endorseTp == "" ? 0 : endorseTp));
    this.premiumForm.patchValue({ totalTp: sum });

    this.calculateGrossPremium();
    this.calculateCommissionablePremium(this._commissionPaidOnId);
    this.calculateNetPremium();

  }

  calculateTotalGrossPremium() {
    let grossPremium: any = this.premiumForm.controls.grossPremium.value || 0;
    let endorseGrossPremium: any = this.premiumForm.controls.endorseGrossPremium.value || 0;

    let sum = Math.round(grossPremium == "" ? 0 : grossPremium) + Math.round(endorseGrossPremium == "" ? 0 : endorseGrossPremium);
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
    let gstFinalValue = Math.round(gstValue + sum2gst)
    this.premiumForm.patchValue({ gstValue: gstFinalValue });
    this.calculateNetPremium();
    // Calculating gross premium after updating net
    let netpremium: any = this.premiumForm.controls.netpremium.value || 0;
    let grossPremiumAmt = Math.round(gstFinalValue) + Math.round(netpremium);
    this.premiumForm.patchValue({ grossPremium: grossPremiumAmt });
    this.calculateTotalGrossPremium();

  }

  getCustomerShortDetailById(customerId: number) {
    this.customerService.getCustomerShortDetailById(customerId).subscribe((response: ICustomerShortDetailDto) => {
      this.setCustomerDetail(response);
      this.getCustomerDataByClusterId(Number(response.ClusterId))
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
      debugger
      this._policyData = response;
      this.setMotorPolicyData(response);
      this.getPolicyDocuments();

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
      DateOfBirth: response.Customer.DateOfBirth ? moment(response.Customer.DateOfBirth).format('DD/MM/yyyy') : null,
      PassportNumber: response.Customer.PassportNumber,
      NameInPolicy: response.Customer.NameInPolicy,
      Pan: response.Customer.Pan,
    });


    this.IsVerified = response.IsVerified;

    // if (this._type == SearchPolicyType.Motor_New || this._type == SearchPolicyType.Motor_rollover || this._type == SearchPolicyType.Motor_Renew) {
    this._controlNumber = response.ControlNumber
    this.policyTermForm.patchValue({
      policyType: response.PolicyTerm.PolicyType,
      vehicleClass: response.PolicyTerm.VehicleClass,
      packageType: response.PolicyTerm.PackageTypeId,
      policyTerm: response.PolicyTerm,
      acknowledgementSlipNumber: response.PolicyTerm.AcknowledgementSlipNumber,
      acknowledgementSlipIssueDate: this.commonService.getDateFromIDateDto(response.PolicyTerm.AcknowledgementSlipIssueDateDto as IDateDto)
    });


    if (this._policyType !== SearchPolicyType.Motor_Renew) {
      this.policyForm.patchValue({
        tpInsuranceCompany: response.TpPolicy.InsuranceCompany,
        coverNoteNumber: response.CoverNoteNumber,
        coverNoteIssueDate: response.CoverNoteIssueDateDto ? this.commonService.getDateFromIDateDto(response.CoverNoteIssueDateDto as IDateDto) : "",
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
        isPreviousPolicyApplicable: response.IsPreviousPolicyApplicable
      });

      this.premiumForm.patchValue({
        vehicleIdv: response.Premium.VehicleIdv,
        electricAccessoriesIdv: response.Premium.ElectricAccessoriesIdv,
        nonElectricAccessoriesIdv: response.Premium.NonElectricAccessoriesIdv,
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



      //Updating add on rider value
      if (response?.AddOnRider?.AddOnRiderId) await this.getAddOnRiders()
      this._addOnRiderModel.AddOnRiderId = response?.AddOnRider?.AddOnRiderId;
      this.commonService.getAddOnPlanOptions(this._addOnRiderModel.AddOnRiderId, Vertical.Motor, 0).subscribe((addOnResponse: IAddOnPlanOptionDto[]) => {
        addOnResponse.forEach((value, index) => {
          value.IsDisabled = value.IsPlanAvailable;
          /* if (value.IsPlanAvailable) {
            this._addOnRiderArray.push(value.AddonPlanOptionName);
          } */
        });
        this._addOnPlanOptions = addOnResponse;
        this.UpdateAddonPlanValue(response)
      });
    }

    this.businessDoneBy();

    await this.commonService.getPolicyTerms(response.PolicyTerm.PolicyType, response.PolicyTerm.VehicleClass, response.PolicyTerm.PackageTypeId).subscribe((responsePolicyTerms: IPolicyTermDto[]) => {
      this._policyTerms = responsePolicyTerms;
      let policyTerm = responsePolicyTerms.filter(f => f.Id == response.PolicyTerm.PolicyTerm)[0]
      if (this._policyType !== SearchPolicyType.Motor_Renew) {
        this.policyTermForm.patchValue({
          policyTerm: policyTerm
        });
      }
    });

    await this.nominationForm.patchValue({
      nominationName: response.Nomination.Name,
      relation: response.Nomination.Relation,
      age: response.Nomination.Age,
      guardianName: response.Nomination.GuardianName
    });
    // }
    //For previous value

    this.policyForm.patchValue({
      lastYearInsuranceCompany: response.PreviousPolicy.LastYearInsuranceCompany,
      previousCnPolicyNumber: response.PreviousPolicy.PreviousPolicyNumber,
      lastPolicyExpiryDate: this.commonService.getDateFromIDateDto(response.PreviousPolicy?.LastPolicyExpiryDateDto as IDateDto),
      isBlockAgent: false,
      isChangeAgent: false,
    });

    if (this._type == PolicyType.OtherCompanyRetention || this._type == PolicyType.SameCompanyRetention) {
      this.policyForm.get("lastYearInsuranceCompany")?.disable();
      this.policyForm.get("previousCnPolicyNumber")?.disable();
      this.policyForm.get("lastPolicyExpiryDate")?.disable();
    }

    if (this._policyType == SearchPolicyType.Motor_Renew ) {
      this._previousControlNumber = response.ControlNumber;
      this._controlNumber = '';
      this._renewalCounter = response.RenewalCounter + 1;
      await this.policyTermForm.patchValue({
        vehicleClass: response.PolicyTerm.VehicleClass,
        packageType: ''
      });
    
      if (response.Premium.Ncb < Common.NCB50VALUE) {
        this.premiumForm.patchValue({
          ncb: response.Premium.Ncb +1,
        })
      }
      else{
        this.premiumForm.patchValue({
          ncb: Common.NCB50VALUE,
        })
      }
      let age = (response.Nomination.Age) + 1
      this.nominationForm.patchValue({
        age: response.Nomination.Age != 0 ? age : 0,
      });

      this.policyForm.patchValue({
        lastYearInsuranceCompany: response.PreviousPolicy.LastYearInsuranceCompany,
        previousCnPolicyNumber: response.PreviousPolicy.PreviousPolicyNumber,
        lastPolicyExpiryDate: this.commonService.getDateFromIDateDto(response.PreviousPolicy?.LastPolicyExpiryDateDto as IDateDto),
        isBlockAgent: false,
        isChangeAgent: false,
      });
      
      this.policyForm.get("lastYearInsuranceCompany")?.disable();
      this.policyForm.get("previousCnPolicyNumber")?.disable();
      this.policyForm.get("lastPolicyExpiryDate")?.disable();
    }
  

    await this.commonService.getVehicles(response.PolicyTerm.VehicleClass).subscribe(async (responseVehicle: IDropDownDto<number>[]) => {
      this._vehicles = responseVehicle;
      await this.getSetCompleteVehicleDetails(this._vehicles.filter(f => f.Value == response.Vehicle.Varient)[0]);
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
        isSpecialRegistrationNumber: response.Vehicle.IsSpecialRegistrationNumber
      });
    });

    if (this._policyType !== SearchPolicyType.Motor_Renew) {
       
    this._renewalCounter = response.RenewalCounter ;
    this._previousControlNumber = response.PreviousControlNumber;
      for (var i = 0; i < response.PaymentData.length; i++) {
        if (i == 0) {
          this.paymentForm.patchValue({
            mode1: response.PaymentData[i].Mode,
            amount1: response.PaymentData[i].Amount,
            instrumentNumber1: response.PaymentData[i].InstrumentNumber,
            dated1: response.PaymentData[i].DatedDto ? moment(this.commonService.getDateFromIDateDto(response.PaymentData[i].DatedDto as IDateDto)) : null,
            bank1: response.PaymentData[i].Bank
          });
        }
        if (i == 1) {
          this.paymentForm.patchValue({
            mode2: response.PaymentData[i].Mode,
            amount2: response.PaymentData[i].Amount,
            instrumentNumber2: response.PaymentData[i].InstrumentNumber,
            dated2: response.PaymentData[i].DatedDto ? moment(this.commonService.getDateFromIDateDto(response.PaymentData[i].DatedDto as IDateDto)) : null,
            bank2: response.PaymentData[i].Bank
          });
        }
        if (i == 2) {
          this.paymentForm.patchValue({
            mode3: response.PaymentData[i].Mode,
            amount3: response.PaymentData[i].Amount,
            instrumentNumber3: response.PaymentData[i].InstrumentNumber,
            dated3: response.PaymentData[i].DatedDto ? moment(this.commonService.getDateFromIDateDto(response.PaymentData[i].DatedDto as IDateDto)) : null,
            bank3: response.PaymentData[i].Bank
          });
        }
      }

    }
    if (this._policyType !== SearchPolicyType.Motor_Renew || this._policyType == SearchPolicyType.Motor_Incomplete) {
      this.validationPolicyData(response)
    }
    if (this._type == PolicyType.OtherCompanyRetention) {
      this.policyForm.get("tpInsuranceCompany")?.disable();
      this.policyForm.get("policyNumber")?.disable();
      this.policyForm.get("tpStartDate")?.disable();
    }
    //Calling insurance company branch api location
    this.disabledPremiumfieldonUpdate(response.PolicyTerm.PackageTypeId)
    setTimeout(() => {
      this.setPolicyDetails()
      this._showErrors = true;
      this.previousPolicyChecked(response.IsPreviousPolicyApplicable);
      this.getAddOnRiders();

     
    }, 3000);
    this.setvalues();
  }

  getTotalCost() {
    return this._vouchers.map(t => t.VoucherAmount).reduce((acc, value) => acc + value, 0);
  }

  enableAddButton() {
    this._enableAddButton = false;
    this.createTemporaryUrl();
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

  prvePolicydisableFields(event: any) {
    if (event.checked) {
      this._disableFields = true;
      this.genericClearValidator(["lastYearInsuranceCompany", "previousCnPolicyNumber", "lastPolicyExpiryDate"], this.policyForm)
    }
    else {
      this._disableFields = false;
      this.genericSetValidator(["lastYearInsuranceCompany", "previousCnPolicyNumber", "lastPolicyExpiryDate"], this.policyForm)

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
    if (this.policyTermForm.value.policyType == PolicyType.OtherCompanyRetention || this.policyTermForm.value.policyType == PolicyType.SameCompanyRetention) {
      let insuranceCompany = this.policyTermForm.value.packageType === PackageType.TP_ONLY ? this._policyData?.TpPolicy.InsuranceCompany : this._policyData?.OdPolicy.InsuranceCompany;
      let policyNumber = this.policyTermForm.value.packageType === PackageType.TP_ONLY  ? this._policyData?.TpPolicy.PolicyNumber : this._policyData?.OdPolicy.PolicyNumber;
      let policyExpiryDate = this.policyTermForm.value.packageType === PackageType.TP_ONLY  ? this.commonService.getDateFromIDateDto(this._policyData?.TpPolicy.ExpiryDateDto as IDateDto)
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

  async setDataForSameCompanyRetentionPolicyTypeTp() {
    if (this.policyTermForm.value.policyType === PolicyType.SameCompanyRetention && this.policyTermForm.value.packageType === PackageType.TP_ONLY) {

      let startDate: Date = this.commonService.getDateFromIDateDto(this._policyData?.TpPolicy.ExpiryDateDto as IDateDto) as Date;

      try {
        startDate = new Date(startDate.setDate(startDate.getDate() + 1));
      } catch (error) {
        startDate = new Date();
      }

      let policyTerm: IPolicyTermDto = this.policyTermForm.value.policyTerm as IPolicyTermDto;

      if (policyTerm === undefined || policyTerm == null) return;

      await this.policyForm.patchValue({
        tpInsuranceCompany: this._policyData?.TpPolicy.InsuranceCompany,
        tpStartDate: moment(startDate),
        insuranceCompanyBranches: this._policyData?.TpPolicy
      });

      this.isTpInsuranceDisable = true;
      await this.commonService.getDate(this.commonService.getDateInString(this.policyForm.getRawValue().tpStartDate), policyTerm?.TpYear).subscribe((response: IDateDto) => {
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

      this.commonService.getDate(this.commonService.getDateInString(this.policyForm.getRawValue().odStartDate), policyTerm.OdYear).subscribe((response: IDateDto) => {
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

    if (this.policyTermForm.value.policyType == PolicyType.SameCompanyRetention && this.policyTermForm.value.packageType == PackageType.COMPREHENSIVE || this.policyTermForm.value.packageType === PackageType.USAGE_BASE) {
      let startDate: Date = this.commonService.getDateFromIDateDto(this._policyData?.TpPolicy.ExpiryDateDto as IDateDto) as Date;

      try {
        startDate = new Date(startDate.setDate(startDate.getDate() + 1));
      } catch (error) {
        startDate = new Date();
      }

      let policyTerm: IPolicyTermDto = this.policyTermForm.value.policyTerm as IPolicyTermDto;

      if (policyTerm === undefined || policyTerm == null) return;

      await this.policyForm.patchValue({
        tpInsuranceCompany: this._policyData?.TpPolicy.InsuranceCompany,
        tpStartDate: moment(startDate),
        insuranceBranch: this._policyData?.InsuranceBranch,
        odInsuranceCompany: this._policyData?.TpPolicy.InsuranceCompany,
        odStartDate: moment(startDate)
      });

      /*this._odInsuranceCompanies = this._insuranceCompanies*/
      await this.commonService.getDate(this.commonService.getDateInString(this.policyForm.getRawValue().tpStartDate), policyTerm?.TpYear).subscribe((response: IDateDto) => {
        this.policyForm.patchValue({
          tpExpiryDate: new Date(`${response.Year}-${response.Month}-${response.Day}`)
        });
      });
      /* let odstartDate: Date = this.commonService.getDateFromIDateDto(this._policyData?.OdPolicy.ExpiryDateDto as IDateDto) as Date;

      try {
        odstartDate = new Date(odstartDate.setDate(odstartDate.getDate() + 1));
      } catch (error) {
        odstartDate = new Date();
      }

      this.policyForm.patchValue({
       
      }); */

      this.policyForm.get("odInsuranceCompany")?.disable();
      this.policyForm.get("tpInsuranceCompany")?.disable();

      this.commonService.getDate(this.commonService.getDateInString(this.policyForm.getRawValue().odStartDate), policyTerm.OdYear).subscribe((response: IDateDto) => {
        this.policyForm.patchValue({
          odExpiryDate: new Date(`${response.Year}-${response.Month}-${response.Day}`)
        });
      });
    }
    else {
      this.policyForm.get("tpInsuranceCompany")?.enable();
      this.policyForm.get("odInsuranceCompany")?.enable();

    }
  }

  async setDataForOtherCompanyRetentionPolicyTypeTp() {
    this.policyForm.get("tpInsuranceCompany")?.enable();

    if (this.policyTermForm.value.policyType === PolicyType.OtherCompanyRetention && this.policyTermForm.value.packageType == PackageType.TP_ONLY) {
      debugger
      let startDate: Date = this.commonService.getDateFromIDateDto(this._policyData?.TpPolicy.ExpiryDateDto as IDateDto) as Date;
      try {
        startDate = new Date(startDate.setDate(startDate.getDate() + 1));
      } catch (error) {
        startDate = new Date();
      }

      let policyTerm: IPolicyTermDto = this.policyTermForm.value.policyTerm as IPolicyTermDto;

      if (policyTerm === undefined || policyTerm == null) return;
      this.policyForm.get("tpStartDate")?.enable();

      await this.policyForm.patchValue({
        policyNumber: undefined,
        tpStartDate: moment(startDate)
      });

      await this.commonService.getDate(this.commonService.getDateInString(this.policyForm.getRawValue().tpStartDate), policyTerm?.TpYear).subscribe((response: IDateDto) => {
        this.policyForm.patchValue({
          tpExpiryDate: new Date(`${response.Year}-${response.Month}-${response.Day}`)
        });
      });
      this._insuranceCompanies = this._insuranceCompanies.filter(f => f.Value != this._policyData?.TpPolicy.InsuranceCompany);

    }
    else {
      this._insuranceCompanies = this._savedinsuranceCompanies;
    }
  }

  setDataForOtherCompanyRetentionPolicyTypeOd() {
    if (this.policyTermForm.value.policyType === PolicyType.OtherCompanyRetention && this.policyTermForm.value.packageType == PackageType.OD_ONLY) {

      let policyTerm: IPolicyTermDto = this.policyTermForm.value.policyTerm as IPolicyTermDto;

      if (policyTerm === undefined || policyTerm == null) return;

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
      this.policyForm.get("odInsuranceCompany")?.enable();

      let startDate: Date = this.commonService.getDateFromIDateDto(this._policyData?.OdPolicy.ExpiryDateDto as IDateDto) as Date;
      try {
        startDate = new Date(startDate.setDate(startDate.getDate() + 1));
      } catch (error) {
        startDate = new Date();
      }

      this.policyForm.patchValue({
        odStartDate: moment(startDate)
      });

      this.commonService.getDate(this.commonService.getDateInString(this.policyForm.getRawValue().odStartDate), policyTerm.OdYear).subscribe((response: IDateDto) => {
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

  async setDataForOtherCompanyRetentionPolicyTypeComprehensiveOrUsageBased() {
  
    if (this.policyTermForm.value.policyType == PolicyType.OtherCompanyRetention && (this.policyTermForm.value.packageType == PackageType.COMPREHENSIVE || this.policyTermForm.value.packageType === PackageType.USAGE_BASE)) {
      let startDate: Date = this.commonService.getDateFromIDateDto(this._policyData?.TpPolicy.ExpiryDateDto as IDateDto) as Date;
      this.policyForm.get("tpInsuranceCompany")?.enable();
      this.policyForm.get("policyNumber")?.enable();

      this._isTpPremiumDetailsDisabled = false
      try {
        startDate = new Date(startDate.setDate(startDate.getDate() + 1));
      } catch (error) {
        startDate = new Date();
      }

      let policyTerm: IPolicyTermDto = this.policyTermForm.value.policyTerm as IPolicyTermDto;

      if (policyTerm === undefined || policyTerm == null) return;

      await this.policyForm.patchValue({
        tpStartDate: moment(startDate),
        insuranceBranch: this._policyData?.InsuranceBranch,
        odStartDate: moment(startDate)
      });
      this._insuranceCompanies = this._insuranceCompanies.filter(f => f.Value != this._policyData?.TpPolicy.InsuranceCompany);
      await this.commonService.getDate(this.commonService.getDateInString(this.policyForm.getRawValue().tpStartDate), policyTerm?.TpYear).subscribe((response: IDateDto) => {
        this.policyForm.patchValue({
          tpExpiryDate: new Date(`${response.Year}-${response.Month}-${response.Day}`)
        });
      });

      this.commonService.getDate(this.commonService.getDateInString(this.policyForm.getRawValue().odStartDate), policyTerm.OdYear).subscribe((response: IDateDto) => {
        this.policyForm.patchValue({
          odExpiryDate: new Date(`${response.Year}-${response.Month}-${response.Day}`)
        });
      });
    }
    else {
      this.policyForm.get("tpInsuranceCompany")?.enable();
      this.policyForm.get("odInsuranceCompany")?.enable();

    }
  }


  isDateValid(date1: Moment, date2: Moment): boolean {
    let diffInDays = Math.abs(date1.diff(date2, 'days'));
    return diffInDays <= 93;
  }

  async setOdPolicyDetail() {

    if (this.policyTermForm.value.packageType == PackageType.COMPREHENSIVE || this.policyTermForm.value.packageType == PackageType.USAGE_BASE) {
      await this.policyForm.patchValue({
        odInsuranceCompany: this.policyForm.value.tpInsuranceCompany,
        odPolicyNumber: this.policyForm.value.policyNumber,
        odStartDate: this.policyForm.value.tpStartDate,
       // odNumberOfYear: this.policyForm.value.tpNumberOfYear,
      });
      let odYear = this._numberOfYears.filter(f => f.Value == this.policyForm.getRawValue().odNumberOfYear)[0];
      if (odYear?.Year) {
        this.commonService.getDate(this.commonService.getDateInString(this.policyForm.getRawValue().odStartDate), odYear?.Year).subscribe((response: IDateDto) => {
          this.policyForm.patchValue({
            odExpiryDate: moment(new Date(`${response.Year}-${response.Month}-${response.Day}`))
          });
        });
      }
    }
  }

  getCheckboxValue(index: number, IsPlanAvailable: boolean, AddOnPlanOptionName: string, event: MatCheckboxChange) {
    if (IsPlanAvailable) {
      this._addOnRiderArray.push(AddOnPlanOptionName);
    }
    else if (!IsPlanAvailable) {
      // this._addOnRiderArray.splice(index, 1);
      this._addOnPlanOptions[index].IsDisabled = false
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

    let sum = Math.round(parseFloat(od == "" ? 0 : od) + parseFloat(addOnRiderOd == "" ? 0 : addOnRiderOd)
      + parseFloat(tp == "" ? 0 : tp) + parseFloat(passengerCover == "" ? 0 : passengerCover));

    this.premiumForm.patchValue({ commissionablePremium: sum });
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
    if (this.policyForm.value.isBlockAgent || this.policyForm.value.isChangeAgent) {
      this._lastInsuranceCompanies = this._savedinsuranceCompanies; return
    }
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
      this._dataSourceUploadDocuments._updateChangeSubscription(); // <-- Refresh the datasource
      this.addDocumentMotor()
    });
  }

  addDocumentMotor() {
    this._policyDocuments.forEach(x => {
      let document: IDocumentModel = {
        DocumentId: x.Id,
        UniqueId: x.UniqueId,
        DocumentTypeId: x.DocumentTypeId,
        DocumentTypeName: x.DocumentTypeName,
        FileName: x.FileName,
        Remarks: x.Remarks,
        DocumentBase64 :x.DocumentBase64
      };
      this._uploadDocuments.push(document)
    })
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
    let sm = Math.round(this.premiumForm.controls.nonCommissionComponentPremium.value || 0) + Math.round(this.premiumForm.controls.totalTp.value || 0) + Math.round(this.premiumForm.controls.totalOd.value || 0);
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
        let addOnValue = response?.AddOnRider?.AddOnValue[addonPlanOptionIdIndex]?.toString();
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
    this.customerService.getCustomerDataByClusterId(clusterId).subscribe((response: any) => {
      this._dataSourceCustomerCluster = new MatTableDataSource<ICustomerShortDetailDto>(response?.Data);
      this._dataSourceCustomerCluster._updateChangeSubscription(); // <-- Refresh the datasource
    });
  }


  setPolicyDetails(): void {
    let model = this.getPolicyFormData();
    this._isTpPremiumDetailsDisabled = false
    if (model.PackageTypeId === PackageType.COMPREHENSIVE || model.PackageTypeId === PackageType.USAGE_BASE) {
      this._isDisableOdPolicyDetails = true;
      this._isOdPolicyEnable = true;
      this._isAddOnRiderEnable = true;
    }
    else if (model.PackageTypeId === PackageType.TP_ONLY) {
      this._isDisableOdPolicyDetails = false;
      this._isOdPolicyEnable = false;
      this._isAddOnRiderEnable = false;
      this._isTpPremiumDetailsDisabled = true
      this.genericClearValidator(["odPolicyNumber"], this.policyForm)
    } else if (model.PackageTypeId === PackageType.OD_ONLY) {
      this._isDisableOdPolicyDetails = false;
      this._isOdPolicyEnable = true;
      this._isAddOnRiderEnable = true;
      this.genericSetValidator(["odPolicyNumber"], this.policyForm)

    }

    if (model.PackageTypeId === PackageType.USAGE_BASE) {
      this.policyForm.get("numberOfKiloMeterCovered")?.enable();
      this.policyForm.get("extendedKiloMeterCovered")?.enable();
    }
    else {
      this.policyForm.get("numberOfKiloMeterCovered")?.disable();
      this.policyForm.get("extendedKiloMeterCovered")?.disable();
    }
    if (this._policyType == SearchPolicyType.Motor_Renew && this._policyType != SearchPolicyType.Motor_Modify) {
      //adding finance after resetting
      debugger
      
      this.setPolicySourceRenewal()
      this.setOdPolicyDetail()
      this.removePrevTpOdInsurance()
      this.setPreviousInsuranceCompany()
    }
  }

  setCompanyInsuranceBranch(response: any) {
    let insuranceCompanyId: number = 0
    if (response.PolicyTerm.PackageTypeId == PackageType.TP_ONLY) {
      insuranceCompanyId = response.TpPolicy.InsuranceCompany
    } else {
      insuranceCompanyId = response.OdPolicy.InsuranceCompany
    }
    this.commonService.getInsuranceCompanyBranches(Vertical.Motor, insuranceCompanyId, this._branchId).subscribe((data: IDropDownDto<number>[]) => {
      this._insuranceCompanyBranches = data;
      this.policyForm.patchValue({
        insuranceBranch: response.InsuranceBranch,
      });

    });
  }

  removePrevTpOdInsurance() {
    if (this.policyTermForm.value.policyType === PolicyType.OtherCompanyRetention && (this.policyTermForm.value.packageType === 3 || this.policyTermForm.value.packageType === 4)) {
      this._insuranceCompanies = this._insuranceCompanies.filter(f => f.Value != this._policyData?.TpPolicy.InsuranceCompany);
    } else if (this.policyTermForm.value.policyType === PolicyType.OtherCompanyRetention && this.policyTermForm.value.packageType === 1) {
      this._insuranceCompanies = this._insuranceCompanies.filter(f => f.Value != this._policyData?.TpPolicy.InsuranceCompany);
    }
  }

  genericClearValidator = (args: string[], form: FormGroup) => {
    args.forEach(element => {
      form.controls[element].clearValidators();
      form.patchValue({ [element]: "" });
    });
    form.updateValueAndValidity();
  }

  genericSetValidator = (args: string[], form: FormGroup) => {
    args.forEach(element => {
      form.controls[element].setValidators([Validators.required]);
    });
    form.updateValueAndValidity();

  }

  deletefiles(index: any) {
    this._dataSourceUploadDocuments.data.splice(index, 1);
    this._dataSourceUploadDocuments._updateChangeSubscription(); // <-- Refresh the datasource
    this._uploadDocuments.splice(index, 1)

  }

  downloadFile(element: any) {
    var blob = new Blob(element.FileData, { type: element.FileData[0].type });
    saveAs(blob, element.FileName);
  }

  getFormValidationErrors() {
    //Policy Form
    Object.keys(this.policyForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.policyForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });

    Object.keys(this.customerForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.customerForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
    Object.keys(this.premiumForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.premiumForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });

    Object.keys(this.policyTermForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.policyTermForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
    Object.keys(this.vehicleForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.vehicleForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
    Object.keys(this.addOnRiderForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.addOnRiderForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
    Object.keys(this.paymentForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.paymentForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

  validationPolicyData(response: IMotorPolicyFormDataModel) {
    this.validatePolicyTerm(response)
    this.validatePolicyDetail(response)
    this.validatePolicyType(response)
    this.validatePremiumDetail(response)
    this.validatePolicySourceDetail(response)
    this.validatePaymentData(response)
    this.validateVehicleDetail(response)
  };
  erorr: string = "This Field is Required";
  errorList: any = [];
  validatePolicyTerm(response: IMotorPolicyFormDataModel) {

    if (!response.PolicyTerm.VehicleClass) {
      this.errorList.push("Vehicle Class" + this.erorr)
    }

    if (!response.PolicyTerm.PackageTypeId) {
      this.errorList.push("Package Type " + this.erorr)
    }
    if (!response.PolicyTerm.PolicyTerm) {
      this.errorList.push("Policy Term" + this.erorr)
    }
    if (!response.PolicyTerm.PolicyType) {
      this.errorList.push("Policy Type" + this.erorr)
    }
  }

  validatePolicyDetail(response: IMotorPolicyFormDataModel) {
    if (!response.FinanceBy || response.FinanceBy == 0) {
      this.errorList.push("Finance By " + this.erorr)
    }
    if (response.PolicyTerm.PackageTypeId === PackageType.TP_ONLY) {
      if (!response.TpPolicy.PolicyNumber) {
        this.errorList.push("TP Policy Number" + this.erorr)
      }
      if (!response.TpPolicy.ExpiryDateDto && response.TpPolicy.NumberOfYear !== Common.ZERO) {
        this.errorList.push("TP Expiry Date " + this.erorr)
      }
      if (!response.TpPolicy.NumberOfYear && response.TpPolicy.NumberOfYear !== Common.ZERO) {
        this.errorList.push("TP Number of Year " + this.erorr)
      }
      if (!response.TpPolicy.StartDateDto) {
        this.errorList.push("TP Policy start date" + this.erorr)
      }
    } else {

      if (!response.TpPolicy.PolicyNumber) {
        this.errorList.push(" TP Policy Number" + this.erorr)
      }
      if (!response.TpPolicy.ExpiryDateDto && response.TpPolicy.NumberOfYear !== Common.ZERO) {
        this.errorList.push(" TP Expiry date " + this.erorr)
      }
      if (!response.TpPolicy.NumberOfYear && response.TpPolicy.NumberOfYear !== Common.ZERO) {
        this.errorList.push("TP Number of Year" + this.erorr)
      }
      if (!response.TpPolicy.StartDateDto) {
        this.errorList.push("TP Policy start date" + this.erorr)
      }

      if (!response.OdPolicy.PolicyNumber) {
        this.errorList.push("OD Policy Number" + this.erorr)
      }
      if (!response.OdPolicy.ExpiryDateDto && response.OdPolicy.NumberOfYear !== Common.ZERO) {
        this.errorList.push("OD Expiry date " + this.erorr)
      }
      if (!response.OdPolicy.NumberOfYear && response.OdPolicy.NumberOfYear !== Common.ZERO) {
        this.errorList.push(" OD Number of year" + this.erorr)
      }
      if (!response.OdPolicy.StartDateDto) {
        this.errorList.push("OD Policy Start date" + this.erorr)
      }
    }
  }

  validatePolicyType(response: IMotorPolicyFormDataModel) {
    if (this._type !== SearchPolicyType.Motor_New && !response.IsPreviousPolicyApplicable && this._type !== SearchPolicyType.Motor_Renew) {
      if (!response.PreviousPolicy.LastPolicyExpiryDateDto) {
        this.errorList.push("Previous Policy Expiry Date" + this.erorr)

      }
      if (!response.PreviousPolicy.LastYearInsuranceCompany) {
        this.errorList.push("Previous Policy Insurance Company" + this.erorr)

      }
      if (!response.PreviousPolicy.PreviousPolicyNumber) {
        this.errorList.push("Previous Policy Number" + this.erorr)

      }
    }
  }

  validatePremiumDetail(response: IMotorPolicyFormDataModel) {
    if (!response.Premium.CommissionPaidOn) {
      this.errorList.push("Commision Paid on  % " + this.erorr)
    }
    if (response.PolicyTerm.PackageTypeId === PackageType.TP_ONLY && !this._isTpPremiumDetailsDisabled) {
      if (!response.Premium.BasicTpGstPercentage || response.Premium.BasicTpGstPercentage == 0) {
        this.errorList.push("Basic Tp Gst % " + this.erorr)
      }

      if (!response.Premium.Tp || response.Premium.Tp == 0) {
        this.errorList.push("Basic Tp " + this.erorr)
      }
    } else if (response.PolicyTerm.PackageTypeId === PackageType.OD_ONLY && !this._isOdPremiumDetailsDisabled) {
      if ((!response.Premium.VehicleIdv || response.Premium.VehicleIdv == 0) && !this._isOdPremiumDetailsDisabled) {
        this.errorList.push("Vehicle IDV Amount" + this.erorr)
      }
      if ((!response.Premium.Od || response.Premium.Od == 0) && !this._isOdPremiumDetailsDisabled) {
        this.errorList.push("OD Amount" + this.erorr)
      }
      if ((!response.Premium.GstPercentage || response.Premium.GstPercentage == 0) && !this._isOdPremiumDetailsDisabled) {
        this.errorList.push("GST % " + this.erorr)
      }
      if ((!response.Premium.SpecialDiscount || response.Premium.SpecialDiscount == 0)) {
        this.errorList.push("Special Discount " + this.erorr)
      }
      if (!response.Premium.Ncb || response.Premium.Ncb == 0) {
        this.errorList.push("NCB %" + this.erorr)
      }
    } else {
      if ((!response.Premium.BasicTpGstPercentage || response.Premium.BasicTpGstPercentage == 0) && !this._isTpPremiumDetailsDisabled) {
        this.errorList.push("Basic Tp Gst % " + this.erorr)
      }

      if ((!response.Premium.Tp || response.Premium.Tp == 0) && !this._isTpPremiumDetailsDisabled) {
        this.errorList.push("Basic Tp " + this.erorr)
      }
      if ((!response.Premium.VehicleIdv || response.Premium.VehicleIdv == 0) && !this._isTpPremiumDetailsDisabled) {
        this.errorList.push("Vehicle IDV " + this.erorr)
      }
      if ((!response.Premium.Od || response.Premium.Od == 0) && !this._isOdPremiumDetailsDisabled) {
        this.errorList.push("OD Amount" + this.erorr)
      }
      if ((!response.Premium.GstPercentage || response.Premium.GstPercentage == 0) && !this._isOdPremiumDetailsDisabled) {
        this.errorList.push("GST % " + this.erorr)
      }
      if ((!response.Premium.SpecialDiscount || response.Premium.SpecialDiscount == 0)) {
        this.errorList.push("Special Discount " + this.erorr)
      }
      if (!response.Premium.Ncb || response.Premium.Ncb == 0) {
        this.errorList.push("NCB %" + this.erorr)
      }
    }
  }

  validatePolicySourceDetail(response: IMotorPolicyFormDataModel) {
    if (response.PolicySource.TeleCaller == 0 && response.PolicySource.Fos == 0 && response.PolicySource.Pos == 0 && response.PolicySource.Reference == 0) {
      this.errorList.push("Atleast one policy source should selected ")
    }

  }

  validatePaymentData(response: IMotorPolicyFormDataModel) {

    if (!response.PaymentData || response.PaymentData.length == 0) {
      this.errorList.push("Atleast one Payment mode should be selected")

    }
  }

  validateVehicleDetail(response: IMotorPolicyFormDataModel) {
    if (!response.Vehicle.Manufacturer || response.Vehicle.Manufacturer == 0) {
      this.errorList.push("Vehicle Manufacturer " + this.erorr)
    }
    if (!response.Vehicle.Model || response.Vehicle.Model == 0) {
      this.errorList.push("Vehicle Model " + this.erorr)
    }
    if (!response.Vehicle.Varient || response.Vehicle.Varient == 0) {
      this.errorList.push("Vehicle Varient " + this.erorr)
    }
    if (!response.Vehicle.RegistrationNumber && !response.Vehicle.IsSpecialRegistrationNumber) {
      this.errorList.push("Vehicle Registration Number " + this.erorr)
    }
    if (!response.Vehicle.EngineNumber) {
      this.errorList.push("Vehicle Engine Number" + this.erorr)
    }

    if (response.Vehicle.EngineNumber && response.Vehicle.EngineNumber?.length < 6) {
      this.errorList.push("Vehicle Engine Number" + "Minimum six word required")
    }
    if (!response.Vehicle.ChassisNumber) {
      this.errorList.push("Chassis Number " + this.erorr)
    }

    if (response.Vehicle.ChassisNumber && response.Vehicle.ChassisNumber?.length < 6) {
      this.errorList.push("Chassis Number " + "Minimum six word required")
    }
    if (!response.Vehicle.MakeYear) {
      this.errorList.push("Make Year " + this.erorr)
    }

    if (response.Vehicle.RtoZone == this.rtoNotAvailable) {
      this.errorList.push("RTO Zone " + this.erorr)
    }

  }

  previousPolicyChecked(isPreviousPolicyChecked: boolean) {
    if (isPreviousPolicyChecked) {
      this._disableFields = true;
      this.genericClearValidator(["lastYearInsuranceCompany", "previousCnPolicyNumber", "lastPolicyExpiryDate"], this.policyForm)
    }
    else {
      this._disableFields = false;
      this.genericSetValidator(["lastYearInsuranceCompany", "previousCnPolicyNumber", "lastPolicyExpiryDate"], this.policyForm)
    }
  }

  openPreviewDialog() {
    var blob = new Blob(this.uploadDocumentForm.value.browse._files, { type: this.uploadDocumentForm.value.browse._files[0].type });
    this.base64Output = window.URL.createObjectURL(blob);
    const dialogRef = this.dialog.open(PreviewDialogComponent, {
      data: {
        url: this.base64Output,
        type: this.uploadDocumentForm.value.browse._files[0].type
      },
      height: '600px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); // Pizza!
    });
  }


  public keyUpMaxValue(event: any, maxValue: number) {
    let number = Number(event.target.value).toFixed(2);
    if (Number(number) > maxValue) {
      event.target.value = maxValue
    }
  }


  addCustomerClusterData(data: any) {

  }

}

