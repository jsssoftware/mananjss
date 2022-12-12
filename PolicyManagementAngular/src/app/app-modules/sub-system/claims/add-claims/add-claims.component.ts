import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { IClaimsDocumentDto } from 'src/app/app-entites/dtos/claims/claims-document-dto';
import { IClaimsDto } from 'src/app/app-entites/dtos/claims/claims-dto';
import { ISearchClaimsPolicyDto } from 'src/app/app-entites/dtos/claims/search-claims-policy-dto';
import { ICommonDto } from 'src/app/app-entites/dtos/common/common-dto';
import { IDateDto } from 'src/app/app-entites/dtos/common/date-dto';
import { IDropDownDto } from 'src/app/app-entites/dtos/common/drop-down-dto';
import { IPreviousClaimDto } from 'src/app/app-entites/dtos/common/previous-claims-dto';
import { IAddUpdateClaimsModel } from 'src/app/app-entites/models/claims/add-update-claims-model';
import { IClaimsDocumentModel } from 'src/app/app-entites/models/claims/claims-document-model';
import { IClaimsService } from 'src/app/app-services/claims/abstracts/claims.iservice';
import { ICommonService } from 'src/app/app-services/common-service/abstracts/common.iservice';
import { FormMode, Vertical } from 'src/app/shared/utilities/enums/enum';
import Swal from 'sweetalert2';
import { ClaimsFollowUpDataComponent } from '../claims-follow-up-data/claims-follow-up-data.component';
import { v4 as uuidv4 } from 'uuid';
import { ViewClaimsComponent } from '../view-claims/view-claims.component';

@Component({
  selector: 'app-add-claims',
  templateUrl: './add-claims.component.html',
  styleUrls: ['./add-claims.component.css']
})
export class AddClaimsComponent implements OnInit {
  public _branchId: number;
  public _isFormControlDisabled: boolean = false;
  public _isFormControlNumberDisabled: boolean = true;
  public _isFormPolicyDisabled: boolean = true;
  public _isFormInsuranceDisabled: boolean = true;
  public _isFormPosDisabled: boolean = true;
  public _isFormBranchDisabled: boolean = true;
  public _isFormCustomerDisabled: boolean = true;
  public _isFormProductDisabled: boolean = true;
  public _isFormPlanDisabled: boolean = true;
  public _isFormPlanTypeDisabled: boolean = true;
  public _claimStatus: IDropDownDto<number>[] = [];
  public _filteredClaimStatusOptions: IDropDownDto<number>[] = [];

  public _claimSubStatus: IDropDownDto<number>[] = [];
  public _filteredSubClaimStatusOptions: IDropDownDto<number>[] = [];

  public _claimTypes: IDropDownDto<number>[] = [];
  public _filteredClaimTypesOptions: IDropDownDto<number>[] = [];
  public _claimEntryDate: boolean = true;


  public _isFormManufacturerrDisabled: boolean = true;
  public _isFormModelDisabled: boolean = true;
  public _isFormMakeYearDisabled: boolean = true;
  public _documentTypes: IDropDownDto<number>[] = [];
  _matcher = new ErrorStateMatcher();
  _panelOpenState = false;

  public _previousClaims: IPreviousClaimDto[] = [];

  public _displayedColumnsPreviousClaims: string[];
  public _claimsId: number;
  public _policyId: number;
  public _verticalId: number;
  public _verticalName: string = "";
  public _form: number;
  public _header: string = '';
  public _claimsUploadDocuments: IClaimsDocumentModel[] = [];
  public _dataSourceUploadDocuments: MatTableDataSource<IClaimsDocumentDto> = new MatTableDataSource<IClaimsDocumentDto>();
  public _claimsDocuments: IClaimsDocumentDto[] = [];
  public _displayedColumns: string[] = [
    'sno',
    'documentTypeName',
    'fileName',
    'remarks',
    'documentTypeId'
  ];
  public _status: string = '';
  public _subStatus: string = '';

