import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ICommonDto } from 'src/app/app-entites/dtos/common/common-dto';
import { IDropDownDto } from 'src/app/app-entites/dtos/common/drop-down-dto';
import { ICommonService } from 'src/app/app-services/common-service/abstracts/common.iservice';
import { ReportService } from 'src/app/app-services/report-service/report.service';
import { Vertical } from 'src/app/shared/utilities/enums/enum';
import { Router, ActivatedRoute } from '@angular/router';
import { IDataTableDto } from 'src/app/app-entites/dtos/common/data-table-dto';
import { MatDialog } from '@angular/material/dialog';
import { AgentSwapDialogComponent } from '../../shared/agent-swap-dialog/agent-swap-dialog.component';
import { MatRadioChange } from '@angular/material/radio';
import { DatePipe } from '@angular/common';
import { MasterService } from 'src/app/app-services/master-service/master.service';
import { WorkBook, WorkSheet, utils, writeFile } from 'xlsx';

@Component({
  selector: 'app-lost-data-calling',
  templateUrl: './lost-data-calling.component.html',
  styleUrls: ['./lost-data-calling.component.css']
})
export class LostDataCallingComponent implements OnInit {


  loadingIndicator = false;
  reorderable = true;
  ColumnMode = ColumnMode;
  public _insuranceCompanies: IDropDownDto<number>[] = [];
  public _filteredInsuranceCompaniesOptions: IDropDownDto<number>[] = [];
  rows :any[] = [];
  public _posDatas: IDropDownDto<number>[] = [];
  public _posDatasales: IDropDownDto<number>[] = [];
  public _teamMembers: any[] = [];
  public _teamMemberSales: any[] = [];
  private _branchId: any;
  private _vertical: any;
  public isMotor :boolean = true;

