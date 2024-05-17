import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ICommonDto } from 'src/app/app-entites/dtos/common/common-dto';
import { IDropDownDto } from 'src/app/app-entites/dtos/common/drop-down-dto';
import { ICommonService } from 'src/app/app-services/common-service/abstracts/common.iservice';
import { ReportService } from 'src/app/app-services/report-service/report.service';
import { Vertical } from 'src/app/shared/utilities/enums/enum';
import { WorkBook, WorkSheet, utils, writeFile } from 'xlsx';

@Component({
  selector: 'app-renewal-perfomance-motor',
  templateUrl: './renewal-perfomance-motor.component.html',
  styleUrls: ['./renewal-perfomance-motor.component.css']
})
export class RenewalPerfomanceMotorComponent implements OnInit {
  public _insuranceCompanies: IDropDownDto<number>[] = [];
  public _filteredInsuranceCompaniesOptions: IDropDownDto<number>[] = [];
  private _branchId: any;
  public _teamMember: IDropDownDto<number>[] = [];

  rows :any[] = [];

  loadingIndicator = false;
  reorderable = true;
  ColumnMode = ColumnMode;
  columns = [
    { prop: 'ControlNo', name: 'Control No' },
    { prop: 'PolicyStartDate', name: 'Policy Start Date' },
    { prop: 'InsuranceCompanyName', name: 'Insurance Company Name' },
    { prop: 'NameInPolicy', name: 'Name In Policy' },
    { prop: 'ModelName', name: 'Customer Code' },
    { prop: 'RegistrationNo', name: 'Model Name' },
    { prop: 'MakeYear', name: 'Make Year' },
    { prop: 'POSName', name: 'POS Name' },
    { prop: 'RenewControlNo', name: 'Renewal Control No' },
    { prop: 'RenewalInsuranceCompany', name: 'Renewal Insurance Company' },
    { prop: 'RenewalStatus', name: 'Renewal Status' },
  ]
   //#region Policy Term Form
   renewalperfomancemotor = new FormGroup({
    insuranceCompanyId: new FormControl(''),
    expiryDateTo: new FormControl(''),
    expiryDateTo_dump: new FormControl('',Validators.required),
    expiryDateFrom: new FormControl(''),
    expiryDateFrom_dump: new FormControl('',Validators.required),
    businessType: new FormControl(''),
    teamMemberId: new FormControl(''),
    branchId: new FormControl(''),
 })
  constructor(
    private commonService: ICommonService,
    private reportService: ReportService
  ) { 
    this._branchId = sessionStorage.getItem("branchId");
  }


  ngOnInit(): void {

    this.renewalperfomancemotor.get("insuranceCompanyId")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterInsurancerCompaniesData(input);
      else
        this.filterInsurancerCompaniesData(input.Name);
    });

    this.getInsuranceCompanies();
    this.getTeleCallers(this._branchId);
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
    this.renewalperfomancemotor.get("branchId").setValue(this._branchId);
    let policyStartDate = this.commonService.getDateInString(new Date(this.renewalperfomancemotor.value.expiryDateFrom_dump));
    let policyEndDate = this.commonService.getDateInString(new Date(this.renewalperfomancemotor.value.expiryDateTo_dump));

    this.renewalperfomancemotor.patchValue({
      expiryDateFrom: policyStartDate,
      expiryDateTo :policyEndDate
    });

    this.reportService.getRenewPeformanceReport(this.renewalperfomancemotor.getRawValue()).subscribe((response: ICommonDto<any>) => {
      this.rows= response.Response;
    });

  }

  getTeamMembers(): any {
    this.commonService.getAllTeamMembers(0, this._branchId).subscribe((response: IDropDownDto<number>[]) => {
      this._teamMember  = response;
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
    writeFile(wb, 'Renewal-' + this.renewalperfomancemotor.value.expiryDateFrom+ '-'  + this.renewalperfomancemotor.value.expiryDateTo +'.xlsx');
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
    this.renewalperfomancemotor.reset()
  }

  

  
  getTeleCallers(branchId: number): any {
    this.commonService.getTeleCallers(Vertical.Motor, branchId).subscribe((response: any) => {
      this._teamMember = response;
    });
  }

}
