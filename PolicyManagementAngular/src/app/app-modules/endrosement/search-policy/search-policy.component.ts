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
import { MatRadioChange } from '@angular/material/radio';
import { DatePipe } from '@angular/common';
import { EndrosementService } from 'src/app/app-services/endrosement-service/endrosement.service';

@Component({
  selector: 'app-search-policy',
  templateUrl: './search-policy.component.html',
  styleUrls: ['./search-policy.component.css']
})
export class EndrosementSearchPolicyComponent implements OnInit {

  loadingIndicator = false;
  reorderable = true;
  ColumnMode = ColumnMode;
  public _insuranceCompanies: IDropDownDto<number>[] = [];
  public _filteredInsuranceCompaniesOptions: IDropDownDto<number>[] = [];
  rows :any[] = [];
  public _posDatas: IDropDownDto<number>[] = [];
  private _branchId: any;
  private _vertical: any;
  public isMotor :boolean = true;

  columns = [
    { prop: 'ControlNo', name: 'Control No' },
    { prop: 'PolicyStartDate', name: 'Policy Start Date'},
    { prop: 'InsuranceCompanyName', name: 'Insurance Company Name' },
    { prop: 'NameInPolicy', name: 'Customer Name' },
   /*  { prop: 'ModelName', name: 'Customer Code' },*/
    { prop: 'POSName', name: 'POS Name' },
  ]
  //#region
  endrosementSearch = new FormGroup({
    number: new FormControl(''),
    customerName: new FormControl(''),
    insuranceCompany: new FormControl(''),
    policyNumber: new FormControl(''),
    policyStartDateFrom: new FormControl(''),
    policyStartDateFrom_dump: new FormControl(''),
    policyStartDateTo: new FormControl(''),
    policyStartDateTo_dump: new FormControl(''),
    posNameId: new FormControl(''),
    branchId: new FormControl(''),
    verticalId: new FormControl(1),
  });
  ELEMENT_DATA: any;
  constructor(
    private commonService: ICommonService,
    private endrosementService: EndrosementService,
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
    this.endrosementSearch.get("insuranceCompany")?.valueChanges.subscribe(input => {
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
    this.endrosementSearch.reset()
  }


  onActivate(event) {
    if (event.type === 'dblclick') {
      this.onRowDoubleClick(event.row);
    }
  }

  onRowDoubleClick(row) {
    // Handle the double-click event
    this.openDialog(row);
    // You can do whatever you need with the row data here
  }

  
  
  submit(){
    this.endrosementSearch.get("branchId").setValue(this._branchId);
    let policyStartDate = this.commonService.getDateInString(new Date(this.endrosementSearch.value.policyStartDateFrom_dump));
    let policyEndDate = this.commonService.getDateInString(new Date(this.endrosementSearch.value.policyStartDateTo_dump));

    this.endrosementSearch.patchValue({
      policyStartDateFrom: policyStartDate,
      policyStartDateTo :policyEndDate
    });

    this.endrosementService.getPolicyDatas(this.endrosementSearch.getRawValue()).subscribe((response: IDataTableDto<any[]>) => {
      this.rows = [...response.Data];
      this.rows = this.rows.map(row => ({
        ...row,
        PolicyStartDate: this.datePipe.transform(row.PolicyStartDate, 'dd/MM/yyyy')
      }));
    });

  }

  
  openDialog(row:any) {
    //this.router.navigate(['./pms/endrosement/master', {my_object: JSON.stringify(row)}]);
    this.router.navigate(['./pms/endrosement/master'],{state:row});

    
  }

  sendData() {
  }

  
  filterInsurancerCompaniesData(input: any) {
    if (input === undefined)
      return;
    this._filteredInsuranceCompaniesOptions = this._insuranceCompanies.filter(item => {
      return item.Name?.toLowerCase().indexOf(input.toLowerCase()) > -1
    });
  }

  onRadioChange(event: MatRadioChange): void {
    if(event.value == 1){
      this.isMotor = true;
    }else{
      this.isMotor = false;
    }
  }

  
  

}
