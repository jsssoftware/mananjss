import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ICommonDto } from 'src/app/app-entites/dtos/common/common-dto';
import { IDateDto } from 'src/app/app-entites/dtos/common/date-dto';
import { IDropDownDto } from 'src/app/app-entites/dtos/common/drop-down-dto';
import { IInspectionDocumentDto } from 'src/app/app-entites/dtos/inspection/inspection-document-dto';
import { IInspectionDto } from 'src/app/app-entites/dtos/inspection/inspection-dto';
import { IInspectionSearchPolicyDto } from 'src/app/app-entites/dtos/inspection/inspection-search-policy-dto';
import { IAddUpdateInspectionModel } from 'src/app/app-entites/models/inspection/add-update-inspection-model';
import { IInspectionDocumentModel } from 'src/app/app-entites/models/inspection/inspection-document-model';
import { ICommonService } from 'src/app/app-services/common-service/abstracts/common.iservice';
import { IInspectionService } from 'src/app/app-services/inspection/abstracts/inspection.iservice';
import { FormMode, Vertical } from 'src/app/shared/utilities/enums/enum';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { SearchPolicyInspectionComponent } from '../search-policy-inspection/search-policy-inspection.component';

@Component({
  selector: 'app-add-inspection',
  templateUrl: './add-inspection.component.html',
  styleUrls: ['./add-inspection.component.css']
})
export class AddInspectionComponent implements OnInit {

  public _form: number;
  public _header: string = '';
  public _isFormControlDisabled: boolean = false;
  public _manufacturers: IDropDownDto<number>[] = [];
  public _filteredManufacturers: IDropDownDto<number>[] = [];
  public _insuranceCompanies: IDropDownDto<number>[] = [];
  public _filteredInsuranceCompaniesOptions: IDropDownDto<number>[] = [];
  public _verticals: any;
  public _models: IDropDownDto<number>[] = [];
  public _posDatas: IDropDownDto<number>[] = [];
  public _filteredPosOptions: IDropDownDto<number>[] = [];
  public _branchId: number;
  public _teamMembers: IDropDownDto<number>[] = [];
  public _filteredTeamMemberOptions: IDropDownDto<number>[] = [];
  public _makeYears: IDropDownDto<number>[] = [];
  public _inspectionStatus: IDropDownDto<number>[] = [];
  public _inspectionReasons: IDropDownDto<number>[] = [];
  public _inspectionCompanies: IDropDownDto<number>[] = [];
  public _inspectionSubStatus: IDropDownDto<number>[] = [];
  public _documentTypes: IDropDownDto<number>[] = [];
  _matcher = new ErrorStateMatcher();
  public _inspectionUploadDocuments: IInspectionDocumentModel[] = [];
  public _dataSourceUploadDocuments: MatTableDataSource<IInspectionDocumentDto> = new MatTableDataSource<IInspectionDocumentDto>();
  public _inspectionDocuments: IInspectionDocumentDto[] = [];
  public _inspectionId: number;
  public _status: string = '';
  public _subStatus: string = '';
  public _displayedColumns: string[] = [
    'sno',
    'documentTypeName',
    'fileName',
    'remarks',
    'documentTypeId'
  ];

  inspectionForm = new FormGroup({
    policyId: new FormControl(''),
    controlNumber: new FormControl(''),
    customerId: new FormControl(''),
    customerName: new FormControl('', [Validators.required]),
    contactPerson: new FormControl(''),
    mobileNumber: new FormControl('', [Validators.required]),
    email: new FormControl(''),
    locationAddress: new FormControl('', [Validators.required]),
    registrationNumber: new FormControl('', [Validators.required]),
    makeYearId: new FormControl(''),
    manufacturer: new FormControl(''),
    modelId: new FormControl(''),
    insuranceCompanyId: new FormControl('', [Validators.required]),
    engineNumber: new FormControl(''),
    chassisNumber: new FormControl(''),
    inspectionDate: new FormControl('', [Validators.required]),
    inspectionReasonId: new FormControl('', [Validators.required]),
    posId: new FormControl(''),
    teamMemberId: new FormControl(''),
    referTypeId: new FormControl('', [Validators.required]),
    inspectionLeadNumber: new FormControl(''),
    inspectionCompanyId: new FormControl(''),
    surveyorName: new FormControl(''),
    surveyorMobile: new FormControl(''),
    surveyorEmail: new FormControl(''),
    inspectionStatusId: new FormControl(''),
    inspectionSubStatusId: new FormControl(''),
    remarks: new FormControl(''),
    browse: new FormControl(''),
    documentType: new FormControl(''),
    documentRemarks: new FormControl(''),
  });

