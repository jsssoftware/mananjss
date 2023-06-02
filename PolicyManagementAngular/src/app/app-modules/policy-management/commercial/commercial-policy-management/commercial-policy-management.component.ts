import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { ICommonDto } from 'src/app/app-entites/dtos/common/common-dto';
import { IDateDto } from 'src/app/app-entites/dtos/common/date-dto';
import { IDropDownDto } from 'src/app/app-entites/dtos/common/drop-down-dto';
import { IAddOnPlanOptionDto } from 'src/app/app-entites/dtos/motor/add-on-plan-option-dto';
import { IRtoZoneDto } from 'src/app/app-entites/dtos/motor/rto-zone-dto';
import { IVarientDto } from 'src/app/app-entites/dtos/motor/varient-dto';
import { IYearDto } from 'src/app/app-entites/dtos/motor/year-dto';
import { IDocumentModel } from 'src/app/app-entites/models/common/document-model';
import { ICustomerService } from 'src/app/app-services/customer-service/abstracts/customer.iservice';
import { IPaymentFormDataModel } from 'src/app/app-entites/models/motor/payment-form-data-model';
import { PolicyType, SearchPolicyType, Vertical, PackageType, Common, ProductPlanType, Portabality } from 'src/app/shared/utilities/enums/enum';
import { IPolicyTermDto } from '../../../../app-entites/dtos/motor/policy-term-dto';
import { ICommonService } from '../../../../app-services/common-service/abstracts/common.iservice';
import { IRetailService } from '../../../../app-services/health-service/abstracts/retail.iservice';
import { ICustomerInsuranceDetail, ICustomerShortDetailDto } from 'src/app/app-entites/dtos/customer/customer-short-detail-dto';
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
import { ViewClaimsComponent } from 'src/app/app-modules/sub-system/claims/view-claims/view-claims.component';

import { saveAs } from 'file-saver';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { MatDialogRef } from '@angular/material/dialog';
import { PreviewDialogComponent } from 'src/app/shared/utilities/dialog/preview-dialog/preview-dialog.component';
import { CommonFunction } from 'src/app/shared/utilities/helpers/common-function';
import { DialogBoxComponent } from 'src/app/shared/common-component/Policy/dialog-box/dialog-box.component';
import { InspectionDetailComponent } from 'src/app/shared/common-component/Policy/detail/inspection-detail/inspection-detail.component';
import { VoucherDetailComponent } from 'src/app/shared/common-component/Policy/detail/voucher-detail/voucher-detail.component';
import { ICommercialPolicyFormDataModel } from 'src/app/app-entites/models/motor/commercial-policy-form-data-model';
import { IVehicleFormDataModel } from 'src/app/app-entites/models/motor/vehicle-form-data-model';
import { INominationFormDataModel } from 'src/app/app-entites/models/motor/nomination-form-data-model';
import { CommercialService } from 'src/app/app-services/commercial-service/commercial.service';
import { ICommercialService } from 'src/app/app-services/commercial-service/abstracts/commercial.iservice';


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
  selector: 'app-commercial-policy-management',
  templateUrl: './commercial-policy-management.component.html',
  styleUrls: ['./commercial-policy-management.component.css']
})
export class CommercialPolicyManagementComponent implements OnInit,AfterViewInit {
  public VerticalData = 'Commercial'
  @Input('MenuVertical') public MenuVertical: string = '';
  @Output() tableNameToDialogBox = new EventEmitter<string>();
  displayedColumnsDocumentTable: string[] = ["Sno", "DocumentTypeName", "FileName", "Remarks", "DocumentTypeId"];
  displayedColumnsCustomerCluster: string[] = ["Sno", "NameInPolicy", "DateOfBirth", "Gender", "Mobile", "Code", "Action"];
  displayedColumnsInsuranceCluster: string[] = ["Action", "Sno", "NameInPolicy", "DateOfBirth", "Gender", "Mobile", "Code", "RelationProposer"
    , "SumInsuredIndividual", "SumInsuredFloater", "CumulativeBonus", "Deductable", "Loading", "LoadingReason", "Ped", "PedExclusion"
    , "AnualIncome", "NomineeName", "NomineeRelationship"];
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
  fireTermForm = new FormGroup({
    sumInsured: new FormControl(''),
    fireCoverageId: new FormControl(''),
    fireSA: new FormControl(''),
    fireRate: new FormControl(''),
    earthQuakeSA: new FormControl(''),
    earthQuakeRate: new FormControl(''),
    sTFISA: new FormControl(''),
    sTFIRate: new FormControl(''),
    terrorismSA: new FormControl(''),
    terrorismRate: new FormControl(''),
    burglarySA: new FormControl(''),
    burglaryRate: new FormControl(''),
    moneySA: new FormControl(''),
    moneyRate: new FormControl(''),
    breakDownSA: new FormControl(''),
    breakDownRate: new FormControl(''),
    plateGlassSA: new FormControl(''),
    plateGlassRate: new FormControl(''),
    branchId: new FormControl('')
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
    coverage: new FormControl(''),
    continutyStartDate: new FormControl(''),
    previousPolicyPlan: new FormControl(''),
    previousPolicySumInsured: new FormControl('', [Validators.pattern('^[0-9]+$')]),
    numberOfDays: new FormControl('', [Validators.required]),
    riskLocation: new FormControl(''),
    locationTypeSingle: new FormControl(''),
    locationTypeMultiple: new FormControl(''),
    numberofLocation: new FormControl(''),
    occupancy: new FormControl(''),
    lineofBusiness: new FormControl(''),
    basementExposure: new FormControl(''),
  });
  //#endregion



  //#region Premium Form
  premiumForm = new FormGroup({
    familyDiscount: new FormControl(''),
    longtermDiscount: new FormControl(''),
    sectionDiscount: new FormControl(''),
    additionalDiscount: new FormControl(''),
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
    maxTripDays: new FormControl(''),
    terrorimsPremium: new FormControl(''),
  });
  //#endregion

