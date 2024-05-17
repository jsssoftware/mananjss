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

@Component({
  selector: 'app-agent-swapping',
  templateUrl: './agent-swapping.component.html',
  styleUrls: ['./agent-swapping.component.css']
})
export class AgentSwappingComponent implements OnInit {


  loadingIndicator = false;
  reorderable = true;
  ColumnMode = ColumnMode;
  public _insuranceCompanies: IDropDownDto<number>[] = [];
  public _filteredInsuranceCompaniesOptions: IDropDownDto<number>[] = [];
  rows :any[] = [];
  public _posDatas: IDropDownDto<number>[] = [];
  private _branchId: any;
  private _vertical: any;


  columns = [
    { prop: 'ControlNo', name: 'Control No' },
    { prop: 'PolicyStartDate', name: 'Policy Start Date' },
    { prop: 'InsuranceCompanyName', name: 'Insurance Company Name' },
    { prop: 'NameInPolicy', name: 'Customer Name' },
    { prop: 'ModelName', name: 'Customer Code' },
    { prop: 'RegistrationNo', name: 'Registration No' },
    { prop: 'POSName', name: 'POS Name' },
  ]
  //#region
  agentsearchPolicyForm = new FormGroup({
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
    verticalId: new FormControl(''),
  });
  ELEMENT_DATA: any;
  constructor(
    private commonService: ICommonService,
    private reportService: ReportService,
    private router: Router,
    private route: ActivatedRoute,
  ) { 
    this._branchId = sessionStorage.getItem("branchId");
    this._vertical = this.route.snapshot.paramMap.get('vertical');
    if(this._vertical == "1"){
      this._vertical = Vertical.Motor
    }

  }

  ngOnInit(): void {
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
    this.agentsearchPolicyForm.reset()
  }

  
  
  submit(){
    this.agentsearchPolicyForm.get("branchId").setValue(this._branchId);
    this.agentsearchPolicyForm.get("verticalId").setValue(this._vertical);
    let policyStartDate = this.commonService.getDateInString(new Date(this.agentsearchPolicyForm.value.policyStartDateFrom_dump));
    let policyEndDate = this.commonService.getDateInString(new Date(this.agentsearchPolicyForm.value.policyStartDateTo_dump));

    this.agentsearchPolicyForm.patchValue({
      policyStartDateFrom: policyStartDate,
      policyStartDateTo :policyEndDate
    });

    this.reportService.getPolicyDatas(this.agentsearchPolicyForm.getRawValue()).subscribe((response: IDataTableDto<any[]>) => {
      this.rows= response.Data;
    });

  }



}
