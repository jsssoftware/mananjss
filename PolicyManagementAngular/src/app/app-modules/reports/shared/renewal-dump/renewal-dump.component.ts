import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ICommonDto } from 'src/app/app-entites/dtos/common/common-dto';
import { IDropDownDto } from 'src/app/app-entites/dtos/common/drop-down-dto';
import { ICommonService } from 'src/app/app-services/common-service/abstracts/common.iservice';
import { ReportService } from 'src/app/app-services/report-service/report.service';
import { Vertical } from 'src/app/shared/utilities/enums/enum';
import { WorkBook, WorkSheet, utils, writeFile } from 'xlsx';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-renewal-dump',
  templateUrl: './renewal-dump.component.html',
  styleUrls: ['./renewal-dump.component.css']
})
export class RenewalDumpComponent implements OnInit {
  public _insuranceCompanies: IDropDownDto<number>[] = [];
  public _filteredInsuranceCompaniesOptions: IDropDownDto<number>[] = [];
  private _branchId: any;
  private _posManagedBy: any;
  public _teamMember: IDropDownDto<number>[] = [];
  public _filteredPosOptions: IDropDownDto<number>[] = [];
  public _posDatas: IDropDownDto<number>[] = [];
  public isMotor :boolean = true;
  rows :any[] = [];

  loadingIndicator = false;
  reorderable = true;
  ColumnMode = ColumnMode;
   columns = [
    { prop: 'PolicyId', name: 'Policy ID' },
    { prop: 'ControlNo', name: 'Control No' },
    { prop: 'LoyaltyCounter', name: 'Loyalty Counter' },
    { prop: 'CustomerCode', name: 'Customer Code' },
    { prop: 'TPInsCompany', name: 'Third Party Insurance Company' },
    { prop: 'PolicyTypeId', name: 'Policy Type ID' },
    { prop: 'PolicyType', name: 'Policy Type' },
    { prop: 'NameInPolicy', name: 'Name in Policy' },
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
    { prop: 'NomineeGenderId', name: 'Nominee Gender ID' },
    { prop: 'NomineeRelation', name: 'Nominee Relation' },
    { prop: 'ManufacturerName', name: 'Manufacturer Name' },
    { prop: 'ModelName', name: 'Model Name' },
    { prop: 'VariantName', name: 'Variant Name' },
    { prop: 'FuelType', name: 'Fuel Type' },
    { prop: 'TitleName', name: 'Title Name' },
    { prop: 'ODInsCompany', name: 'Own Damage Insurance Company' },
    { prop: 'PolicyStartDateOD', name: 'Policy Start Date (OD)' },
    { prop: 'PolicyEndDateOD', name: 'Policy End Date (OD)' },
    { prop: 'PolicyNoOD', name: 'Policy Number (OD)' },
    { prop: 'PolicyPackageType', name: 'Policy Package Type' },
    { prop: 'CubicCapacity', name: 'Cubic Capacity' },
    { prop: 'SeatingCapacity', name: 'Seating Capacity' },
    { prop: 'MakeYear', name: 'Make Year' },
    { prop: 'RegistrationNo', name: 'Registration Number' },
    { prop: 'EngineNo', name: 'Engine Number' },
    { prop: 'ChassisNo', name: 'Chassis Number' },
    { prop: 'RTOZoneName', name: 'RTO Zone Name' },
    { prop: 'VehicleClass', name: 'Vehicle Class' },
    { prop: 'GrossPremium', name: 'Gross Premium' },
    { prop: 'VehicleIDV', name: 'Vehicle IDV' },
    { prop: 'CNGIDV', name: 'CNG IDV' },
    { prop: 'ElectricAssessoriesIDV', name: 'Electric Accessories IDV' },
    { prop: 'NonElectricAssessoriesIDV', name: 'Non-Electric Accessories IDV' },
    { prop: 'TotalIDV', name: 'Total IDV' },
    { prop: 'OD', name: 'Own Damage' },
    { prop: 'NCBPercentage', name: 'NCB Percentage' },
    { prop: 'SpecialDiscount', name: 'Special Discount' },
    { prop: 'TotalOD', name: 'Total Own Damage' },
    { prop: 'TotalGrossPremium', name: 'Total Gross Premium' },
    { prop: 'Loading', name: 'Loading' },
    { prop: 'AddonRiderName', name: 'Addon Rider Name' },
    { prop: 'PAN', name: 'PAN' },
    { prop: 'GSTIN', name: 'GSTIN' },
    { prop: 'TeleCaller', name: 'Tele Caller' },
    { prop: 'POSName', name: 'POS Name' },
    { prop: 'FOS', name: 'Field Officer' },
    { prop: 'BusinessDoneBy', name: 'Business Done By' },
    { prop: 'PolicyRemarks', name: 'Policy Remarks' },
    { prop: 'PolicyStatus', name: 'Policy Status' },
    { prop: 'EndorsementReason', name: 'Endorsement Reason' },
    { prop: 'PolicyCancelDate', name: 'Policy Cancel Date' },
    { prop: 'ReferenceName', name: 'Reference Name' },
    { prop: 'EndorseGrossPremium', name: 'Endorse Gross Premium' },
    { prop: 'EndorseOD', name: 'Endorse Own Damage' },
    { prop: 'AddonOD', name: 'Addon Own Damage' },
    { prop: 'GVW', name: 'Gross Vehicle Weight' },
    { prop: 'Exshowroom', name: 'Ex-showroom' },
    { prop: 'RegistrationDate', name: 'Registration Date' },
    { prop: 'IRDACommissionReceived', name: 'IRDA Commission Received' },
    { prop: 'MonthCycle', name: 'Month Cycle' },
    { prop: 'POSCommissionReceived', name: 'POS Commission Received' },
    { prop: 'commMonth', name: 'Commission Month Cycle' },
    { prop: 'CategoryName', name: 'Category Name' },
    { prop: 'POSManageByName', name: 'POS Managed By' },
    { prop: 'CustomerContact', name: 'Customer Contact' },
    { prop: 'CustomerDOB', name: 'Customer Date of Birth' },
    { prop: 'ClusterId', name: 'Cluster ID' },
    { prop: 'TerritoryId', name: 'Territory ID' },
    { prop: 'IsDecisionMaker', name: 'Is Decision Maker' },
    { prop: 'BusinessTypeName', name: 'Business Type Name' },
    { prop: 'IndustryName', name: 'Industry Name' },
];

