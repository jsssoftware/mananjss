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
import { WorkBook, WorkSheet, utils, writeFile } from 'xlsx';

@Component({
  selector: 'app-customer-cluster',
  templateUrl: './customer-cluster.component.html',
  styleUrls: ['./customer-cluster.component.css']
})
export class CustomerClusterComponent implements OnInit {

  loadingIndicator = false;
  reorderable = true;
  ColumnMode = ColumnMode;
  rows :any[] = [];
  private _branchId: any;
  private _vertical: any;
  public isMotor :boolean = true;

  columns = [
    { prop: 'CustomerName', name: 'Customer Name' },
    { prop: 'CustomerCode', name: 'Customer Code'},
    { prop: 'ClusterName', name: 'Cluster Name' },
    { prop: 'ClusterCode', name: 'Cluster Code' },
    { prop: 'CustomerPhone1', name: 'Customer Phone1' }, 
    { prop: 'CustomerAddress1', name: 'Customer Address1' },
  ]


  excelcolumns = [
    { name: "Customer Name", prop: "CustomerName" },
    { name: "Customer Code", prop: "CustomerCode" },
    { name: "Cluster Name", prop: "ClusterName" },
    { name: "Cluster Code", prop: "ClusterCode" },
    { name: "Customer Phone", prop: "CustomerPhone1" },
    { name: "Customer Address", prop: "CustomerAddress1" },
    { name: "Control No", prop: "ControlNo" },
    { name: "Insurance Company", prop: "InsuranceCompanyName" },
    { name: "Policy No", prop: "PolicyNo" },
    { name: "Registration No", prop: "RegistrationNo" },
    { name: "Manufacturer Name", prop: "ManufacturerName" },
    { name: "Product Name", prop: "ProductName" },
    { name: "Model Name", prop: "ModelName" },
    { name: "Plan Name", prop: "PlanName" },
    { name: "Engine No", prop: "EngineNo" },
    { name: "Chassis No", prop: "ChassisNo" },
    { name: "Make Year", prop: "MakeYear" },
    { name: "Cubic Capacity", prop: "CubicCapacity" },
    { name: "Seating Capacity", prop: "SeatingCapacity" },
    { name: "Seating Capacity", prop: "VehicleIDV" },
    { name: "Seating Capacity", prop: "CNGIDV" },
    { name: "Seating Capacity", prop: "ElectricAssessoriesIDV" },
    { name: "Seating Capacity", prop: "SeatingCapacity" },
    { name: "Seating Capacity", prop: "SeatingCapacity" },
    { name: "Vehicle Class", prop: "VehicleClass" },
    { name: "Cover Note Date", prop: "CoverNoteDate" },
    { name: "Cover Note No", prop: "CoverNoteNo" },
    { name: "Policy Start Date", prop: "PolicyStartDate" },
    { name: "Policy End Date", prop: "PolicyEndDate" },
    { name: "Policy Start Date OD", prop: "PolicyStartDateOD" },
    { name: "Policy End Date OD", prop: "PolicyEndDateOD" },
    { name: "Policy Package Type", prop: "PolicyPackageType" },
    { name: "Portability", prop: "Portability" },
    { name: "NCB Percentage", prop: "NCBPercentage" },
    { name: "OD", prop: "OD" },
    { name: "TP Premium", prop: "TPPremium" },
    { name: "Gross Premium", prop: "GrossPremium" },
    { name: "Vertical Name", prop: "VerticalName" }
  ];
  //#region
  customerclusterform = new FormGroup({
    number: new FormControl(''),
    customerName: new FormControl(''),
    customerCode: new FormControl(''),
    customerPhoneNo: new FormControl(''),
    clusterName: new FormControl(''),
    clusterCode: new FormControl(''),
    clusterPhoneNo: new FormControl(''),
    policyActivation: new FormControl(''),
    branchId: new FormControl(''),
    filter: new FormControl(1),
    verticalId: new FormControl(1),
  });
  ELEMENT_DATA: any;
  constructor(
    private commonService: ICommonService,
    private reportService: ReportService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog :MatDialog,
    private datePipe: DatePipe
  ) {
    this._branchId = sessionStorage.getItem("branchId");
    this._vertical = this.route.snapshot.paramMap.get('vertical');
    if(this._vertical == "1"){
      this._vertical = Vertical.Motor
    }

  }

  ngOnInit(): void {
  
  }


  reset(){
    this.customerclusterform.reset()
  }


  submit(){
    this.customerclusterform.get("branchId").setValue(this._branchId);  
    this.reportService.getCustomerCluster(this.customerclusterform.getRawValue()).subscribe((response: any) => {
      this.rows = [...response.Response];
    });

  } 


  downloadExcel(){
    this.customerclusterform.get("branchId").setValue(this._branchId);  
    this.customerclusterform.get("filter").setValue(1);  
    this.reportService.getCustomerCluster(this.customerclusterform.getRawValue()).subscribe((response: any) => {
     this.exportexcel(response.Response);
    });

  }

  onRadioChange(event: MatRadioChange): void {
    if(event.value == 1){
      this.isMotor = true;
    }else{
      this.isMotor = false;
    }
  }


  onActivationRadioChange(event: MatRadioChange): void {
    if(event.value == 1){
      this.isMotor = true;
    }else{
      this.isMotor = false;
    }
  }

  
  exportexcel(data :any[]): void
  {
    const fileData = this.getExcelData(data);
    /* pass here the data source */
    const ws: WorkSheet =utils.json_to_sheet(fileData);
    /* generate workbook and add the worksheet */
    const wb: WorkBook = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */  
    writeFile(wb, 'Customer-Cluster' +'.xlsx');
  }

  
  getExcelData(data:any) {
    const excelData = [];
    data.map((row:any) => {
      const newRow = {};

      this.excelcolumns.forEach((column) => {
        newRow[column.name] = row[column.prop];
      });
      
      excelData.push(newRow);
    });

    return excelData;
  }


}