  constructor(private commonService: ICommonService,
    private inspectionService: IInspectionService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this._branchId = parseInt(sessionStorage.getItem("branchId") as string);
    this._form = parseInt(this.route.snapshot.paramMap.get('form-type') as string);
    this._inspectionId = parseInt(this.route.snapshot.paramMap.get('inspectionId') as string);
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

    this.inspectionForm.get("manufacturer")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterManufacturerData(input);
      else
        this.filterManufacturerData(input.Name);
    });

    this.inspectionForm.get("insuranceCompanyId")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterInsurancerCompaniesData(input);
      else
        this.filterInsurancerCompaniesData(input.Name);
    });

    this.inspectionForm.get("posId")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterPosData(input);
      else
        this.filterPosData(input.Name);
    });

    this.inspectionForm.get("teamMemberId")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterTeamMemberData(input);
      else
        this.filterTeamMemberData(input.Name);
    });

    this.inspectionForm.get('referTypeId')?.valueChanges.subscribe(value => {
      if (value == '1') {
        this.inspectionForm.get('teamMemberId')?.enable();
        this.inspectionForm.get('posId')?.disable();
        this.inspectionForm.patchValue({ posId: '' });
      }
      else {
        this.inspectionForm.get('posId')?.enable();
        this.inspectionForm.get('teamMemberId')?.disable();
        this.inspectionForm.patchValue({ teamMemberId: '' });
      }
    });
  }

  ngAfterViewInit(): void {
    this.getPos();
    this.getTeamMembers(Vertical.Motor);
    this.getManufacturers();
    this.getInsuranceCompanies();
    this.getMakeYears();
    this.getDocumentTypes();
    this.getInspectionStatus();
    this.getInspectionReasons();
    this.getInspectionCompanies();
    if (this._inspectionId > 0) {
      this.getInspectionById(this._inspectionId);
      this.getInspectionDocuments(this._inspectionId);
    }
  }

  onSubmit() {
    if (this.inspectionForm.invalid) return;

    const model = this.getPayload();
    if (this._form == FormMode.Add) {
      this.inspectionService.addInspection(model).subscribe((response: ICommonDto<string>) => {
        if (response.IsSuccess) {
          Swal.fire({
            icon: 'success',
            title: 'Done',
            text: response.Message,
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['./subsystem/inspection']);
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
    else if (this._form == FormMode.Update) {
      this.inspectionService.updateInspection(this._inspectionId, model).subscribe((response: ICommonDto<string>) => {
        if (response.IsSuccess) {
          Swal.fire({
            icon: 'success',
            title: 'Done',
            text: response.Message,
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['./subsystem/inspection']);
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
  };

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

  filterTeamMemberData(input: any) {
    if (input === undefined)
      return;
    this._filteredTeamMemberOptions = this._teamMembers.filter(item => {
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

  getPosName(value: number): string {
    return value ? this._posDatas.filter(f => f.Value == value)[0].Name : '';
  }

  getTeamMemberName(value: number): string {
    return value ? this._teamMembers.filter(f => f.Value == value)[0].Name : '';
  }

  getTeamMembers(vertical: number): void {
    this.commonService.getAllTeamMembers(vertical, this._branchId).subscribe((response: IDropDownDto<number>[]) => {
      this._teamMembers = response;
    });
  }

  getMakeYears(): void {
    this.commonService.getMakeYears(0).subscribe((response: IDropDownDto<number>[]) => {
      this._makeYears = response;
    });
  }

  getDocumentTypes(): void {
    this.commonService.getDocumentTypes('inspection').subscribe((response: IDropDownDto<number>[]) => {
      this._documentTypes = response;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(SearchPolicyInspectionComponent, {
      width: '90%',
      height: '90%'
    }).afterClosed().subscribe((data) => {
      this.setPolicyData(data);
    });
  }

  setPolicyData(data: IInspectionSearchPolicyDto): void {
    if (!data || data == null) return;

    this.getModels(data.ManufacturerId);
    this.inspectionForm.patchValue({
      controlNumber: data.ControlNumber,
      customerName: data.Customer,
      registrationNumber: data.RegistrationNumber,
      makeYearId: data.MakeYearId,
      manufacturer: { Name: data.Manufacturer, Value: data.ManufacturerId },
      modelId: data.ModelId,
      engineNumber: data.EngineNumber,
      chassisNumber: data.ChassisNumber
    });
  }

  onClose(): void {
    this.router.navigate(['./subsystem/inspection']);
  }

  addDocument(): void {
    let reader = new FileReader();

    reader.onload = () => {
      const uniqueId = uuidv4();
      let document: IInspectionDocumentModel = {
        UniqueId: uniqueId,
        DocumentBase64: reader.result as string,
        DocumentTypeId: this.inspectionForm.value.documentType.Value,
        FileName: this.inspectionForm.value.browse._fileNames,
        Remarks: this.inspectionForm.value.documentRemarks == "" ? "NA" : this.inspectionForm.value.documentRemarks
      };

      this._inspectionUploadDocuments = [document, ...this._inspectionUploadDocuments]
      this._inspectionDocuments.push({
        Id: 0,
        UniqueId: document.UniqueId,
        DocumentTypeName: this.inspectionForm.value.documentType.Name,
        FileName: document.FileName,
        Remarks: document.Remarks
      });

      this._dataSourceUploadDocuments = new MatTableDataSource<IInspectionDocumentDto>(this._inspectionDocuments);
      this.inspectionForm.patchValue({
        documentType: '',
        browse: '',
        documentRemarks: ''
      });
    }

    if (this.inspectionForm.value.documentType && this.inspectionForm.value.browse) {
      reader.readAsDataURL(this.inspectionForm.value.browse._files[0]);
    }
  }

  deleteUploadDocument(uniqueId: string): void {
    let index = this._inspectionUploadDocuments.findIndex(f => f.UniqueId === uniqueId);
    if (index > -1) {
      this._inspectionUploadDocuments.splice(index, 1);
    }

    index = this._inspectionDocuments.findIndex(f => f.UniqueId === uniqueId);
    if (index > -1) {
      this._inspectionDocuments.splice(index, 1);
      this._dataSourceUploadDocuments = new MatTableDataSource<IInspectionDocumentDto>(this._inspectionDocuments);
    }
  }

  deleteInspectionDocumentFromServer(data: IInspectionDocumentDto): void {
    if (this._isFormControlDisabled) return;

    this.inspectionService.deleteInspectionDocument(data.Id).subscribe((response: ICommonDto<string>) => {
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

  getInspectionStatus(): void {
    this.commonService.getInspectionStatus().subscribe((response: IDropDownDto<number>[]) => {
      this._inspectionStatus = response;
    });
  }

  getInspectionSubStatus(inspectionStatusId: number): void {
    this.commonService.getInspectionSubStatus(inspectionStatusId).subscribe((response: IDropDownDto<number>[]) => {
      this._inspectionSubStatus = response;
    });
  }

  getInspectionReasons(): void {
    this.commonService.getInspectionReasons().subscribe((response: IDropDownDto<number>[]) => {
      this._inspectionReasons = response;
    });
  }

  getInspectionCompanies(): void {
    this.commonService.getInspectionCompanies().subscribe((response: IDropDownDto<number>[]) => {
      this._inspectionCompanies = response;
    });
  }

  getInspectionById(inspectionId: number): void {
    this.inspectionService.getInspectionById(inspectionId).subscribe((response: IInspectionDto) => {
      this.setInspectionDetails(response);
    });
  }

  setInspectionDetails(data: IInspectionDto): void {
    this._status = data.InspectionStatus;
    this._subStatus = data.InspectionSubStatus;

    this.getInspectionSubStatus(data.InspectionStatusId);
    this.getModels(data.ManufactureId);

    const manufacturer = this._manufacturers.filter(f => f.Value == data.ManufactureId)[0];
    const insurance = this._insuranceCompanies.filter(f => f.Value == data.InsuranceCompanyId)[0];

    this.inspectionForm.patchValue({
      policyId: 0,
      customerId: 0,
      controlNumber: data.ControlNumber,
      customerName: data.CustomerName,
      contactPerson: data.ContactPerson,
      mobileNumber: data.MobileNumber,
      email: data.Email,
      locationAddress: data.LocationAddress,
      registrationNumber: data.RegistrationNumber,
      makeYearId: data.MakeYearId,
      manufacturer: manufacturer,
      modelId: data.ModelId,
      insuranceCompanyId: insurance,
      engineNumber: data.EngineNumber,
      chassisNumber: data.ChassisNumber,
      inspectionDate: this.commonService.getDateFromIDateDto(data.InspectionDateDto as IDateDto),
      inspectionReasonId: data.InspectionReasonId,
      posId: data.PosId,
      teamMemberId: data.TeamMemberId,
      referTypeId: data.ReferTypeId,
      inspectionLeadNumber: data.InspectionLeadNumber,
      inspectionCompanyId: data.InspectionCompanyId,
      surveyorName: data.SurveyorName,
      surveyorMobile: data.SurveyorMobile,
      surveyorEmail: data.SurveyorEmail,
      inspectionStatusId: data.InspectionStatusId,
      inspectionSubStatusId: data.InspectionSubStatusId,
      remarks: data.Remarks
    });
  }

  getInspectionDocuments(inspectionId: number): void {
    this.inspectionService.getInspectionDocumentsByInspectionId(inspectionId).subscribe((response: IInspectionDocumentDto[]) => {
      this._inspectionDocuments = response;
      this._dataSourceUploadDocuments = new MatTableDataSource<IInspectionDocumentDto>(this._inspectionDocuments);
    });
  }

  private getPayload(): IAddUpdateInspectionModel {
    return {
      PolicyId: this.inspectionForm.get('policyId')?.value,
      ChassisNumber: this.inspectionForm.get('chassisNumber')?.value,
      ContactPerson: this.inspectionForm.get('contactPerson')?.value,
      ControlNumber: this.inspectionForm.get('controlNumber')?.value,
      CustomerId: this.inspectionForm.get('customerId')?.value,
      CustomerName: this.inspectionForm.get('customerName')?.value,
      Email: this.inspectionForm.get('email')?.value,
      EngineNumber: this.inspectionForm.get('engineNumber')?.value,
      InspectionCompanyId: this.inspectionForm.get('inspectionCompanyId')?.value,
      InspectionDate: this.commonService.getDateInString(this.inspectionForm.get('inspectionDate')?.value),
      InspectionLeadNumber: this.inspectionForm.get('inspectionLeadNumber')?.value,
      InspectionReasonId: this.inspectionForm.get('inspectionReasonId')?.value,
      InspectionStatusId: this.inspectionForm.get('inspectionStatusId')?.value,
      InspectionSubStatusId: this.inspectionForm.get('inspectionSubStatusId')?.value,
      InsuranceCompanyId: this.inspectionForm.get('insuranceCompanyId')?.value?.Value,
      LocationAddress: this.inspectionForm.get('locationAddress')?.value,
      MakeYearId: this.inspectionForm.get('makeYearId')?.value,
      ManufactureId: this.inspectionForm.get('manufacturer')?.value?.Value,
      MobileNumber: this.inspectionForm.get('mobileNumber')?.value,
      ModelId: this.inspectionForm.get('modelId')?.value,
      PosId: this.inspectionForm.get('posId')?.value,
      ReferTypeId: this.inspectionForm.get('referTypeId')?.value,
      RegistrationNumber: this.inspectionForm.get('registrationNumber')?.value,
      Remarks: this.inspectionForm.get('remarks')?.value,
      SurveyorName: this.inspectionForm.get('surveyorName')?.value,
      SurveyorEmail: this.inspectionForm.get('surveyorEmail')?.value,
      SurveyorMobile: this.inspectionForm.get('surveyorMobile')?.value,
      TeamMemberId: this.inspectionForm.get('teamMemberId')?.value,
      InspectionDocuments: this._inspectionUploadDocuments,
    };
  }
}