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
import { ISearchPolicyModel } from 'src/app/app-entites/models/common/search-policy-model';
import { debounceTime } from 'rxjs/operators';
import { ISearchPolicyDto } from 'src/app/app-entites/dtos/common/search-policy-dto';


@Component({
  selector: 'app-pending-qc',
  templateUrl: './pending-qc.component.html',
  styleUrls: ['./pending-qc.component.css']
})
export class PendingQcComponent implements OnInit {


  loadingIndicator = false;
  reorderable = true;
  ColumnMode = ColumnMode;
  public _insuranceCompanies: IDropDownDto<number>[] = [];
  public _filteredInsuranceCompaniesOptions: IDropDownDto<number>[] = [];
  rows :any[] = [];
  public _posDatas: IDropDownDto<number>[] = [];
  public _verticals: any[] = [];
  public _products: any[] = [];
  private _branchId: any;
  private _vertical: any;
  public isMotor :boolean = true;

  columns = [
    { prop: "ControlNo", name: "Control No" },
    { prop: "ControlNumberDigit", name: "Control Number Digit" },
    { prop: "NameInPolicy", name: "Name In Policy" },
    { prop: "RegistrationNo", name: "Registration No" },
    { prop: "GrossPremium", name: "Gross Premium" },
    { prop: "IsActive", name: "Is Active" },
   
    { prop: "BranchCode", name: "Branch Code" },
    { prop: "PolicyType", name: "Policy Type" },
    { prop: "VerticalName", name: "Vertical Name" },
    { prop: "ProductName", name: "Product Name" },
    { prop: "ManufacturerName", name: "Manufacturer Name" },
    { prop: "ModelName", name: "Model Name" },
    { prop: "POSName", name: "POS Name" },
    { prop: "PolicyStatus", name: "Policy Status" },
    { prop: "ExpiryDate", name: "Expiry Date" },
    { prop: "StartDate", name: "Start Date" },
    { prop: "PolicyNumber", name: "Policy Number" },
    { prop: "InsuranceCompany", name: "Insurance Company" },
    { prop: "PolicyRemarks", name: "Policy Remarks" },
    { prop: "CreatedBy", name: "Created By" },
    { prop: "RenewalDone", name: "Renewal Done" },
    { prop: "MakeYear", name: "Make Year" },
    { prop: "PlanName", name: "Plan Name" },
    { prop: "PlanTypeName", name: "Plan Type Name" }
  ]
  //#region
  pendingQcForm = new FormGroup({
    number: new FormControl(''),
    customerName: new FormControl(''),
    insuranceCompany: new FormControl(''),
    policyNumber: new FormControl(''),
    registrationNumber: new FormControl(''),
    policyStartDateFrom: new FormControl(''),
    policyStartDateFrom_dump: new FormControl(''),
    policyStartDateTo: new FormControl(''),
    policyStartDateTo_dump: new FormControl(''),
    posNameId: new FormControl(''),
    branchId: new FormControl(''),
    verticalId: new FormControl('1'),
    noofpolicyPending: new FormControl(''),
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
    this.getPos(this._branchId);
    this.getInsuranceCompanies();
    this.getVertical();
    this.pendingQcForm.get("insuranceCompany")?.valueChanges.subscribe(input => {
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

  getVertical(): void {
    this.commonService.getVerticals().subscribe((response: any[]) => {
      this._verticals = response;
    })
  }


  
  onRadioChange(event: MatRadioChange): void {
    if(event.value == 1){
      this.isMotor = true;
    }else{
      this.isMotor = false;
    }
  }

  reset(){
    this.pendingQcForm.reset()
  }


  getSearchPolicyModel() {  
    let model: ISearchPolicyModel = {
      ControlNumber: {
        Year: this.pendingQcForm.value.year,
        BranchCode: this._branchId,
        VerticalCode: this.pendingQcForm.value.verticalId,
        Number: this.pendingQcForm.value.number
      },
      CustomerName: this.pendingQcForm.value.customerName,
      InsuranceCompany: this.pendingQcForm.value.insuranceCompany,
      PolicyNumber: this.pendingQcForm.value.policyNumber,
      RegistrationNumber: null,
      Manufacture: null,
      Model: null,
      Pos: this.pendingQcForm.value.posNameId,
      PolicyStartDateFrom: this.commonService.getDateInString(this.pendingQcForm.value.policyStartDateFrom),
      PolicyStartDateTo: this.commonService.getDateInString(this.pendingQcForm.value.policyStartDateTo),
      PolicyEndDateFrom: "",
      PolicyEndDateTo:"",
      MobileNumber: "",
      Product: this.pendingQcForm.value.product,
      Vertical: this.pendingQcForm.value.verticalId,
      PolicyManagementType:4,  // need to do dynamic based on id or type of module 
      IsForDownload:false,
      IsForShowAll:false,
      PlanTypeId:this.pendingQcForm.value.planType,
      PlanId:this.pendingQcForm.value.plan
      // PageNumber: this.pendingQcForm.value.mobileNumber
      // PageSize: this.pendingQcForm.value.mobileNumber

    };

    console.log(this.pendingQcForm);

    return model;
  }
  submit(){
    this.pendingQcForm.get("branchId").setValue(this._branchId);
   
    let model = this.getSearchPolicyModel();
    this.commonService.getAllPolicies(model, 1, 10).pipe(debounceTime(200)).subscribe((response: IDataTableDto<ISearchPolicyDto[]>) => {
      //this._length = response.TotalCount;
      this.pendingQcForm.get("noofpolicyPending").setValue(response.Data?.length);

      
      this.rows = response.Data;
    });

  }

  
  filterInsurancerCompaniesData(input: any) {
    if (input === undefined)
      return;
    this._filteredInsuranceCompaniesOptions = this._insuranceCompanies.filter(item => {
      return item.Name?.toLowerCase().indexOf(input.toLowerCase()) > -1
    });
  }


  
  getProducts(): void {
    this.commonService.getProduct().subscribe((response: any) => {
      this._products = response;
    });
  }


}