   columns = [
    { prop: 'ControlNo', name: 'Control Number' },
    { prop: 'LoyaltyCounter', name: 'Loyalty Counter' },
    { prop: 'CustomerCode', name: 'Customer Code' },
    { prop: 'InsCompShortName', name: 'Insurance Company' },
    { prop: 'PolicyType', name: 'Policy Type' },
    { prop: 'NameInPolicy', name: 'Name In Policy' },
    { prop: 'CustomerType', name: 'Customer Type' },
    { prop: 'CustomerAddress1', name: 'Customer Address' },
    { prop: 'CityName', name: 'City Name' },
    { prop: 'CustomerPinCode1', name: 'Customer Pin Code' },
    { prop: 'ClusterName', name: 'Cluster Name' },
    { prop: 'ClusterCode', name: 'Cluster Code' },
    { prop: 'TerritoryName', name: 'Territory Name' },
    { prop: 'CustomerPhone1', name: 'Customer Phone 1' },
    { prop: 'CustomerPhone2', name: 'Customer Phone 2' },
    { prop: 'CustomerMobile1', name: 'Customer Mobile 1' },
    { prop: 'CustomerMobile2', name: 'Customer Mobile 2' },
    { prop: 'CustomerEmail1', name: 'Customer Email 1' },
    { prop: 'AadhaarNo', name: 'Aadhaar Number' },
    { prop: 'CustomerEmail2', name: 'Customer Email 2' },
    { prop: 'CoverNoteNo', name: 'Cover Note Number' },
    { prop: 'PolicyNo', name: 'Policy Number' },
    { prop: 'PolicyStartDate', name: 'Policy Start Date' },
    { prop: 'PolicyEndDate', name: 'Policy End Date' },
    { prop: 'NoofYear', name: 'Number of Years' },
    { prop: 'FinancerName', name: 'Financer Name' },
    { prop: 'PrevInsCompany', name: 'Previous Insurance Company' },
    { prop: 'PreviousPolicyNo', name: 'Previous Policy Number' },
    { prop: 'PreviousPolicyEndDate', name: 'Previous Policy End Date' },
    { prop: 'NomineeName', name: 'Nominee Name' },
    { prop: 'NomineeAge', name: 'Nominee Age' },
    { prop: 'Gender', name: 'Gender' },
    { prop: 'NomineeRelation', name: 'Nominee Relation' },
    { prop: 'ManufacturerName', name: 'Manufacturer Name' },
    { prop: 'ModelName', name: 'Model Name' },
    { prop: 'VariantName', name: 'Variant Name' },
    { prop: 'FuelType', name: 'Fuel Type' },
    { prop: 'EngineNo', name: 'Engine Number' },
    { prop: 'ChassisNo', name: 'Chassis Number' },
    { prop: 'CubicCapacity', name: 'Cubic Capacity' },
    { prop: 'SeatingCapacity', name: 'Seating Capacity' },
    { prop: 'MakeYear', name: 'Make Year' },
    { prop: 'RegistrationNo', name: 'Registration Number' },
    { prop: 'RTOZoneName', name: 'RTO Zone Name' },
    { prop: 'VehicleClass', name: 'Vehicle Class' },
    { prop: 'GrossPremium', name: 'Gross Premium' },
    { prop: 'VehicleIDV', name: 'Vehicle IDV' },
    { prop: 'CNGIDV', name: 'CNG IDV' },
    { prop: 'ElectricAssessoriesIDV', name: 'Electric Accessories IDV' },
    { prop: 'TotalIDV', name: 'Total IDV' },
    { prop: 'OD', name: 'OD' },
    { prop: 'NCBPercentage', name: 'NCB Percentage' },
    { prop: 'SpecialDiscount', name: 'Special Discount' },
    { prop: 'TotalOD', name: 'Total OD' },
    { prop: 'TotalGrossPremium', name: 'Total Gross Premium' },
    { prop: 'Loading', name: 'Loading' },
    { prop: 'AddonRiderName', name: 'Addon Rider Name' },
    { prop: 'PAN', name: 'PAN' },
    { prop: 'GSTIN', name: 'GSTIN' },
    { prop: 'TeleCaller', name: 'Tele Caller' },
    { prop: 'DSAName', name: 'DSA Name' },
    { prop: 'FOS', name: 'FOS' },
    { prop: 'BusinessDoneBy', name: 'Business Done By' },
    { prop: 'PolicyRemarks', name: 'Policy Remarks' },
    { prop: 'PolicyStatus', name: 'Policy Status' },
    { prop: 'EndorsementReason', name: 'Endorsement Reason' },
    { prop: 'PolicyCancelDate', name: 'Policy Cancel Date' },
    { prop: 'ReferenceName', name: 'Reference Name' },
    { prop: 'EndorseGrossPremium', name: 'Endorse Gross Premium' },
    { prop: 'EndorseOD', name: 'Endorse OD' },
    { prop: 'AddonOD', name: 'Addon OD' },
    { prop: 'GVW', name: 'GVW' },
    { prop: 'Exshowroom', name: 'Ex-showroom Price' },
    { prop: 'RegistrationDate', name: 'Registration Date' },
    { prop: 'IRDACommissionReceived', name: 'IRDA Commission Received' },
    { prop: 'MonthCycle', name: 'Month Cycle' },
    { prop: 'POSCommissionReceived', name: 'POS Commission Received' },
    { prop: 'CommMonth', name: 'Comm Month' },
    { prop: 'CategoryName', name: 'Category Name' },
    { prop: 'DSAManageByName', name: 'DSA Manage By Name' },
    { prop: 'CustomerContact', name: 'Customer Contact' },
    { prop: 'CustomerDOB', name: 'Customer Date of Birth' },
    { prop: 'IsDecisionMaker', name: 'Is Decision Maker' },
    { prop: 'BusinessTypeName', name: 'Business Type Name' },
    { prop: 'IndustryName', name: 'Industry Name' },
    { prop: 'PolicyPackageType', name: 'Policy Package Type' },
    { prop: 'PolicyStartDateOD', name: 'Policy Start Date OD' },
    { prop: 'PolicyEndDateOD', name: 'Policy End Date OD' },
    { prop: 'InsuranceCompanyId', name: 'Insurance Company ID' },
    { prop: 'InsuranceCompanyODId', name: 'Insurance Company OD ID' },
];
  //#region
  lostdata = new FormGroup({
    insuranceCompanyId: new FormControl(''),
    policyExpiryDateFrom: new FormControl(''),
    policyExpiryDateFrom_dump: new FormControl(''),
    policyExpiryDateTo: new FormControl(''),
    policyExpiryDateTo_dump: new FormControl(''),
    posNameId: new FormControl(''),
    branchId: new FormControl(''),
    teamMemberType: new FormControl(''),
  }); 
  ELEMENT_DATA: any;
  constructor(
    private commonService: ICommonService,
    private reportService: ReportService,
    public dialog :MatDialog,
  ) {
    this._branchId = sessionStorage.getItem("branchId");
  }