  claimsForm = new FormGroup({
    controlNumber: new FormControl(''),
    policyNumber: new FormControl(''),
    insuranceCompany: new FormControl(''),
    pos: new FormControl(''),
    branch: new FormControl(''),
    customerName: new FormControl(''),
    product: new FormControl(''),
    plan: new FormControl(''),
    planType: new FormControl(''),
    claimEntryDate: new FormControl(''),
    policyExpiryDate: new FormControl(''),
    patientName: new FormControl('', [Validators.required]),
    contactPerson: new FormControl('', [Validators.required]),
    contactNumber: new FormControl('', [Validators.required]),
    claimNumber: new FormControl(''),
    claimRegistrationDate: new FormControl(''),
    claimType: new FormControl('', [Validators.required]),
    claimSubmittedBy: new FormControl(''),
    dateOfAdmission: new FormControl(''),
    dateOfDischarge: new FormControl(''),
    reasonForClaim: new FormControl(''),
    hospitalName: new FormControl(''),
    documentSubmissionDate: new FormControl(''),
    amountClaimed: new FormControl(''),
    amountApproved: new FormControl(''),
    claimRemarksByInsuranceCompany: new FormControl(''),
    finalStatus: new FormControl('', [Validators.required]),
    claimSubStatus: new FormControl('', [Validators.required]),
    followUpDate: new FormControl('', [Validators.required]),
    reasonForFollowing: new FormControl('', [Validators.required]),
    remarks: new FormControl(''),
    browse: new FormControl(''),
    documentType: new FormControl(''),
    documentRemarks: new FormControl(''),
    policyId: new FormControl(''),
    verticalId: new FormControl(''),
    customerId: new FormControl(''),
    manufacture: new FormControl(''),
    model: new FormControl(''),
    makeYear: new FormControl(''),
    registrationNumber: new FormControl(''),
    accidentDateTimePlace: new FormControl(''),
    workshopName: new FormControl(''),
    workshopNumber: new FormControl(''),
    serviceAdvisorName: new FormControl(''),
    serviceAdvisorNumber: new FormControl(''),
    surveyorName: new FormControl(''),
    surveyorNumber: new FormControl(''),
    surveyorEmail: new FormControl(''),
    visibleDamages: new FormControl(''),
    pendingConcerns: new FormControl(''),
    claimNature: new FormControl('', [Validators.required]),
    dateOfIncident: new FormControl('', [Validators.required]),
    personLocation: new FormControl('')
  });

  constructor(private claimsService: IClaimsService,
    private commonService: ICommonService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,) {
    this._branchId = parseInt(sessionStorage.getItem("branchId") as string);
    this._displayedColumnsPreviousClaims = [
      'claimNumber',
      'claimSubmissionDateString',
      'amountApproved',
      'claimStatus',
      'remark',
      'action'
    ];

    this._claimsId = parseInt(this.route.snapshot.paramMap.get('claimsId') as string);
    this._policyId = parseInt(this.route.snapshot.paramMap.get('policyId') as string);
    this._verticalId = parseInt(this.route.snapshot.paramMap.get('verticalId') as string);
    this._form = parseInt(this.route.snapshot.paramMap.get('form-type') as string);
  }

  ngOnInit(): void {
    switch (this._form) {
      case FormMode.Add as number:
        this._header = "Add New";
        break;

      case FormMode.Update as number:
        this._header = "Update";
        break;

      case FormMode.View as number:
        this._header = "View";
        this._isFormControlDisabled = true;
        break;
    }

    this.claimsForm.get("finalStatus")?.valueChanges.subscribe(input => {
      if (input === 1) {
        this.claimsForm.get('claimSubStatus')?.clearValidators();
        this.claimsForm.get('claimSubStatus')?.updateValueAndValidity();
        this.claimsForm.patchValue({ claimSubStatus: '' });
        this.claimsForm.get('followUpDate')?.setValidators(Validators.required);
        this.claimsForm.get('followUpDate')?.updateValueAndValidity();
        this.claimsForm.get('reasonForFollowing')?.setValidators(Validators.required);
        this.claimsForm.get('reasonForFollowing')?.updateValueAndValidity();
      }
      else {
        this.claimsForm.get('claimSubStatus')?.setValidators(Validators.required);
        this.claimsForm.get('claimSubStatus')?.updateValueAndValidity();
        this.claimsForm.get('followUpDate')?.clearValidators();
        this.claimsForm.get('followUpDate')?.updateValueAndValidity();
        this.claimsForm.get('reasonForFollowing')?.clearValidators();
        this.claimsForm.get('reasonForFollowing')?.updateValueAndValidity();
      }
    });

    this.claimsForm.patchValue({
      policyId: this._policyId,
      verticalId: this._verticalId
    });

    if (this._verticalId === 1) {
      this.claimsForm.get('patientName')?.clearValidators();
      this.claimsForm.get('patientName')?.updateValueAndValidity();
      this.claimsForm.get('claimNature')?.clearValidators();
      this.claimsForm.get('claimNature')?.updateValueAndValidity();
      this.claimsForm.get('dateOfIncident')?.clearValidators();
      this.claimsForm.get('dateOfIncident')?.updateValueAndValidity();
    }

    if (this._verticalId === 2) {
      this.claimsForm.get('claimNature')?.clearValidators();
      this.claimsForm.get('claimNature')?.updateValueAndValidity();
      this.claimsForm.get('dateOfIncident')?.clearValidators();
      this.claimsForm.get('dateOfIncident')?.updateValueAndValidity();
    }

    if (this._verticalId > 2) {
      this.claimsForm.get('patientName')?.clearValidators();
      this.claimsForm.get('patientName')?.updateValueAndValidity();
      this.claimsForm.get('claimType')?.clearValidators();
      this.claimsForm.get('claimType')?.updateValueAndValidity();
    }
  }

