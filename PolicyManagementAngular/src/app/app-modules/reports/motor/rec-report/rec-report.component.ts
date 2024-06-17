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
  selector: 'app-rec-report',
  templateUrl: './rec-report.component.html',
  styleUrls: ['./rec-report.component.css']
})
export class RECReportComponent implements OnInit {

  loadingIndicator = false;
  reorderable = true;
  ColumnMode = ColumnMode;
  public _insuranceCompanies: IDropDownDto<number>[] = [];
  public _telecallers: IDropDownDto<number>[] = [];
  public _refrences: IDropDownDto<number>[] = [];
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
    { prop: 'InsuranceCompanyName', name: 'Insurance Company Name' },
    { prop: 'ControlNo', name: 'Control No' },
    { prop: 'CoverNoteNo', name: 'Cover Note No' },
    { prop: 'PolicyNo', name: 'Policy No' },
    { prop: 'NameInPolicy', name: 'Name In Policy' },
    { prop: 'ModelName', name: 'Model Name' },
    { prop: 'POSName', name: 'POS Name' },
    { prop: 'RegistrationNo', name: 'Registration No' },
    { prop: 'EngineNo', name: 'Engine No' },
    { prop: 'ChassisNo', name: 'Chassis No' },
    { prop: 'EmployeeName', name: 'Employee Name' },
    { prop: 'PolicyStatus', name: 'Policy Status' },
    { prop: 'ReferenceName', name: 'Reference Name' }
];
  //#region
  recreport = new FormGroup({
    insuranceCompanyId: new FormControl(''),
    policyStartDateFrom: new FormControl(''),
    policyStartDateFrom_dump: new FormControl(''),
    policyStartDateTo: new FormControl(''),
    policyStartDateTo_dump: new FormControl(''),
    posNameId: new FormControl(''),
    inhouseId: new FormControl(''),
    refrenceId: new FormControl(''),
    branchId: new FormControl(''),
    rECType: new FormControl(1),
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
    this.getTelecaller();
    this.getRefrence();
    this.getFosNames();
    this.recreport.get("insuranceCompany")?.valueChanges.subscribe(input => {
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

  getTelecaller(): any {
    this.commonService.getTeleCallers(Vertical.Motor,this._branchId).subscribe((response: IDropDownDto<number>[]) => {
      this._telecallers =  response;
    });
  }

  getFosNames(): any {
    this.commonService.getFosNames(Vertical.Motor,this._branchId).subscribe((response: IDropDownDto<number>[]) => {
      this._telecallers.concat(response);
    });
  }

  getRefrence(): any {
    this.commonService.getReferences(this._branchId).subscribe((response: IDropDownDto<number>[]) => {
      this._refrences =  response;
    });
  }

  getPos(branchId: number): void {
    this.commonService.getPos(Vertical.Motor, branchId).subscribe((response: IDropDownDto<number>[]) => {
      this._posDatas = response;
    })
  }

  reset(){
    this.recreport.reset()
  }



  submit(){
    this.recreport.get("branchId").setValue(this._branchId);
    let policyStartDate = this.commonService.getDateInString(new Date(this.recreport.value.policyStartDateFrom_dump));
    let policyEndDate = this.commonService.getDateInString(new Date(this.recreport.value.policyStartDateTo_dump));

    this.recreport.patchValue({
      policyStartDateFrom: policyStartDate,
      policyStartDateTo :policyEndDate
    });

    this.reportService.getRECReport(this.recreport.getRawValue()).subscribe((response: ICommonDto<any[]>) => {
      this.rows = [...response.Response];
     /*   this.columns = Object.keys(this.rows[0]).map(key => {
        return { prop: key, name: key.split(/(?=[A-Z])/).join(' ') }; // Splitting camelCase and joining with spaces
      }); */
    });

  }

  async downloadExcel(){
    this.recreport.get("branchId").setValue(this._branchId);
    let policyStartDate = this.commonService.getDateInString(new Date(this.recreport.value.policyStartDateFrom_dump));
    let policyEndDate = this.commonService.getDateInString(new Date(this.recreport.value.policyStartDateTo_dump));

    this.recreport.patchValue({
      policyStartDateFrom: policyStartDate,
      policyStartDateTo :policyEndDate
    });

    this.reportService.getRECReport(this.recreport.getRawValue()).subscribe((response: ICommonDto<any[]>) => {
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
    writeFile(wb, 'Lost Data-' + this.recreport.value.policyStartDateFrom+ '-'  + this.recreport.value.policyStartDateTo +'.xlsx');
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