  ngOnInit(): void {
    this.getPos(this._branchId);
    this.getInsuranceCompanies();
    this.lostdata.get("insuranceCompany")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterInsurancerCompaniesData(input);
      else
        this.filterInsurancerCompaniesData(input.Name);
    });
  }

  
  getInsuranceCompanyName(value: number): string {
    return value ? this._insuranceCompanies.filter(f => f.Value == value)[0].Name : '';
  }


  getInsuranceCompanies(): any {
    this.commonService.getInsuranceCompanies(Vertical.Motor).subscribe((response: IDropDownDto<number>[]) => {
      this._insuranceCompanies =  response;
    });
  }

  getPos(branchId: number): void {
    this.commonService.getPos(Vertical.Motor, branchId).subscribe((response: IDropDownDto<number>[]) => {
      this._posDatas = response;
    })
  }

  reset(){
    this.lostdata.reset()
  }



  submit(){
    this.lostdata.get("branchId").setValue(this._branchId);
    let policyStartDate = this.commonService.getDateInString(new Date(this.lostdata.value.policyStartDateFrom_dump));
    let policyEndDate = this.commonService.getDateInString(new Date(this.lostdata.value.policyStartDateTo_dump));

    this.lostdata.patchValue({
      policyStartDateFrom: policyStartDate,
      policyStartDateTo :policyEndDate
    });

    this.reportService.getLostData(this.lostdata.getRawValue()).subscribe((response: ICommonDto<any[]>) => {
      this.rows = [...response.Response];
      /* this.columns = Object.keys(this.rows[0]).map(key => {
        return { prop: key, name: key.split(/(?=[A-Z])/).join(' ') }; // Splitting camelCase and joining with spaces
    }); */
    });

  }

  async downloadExcel(){
    this.lostdata.get("branchId").setValue(this._branchId);
    let policyStartDate = this.commonService.getDateInString(new Date(this.lostdata.value.policyStartDateFrom_dump));
    let policyEndDate = this.commonService.getDateInString(new Date(this.lostdata.value.policyStartDateTo_dump));

    this.lostdata.patchValue({
      policyStartDateFrom: policyStartDate,
      policyStartDateTo :policyEndDate
    });

    this.reportService.getLostData(this.lostdata.getRawValue()).subscribe((response: ICommonDto<any[]>) => {
      this.rows = [...response.Response];
       this.exportexcel();

    });
  }

  

  
  filterInsurancerCompaniesData(input: any) {
    if (input === undefined)
      return;
    this._filteredInsuranceCompaniesOptions = this._insuranceCompanies.filter(item => {
      return item.Name?.toLowerCase().indexOf(input.toLowerCase()) > -1
    });
  }

  
  exportexcel(): void
  {
    const fileData = this.getExcelData(this.rows);
    /* pass here the data source */
    const ws: WorkSheet =utils.json_to_sheet(fileData);
    /* generate workbook and add the worksheet */
    const wb: WorkBook = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */  
    writeFile(wb, 'Lost Data-' + this.lostdata.value.policyExpiryDateFrom+ '-'  + this.lostdata.value.policyExpiryDateTo +'.xlsx');
  }

  getExcelData(data:any) {
    const excelData = [];

    data.map((row:any) => {
      const newRow = {};

      this.columns.forEach((column) => {
        newRow[column.name] = row[column.prop];
      });
      
      excelData.push(newRow);
    });

    return excelData;
  }
}
