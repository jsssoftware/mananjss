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
  selector: 'app-pos-perfomance',
  templateUrl: './pos-perfomance.component.html',
  styleUrls: ['./pos-perfomance.component.css']
})
export class PosPerfomanceComponent implements OnInit {


  loadingIndicator = false;
  reorderable = true;
  ColumnMode = ColumnMode;
  public _insuranceCompanies: IDropDownDto<number>[] = [];
  public _filteredInsuranceCompaniesOptions: IDropDownDto<number>[] = [];
  rows :any[] = [];
  public _posDatas: IDropDownDto<number>[] = [];
  public _teamMembers: any[] = [];
  public _teamMemberSales: any[] = [];
  private _branchId: any;
  private _vertical: any;
  public isMotor :boolean = true;

  columns = [
    { prop: 'TeamMemberName', name: 'Managed By' },
    { prop: 'CategoryName', name: 'Category Name' },
    { prop: 'POSCode', name: 'POS Code'},
    { prop: 'POSName', name: 'POS Name' },
    { prop: 'PolicyType', name: 'Policy Type' },
    { prop: 'ODSum', name: 'OD Sum' }, 
    { prop: 'NoOfPolicies', name: 'No Of Policies' },
  ]
  //#region
  posPerfomance = new FormGroup({
    insuranceCompany: new FormControl(''),
    policyStartDateFrom: new FormControl(''),
    policyStartDateFrom_dump: new FormControl(''),
    policyStartDateTo: new FormControl(''),
    policyStartDateTo_dump: new FormControl(''),
    posNameId: new FormControl(''),
    branchId: new FormControl(''),
    reportType: new FormControl(''),
    teamMemberId: new FormControl(''),
    teamMemberSalesId: new FormControl(''),
  });
  ELEMENT_DATA: any;
  constructor(
    private commonService: ICommonService,
    private reportService: ReportService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog :MatDialog,
    private datePipe: DatePipe,
    private masterService :MasterService
  ) {
    this._branchId = sessionStorage.getItem("branchId");
  }

  ngOnInit(): void {
    this.getPos(this._branchId);
    this.getInsuranceCompanies();
    this.getTeamMembers(this._branchId);
    this.posPerfomance.get("insuranceCompany")?.valueChanges.subscribe(input => {
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
    this.posPerfomance.reset()
  }



  submit(){
    this.posPerfomance.get("branchId").setValue(this._branchId);
    let policyStartDate = this.commonService.getDateInString(new Date(this.posPerfomance.value.policyStartDateFrom_dump));
    let policyEndDate = this.commonService.getDateInString(new Date(this.posPerfomance.value.policyStartDateTo_dump));

    this.posPerfomance.patchValue({
      policyStartDateFrom: policyStartDate,
      policyStartDateTo :policyEndDate
    });

    this.reportService.getPosPerfomance(this.posPerfomance.getRawValue()).subscribe((response: ICommonDto<any[]>) => {
      this.rows = [...response.Response];
    });

  }

  async downloadExcel(){
    this.posPerfomance.get("branchId").setValue(this._branchId);
    let policyStartDate = this.commonService.getDateInString(new Date(this.posPerfomance.value.policyStartDateFrom_dump));
    let policyEndDate = this.commonService.getDateInString(new Date(this.posPerfomance.value.policyStartDateTo_dump));

    this.posPerfomance.patchValue({
      policyStartDateFrom: policyStartDate,
      policyStartDateTo :policyEndDate
    });

    this.reportService.getPosPerfomance(this.posPerfomance.getRawValue()).subscribe((response: ICommonDto<any[]>) => {
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


  getTeamMembers(branchId: number): any {
    this.masterService.getTeamMember( branchId).subscribe((response: any) => {
      debugger
      this._teamMembers = response?.Data.filter(x=>x.DepartmentId != 8);
      this._teamMemberSales = response?.Data.filter(x=>x.DepartmentId == 8);
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
    writeFile(wb, 'POS Perfomance-' + this.posPerfomance.value.policyStartDateFrom+ '-'  + this.posPerfomance.value.expiryDateTo +'.xlsx');
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
