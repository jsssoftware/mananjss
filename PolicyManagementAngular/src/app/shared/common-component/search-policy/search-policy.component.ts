import { Component, OnInit, setTestabilityGetter, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { IDataTableDto } from 'src/app/app-entites/dtos/common/data-table-dto';
import { IDropDownDto } from 'src/app/app-entites/dtos/common/drop-down-dto';
import { ISearchPolicyDto } from 'src/app/app-entites/dtos/common/search-policy-dto';
import { IPolicyTermDto } from 'src/app/app-entites/dtos/motor/policy-term-dto';
import { ISearchPolicyModel } from 'src/app/app-entites/models/common/search-policy-model';
import { ICommonService } from 'src/app/app-services/common-service/abstracts/common.iservice';
import { IMotorService } from 'src/app/app-services/motor-service/abstracts/motor.iservice';
import { PolicyManagement, SearchPolicyType, SearchPolicyTypeName, Vertical } from 'src/app/shared/utilities/enums/enum';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Console } from 'console';
import {CommonFunction} from 'src/app/shared/utilities/helpers/common-function';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

export class PeriodicElement {
  public controlNumber: string = "";
  public customerName: string = "";
  public insuranceCompany: string = "";
  public policyNumber: string = "";
  public registrationNumber: string = "";
  public manufacturer: string = "";
  public model: string = "";
  public pos: string = "";
  public policyStartFromDate: string = "";
  public policyStartToDate: string = "";
  public policyEndFromDate: string = "";
  public policyEndToDate: string = "";
}

@Component({
  selector: 'app-search-policy',
  templateUrl: './search-policy.component.html',
  styleUrls: ['./search-policy.component.css']
})
export class SearchPolicyComponent implements OnInit {

  ELEMENT_DATA: PeriodicElement[] = [
    {
      controlNumber: 'testing',
      customerName: 'testing',
      insuranceCompany: 'testing',
      policyNumber: 'testing',
      registrationNumber: 'testing',
      manufacturer: 'testing',
      model: 'testing',
      pos: 'testing',
      policyStartFromDate: 'testing',
      policyStartToDate: 'testing',
      policyEndFromDate: 'testing',
      policyEndToDate: 'testing'
    }
  ];

  displayedColumns: string[] = [
    'controlNumber',
    'policyType',
    'customerName',
    'insuranceCompany',
    'policyStartDate',
    'policyExpiryDate',
    'pos',
    'registrationNo',
    'vertical',
    'product',
    'manufacturer',
    'model',
    'policyNumber',
    'grossPremium',
    'policyStatus',
    'remark'
  ];
  public _policyDatas: MatTableDataSource<ISearchPolicyDto> = new MatTableDataSource<ISearchPolicyDto>();
  public _length: number = 0;
  public _pageSize: number = 20;
  public _pageNumber: number = 0;
  public _input: string = "";
  public _showAll: boolean =false;
  @ViewChild(MatPaginator) _paginator!: MatPaginator;

  dataSource = this.ELEMENT_DATA;

  //#region
  searchPolicyForm = new FormGroup({
    year: new FormControl({value: '', disabled: true}),
    branchCode: new FormControl({value: '', disabled: true}),
    verticalCode: new FormControl({value: '', disabled: true}),
    number: new FormControl(''),
    customerName: new FormControl(''),
    insuranceCompany: new FormControl(''),
    policyNumber: new FormControl(''),
    registrationNumber: new FormControl(''),
    manufacturer: new FormControl(''),
    model: new FormControl(''),
    pos: new FormControl(''),
    policyStartDateFrom: new FormControl(''),
    policyStartDateTo: new FormControl(''),
    policyEndDateFrom: new FormControl(''),
    policyEndDateTo: new FormControl(''),
    mobileNumber: new FormControl('', [Validators.pattern('^[0-9]+$')]),
    vertical: new FormControl(''),
    product: new FormControl('')
  });
  //#endregion