   renewaldump = new FormGroup({
    insuranceCompanyId: new FormControl(''),
    expiryDateTo: new FormControl(''),
    expiryDateTo_dump: new FormControl('',Validators.required),
    expiryDateFrom: new FormControl(''),
    expiryDateFrom_dump: new FormControl('',Validators.required),
    branchId: new FormControl(''),
    verticalId: new FormControl(1),
 })
  constructor(
    private commonService: ICommonService,
    private reportService: ReportService,
    private datePipe: DatePipe
  ) { 
    this._branchId = sessionStorage.getItem("branchId");
  }


  ngOnInit(): void {

    this.renewaldump.get("insuranceCompanyId")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterInsurancerCompaniesData(input);
      else
        this.filterInsurancerCompaniesData(input.Name);
    });


    this.getInsuranceCompanies();
  }

  getInsuranceCompanyName(value: number): string {
    return value ? this._insuranceCompanies.filter(f => f.Value == value)[0].Name : '';
  }

  
  
  getInsuranceCompanies(): any {
    this.commonService.getInsuranceCompanies(Vertical.Motor).subscribe((response: IDropDownDto<number>[]) => {
      this._insuranceCompanies =  response;
    });
  }


  
  filterInsurancerCompaniesData(input: any) {
    if (input === undefined)
      return;
    this._filteredInsuranceCompaniesOptions = this._insuranceCompanies.filter(item => {
      return item.Name?.toLowerCase().indexOf(input.toLowerCase()) > -1
    });
  }

  
  submit(){
    this.renewaldump.get("branchId").setValue(this._branchId);
    let policyStartDate = this.commonService.getDateInString(new Date(this.renewaldump.value.expiryDateFrom_dump));
    let policyEndDate = this.commonService.getDateInString(new Date(this.renewaldump.value.expiryDateTo_dump));

    this.renewaldump.patchValue({
      expiryDateFrom: policyStartDate,
      expiryDateTo :policyEndDate
    });

    this.reportService.getRenewalDump(this.renewaldump.getRawValue()).subscribe((response: ICommonDto<any>) => {
      this.rows= response.Response;
      this.rows = this.rows.map(row => ({
        ...row,
        CustomerDOB: this.datePipe.transform(row.CustomerDOB, 'dd/MM/yyyy'),
        PolicyCancelDate: this.datePipe.transform(row.PolicyCancelDate, 'dd/MM/yyyy'),
        PolicyStartDateOD: this.datePipe.transform(row.PolicyStartDateOD, 'dd/MM/yyyy'),
        PolicyEndDateOD: this.datePipe.transform(row.PolicyEndDateOD, 'dd/MM/yyyy'),
        PolicyStartDate: this.datePipe.transform(row.PolicyStartDate, 'dd/MM/yyyy'),
        PolicyEndDate: this.datePipe.transform(row.PolicyEndDate, 'dd/MM/yyyy'),
      }));
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
    writeFile(wb, 'Renewal-' + this.renewaldump.value.expiryDateFrom+ '-'  + this.renewaldump.value.expiryDateTo +'.xlsx');
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

  
  reset(){
    this.renewaldump.reset()
  }

  

  onRadioChange(event: MatRadioChange): void {
    if(event.value == 1){
      this.isMotor = true;
    }else{
      this.isMotor = false;
    }
  }



}