  //#region Add-On Rider Form
  addOnRiderForm = new FormGroup({
    addOnPlan: new FormControl(''),
    addOnPlanOption: new FormArray([])
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
    cnameInsuredPerson: new FormControl('',[Validators.required]),
    cdob: new FormControl('',[Validators.required]),
    cgender: new FormControl('',[Validators.required]),
    cmobile: new FormControl('',[Validators.required]),
    cemail: new FormControl(''),
    cpassport: new FormControl(''),
    cpan: new FormControl(''),
    caadhar: new FormControl(''),
    cprofession: new FormControl(''),
    crelprposer: new FormControl(''),
    csuminsuredindividual: new FormControl(''),
    csuminsuredfloater: new FormControl(''),
    ccummbonus: new FormControl(''),
    cdeductable: new FormControl(''),
    cloading: new FormControl(''),
    cloadingreason: new FormControl(''),
    cped: new FormControl(''),
    cpedexclusion: new FormControl(''),
    cppc: new FormControl(''),
    canualincome: new FormControl(''),
    criskclass: new FormControl(''),
    cnomineename: new FormControl(''),
    cnomineerelation: new FormControl(''),
    ccustomerId: new FormControl(0),
    ccustomerUid: new FormControl(0)
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
  public _genders: IDropDownDto<number>[] = [];
  public _riskClass: IDropDownDto<number>[] = [];
  public _ped: IDropDownDto<number>[] = [];
  public _ppc: IDropDownDto<number>[] = [];

  public _customerId: any;
  public _customerCityId: any;
  public _referById: any;
  public _customerClusterId: any;

  public _policyTypeId: any;
  public _policyType: any;
  public _policyId: any;
  public _uploadDocuments: IDocumentModel[] = [];
  public _filteredOptions: IDropDownDto<number>[] = [];
  public _tableName: string = "";
  public _dataSourceUploadDocuments: MatTableDataSource<IPolicyDocumentDto> = new MatTableDataSource<IPolicyDocumentDto>();
  public _dataSourceCustomerCluster: MatTableDataSource<ICustomerInsuranceDetail> = new MatTableDataSource<ICustomerInsuranceDetail>();
  public _dataInsuranceCustomerCluster: MatTableDataSource<ICustomerInsuranceDetail> = new MatTableDataSource<ICustomerInsuranceDetail>();

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
  public _policyData?: ICommercialPolicyFormDataModel;
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
  public _coverage: IDropDownDto<number>[] = [];
  public _baseExposure: IDropDownDto<number>[] = [];
  public _occupancy: IDropDownDto<number>[] = [];
  public _profession: IDropDownDto<number>[] = [];
  public maxValueAllowedNumber: number = 99999999.99
  public maxValueAllowedPercentage: number = 999.99;
  public listAccepts: string =
    ".png,.jpg,.jpeg,.pdf";

  public rtoNotAvailable: number = 1;
  public _verticalId: number;
  public isPA: boolean = false;
  public isHeath: boolean = false;
  public isTravel: boolean = false;
  public totalFireSumInsured : number = 0;
  public get SearchPolicyType(): typeof SearchPolicyType {
    return SearchPolicyType;
  }
  public get PackageType(): typeof PackageType {
    return PackageType;
  }

  public get Vertical(): typeof Vertical {
    return Vertical;
  }
  constructor(
    private commonService: ICommonService,
    private commercialService: ICommercialService,
    private customerService: ICustomerService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    public mainCommercialService: CommercialService,
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
    this.setVertical();
    this._verticalName = this.mainCommercialService.vertical$.getValue();
    this._headerTitle = this.mainCommercialService._headerTitle$.getValue();
    this._customerId = this.route.snapshot.paramMap.get('customerId');
    this._policyTypeId = Number(this.route.snapshot.paramMap.get('policyTypeId'));//is the id when customer saved
    this._policyId = Number(this.route?.snapshot?.paramMap.get('policyId') || 0);
    this._policyType = Number(this.route?.snapshot?.paramMap.get('policyType') || 0);
    this._verticalId = Number(this.route?.snapshot?.paramMap.get('verticalId') || 0);
    this.setActivateVertical(this._verticalId);
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
    await this.getGenders();
    await this.getRisksClass();
    await this.getPed();
    await this.getPpc();
    await this.getCoverage();
    await this.getOccupancy();
    await this.getBasementExposure();
    this.setValidatoronVertical()

    //Not calling on edit
    if (this._policyId == 0 || this._policyType == SearchPolicyType.Motor_Renew) {
      //      await this.getAddOnRiders();
      await this.getAddOnPlanOptions(-1);
    }
    if (this._policyId != 0) {
      await this.getHealthPolicyById(this._policyId);
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

    this.policySourceForm.get("posName")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterPosdData(input);
      else
        this.filterPosdData(input.Name);
    });

    this.paymentUpdateValue();

  }

  paymentUpdateValue(){

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

  getGenders(): any {
    this.commonService.getAllGenders().subscribe((response: IDropDownDto<number>[]) => {
      this._genders = response;
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
    this.commonService.getVerticalById(this._verticalId).subscribe((response: any) => {
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
    });
  }


  setPortablity() {
    this.policyForm.get("portability")?.enable();
    if (this._policyTypeId == SearchPolicyType.Motor_rollover) {
      this.policyForm.patchValue({ portability: 2 }); // no
    }
    if (this.policyTermForm.value.policyType == PolicyType.OtherCompanyRetention) {
        this.policyForm.patchValue({ portability: Portabality.Yes });// Yes
        this.policyForm.get("portability")?.disable();
      }
    if (this.policyTermForm.value.policyType == PolicyType.SameCompanyRetention) {
        this.policyForm.patchValue({ portability: Portabality.No });// Yes
        this.policyForm.get("portability")?.disable();
      }
    if (this._policyTypeId == SearchPolicyType.Motor_New) {
      this.policyForm.patchValue({ portability: Portabality.NotApplicable });// Yes
      this.policyForm.get("portability")?.disable();
    }

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
    let model = this.getPolicyFormData();

    if (model.PackageTypeId === PackageType.TP_ONLY) {
      this._isDisableOdPolicyDetails = false;
      this._isOdPolicyEnable = false;
      this._isAddOnRiderEnable = false;
      this._isTpPremiumDetailsDisabled = true
    }

    if (this.policyTermForm.value.policyType == PolicyType.OtherCompanyRetention || this.policyTermForm.value.policyType == PolicyType.SameCompanyRetention) {
      await this.setPolicySourceRenewal()
      await this.setPreviousInsuranceCompany()
      await this.setPortablity()
    }
  }

 
  async setPolicySourceRenewal() {
    this.policyTermForm.value.packageType = PackageType.TP_ONLY;
    this._insuranceCompanies = this._savedinsuranceCompanies
    if (this.policyTermForm.value.policyType == PolicyType.SameCompanyRetention) {

      this.setDataForSameCompanyRetentionPolicyTypeTp();


    }
    if (this.policyTermForm.value.policyType == PolicyType.OtherCompanyRetention) {
      await this.setDataForOtherCompanyRetentionPolicyTypeTp();
    }
    this.getAddOnRiders();
  }

  getInsuranceCompanies(): any {
    this.commonService.getInsuranceCompanies(this._verticalId).subscribe((response: IDropDownDto<number>[]) => {
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
    if (this._isOdPolicyEnable) {
      if (this.policyForm.value.odInsuranceCompany == undefined || this.policyForm.value.odInsuranceCompany == "") return;
      insuranceCompanyId = this.policyForm.controls['odInsuranceCompany'].value;
    }
    else
      insuranceCompanyId = this.policyForm.controls['tpInsuranceCompany'].value;

    let branchId: number = this.PolicyForm.isAll ? -1 : this._branchId;

    this.commonService.getInsuranceCompanyBranches(this._verticalId, insuranceCompanyId, branchId).subscribe((response: IDropDownDto<number>[]) => {
      this._insuranceCompanyBranches = response;
    }); 
    this.getAddOnRiders();
    this.setVerticalFunction();

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

  getProfession(): any {
    this.commonService.getProfession().subscribe((response: IDropDownDto<number>[]) => {
      this._profession = response;
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
    this.commonService.getCommissionPaidOn(this._verticalId).subscribe((response: any) => {
      this._commissionPaidOn = response;
    });
  }

  getAddOnRiders(): void {
    let insuranceCompanyId: number = 0

    insuranceCompanyId = this.policyForm.controls['tpInsuranceCompany'].value;

    if (insuranceCompanyId) {
      this.commonService.getAddOnRiders(insuranceCompanyId, this._verticalId).subscribe((response: IDropDownDto<number>[]) => {
        this._addOnRiders = response;
      });
    }
  }

  getAddOnPlanOptions(addOnRiderId: number): void {
    this.commonService.getAddOnPlanOptions(addOnRiderId, this._verticalId, 0).subscribe((response: IAddOnPlanOptionDto[]) => {
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
    this.commonService.getTeleCallers(this._verticalId, branchId).subscribe((response: any) => {
      this._teleCallers = response;
    });
  }

  getReferences(branchId: number): any {
    this.commonService.getReferences(branchId).subscribe((response: any) => {
      this._references = response;
    });
  }

  getFosNames(branchId: number): any {
    this.commonService.getFosNames(this._verticalId, branchId).subscribe((response: any) => {
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
    let model: ICommercialPolicyFormDataModel = {
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
        StartDateDto: null,
        NumberOfDays: this.PolicyForm.numberOfDays,
        Coverage: this.PolicyForm.coverage
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
      InsuredPersonData: this._selectedinsuranceCustomerPersonDetail,
      PreviousPolicy: {
        LastPolicyExpiryDateString: this.commonService.getDateInString(this.PolicyForm.lastPolicyExpiryDate),
        LastPolicyExpiryDateDto: null,
        LastYearInsuranceCompany: this.PolicyForm.lastYearInsuranceCompany,
        PreviousPolicyNumber: this.PolicyForm.previousCnPolicyNumber,
        PreviousPolicyPlan: this.PolicyForm.previousPolicyPlan,
        PreviousPolicySumInsured: this.PolicyForm.previousPolicySumInsured,
      },
      InspectionData: {
        InspectionCompany: this.PolicyForm.inspectionCompany,
        InspectionDateString: this.commonService.getDateInString(this.PolicyForm.inspectionDate),
        InspectionDateDto: null,
        InspectionNumber: this.PolicyForm.inspectionNumber,
        InspectionRemarks: this.PolicyForm.inspectionRemarks,
        InspectionTime: this.commonService.getDateInString(this.PolicyForm.inspectionTime)
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
        PackageTypeId: PackageType.TP_ONLY,
        PolicyTerm: (this.MenuVertical == 'Motor') ? this.PolicyTermForm.policyTerm?.Id : 0,
        PolicyType: this.PolicyTermForm.policyType,
        VehicleClass: 0,
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
        NetPremium: Number(this.PremiumForm.netpremium),
        FamilyDiscount: Number(this.PremiumForm.familyDiscount),
        LongtermDiscount: Number(this.PremiumForm.longtermDiscount),
        AdditionalDiscount: Number(this.PremiumForm.additionalDiscount),
        SectionDiscount: Number(this.PremiumForm.sectionDiscount),
        MaxDaysSingleTrip :  Number(this.PremiumForm.maxTripDays)
      },
      Vehicle: <IVehicleFormDataModel>{},
      Nomination: <INominationFormDataModel>{},
      ProductPlan: {
        ProductId: this.ProductPlanForm.product,
        Plan: this.ProductPlanForm.plan,
        PlanTypes: this.ProductPlanForm.planTypes
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
      PreviousPolicyId: this._type == SearchPolicyType.Motor_Renew ? this._policyId : "",
      Portabality: this.PolicyForm.portability,
      ContinueStartDate: this.PolicyForm.continutyStartDate,
      NumberOfChild: this.noofchild,
      NumberOfAdult : this.noofAdult,
      TotalSumInsured: this.totalSumInsuredInsurance,
      FireCoverage : this.fireTermForm.value
    }

    if (this._policyId == 0 || this._policyType == SearchPolicyType.Motor_Renew) {
      console.log(model, 'model')
      this.commercialService.createPolicy(model).subscribe((response: ICommonDto<any>) => {
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
      this.commercialService.updatePolicy(this._policyId, model).subscribe((response: ICommonDto<any>) => {

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



  setExpiryDate(policy: string) {
    let policyTerm: IPolicyTermDto = this.policyTermForm.value.policyTerm as IPolicyTermDto;
    const days = -1;
    if (this.policyForm.value.tpNumberOfYear == undefined
      || this.policyForm.value.tpNumberOfYear === "") return;
    let tpYear = this._numberOfYears.filter(f => f.Value == this.policyForm.getRawValue().tpNumberOfYear)[0];
    let odYear = this._numberOfYears.filter(f => f.Value == this.policyForm.getRawValue().odNumberOfYear)[0];
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

  setExpiryDateDays() {
    if (this.policyForm.value.numberOfDays == undefined
      || this.policyForm.value.numberOfDays === "") return;
    let numberofDays = this.policyForm.getRawValue().numberOfDays;
    this.commonService.getDateDays(this.commonService.getDateInString(this.policyForm.getRawValue().tpStartDate), 0 , numberofDays).subscribe((response: IDateDto) => {
      this.policyForm.patchValue({
        tpExpiryDate: moment(new Date(`${response.Year}-${response.Month}-${response.Day}`))
      });
    });
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


  getPos(branchId: number): void {
    this.commonService.getPos(this._verticalId, branchId).subscribe((response: IDropDownDto<number>[]) => {
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
  get ProductPlanForm() {
    return this.productPlanForm.getRawValue();
  }

  get PolicyTermForm() {
    return this.policyTermForm.value;
  }



  get PremiumForm() {
    return this.premiumForm.value;
  }

  get AddOnRiderForm() {
    return this.addOnRiderForm.value;
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

  get InsurancePersonForm() {
    return this.insuranceCustomerForm.getRawValue();
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
    let basictp: any = this.premiumForm.controls.tp.value;
    let passengerCover: any = this.premiumForm.controls.passengerCover.value;
    let nonCommissionComponentPremium: any = this.premiumForm.controls.nonCommissionComponentPremium.value;
    let gstValue: any = this.premiumForm.controls.gstValue.value;
    let gst: any = this.premiumForm.controls.gst.value;
    let endroseTp: any = this.premiumForm.controls.endorseTp.value;

    let sum =
      + parseInt(endroseTp == "" ? 0 : endroseTp) + parseInt(passengerCover == "" ? 0 : passengerCover)
      + parseInt(nonCommissionComponentPremium == "" ? 0 : nonCommissionComponentPremium) + parseInt(basictp == "" ? 0 : basictp);

    let sum2 = parseInt(basictp == "" ? 0 : basictp)
    gstValue = ((gst / 100) * sum);
    let gstFinalValue = Math.round(gstValue)
    this.premiumForm.patchValue({ gstValue: gstFinalValue });
    this.calculateNetPremium();
    // Calculating gross premium after updating net
    let netpremium: any = this.premiumForm.controls.netpremium.value || 0;
    let grossPremiumAmt = Math.round(gstFinalValue) + Math.round(netpremium);
    this.premiumForm.patchValue({ grossPremium: grossPremiumAmt });
    this.calculateTotalGrossPremium();

  }
  customerDetails: ICustomerShortDetailDto = <ICustomerShortDetailDto>{};
  getCustomerShortDetailById(customerId: number) {
    this.customerService.getCustomerShortDetailById(customerId).subscribe((response: ICustomerShortDetailDto) => {
      this.setCustomerDetail(response);
      this.customerDetails = JSON.parse(JSON.stringify(response))
      this._customerCityId = response.CityId;
      this._customerClusterId = response.ClusterId;
      this._referById = response.ReferById;
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

  getHealthPolicyById(policyId: number) {
    this.commercialService.getCommercialPolicyById(policyId).subscribe((response: ICommercialPolicyFormDataModel) => {
      this._policyData = response;
      this.setHealthPolicyData(response);
      this.getPolicyDocuments();

    });
  }


  async setHealthPolicyData(response: ICommercialPolicyFormDataModel): Promise<void> {
 
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
    
    await this.getCustomerDataByClusterIdUpdate(Number(response.Customer.ClusterId), response.InsuredPersonData)

    this.IsVerified = response.IsVerified;
    this._controlNumber = response.ControlNumber
    this.policyTermForm.patchValue({
      policyType: response.PolicyTerm.PolicyType,
      packageType: response.PolicyTerm.PackageTypeId,
      acknowledgementSlipNumber: response.PolicyTerm.AcknowledgementSlipNumber,
      acknowledgementSlipIssueDate: this.commonService.getDateFromIDateDto(response.PolicyTerm.AcknowledgementSlipIssueDateDto as IDateDto)
    });


    this.businessDoneBy();
    //Update insurance person



    this._selectedinsuranceCustomerPersonDetail = JSON.parse(JSON.stringify(response.InsuredPersonData));
    await this._selectedinsuranceCustomerPersonDetail.filter(y=>{
      y.NomineeRelationShipName  = this._relations.find((x: { Value: any; }) => x.Value == y.NomineeRelationship)?.Name
      y.RelationProposerName  = this._relations.find((x: { Value: any; }) => x.Value == y.NomineeRelationship)?.Name
      y.PedName = this._ped.find((x: { Value: any; }) => x.Value == this.InsurancePersonForm.cped)?.Name
    })
    this._dataInsuranceCustomerCluster = new MatTableDataSource<ICustomerInsuranceDetail>(this._selectedinsuranceCustomerPersonDetail);
    this._dataInsuranceCustomerCluster._updateChangeSubscription(); // <-- Refresh the datasource

    this._storeCustomerClusterDetail = this._storeCustomerClusterDetail.filter(x => !this._selectedinsuranceCustomerPersonDetail.filter(y => y.ClusterId === x.ClusterId));
    this._dataSourceCustomerCluster = new MatTableDataSource<ICustomerInsuranceDetail>(this._storeCustomerClusterDetail);
    this._dataSourceCustomerCluster._updateChangeSubscription(); // <-- Refresh the datasource

    this.calculatInsuredData();
    //For previous value

    this.policyForm.patchValue({
      lastYearInsuranceCompany: response.PreviousPolicy.LastYearInsuranceCompany,
      previousCnPolicyNumber: response.PreviousPolicy.PreviousPolicyNumber,
      lastPolicyExpiryDate: this.commonService.getDateFromIDateDto(response.PreviousPolicy?.LastPolicyExpiryDateDto as IDateDto),
      isBlockAgent: false,
      isChangeAgent: false,
      previousPolicyPlan: response.PreviousPolicy.PreviousPolicyPlan,
      previousPolicySumInsured: response.PreviousPolicy.PreviousPolicySumInsured
    });

    
    if (this._policyType !== SearchPolicyType.Motor_Renew) {

      this._renewalCounter = response.RenewalCounter;
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
          isPreviousPolicyApplicable: response.IsPreviousPolicyApplicable,
          continutyStartDate: this.commonService.getDateFromIDateDto(response.ContinueStartDateDTO as IDateDto),
          portability: response.Portabality,
          coverage : response.TpPolicy.Coverage,
          numberOfDays : response.TpPolicy.NumberOfDays
        });

        this.premiumForm.patchValue({

          tp: response.Premium.Tp,
          passengerCover: response.Premium.PassengerCover,
          endorseTp: response.Premium.EndorseTp,
          totalTp: response.Premium.TotalTp,
          gst: response.Premium.GstPercentage,
          gstValue: response.Premium.GstValue,
          grossPremium: response.Premium.GrossPremium,
          endorseGrossPremium: response.Premium.EndorseGrossPremium,
          loading: response.Premium.Loading,
          ncb: response.Premium.Ncb,
          commissionPaidOn: response.Premium.CommissionPaidOn,
          commissionablePremium: response.Premium.CommissionablePremium,
          basicTPgstPercent: response.Premium.BasicTpGstPercentage,
          netpremium: response.Premium.NetPremium,
          familyDiscount: response.Premium.FamilyDiscount,
          longtermDiscount: response.Premium.LongtermDiscount,
          sectionDiscount: response.Premium.SectionDiscount,
          additionalDiscount: response.Premium.AdditionalDiscount,
          totalGrossPremium: response.Premium.TotalGrossPremium,
          maxTripDays : response.Premium.MaxDaysSingleTrip
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

        await this.commonService.getProduct().subscribe((presponse: any) => {
          this._products = presponse;
          this._selectedProductId = response.ProductPlan.ProductId;
          this.commonService.getPlan(this._selectedProductId).subscribe((planresponse: any) => {
            this._plans = planresponse;
            this.productPlanForm.patchValue({
              product: this._selectedProductId,
              plan: response.ProductPlan.Plan,
              planTypes: response.ProductPlan.PlanTypes
            })
          });
        });


        //Updating add on rider value
        if (response?.AddOnRider?.AddOnRiderId) await this.getAddOnRiders()
        this._addOnRiderModel.AddOnRiderId = response?.AddOnRider?.AddOnRiderId;
        this.commonService.getAddOnPlanOptions(this._addOnRiderModel.AddOnRiderId, this._verticalId, 0).subscribe((addOnResponse: IAddOnPlanOptionDto[]) => {
          addOnResponse.forEach((value, index) => {
            value.IsDisabled = value.IsPlanAvailable;
          });
          this._addOnPlanOptions = addOnResponse;
          this.UpdateAddonPlanValue(response)
        });
      
    }



    if (this._policyType == SearchPolicyType.Motor_Renew) {
      this._previousControlNumber = response.ControlNumber;
      this._controlNumber = '';
      this._renewalCounter = response.RenewalCounter + 1;

      this.policyForm.get("lastYearInsuranceCompany")?.disable();
      this.policyForm.get("previousCnPolicyNumber")?.disable();
      this.policyForm.get("lastPolicyExpiryDate")?.disable();
      this.policyForm.get("previousPolicyPlan")?.disable();
      this.policyForm.get("previousPolicySumInsured")?.disable();

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
    setTimeout(() => {
      this.setPolicyDetails()
      this._showErrors = true;
      this.previousPolicyChecked(response.IsPreviousPolicyApplicable);
      this.getAddOnRiders();
      this.setPortablity();
      this.changePortabality();
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
    this.router.navigate(["/master/customer/" + SearchPolicyType.Motor_New + "/" + this._verticalId + ""]);
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

      this.genericClearValidator(["lastYearInsuranceCompany", "previousCnPolicyNumber", "lastPolicyExpiryDate", "previousPolicyPlan", "previousPolicySumInsured"], this.policyForm)
    }
    else {
      this._disableFields = false;
      this.genericSetValidator(["lastYearInsuranceCompany", "previousCnPolicyNumber", "lastPolicyExpiryDate", "previousPolicyPlan", "previousPolicySumInsured"], this.policyForm)

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
      data: { claimsId: data.ClaimId, verticalId: this._verticalId }
    });
  }

  openVoucherDialog(data: IPolicyVoucherDto): void {
    const dialogRef = this.dialog.open(VoucherDetailComponent, {
      width: '50%',
      data: { voucherId: data.VoucherId, verticalId: this._verticalId }
    });
  }

  openInspectionDialog(data: IPolicyInspectionDto): void {
    const dialogRef = this.dialog.open(InspectionDetailComponent, {
      width: '50%',
      data: { inspectionId: data.Id, verticalId: this._verticalId }
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
    this.setVerticalFunction();
  }

  setPreviousInsuranceCompany() {
    if (this.policyTermForm.value.policyType == PolicyType.OtherCompanyRetention || this.policyTermForm.value.policyType == PolicyType.SameCompanyRetention) {
      let insuranceCompany = this._policyData?.TpPolicy.InsuranceCompany;
      let policyNumber = this._policyData?.TpPolicy.PolicyNumber;
      let policyExpiryDate = this.commonService.getDateFromIDateDto(this._policyData?.TpPolicy.ExpiryDateDto as IDateDto);
      let previousPolicyPlan = this._policyData.PreviousPolicy.PreviousPolicyPlan;
      let previousPolicySumInsured = this._policyData.PreviousPolicy.PreviousPolicySumInsured;
      this.policyForm.patchValue({
        lastYearInsuranceCompany: insuranceCompany,
        previousCnPolicyNumber: policyNumber,
        lastPolicyExpiryDate: policyExpiryDate,
        previousPolicyPlan: previousPolicyPlan,
        previousPolicySumInsured: previousPolicySumInsured
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

    let startDate: Date = this.commonService.getDateFromIDateDto(this._policyData?.TpPolicy.ExpiryDateDto as IDateDto) as Date;
    let continueStartDate: Date = this.commonService.getDateFromIDateDto(this._policyData?.ContinueStartDateDTO as IDateDto) as Date;

    try {
      startDate = new Date(startDate.setDate(startDate.getDate() + 1));
    } catch (error) {
      startDate = new Date();
    }


    await this.policyForm.patchValue({
      tpInsuranceCompany: this._policyData?.TpPolicy.InsuranceCompany,
      tpStartDate: moment(startDate),
      insuranceCompanyBranches: this._policyData?.TpPolicy,
      continueStartDate: continueStartDate
    });

    this.isTpInsuranceDisable = true;


  }




  async setDataForOtherCompanyRetentionPolicyTypeTp() {
    this.policyForm.get("tpInsuranceCompany")?.enable();


      let startDate: Date = this.commonService.getDateFromIDateDto(this._policyData?.TpPolicy.ExpiryDateDto as IDateDto) as Date;
      let continueStartDate: Date = this.commonService.getDateFromIDateDto(this._policyData?.ContinueStartDateDTO as IDateDto) as Date;

      try {
        startDate = new Date(startDate.setDate(startDate.getDate() + 1));
      } catch (error) {
        startDate = new Date();
      }
      await this.policyForm.patchValue({
        tpStartDate: moment(startDate),
        continueStartDate:continueStartDate
      });
      this._insuranceCompanies = this._insuranceCompanies.filter(f => f.Value != this._policyData?.TpPolicy.InsuranceCompany);

  
  }

  changePortabality() {
    this._lastInsuranceCompanies = this._savedinsuranceCompanies;
    this.policyForm.patchValue({
      lastYearInsuranceCompany: ""
    });
    if (this._type == SearchPolicyType.Motor_rollover && this.policyForm.value.portability == Portabality.No) {
      this._lastInsuranceCompanies = this._lastInsuranceCompanies.filter(f => f.Value != this.policyForm.value.tpInsuranceCompany);
    } else  if (this._type == SearchPolicyType.Motor_rollover && this.policyForm.value.portability == Portabality.No &&  ( this.policyForm.value.isChangeAgent || this.policyForm.value.isBlockAgent)) {
      let insuranceCompany = this.policyForm.value.tpInsuranceCompany;
      this.policyForm.patchValue({
        lastYearInsuranceCompany: insuranceCompany
      });
    } else  if (this._type == SearchPolicyType.Motor_rollover && this.policyForm.value.portability == Portabality.Yes && ( !this.policyForm.value.isChangeAgent && !this.policyForm.value.isBlockAgent))  {
      this._lastInsuranceCompanies = this._lastInsuranceCompanies.filter(f => f.Value != this.policyForm.value.tpInsuranceCompany);
    }

  }

  async setDataForOtherCompanyRetentionPolicyTypeComprehensiveOrUsageBased() {

    if (this.policyTermForm.value.policyType == PolicyType.OtherCompanyRetention && (this.policyTermForm.value.packageType == PackageType.COMPREHENSIVE || this.policyTermForm.value.packageType === PackageType.USAGE_BASE)) {
      let startDate: Date = this.commonService.getDateFromIDateDto(this._policyData?.TpPolicy.ExpiryDateDto as IDateDto) as Date;
      this.policyForm.get("tpInsuranceCompany")?.enable();
      this.policyForm.get("policyNumber")?.enable();

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
      });
      this._insuranceCompanies = this._insuranceCompanies.filter(f => f.Value != this._policyData?.TpPolicy.InsuranceCompany);
      await this.commonService.getDate(this.commonService.getDateInString(this.policyForm.getRawValue().tpStartDate), policyTerm?.TpYear).subscribe((response: IDateDto) => {
        this.policyForm.patchValue({
          tpExpiryDate: new Date(`${response.Year}-${response.Month}-${response.Day}`)
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
      case 9:
        this.calculateCommissionablePremiumTp();
        break;
      case 10:
        this.calculateCommissionablePremiumAddonCover();
        break;
      case 11:
        this.calculateCommissionablePremiumNoCommission();
        break;
    }
  }

  calculateCommissionablePremiumNoCommission() {
    this.premiumForm.patchValue({ commissionablePremium: 0 });
  }


  calculateCommissionablePremiumAddonCover() {
    let premium: any = this.premiumForm.controls.tp.value;
    let addOnCover: any = this.premiumForm.controls.passengerCover.value;

    let sum = parseInt(premium == "" ? 0 : premium) + parseInt(addOnCover == "" ? 0 : addOnCover);
    this.premiumForm.patchValue({ commissionablePremium: sum.toFixed(2) });
  }

  calculateCommissionablePremiumTp() {
    let tp: any = this.premiumForm.controls.tp.value;
    let sum = parseInt(tp == "" ? 0 : tp);
    this.premiumForm.patchValue({ commissionablePremium: sum.toFixed(2) });
  }

  resetForm() {
    this.customerForm.reset();
    this.policyTermForm.reset();
    this.policyForm.reset();
    this.premiumForm.reset();
    this.addOnRiderForm.reset();
    this.policySourceForm.reset();
    this.paymentForm.reset();
    this.voucherForm.reset();
    this.uploadDocumentForm.reset();
  }

  refreshLastInsuranceCompanies() {
    if (this.policyTermForm.value.policyType == undefined) return;
    if (this.policyForm.value.isBlockAgent || this.policyForm.value.isChangeAgent) {
      this._lastInsuranceCompanies = this._savedinsuranceCompanies;
    }
    if (this.policyTermForm.value.packageType == PolicyType.New) {
      this._lastInsuranceCompanies = this._insuranceCompanies.filter(f => f.Value != this.policyForm.value.tpInsuranceCompany);
    }
    if (this.policyTermForm.value.policyType == PolicyType.Rollover && this.policyForm.value.portability == Portabality.No) {    this.policyForm.get("lastYearInsuranceCompany").reset();
      this.policyForm.get("lastYearInsuranceCompany").reset();
      this.policyForm.patchValue({
        lastYearInsuranceCompany: this.policyForm.value.tpInsuranceCompany
      })
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
        DocumentBase64: x.DocumentBase64
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
    this.commonService.getProducts(this._verticalId).subscribe((response: any) => {
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
      this.setPortablity();
    });
  }
  getCoverage() {
    this.commonService.getCoverage().subscribe((response: any) => {
      this._coverage = response;
    });
  }
  getOccupancy() {
    this.commonService.getOccupancy().subscribe((response: any) => {
      this._occupancy = response;
    });
  }
  getBasementExposure() {
    this.commonService.getBasementExposure().subscribe((response: any) => {
      this._baseExposure = response;
    });
  }

  calculateChanges() {

  }

  calculateNetPremium() {
    let sm = Math.round(this.premiumForm.controls.nonCommissionComponentPremium.value || 0) + Math.round(this.premiumForm.controls.totalTp.value || 0);
    this.premiumForm.patchValue({ netpremium: sm });

  }

  verticalData: any;
  setVertical() {

    if (this.MenuVertical == 'Motor') {
      this.verticalData = Vertical.Motor;
    }
    else if (this.MenuVertical == 'Travel') {
      this.verticalData = Vertical.Travel;
    }
    else if (this.MenuVertical == 'Personal Accident') {
      this.verticalData = Vertical.Pesonal_Accident;
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
    this.verticalData = this.verticalData;
    this.router.navigate(["../pms/health/health-policy-management"]);
  }

  getCustomerDataByClusterId(clusterId: number) {
    this.customerService.getCustomerDataByClusterId(clusterId).subscribe((response: any) => {
      this._storeCustomerClusterDetail = JSON.parse(JSON.stringify(response?.Data));
      this._dataSourceCustomerCluster = new MatTableDataSource<ICustomerInsuranceDetail>(response?.Data);
      this._dataSourceCustomerCluster._updateChangeSubscription(); // <-- Refresh the datasource

    });
  }


  getCustomerDataByClusterIdUpdate(clusterId: number, data: ICustomerInsuranceDetail[]) {
    this.customerService.getCustomerDataByClusterId(clusterId).subscribe((response: any) => {
      this._storeCustomerClusterDetail = JSON.parse(JSON.stringify(response?.Data));
      let customerClusterDetail = this._storeCustomerClusterDetail.filter(x => !data.filter(y => y.CustomerId == x.CustomerId).length)
      this._dataSourceCustomerCluster = new MatTableDataSource<ICustomerInsuranceDetail>(customerClusterDetail);
      this._dataSourceCustomerCluster._updateChangeSubscription(); // <-- Refresh the datasource
    });
  }

  setPolicyDetails(): void {
    if (this._policyType == SearchPolicyType.Motor_Renew && this._policyType != SearchPolicyType.Motor_Modify) {
      this.setPolicySourceRenewal()
      this.setPreviousInsuranceCompany()
    }
  }

  setCompanyInsuranceBranch(response: any) {
    let insuranceCompanyId: number = 0
    if (response.PolicyTerm.PackageTypeId == PackageType.TP_ONLY) {
      insuranceCompanyId = response.TpPolicy.InsuranceCompany
    }
    this.commonService.getInsuranceCompanyBranches(this._verticalId, insuranceCompanyId, this._branchId).subscribe((data: IDropDownDto<number>[]) => {
      this._insuranceCompanyBranches = data;
      this.policyForm.patchValue({
        insuranceBranch: response.InsuranceBranch,
      });

    });
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


  validationPolicyData(response: ICommercialPolicyFormDataModel) {
    this.validatePolicyDetail(response)
    this.validatePolicyType(response)
    this.validatePremiumDetail(response)
    this.validatePolicySourceDetail(response)
    this.validatePaymentData(response)
    this.validateInsuredPersonDetail(response)
  };
  erorr: string = "This Field is Required";
  errorList: any = [];


  validatePolicyDetail(response: ICommercialPolicyFormDataModel) {
      if (!response.TpPolicy.PolicyNumber) {
        this.errorList.push("Policy Number" + this.erorr)
      }
      if (!response.TpPolicy.ExpiryDateDto && response.TpPolicy.NumberOfYear !== Common.ZERO) {
        this.errorList.push("Risk Expiry Date " + this.erorr)
      }
      if (!response.TpPolicy.NumberOfYear && response.TpPolicy.NumberOfYear !== Common.ZERO) {
        this.errorList.push("Number of Year " + this.erorr)
      }
      if (!response.TpPolicy.StartDateDto) {
        this.errorList.push("Risk Policy start date" + this.erorr)
      }
      if (response.TpPolicy.InsuranceCompany == 0) {
        this.errorList.push("Insurance company " + this.erorr)
      }
      if (!response.InsuranceBranch) {
        this.errorList.push("Insurance Branch " + this.erorr)
      }
  }

  validatePolicyType(response: ICommercialPolicyFormDataModel) {
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

  validatePremiumDetail(response: ICommercialPolicyFormDataModel) {
    if (!response.Premium.CommissionPaidOn) {
      this.errorList.push("Commision Paid on  % " + this.erorr)
    }
    if (response.PolicyTerm.PackageTypeId === PackageType.TP_ONLY) {

      if (!response.Premium.Tp || response.Premium.Tp == 0) {
        this.errorList.push("Premium " + this.erorr)
      }

      if ((!response.Premium.GstPercentage || response.Premium.GstPercentage == 0)) {
        this.errorList.push("GST % " + this.erorr)
      }

    }
  }

  validatePolicySourceDetail(response: ICommercialPolicyFormDataModel) {
    if (response.PolicySource.TeleCaller == 0 && response.PolicySource.Fos == 0 && response.PolicySource.Pos == 0 && response.PolicySource.Reference == 0) {
      this.errorList.push("Atleast one policy source should selected ")
    }

  }

  validatePaymentData(response: ICommercialPolicyFormDataModel) {

    if (!response.PaymentData || response.PaymentData.length == 0) {
      this.errorList.push("Atleast one Payment mode should be selected")

    }
  }


  validateInsuredPersonDetail(response: ICommercialPolicyFormDataModel) {
    if (!response.InsuredPersonData || response.InsuredPersonData.length == 0) {
      this.errorList.push("Atleast one Insured Person detail should be selected")

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
  public _insuranceCustomerPersonDetails: ICustomerInsuranceDetail[] = [];
  public _selectedinsuranceCustomerPersonDetail: ICustomerInsuranceDetail[] = [];
  public _storeCustomerClusterDetail: ICustomerInsuranceDetail[] = [];
  _isInsurancePersoneEdit: boolean = false;
  _incrementalUid: number = 0;
  addCustomerClusterData(data: ICustomerInsuranceDetail, index: number) {
    if(this.insuranceCustomerForm.valid){}
    this.reverseInsurcanceDataifExist()
    this._incrementalUid = this._incrementalUid + 1;
    data.uid = this._incrementalUid + 1;
    this.insuranceCustomerForm.patchValue({
      cnameInsuredPerson: data.Name,
      cdob: data.DateOfBirth != null ? new Date(data.DateOfBirth) : null,
      cgender: data.GenderId,
      cmobile: data.Mobile,
      cemail: data.Email,
      cpassport: data.PassportNumber,
      cpan: data.Pan,
      cprofession: data.Profession,
      ccustomerId: data.CustomerId,
      ccustomerUid: data.uid,
      customerCode : data.CustomerCode
    })
    this._insuranceCustomerPersonDetails.push(data);
    console.log(this._insuranceCustomerPersonDetails)
    this.removeInsuranceCLuster(index)
    this.sumInsuredCalculation();
  }
  insurancePerson: ICustomerInsuranceDetail = <ICustomerInsuranceDetail>{};
  addInsuracePersondetail(): void {
    console.log(this.insuranceCustomerForm)
    if(!this.insuranceCustomerForm.valid) {
      this.insuranceCustomerForm.markAllAsTouched();
      return;
    }
    console.log(this.insuranceCustomerForm.value)
    if (!this.InsurancePersonForm.cnameInsuredPerson) {
      alert("Customer name is required");
      return
    }
    this._isInsurancePersoneEdit = false;
    let selectedInsurancePersonIndex = this._selectedinsuranceCustomerPersonDetail?.findIndex(x => x.uid == this.insuranceCustomerForm.value.ccustomerUid);
    // for updating remove existing and adding new
    if (selectedInsurancePersonIndex >= 0) {

      this._selectedinsuranceCustomerPersonDetail?.splice(selectedInsurancePersonIndex, 1);
      this._dataInsuranceCustomerCluster = new MatTableDataSource<ICustomerInsuranceDetail>(this._selectedinsuranceCustomerPersonDetail);
      this._dataInsuranceCustomerCluster._updateChangeSubscription(); // <-- Refresh the datasource
    }
    this.insurancePerson.CustomerId = this.InsurancePersonForm?.ccustomerId || 0
    this.insurancePerson.Name = this.InsurancePersonForm.cnameInsuredPerson
    this.insurancePerson.DateOfBirth = this.InsurancePersonForm.cdob,
      this.insurancePerson.Gender = this._genders?.find(x => x.Value == this.InsurancePersonForm.cgender)?.Name
    this.insurancePerson.Mobile = this.InsurancePersonForm.cmobile
    this.insurancePerson.Email = this.InsurancePersonForm.cemail
    this.insurancePerson.PassportNumber = this.InsurancePersonForm.cpassport
    this.insurancePerson.Pan = this.InsurancePersonForm.cpan
    this.insurancePerson.Profession = this.InsurancePersonForm.cprofession
    this.insurancePerson.RelationProposer = this.InsurancePersonForm.crelprposer
    this.insurancePerson.SumInsuredIndividual = this.InsurancePersonForm.csuminsuredindividual
    this.insurancePerson.SumInsuredFloater = this.InsurancePersonForm.csuminsuredfloater
    this.insurancePerson.CumulativeBonus = this.InsurancePersonForm.ccummbonus
    this.insurancePerson.Deductable = this.InsurancePersonForm.cdeductable
    this.insurancePerson.Loading = this.InsurancePersonForm.cloading
    this.insurancePerson.LoadingReason = this.InsurancePersonForm.cloadingreason
    this.insurancePerson.Ped = this.InsurancePersonForm.cped
    this.insurancePerson.PedExclusion = this.InsurancePersonForm.cpedexclusion
    this.insurancePerson.AnualIncome = this.InsurancePersonForm.canualincome
    this.insurancePerson.RiskClass = this.InsurancePersonForm.criskclass
    this.insurancePerson.NomineeName = this.InsurancePersonForm.cnomineename
    this.insurancePerson.NomineeRelationship = this.InsurancePersonForm.cnomineerelation,
    this.insurancePerson.NomineeRelationShipName = this._relations.find((x: { Value: any; }) => x.Value == this.InsurancePersonForm.cnomineerelation)?.Name
    this.insurancePerson.RelationProposerName = this._relations.find((x: { Value: any; }) => x.Value == this.InsurancePersonForm.crelprposer)?.Name
    this.insurancePerson.PedName = this._ped.find((x: { Value: any; }) => x.Value == this.InsurancePersonForm.cped)?.Name
      this.insurancePerson.Aadhar = this.InsurancePersonForm.caadhar;
    this.insurancePerson.GenderId = this.InsurancePersonForm.cgender;
    let ss =
      this.insurancePerson.BranchId = this.InsurancePersonForm?.ccustomerId ? this._storeCustomerClusterDetail.find(x => x.CustomerId == this.insuranceCustomerForm.value.ccustomerId).BranchId :
        this._branchId
    this.insurancePerson.uid = this.InsurancePersonForm.ccustomerUid;
    this.insurancePerson.CustomerCode = this._insuranceCustomerPersonDetails?.find(x => x.uid == this.InsurancePersonForm?.ccustomerUid)?.Code

    this.insurancePerson.Address = this.customerForm.getRawValue().addressInPolicy;
    this.insurancePerson.CityId = this._customerCityId
    this.insurancePerson.ClusterId = this._customerClusterId;
    this.insurancePerson.ReferById = this._referById;
    this.insurancePerson.TeamMemebrId = this.customerDetails.TeamMemebrId;
    this.insurancePerson.ReferenceId = this.customerDetails.ReferenceId;
    this.insurancePerson.PosId = this.customerDetails.PosId;
    //insurancePerson
    if (this.productPlanForm.value.planTypes == ProductPlanType.Floater) {
      if (this._selectedinsuranceCustomerPersonDetail.length >= 1) {
        this.insurancePerson.SumInsuredFloater = 0;
        this.sumInsuredCalculation();
      }
    }

    this._selectedinsuranceCustomerPersonDetail.push({ ...this.insurancePerson })
    this._dataInsuranceCustomerCluster = new MatTableDataSource<ICustomerInsuranceDetail>(this._selectedinsuranceCustomerPersonDetail);
    this._dataInsuranceCustomerCluster._updateChangeSubscription(); // <-- Refresh the datasource
    if (this._selectedinsuranceCustomerPersonDetail && this._selectedinsuranceCustomerPersonDetail.length > 0) {
      this.calculatInsuredData()
    }
    let insurancePersonIndex = this._insuranceCustomerPersonDetails?.findIndex(x => x.uid == this.insuranceCustomerForm.value.ccustomerUid);
    this._insuranceCustomerPersonDetails.splice(insurancePersonIndex, 1);
    this.insuranceCustomerForm.reset();
  }

  removeInsuranceCLuster(index: any) {
    //this._insuranceCustomerPersonDetails.splice(index, 1);
    this._dataSourceCustomerCluster.data.splice(index, 1);
    this._dataSourceCustomerCluster._updateChangeSubscription(); // <-- Refresh the datasource
  }

  reverseInsuranceDetail() {
    this.insuranceCustomerForm.reset();
    if (this._insuranceCustomerPersonDetails && this._insuranceCustomerPersonDetails.length > 0) {
      var customerDetail = this._insuranceCustomerPersonDetails[this._insuranceCustomerPersonDetails.length - 1]
      let existinSelectedInsurance = this._selectedinsuranceCustomerPersonDetail.some(x => x.uid == customerDetail.uid)
      if (!existinSelectedInsurance) {
        this._dataSourceCustomerCluster.data.push(customerDetail);
        this._dataSourceCustomerCluster._updateChangeSubscription(); // <-- Refresh the datasource
        this._insuranceCustomerPersonDetails.pop();
      }
    }
  }

  deleteCustomerClusterData(element: ICustomerInsuranceDetail, index: number) {
    if (this._selectedinsuranceCustomerPersonDetail && this._selectedinsuranceCustomerPersonDetail.length > 0) {
      var customerDetail = this._selectedinsuranceCustomerPersonDetail[index];
      this._dataSourceCustomerCluster.data.push(customerDetail);
      this._dataSourceCustomerCluster._updateChangeSubscription(); // <-- Refresh the datasource
      this._selectedinsuranceCustomerPersonDetail.splice(index, 1)
      this._dataInsuranceCustomerCluster = new MatTableDataSource<ICustomerInsuranceDetail>(this._selectedinsuranceCustomerPersonDetail);
      this._dataInsuranceCustomerCluster._updateChangeSubscription(); // <-- Refresh the datasource
      this.calculatInsuredData()
    }
  }

  editCustomerCLusterData(element: ICustomerInsuranceDetail, index: number) {
    this.reverseInsurcanceDataifExist()
    this._isInsurancePersoneEdit = true;
    this.insuranceCustomerForm.patchValue({
      cnameInsuredPerson: element.Name,
      cdob: element.DateOfBirth != null ? new Date(element.DateOfBirth) : null,
      cgender: element.GenderId,
      cmobile: element.Mobile,
      cemail: element.Email,
      cpassport: element.PassportNumber,
      cpan: element.Pan,
      cprofession: element.Profession,
      crelprposer: element.RelationProposer,
      csuminsuredindividual: element.SumInsuredIndividual,
      csuminsuredfloater: element.SumInsuredFloater,
      ccummbonus: element.CumulativeBonus,
      cdeductable: element.Deductable,
      cloading: element.Loading,
      cloadingreason: element.LoadingReason,
      cped: element.Ped,
      cpedexclusion: element.PedExclusion,
      canualincome: element.AnualIncome,
      criskclass: element.RiskClass,
      cnomineename: element.NomineeName,
      cnomineerelation: element.NomineeRelationship,
      caadhar: element.Aadhar,
      ccustomerId: element.CustomerId,
      ccustomerUid: element.uid
    })
  }

  getRisksClass(): any {
    this.commonService.getRiskClass().subscribe((response: IDropDownDto<number>[]) => {
      this._riskClass = response;
    });
  }

  reverseSelectedInsurcanceDataifExist() {
    let insurancePersonIndex = this._selectedinsuranceCustomerPersonDetail.every(e => this._insuranceCustomerPersonDetails.includes(e))

    //let insurancePersonIndex =  this._selectedinsuranceCustomerPersonDetail?.findIndex(y=>y.uid == this._insuranceCustomerPersonDetails?.find(x=>x.uid == y.uid).uid );

    if (this.insuranceCustomerForm.value.ccustomerId != 0 && insurancePersonIndex) {
      this.reverseInsuranceDetail();
    }
  }

  reverseInsurcanceDataifExist() {
    let insurancePersonIndex = this._insuranceCustomerPersonDetails?.findIndex(x => x.uid == this.insuranceCustomerForm.value.ccustomerUid);

    //let insurancePersonIndex =  this._selectedinsuranceCustomerPersonDetail?.findIndex(y=>y.uid == this._insuranceCustomerPersonDetails?.find(x=>x.uid == y.uid).uid );

    if (insurancePersonIndex >= 0) {
      var customerDetail = this._insuranceCustomerPersonDetails[insurancePersonIndex]
      this._dataSourceCustomerCluster.data.push(customerDetail);
      this._dataSourceCustomerCluster._updateChangeSubscription(); // <-- Refresh the datasource
    }
  }
  noofchild: number = 0
  noofAdult: number = 0;
  totalSumInsuredInsurance: number = 0
  allAge: any = [];
  maxAge: number = 0;
  calculatInsuredData() {
    this.allAge = [];
    this.noofAdult = 0;
    this.noofchild = 0;
    this.totalSumInsuredInsurance = 0;
    if (this._selectedinsuranceCustomerPersonDetail && this._selectedinsuranceCustomerPersonDetail.length > 0) {
      this._selectedinsuranceCustomerPersonDetail.filter((x) => {
        let DOB = new Date(x.DateOfBirth)
        let timeDiff = Math.abs(Date.now() - DOB.getTime());
        let age = Number(Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25));
        if (age <= 18) {
          this.noofchild++;
        } else {
          this.noofAdult++;
        }
        this.totalSumInsuredInsurance = Number(this.totalSumInsuredInsurance) + Number(x.SumInsuredFloater) + Number(x.SumInsuredIndividual);
        this.allAge.push(age);
      })
      this.maxAge = Math.max.apply(null, this.allAge);
    }
  }

  sumInsuredCalculation() {
    this.insuranceCustomerForm.get("csuminsuredfloater").reset();
    this.insuranceCustomerForm.get("csuminsuredindividual").reset();
    this.insuranceCustomerForm.get("csuminsuredfloater")?.enable();
    this.insuranceCustomerForm.get("csuminsuredindividual")?.enable();

    if (this.productPlanForm.value.planTypes == ProductPlanType.Floater) {
      this.insuranceCustomerForm.get("csuminsuredindividual")?.disable();
      this.insuranceCustomerForm.get("csuminsuredfloater")?.enable();
      if (this._selectedinsuranceCustomerPersonDetail.length >= 1) {
        this.insuranceCustomerForm.value.csuminsuredfloater = 0;
        this.insuranceCustomerForm.get("csuminsuredfloater").setValue(0);
        this.insuranceCustomerForm.get("csuminsuredfloater")?.disable();
      }
    }

    if (this.productPlanForm.value.planTypes == ProductPlanType.Individual) {
      this.insuranceCustomerForm.get("csuminsuredindividual")?.enable();
      this.insuranceCustomerForm.get("csuminsuredfloater")?.disable();
    }
  }

  getPed(): any {
    this.commonService.getPed().subscribe((response: IDropDownDto<number>[]) => {
      this._ped  = response;
    });
  }

  getPpc(): any {
    this.commonService.getPpc().subscribe((response: IDropDownDto<number>[]) => {
      this._ppc  = response;
    });
  }
  setActivateVertical(verticalId:number){
    if(verticalId == Vertical.Fire) this.isHeath = true
    if(verticalId == Vertical.Engineering) this.isPA = true
    if(verticalId == Vertical.Life) this.isTravel = true
    if(verticalId == Vertical.Engineering) this.isTravel = true
    if(verticalId == Vertical.Liabality) this.isTravel = true
    if(verticalId == Vertical.Misc) this.isTravel = true
    if(verticalId == Vertical.Marine) this.isTravel = true
  }

  setValidatoronVertical() {
    this.insuranceCustomerForm.controls.cpassport.clearValidators();
    this.insuranceCustomerForm.controls.criskclass.clearValidators();


    if (this._verticalId == Vertical.Travel) {
      this.insuranceCustomerForm.controls.cpassport.setValidators([Validators.required]);
    }
   
    if (this._verticalId == Vertical.Pesonal_Accident) {
      this.insuranceCustomerForm.controls.criskclass.setValidators([Validators.required]);
    }
    this.insuranceCustomerForm.controls['cpassport'].updateValueAndValidity()

    
  }

  setVerticalFunction() {
    if (this._verticalId == Vertical.Health) {
      this.changePortabality();
    }
   
    if (this._verticalId == Vertical.Pesonal_Accident) {
      this.changePortabality();
    }
    
  }

  isRequiredField(field: string) {
    const form_field = this.insuranceCustomerForm.get(field);
    if (!form_field.validator) {
        return false;
    }

    const validator = form_field.validator({} as AbstractControl);
    return (validator && validator.required);
  
}
calculatTotalFiredSumInsured() {
  this.totalFireSumInsured = Number(this.fireTermForm.value.fireSA || 0) + Number(this.fireTermForm.value.earthQuakeSA || 0) + Number(this.fireTermForm.value.sTFISA || 0)
  + Number(this.fireTermForm.value.terrorismSA || 0)+ Number(this.fireTermForm.value.burglarySA || 0) + Number(this.fireTermForm.value.moneySA || 0) ;
  this.fireTermForm.patchValue({
    sumInsured : this.totalFireSumInsured
  })
}

}