  //#region Variables
  matcher = new ErrorStateMatcher();
  public _policyTerms: IPolicyTermDto[] = [];
  public _insuranceCompanies: IDropDownDto<number>[] = []; 
  public _manufacturers: IDropDownDto<number>[] = []; 
  public _models: IDropDownDto<number>[] = [];
  public _posDatas: IDropDownDto<number>[] = [];
  private _branchId: any;
  public _policyTypeId: any;
  public _verticals: any;
  public _products: any;
  public _verticalTypeId: any;
  public _verticalEnum = Vertical;  
  public _filteredInsuranceCompaniesOptions: IDropDownDto<number>[] = [];
  public _filteredManufacturers: IDropDownDto<number>[] = [];
  public _filteredPosOptions : IDropDownDto<number>[] = [];
  public _headerTitle:any;  
  public _isSearchButtonDisabled:boolean =  true;  

  //#endregion

  constructor(
    private commonService: ICommonService,
    private motorService: IMotorService,
    private router: Router,
    private route: ActivatedRoute,
    private _commonFunction:CommonFunction
  ) {
    this._branchId = sessionStorage.getItem("branchId");   
    this.searchPolicyForm.patchValue({
      branchCode: this._branchId 
    });   
  }

  ngOnInit(): void {
    this.getInsuranceCompanies();
    this.getManufacturers();
    this.getPos(parseInt(this._branchId));
    this._policyTypeId = this.route.snapshot.paramMap.get('policyType');
    this._verticalTypeId = this.route.snapshot.paramMap.get('verticalType'); 
     this._headerTitle= this._commonFunction.getTitle((parseInt)(this._policyTypeId));
    switch (this._policyTypeId) {
      case "3":
      case "4":
      case "5": 
        this._showAll = true;
        break;  
    } 
    // #region set automoplete 
    this.searchPolicyForm.get("insuranceCompany")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterInsurancerCompaniesData(input);
      else
        this.filterInsurancerCompaniesData(input.Name);
    }); 
    this.searchPolicyForm.get("manufacturer")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterManufacturerData(input);
      else
        this.filterManufacturerData(input.Name);
    });

    this.searchPolicyForm.get("pos")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterPosData(input);
      else
        this.filterPosData(input.Name);
    });  

    this.searchPolicyForm.valueChanges.subscribe(value => {
      this._isSearchButtonDisabled = false
    });
  }  

  getInsuranceCompanies(): any {
    this.commonService.getInsuranceCompanies(Vertical.Motor).subscribe((response: IDropDownDto<number>[]) => {
      this._insuranceCompanies = response;
    });
  }
  getManufacturers(): void {
    this.commonService.getManufacturers().subscribe((response: any) => {
      this._manufacturers = response;
    });
  }
  getModels(manufacturerId: number): any {
    this.commonService.getModels(manufacturerId).subscribe((response: IDropDownDto<number>[]) => {
      this._models = response;
    });
  }
  getPos(branchId: number): void {
    this.commonService.getPos(Vertical.Motor, branchId).subscribe((response: IDropDownDto<number>[]) => {
      this._posDatas = response;
    })
  }

  routeToMotorPolicy(policyId: number) {
    if(this._verticalTypeId==Vertical.Motor)
      this.router.navigate(["/pms/motor", { policyId, policyTypeId: this._policyTypeId }]);
    if(this._verticalTypeId==Vertical.Health)
      this.router.navigate(["/pms/health", { policyId, policyTypeId: this._policyTypeId }]);
  }

  searchPolicy(): void {
    this._paginator.pageIndex = 0;
    let model = this.getSearchPolicyModel();
    this.commonService.getAllPolicies(model, this._pageNumber, this._pageSize).pipe(debounceTime(200)).subscribe((response: IDataTableDto<ISearchPolicyDto[]>) => {
      this._length = response.TotalCount;
      this._policyDatas = new MatTableDataSource(response.Data);
      this._policyDatas.paginator = this._paginator;
    });
  }
 
  getSearchPolicyModel() {  
    let model: ISearchPolicyModel = {
      ControlNumber: {
        Year: this.searchPolicyForm.value.year,
        BranchCode: this._branchId,
        VerticalCode: this._verticalTypeId,
        Number: this.searchPolicyForm.value.number
      },
      CustomerName: this.searchPolicyForm.value.customerName,
      InsuranceCompany: this.searchPolicyForm.value.insuranceCompany,
      PolicyNumber: this.searchPolicyForm.value.policyNumber,
      RegistrationNumber: this.searchPolicyForm.value.registrationNumber,
      Manufacture: this.searchPolicyForm.value.manufacturer,
      Model: this.searchPolicyForm.value.model,
      Pos: this.searchPolicyForm.value.pos,
      PolicyStartDateFrom: this.commonService.getDateInString(this.searchPolicyForm.value.policyStartDateFrom),
      PolicyStartDateTo: this.commonService.getDateInString(this.searchPolicyForm.value.policyStartDateTo),
      PolicyEndDateFrom: this.commonService.getDateInString(this.searchPolicyForm.value.policyEndDateFrom),
      PolicyEndDateTo: this.commonService.getDateInString(this.searchPolicyForm.value.policyEndDateTo),
      MobileNumber: this.searchPolicyForm.value.mobileNumber,
      Product: this.searchPolicyForm.value.product,
      Vertical: this.searchPolicyForm.value.vertical,
      PolicyManagementType: (parseInt)(this._policyTypeId),  // need to do dynamic based on id or type of module 
      IsForDownload:false,
      IsForShowAll:false
      // PageNumber: this.searchPolicyForm.value.mobileNumber
      // PageSize: this.searchPolicyForm.value.mobileNumber

    };

    console.log(this.searchPolicyForm);

    return model;
  }

  pageChanged(event: PageEvent): void {
    this._pageNumber = event.pageIndex;
  }


  json: any = [{
    playerName: 'Cristiano Ronaldo',
    playerCountry: 'Pourtgal',
    playerClub: 'Juventus'
  },
  {
    playerName: 'Lionel Messi',
    playerCountry: 'Argentina',
    playerClub: 'Barcelona'
  },
  {
    playerName: 'Neymar Junior',
    playerCountry: 'Brazil',
    playerClub: 'PSG'
  },
  {
    playerName: 'Tonni Kroos',
    playerCountry: 'Germany',
    playerClub: 'Real Madrid'
  },
  {
    playerName: 'Paul Pogba',
    playerCountry: 'France',
    playerClub: 'Manchester United'
  }];


  public exportAsExcelFile(): void {
    let model = this.getSearchPolicyModel();
    model.IsForDownload =true;
    this.commonService.getAllPolicies(model, this._pageNumber, this._pageSize).pipe(debounceTime(200)).subscribe((response: IDataTableDto<ISearchPolicyDto[]>) => {
      const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(response.Data);
      const myworkbook: XLSX.WorkBook = { Sheets: { 'data': myworksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Search Policy Data");
    });
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_exported' + EXCEL_EXTENSION);
  }

  reset() {
  // need to reset all fields and clear grid 
  this.searchPolicyForm.reset() 
  
  this._paginator.pageIndex = 0; 
  this._length =0; 
  this._policyDatas = new MatTableDataSource(); 
  setTimeout(() => {
    this.searchPolicyForm.patchValue({
      branchCode: this._branchId 
    });  
  }, 100);
   
  }

  displayFn(data: any): string {
    return data && data.Name ? data.Name : '';
  }

  showAll() {
    this.searchPolicyForm.reset() 
    this._paginator.pageIndex = 0;
    this._length =0; 
    this._policyDatas = new MatTableDataSource(); 
    setTimeout(() => {
        this.searchPolicyForm.patchValue({
          branchCode: this._branchId 
        });  
    

      let model = this.getSearchPolicyModel();
      model.IsForShowAll =true;
      this.commonService.getAllPolicies(model, this._pageNumber, this._pageSize).pipe(debounceTime(200)).subscribe((response: IDataTableDto<ISearchPolicyDto[]>) => {
        this._length = response.TotalCount;
        this._policyDatas = new MatTableDataSource(response.Data);
        this._policyDatas.paginator = this._paginator;
      });
    }, 100);
    // need to show all records regardless of filter 
  }

  filterInsurancerCompaniesData(input: any) {
  
    if (input === undefined)
      return;
      console.log(this._insuranceCompanies,"this._insuranceCompanies");
    this._filteredInsuranceCompaniesOptions = this._insuranceCompanies.filter(item => {
      return item.Name.toLowerCase().indexOf(input.toLowerCase()) > -1
    });
  }

  filterPosData(input: any) {
    if (input === undefined)
      return;
    this._filteredPosOptions = this._posDatas.filter(item => {
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

  backToMaster(){
    if(this._verticalTypeId==Vertical.Motor)
      this.router.navigate(['./pms/motor/motor-policy-management']);
    if(this._verticalTypeId==Vertical.Health)
      this.router.navigate(['./pms/health/health-policy-management']);

  }  
}  