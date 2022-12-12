import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
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
import { FormMode } from 'src/app/shared/utilities/enums/enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-claims',
  templateUrl: './view-claims.component.html',
  styleUrls: ['./view-claims.component.css']
})
export class ViewClaimsComponent implements OnInit {

  public _claimStatus: IDropDownDto<number>[] = [];
  public _claimTypes: IDropDownDto<number>[] = [];
  public _claimSubStatus: IDropDownDto<number>[] = [];
  public _claimsId: number;
  public _verticalId: number;

  claimsForm = new FormGroup({
    patientName: new FormControl({ value: '', disabled: true }, [Validators.required]),
    contactPerson: new FormControl({ value: '', disabled: true }, [Validators.required]),
    contactNumber: new FormControl({ value: '', disabled: true }, [Validators.required]),
    claimEntryDate: new FormControl({ value: '', disabled: true }),
    claimNumber: new FormControl({ value: '', disabled: true }),
    claimRegistrationDate: new FormControl({ value: '', disabled: true }),
    claimType: new FormControl({ value: '', disabled: true }, [Validators.required]),
    claimSubmittedBy: new FormControl({ value: '', disabled: true }),
    dateOfAdmission: new FormControl({ value: '', disabled: true }),
    dateOfDischarge: new FormControl({ value: '', disabled: true }),
    reasonForClaim: new FormControl({ value: '', disabled: true }),
    hospitalName: new FormControl({ value: '', disabled: true }),
    documentSubmissionDate: new FormControl({ value: '', disabled: true }),
    amountClaimed: new FormControl({ value: '', disabled: true }),
    amountApproved: new FormControl({ value: '', disabled: true }),
    claimRemarksByInsuranceCompany: new FormControl({ value: '', disabled: true }),
    finalStatus: new FormControl({ value: '', disabled: true }, [Validators.required]),
    claimSubStatus: new FormControl({ value: '', disabled: true }, [Validators.required]),
    followUpDate: new FormControl({ value: '', disabled: true }, [Validators.required]),
    reasonForFollowing: new FormControl({ value: '', disabled: true }, [Validators.required]),
    remarks: new FormControl({ value: '', disabled: true }),
    registrationNumber: new FormControl({ value: '', disabled: true }),
    accidentDateTimePlace: new FormControl({ value: '', disabled: true }),
    workshopName: new FormControl({ value: '', disabled: true }),
    workshopNumber: new FormControl({ value: '', disabled: true }),
    serviceAdvisorName: new FormControl({ value: '', disabled: true }),
    serviceAdvisorNumber: new FormControl({ value: '', disabled: true }),
    surveyorName: new FormControl({ value: '', disabled: true }),
    surveyorNumber: new FormControl({ value: '', disabled: true }),
    surveyorEmail: new FormControl({ value: '', disabled: true }),
    visibleDamages: new FormControl({ value: '', disabled: true }),
    pendingConcerns: new FormControl({ value: '', disabled: true }),
    claimNature: new FormControl({ value: '', disabled: true }, [Validators.required]),
    dateOfIncident: new FormControl({ value: '', disabled: true }, [Validators.required]),
    personLocation: new FormControl({ value: '', disabled: true })
  });

  constructor(private claimsService: IClaimsService,
    private commonService: ICommonService,
    private dialogRef: MatDialogRef<ViewClaimsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    dialogRef.disableClose = true;
    this._claimsId = data.claimsId;
    this._verticalId = data.verticalId;
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.getClaimStatus();
    this.getClaimTypes();
    this.getClaimsById(this._claimsId);
  }

  getClaimStatus(): void {
    this.commonService.getClaimStatus().subscribe((response: IDropDownDto<number>[]) => {
      this._claimStatus = response;
    });
  }

  getClaimTypes(): void {
    this.commonService.getClaimTypes(this._verticalId).subscribe((response: IDropDownDto<number>[]) => {
      this._claimTypes = response;
    });
  }

  getSubClaimStatus(claimsStatusId: number): void {
    this.commonService.getSubClaimStatus(claimsStatusId).subscribe((response: IDropDownDto<number>[]) => {
      this._claimSubStatus = response;
    });
  }

  getClaimsById(claimsId: number): void {
    this.claimsService.getClaimsById(claimsId).subscribe((response: IClaimsDto) => {
      this.setClaimsData(response);
    });
  }

  setClaimsData(data: IClaimsDto): void {
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
      registrationNumber: data.RegistrationNumber,
      claimNature: data.ClaimNature,
      dateOfIncident: this.commonService.getDateFromIDateDto(data.DateOfIncidentDateDto as IDateDto),
      personLocation: data.PersonLocation
    });
  }
}