  ngAfterViewInit(): void {
    this.getDocumentTypes();
    this.getPreviousClaims()
    this.getClaimStatus();
    this.getClaimTypes();
    this.getPolicyById(this._policyId);
    this.getClaimsDocuments(this._policyId);
    if (this._claimsId > 0) {
      this.getClaimsById(this._claimsId);
    }
  }

  onSubmit() {

    console.log(this.claimsForm.controls);

    if (this.claimsForm.invalid) return;

    const model = this.getPayload();

    if (this._claimsId == 0) {
      this.claimsService.addClaims(model).subscribe((response: ICommonDto<string>) => {
        if (response.IsSuccess) {
          Swal.fire({
            icon: 'success',
            title: 'Done',
            text: response.Message,
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['./subsystem/claims']);
            }
          });
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Sorry',
            text: response.Message,
          });
        }
      });
    }
    else {
      this.claimsService.updateClaims(this._claimsId, model).subscribe((response: ICommonDto<string>) => {
        if (response.IsSuccess) {
          Swal.fire({
            icon: 'success',
            title: 'Done',
            text: response.Message,
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['./subsystem/claims']);
            }
          });
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Sorry',
            text: response.Message,
          });
        }
      });
    }
  }

  getDocumentTypes(): void {
    this.commonService.getDocumentTypes('claim').subscribe((response: IDropDownDto<number>[]) => {
      this._documentTypes = response;
    });
  }

  getPreviousClaims(): void {
    const policyId = this.claimsForm.get('policyId')?.value;
    this.commonService.getPreviousClaims(policyId).subscribe((response: IPreviousClaimDto[]) => {
      this._previousClaims = response;
    });
  }

  getClaimStatus(): void {
    this.commonService.getClaimStatus().subscribe((response: IDropDownDto<number>[]) => {
      this._claimStatus = response;
    });
  }

  getClaimTypes(): void {
    const verticalId = this.claimsForm.get('verticalId')?.value;
    this.commonService.getClaimTypes(verticalId).subscribe((response: IDropDownDto<number>[]) => {
      this._claimTypes = response;
    });
  }

  getSubClaimStatus(claimsStatusId: number): void {
    this.commonService.getSubClaimStatus(claimsStatusId).subscribe((response: IDropDownDto<number>[]) => {
      this._claimSubStatus = response;
    });
  }

  getPolicyById(policyId: number): void {
    this.claimsService.searchPolicyById(policyId).subscribe((response: ISearchClaimsPolicyDto) => {
      this.setPolicyData(response);
    });
  }

  setPolicyData(data: ISearchClaimsPolicyDto): void {
    this._verticalName = `(${data.VerticalName})`;
    this.claimsForm.patchValue({
      controlNumber: data.ControlNumber,
      policyNumber: data.PolicyNumber,
      insuranceCompany: data.InsuranceCompany,
      pos: data.Pos,
      branch: data.Branch,
      customerName: data.Customer,
      product: data.Product,
      plan: data.Plan,
      planType: data.PlanType,
      policyExpiryDate: this.commonService.getDateFromIDateDto(data.PolicyExpiryDateDto as IDateDto),
      customerId: data.CustomerId,
      manufacture: data.Manufacture,
      model: data.Model,
      makeYear: data.MakeYear,
      registrationNumber: data.RegistrationNumber,
    });
  }

  addDocument(): void {
    let reader = new FileReader();

    reader.onload = () => {
      const uniqueId = uuidv4();
      let document: IClaimsDocumentModel = {
        UniqueId: uniqueId,
        DocumentBase64: reader.result as string,
        DocumentTypeId: this.claimsForm.value.documentType.Value,
        FileName: this.claimsForm.value.browse._fileNames,
        Remarks: this.claimsForm.value.documentRemarks == "" ? "NA" : this.claimsForm.value.documentRemarks
      };

      this._claimsUploadDocuments = [document, ...this._claimsUploadDocuments]
      this._claimsDocuments.push({
        Id: 0,
        UniqueId: document.UniqueId,
        DocumentTypeName: this.claimsForm.value.documentType.Name,
        FileName: document.FileName,
        Remarks: document.Remarks
      });

      this._dataSourceUploadDocuments = new MatTableDataSource<IClaimsDocumentDto>(this._claimsDocuments);
      this.claimsForm.patchValue({
        documentType: '',
        browse: '',
        documentRemarks: ''
      });
    }

    if (this.claimsForm.value.documentType && this.claimsForm.value.browse) {
      reader.readAsDataURL(this.claimsForm.value.browse._files[0]);
    }
  }

  deleteUploadDocument(uniqueId: string): void {
    let index = this._claimsUploadDocuments.findIndex(f => f.UniqueId === uniqueId);
    if (index > -1) {
      this._claimsUploadDocuments.splice(index, 1);
    }

    index = this._claimsDocuments.findIndex(f => f.UniqueId === uniqueId);
    if (index > -1) {
      this._claimsDocuments.splice(index, 1);
      this._dataSourceUploadDocuments = new MatTableDataSource<IClaimsDocumentDto>(this._claimsDocuments);
    }

    console.log(this._claimsUploadDocuments);
    console.log(this._claimsDocuments);
  }

  getClaimsById(claimsId: number): void {
    this.claimsService.getClaimsById(claimsId).subscribe((response: IClaimsDto) => {
      this.setClaimsData(response);
    });
  }

  private getPayload(): IAddUpdateClaimsModel {
    return {
      AdmissionDate: this.commonService.getDateInString(this.claimsForm.get('dateOfAdmission')?.value),
      AmountApproved: this.claimsForm.get('amountApproved')?.value,
      AmountClaimed: this.claimsForm.get('amountClaimed')?.value,
      BranchId: this._branchId,
      ClaimNumber: this.claimsForm.get('claimNumber')?.value,
      ClaimReason: this.claimsForm.get('reasonForClaim')?.value,
      ClaimRegistrationDate: this.commonService.getDateInString(this.claimsForm.get('claimRegistrationDate')?.value),
      ClaimStatusId: this.claimsForm.get('finalStatus')?.value,
      ClaimSubmittedBy: this.claimsForm.get('claimSubmittedBy')?.value,
      ClaimSubStatusId: this.claimsForm.get('claimSubStatus')?.value,
      ClaimTypeId: this.claimsForm.get('claimType')?.value,
      ContactNumber: this.claimsForm.get('contactNumber')?.value,
      ContactPerson: this.claimsForm.get('contactPerson')?.value,
      DischargeDate: this.commonService.getDateInString(this.claimsForm.get('dateOfDischarge')?.value),
      DocumentSubmissionDate: this.commonService.getDateInString(this.claimsForm.get('documentSubmissionDate')?.value),
      FollowingReason: this.claimsForm.get('reasonForFollowing')?.value,
      FollowUpDate: this.commonService.getDateInString(this.claimsForm.get('followUpDate')?.value),
      HospitalName: this.claimsForm.get('hospitalName')?.value,
      InsuranceCompanyRemark: this.claimsForm.get('claimRemarksByInsuranceCompany')?.value,
      PatientName: this.claimsForm.get('patientName')?.value,
      Remark: this.claimsForm.get('remarks')?.value,
      PolicyId: this.claimsForm.get('policyId')?.value,
      VerticalId: this.claimsForm.get('verticalId')?.value,
      CustomerId: this.claimsForm.get('customerId')?.value,
      ClaimsDocuments: this._claimsUploadDocuments,
      AccidentDateTimePlace: this.claimsForm.get('accidentDateTimePlace')?.value,
      PendingConcerns: this.claimsForm.get('pendingConcerns')?.value,
      ServiceAdvisorName: this.claimsForm.get('serviceAdvisorName')?.value,
      ServiceAdvisorNumber: this.claimsForm.get('serviceAdvisorNumber')?.value,
      SurveyorEmail: this.claimsForm.get('surveyorEmail')?.value,
      SurveyorName: this.claimsForm.get('surveyorName')?.value,
      SurveyorNumber: this.claimsForm.get('surveyorNumber')?.value,
      VisibleDamages: this.claimsForm.get('visibleDamages')?.value,
      WorkshopName: this.claimsForm.get('workshopName')?.value,
      WorkshopNumber: this.claimsForm.get('workshopNumber')?.value,
      ClaimNature: this.claimsForm.get('claimNature')?.value,
      DateOfIncident: this.commonService.getDateInString(this.claimsForm.get('dateOfIncident')?.value),
      PersonLocation: this.claimsForm.get('personLocation')?.value,
    }
  }

  setClaimsData(data: IClaimsDto): void {

    this._status = data.ClaimsStatus;
    this._subStatus = data.ClaimsSubStatus;

    this.getSubClaimStatus(data.ClaimsStatusId);
    this.claimsForm.patchValue({
      patientName: data.PatientName,
      contactPerson: data.ContactPerson,
      contactNumber: data.ContactNumber,
      claimNumber: data.ClaimsNumber,
      claimRegistrationDate: this.commonService.getDateFromIDateDto(data.ClaimsRegistrationDateDto as IDateDto),
      claimType: data.ClaimsTypeId > 0 ? data.ClaimsTypeId : null,
      claimSubmittedBy: data.ClaimsSubmittedBy,
      dateOfAdmission: this.commonService.getDateFromIDateDto(data.AdmissionDateDto as IDateDto),
      dateOfDischarge: this.commonService.getDateFromIDateDto(data.DischargeDateDto as IDateDto),
      reasonForClaim: data.ClaimsReason,
      hospitalName: data.HospitalName,
      documentSubmissionDate: this.commonService.getDateFromIDateDto(data.DocumentSubmissionDateDto as IDateDto),
      amountClaimed: data.AmountClaimed,
      amountApproved: data.AmountApproved,
      claimRemarksByInsuranceCompany: data.InsuranceComapnyRemarks,
      finalStatus: data.ClaimsStatusId,
      claimSubStatus: data.ClaimsSubStatusId > 0 ? data.ClaimsSubStatusId : null,
      followUpDate: this.commonService.getDateFromIDateDto(data.FollowUpDateDto as IDateDto),
      reasonForFollowing: data.FollowUpReason,
      remarks: data.Remarks,
      policyId: this._policyId,
      verticalId: this._verticalId,
      accidentDateTimePlace: data.AccidentDateTimePlace,
      workshopName: data.WorkshopName,
      workshopNumber: data.WorkshopNumber,
      serviceAdvisorName: data.ServiceAdvisorName,
      serviceAdvisorNumber: data.ServiceAdvisorNumber,
      surveyorName: data.SurveyorName,
      surveyorNumber: data.SurveyorNumber,
      surveyorEmail: data.SurveyorEmail,
      visibleDamages: data.VisibleDamages,
      pendingConcerns: data.PendingConcerns,
      claimNature: data.ClaimNature,
      dateOfIncident: this.commonService.getDateFromIDateDto(data.DateOfIncidentDateDto as IDateDto),
      personLocation: data.PersonLocation
    });
  }

  openFollowUpDialog(): void {
    const dialogRef = this.dialog.open(ClaimsFollowUpDataComponent, {
      width: '50%',
      data: { claimsId: this._claimsId }
    });
  }

  openPreviousClaimsDialog(data: any): void {
    const dialogRef = this.dialog.open(ViewClaimsComponent, {
      width: '50%',
      data: { claimsId: data.ClaimId, verticalId: this._verticalId }
    });
  }

  getClaimsDocuments(policyId: number): void {
    this.claimsService.getClaimsDocumentsByPolicyId(policyId).subscribe((response: IClaimsDocumentDto[]) => {
      this._claimsDocuments = response;
      this._dataSourceUploadDocuments = new MatTableDataSource<IClaimsDocumentDto>(this._claimsDocuments);
    });
  }

  deleteClaimsDocumentFromServer(data: IClaimsDocumentDto): void {
    this.claimsService.deleteClaimsDocument(data.Id).subscribe((response: ICommonDto<string>) => {
      if (response.IsSuccess) {
        this.deleteUploadDocument(data.UniqueId);
        Swal.fire({
          icon: 'success',
          title: 'Done',
          text: response.Message,
        });
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Sorry',
          text: response.Message,
        });
      }
    });
  }

  onClose(): void {
    this.router.navigate(['./subsystem/claims']);
  }
}
