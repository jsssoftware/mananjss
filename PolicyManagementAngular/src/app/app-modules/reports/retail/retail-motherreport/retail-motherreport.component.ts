import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ICommonDto } from 'src/app/app-entites/dtos/common/common-dto';
import { IDateDto } from 'src/app/app-entites/dtos/common/date-dto';
import { IDropDownDto } from 'src/app/app-entites/dtos/common/drop-down-dto';
import { IPolicyTermDto } from 'src/app/app-entites/dtos/motor/policy-term-dto';
import { IRtoZoneDto } from 'src/app/app-entites/dtos/motor/rto-zone-dto';
import { ICommonService } from 'src/app/app-services/common-service/abstracts/common.iservice';
import { ReportService } from 'src/app/app-services/report-service/report.service';
import { SearchPolicyType, Vertical } from 'src/app/shared/utilities/enums/enum';
import { WorkBook, WorkSheet, read, utils, writeFile } from 'xlsx';

@Component({
  selector: 'app-retail-motherreport',
  templateUrl: './retail-motherreport.component.html',
  styleUrls: ['./retail-motherreport.component.css']
})


export class RetailMotherreportComponent implements OnInit {
  @ViewChild('reportpanel') reportpanel!: MatExpansionPanel;

  public _filteredInsuranceCompaniesOptions: IDropDownDto<number>[] = [];
  public _insuranceCompanies: IDropDownDto<number>[] = [];
  public _policyTerms: IPolicyTermDto[] = [];
  public _packageTypes: IDropDownDto<number>[] = [];
  public _getPolicyTerms: any[] = [];
  panelOpenState = false;
  reportpanelOpenState = false;
  reportpanelClosedtate = false;
  public _policyTypes: any;
  public _teleCallers: any;
  public _references: any;
  public _fosNames: any;
  public _ncbs: any;
  public _manufacturers: IDropDownDto<number>[] = [];;
  public _filteredManufacturerOptions: IDropDownDto<number>[] = [];
  private _branchId: any;
  public _vehicleClasses: any;
  public _rtoZones: IRtoZoneDto[] = [];
  public _models: IDropDownDto<number>[] = [];
  public _selectedBusinessDoneBy: number =1;
  public _posDatas: IDropDownDto<number>[] = [];
  public _products: IDropDownDto<number>[] = [];
  public _plans: IDropDownDto<number>[] = [];
  public _planTypes: IDropDownDto<number>[] = [];

  rows :any[] = [];
  columns = [
    { prop: 'ControlNo', name: 'Control No' },
    { prop: 'CustomerCode', name: 'Customer Code' },
    { prop: 'ControlNo', name: 'Control No' },
    { prop: 'VerticalName', name: 'Vertical Name' },
    { prop: 'PolicyStartDate', name: 'Policy Start Date' },
    { prop: 'ReferenceNo', name: 'Reference No' },
    { prop: 'NameInPolicy', name: 'Name in Policy' },
    { prop: 'ProductName', name: 'Product Name' },
    { prop: 'PlanName', name: 'Plan Name' },
    { prop: 'TotalSumInsured', name: 'Total Sum Insured' },
    { prop: 'GrossPremium', name: 'Gross Premium' },
    { prop: 'POSName', name: 'POS Name' },
    { prop: 'InsuredMaxAge', name: 'Insured Max Age' },
    { prop: 'InsuranceCompanyName', name: 'Insurance Company Name' },
    { prop: 'TerrorismPremium', name: 'Terrorism Premium' },
    { prop: 'PolicyTypeId', name: 'Policy Type ID' },
    { prop: 'PolicyType', name: 'Policy Type' },
    { prop: 'PolicyNo', name: 'Policy No' },
    { prop: 'BusinessDoneBy', name: 'Business Done By' },
    { prop: 'PolicyRemarks', name: 'Policy Remarks' },
    { prop: 'Portability', name: 'Portability' },
    { prop: 'AddressInPolicy', name: 'Address in Policy' },
    { prop: 'CustomerType', name: 'Customer Type' },
    { prop: 'PlanTypeName', name: 'Plan Type Name' },
    { prop: 'ReferenceName', name: 'Reference Name' },
    { prop: 'TeleCaller', name: 'Telecaller' },
    { prop: 'FOS', name: 'FOS' },
    { prop: 'NoofYear', name: 'Number of Years' },
    { prop: 'PolicyEndDate', name: 'Policy End Date' },
    { prop: 'NoAdult', name: 'Number of Adults' },
    { prop: 'NoChild', name: 'Number of Children' },
    { prop: 'CBStartDate', name: 'CB Start Date' },
    { prop: 'VerticalId', name: 'Vertical ID' },
    { prop: 'PrevInsCompany', name: 'Previous Insurance Company' },
    { prop: 'PreviousPolicyNo', name: 'Previous Policy No' },
    { prop: 'PreviousPolicyEndDate', name: 'Previous Policy End Date' },
    { prop: 'FinancerName', name: 'Financer Name' },
    { prop: 'CustomerPhone1', name: 'Customer Phone 1' },
    { prop: 'CustomerPhone2', name: 'Customer Phone 2' },
    { prop: 'IsDecisionMaker', name: 'Is Decision Maker' },
    { prop: 'CustomerMobile1', name: 'Customer Mobile 1' },
    { prop: 'CustomerMobile2', name: 'Customer Mobile 2' },
    { prop: 'InactiveMobile1', name: 'Inactive Mobile 1' },
    { prop: 'InactiveMobile2', name: 'Inactive Mobile 2' },
    { prop: 'CustomerEmail1', name: 'Customer Email 1' },
    { prop: 'CustomerEmail2', name: 'Customer Email 2' },
    { prop: 'CityName', name: 'City Name' },
    { prop: 'CustomerPinCode1', name: 'Customer Pin Code 1' },
    { prop: 'ClusterName', name: 'Cluster Name' },
    { prop: 'CustomerContact', name: 'Customer Contact' },
    { prop: 'BusinessTypeName', name: 'Business Type Name' },
    { prop: 'IndustryName', name: 'Industry Name' },
    { prop: 'DesignationName', name: 'Designation Name' },
    { prop: 'ProfessionName', name: 'Profession Name' },
    { prop: 'TerritoryName', name: 'Territory Name' },
    { prop: 'FamilyDiscount', name: 'Family Discount' },
    { prop: 'LongTermDiscount', name: 'Long Term Discount' },
    { prop: 'SectionDiscount', name: 'Section Discount' },
    { prop: 'AdditionalDiscount', name: 'Additional Discount' },
    { prop: 'AddonRiderPremium', name: 'Add-on Rider Premium' },
    { prop: 'NoofDaysHospitalCash', name: 'Number of Days Hospital Cash' },
    { prop: 'NoofDays', name: 'Number of Days' },
    { prop: 'MaxDaysSingleTrip', name: 'Max Days Single Trip' },
    { prop: 'Occupancy', name: 'Occupancy' },
    { prop: 'LineofBusiness', name: 'Line of Business' },
    { prop: 'CoverageName', name: 'Coverage Name' },
    { prop: 'BasementExposer', name: 'Basement Exposer' },
    { prop: 'PAN', name: 'PAN' },
    { prop: 'GSTIN', name: 'GSTIN' },
    { prop: 'AddonRiderName', name: 'Add-on Rider Name' },
    { prop: 'POSManageBy', name: 'POS Managed By' },
    { prop: 'PolicyStatus', name: 'Policy Status' },
    { prop: 'EndorsementReason', name: 'Endorsement Reason' },
    { prop: 'PolicyCancelDate', name: 'Policy Cancel Date' },
    { prop: 'TotalGST', name: 'Total GST' },
    { prop: 'IRDACommissionReceived', name: 'IRDA Commission Received' },
    { prop: 'MonthCycle', name: 'Month Cycle' },
    { prop: 'POSCommissionReceived', name: 'POS Commission Received' },
    { prop: 'commMonth', name: 'Comm Month' },
    { prop: 'EndorseGrossPremium', name: 'Endorse Gross Premium' },
    { prop: 'CommissionablePremium', name: 'Commissionable Premium' },
    { prop: 'TotalGrossPremium', name: 'Total Gross Premium' },
    { prop: 'CoverageInland', name: 'Coverage Inland' },
    { prop: 'CoverageOverseas', name: 'Coverage Overseas' },
    { prop: 'StorageRisk', name: 'Storage Risk' },
    { prop: 'VoyageType', name: 'Voyage Type' },
    { prop: 'VoyageOverseasType', name: 'Voyage Overseas Type' },
    { prop: 'TransitFromDomestic', name: 'Transit From Domestic' },
    { prop: 'TransitToDomestic', name: 'Transit To Domestic' },
    { prop: 'TransitFromOverseas', name: 'Transit From Overseas' },
    { prop: 'TransitToOverseas', name: 'Transit To Overseas' },
    { prop: 'MarineRate', name: 'Marine Rate' },
    { prop: 'MiscRate', name: 'Miscellaneous Rate' },
    { prop: 'MiscInfo1', name: 'Misc Info 1' },
    { prop: 'MiscInfo2', name: 'Misc Info 2' },
    { prop: 'MiscInfo3', name: 'Misc Info 3' },
    { prop: 'MiscInfo4', name: 'Misc Info 4' }
];


  loadingIndicator = false;
  reorderable = true;
  ColumnMode = ColumnMode;

 //#region Policy Term Form
 fretailmotherreport = new FormGroup({
  insuranceCompanyId: new FormControl(''),
  policyInspectionDateFrom: new FormControl('',Validators.required),
  policyInspectionDateFromNew: new FormControl(''),
  policyInspectionDateTo: new FormControl('',Validators.required),
  policyInspectionDateToNew: new FormControl(''),
  policyTypeId: new FormControl(''),
  verticalTypeId: new FormControl(''),
  businessDoneBy: new FormControl(''),
  manufacturerId: new FormControl(''),
  referenceId: new FormControl(''),
  teleCallerId: new FormControl(''),
  fosId: new FormControl(''),
  branchId: new FormControl(''),
  posNameId: new FormControl(''),
  posManagedBy: new FormControl(''),
  policyType1: new FormControl(''),
  policyType2: new FormControl(''),
  policyType3: new FormControl(''),
  policyType4: new FormControl(''),
  policyType5: new FormControl(''),
  policyType6: new FormControl(''),
  product: new FormControl(''),
  plan: new FormControl(''),
  planTypes: new FormControl(''),
  vertical1: new FormControl(''),
  vertical2: new FormControl(''),
  vertical3: new FormControl(''),
  vertical4: new FormControl(''),
  vertical5: new FormControl(''),
  vertical6: new FormControl(''),
});

  constructor(
    private commonService: ICommonService,
    private reportService: ReportService
  ) { 
    this._branchId = sessionStorage.getItem("branchId");
  }

  async ngOnInit(): Promise<void> {
    
    await this.getInsuranceCompanies();
    await this.getPackageTypes();
    await this.getPolicyTypes();
    await this.getVehicleClasses();
    await this.getRtoZones();
    await this.getTeleCallers(this._branchId);
    await this.getReferences(this._branchId);
    await this.getFosNames(this._branchId);
    await this.getPos(this._branchId);
    await this.getPlanType();
    await this.getProducts();

    this.fretailmotherreport.get("insuranceCompanyId")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterInsurancerCompaniesData(input);
      else
        this.filterInsurancerCompaniesData(input.Name);
    });

    
    this.fretailmotherreport.get('policyType1').valueChanges.subscribe((value: boolean) => {
      if (value) {
        // Checkbox 1 is checked, set numeric value in the form control
        this.fretailmotherreport.get('policyType1').setValue(1, { emitEvent: false });
      } else {
        // Checkbox 1 is unchecked, set numeric value to 0 or another value
        this.fretailmotherreport.get('policyType1').setValue(0, { emitEvent: false });
      }
    });
    this.fretailmotherreport.get('policyType2').valueChanges.subscribe((value: boolean) => {
      if (value) {
        // Checkbox 1 is checked, set numeric value in the form control
        this.fretailmotherreport.get('policyType2').setValue(1, { emitEvent: false });
      } else {
        // Checkbox 1 is unchecked, set numeric value to 0 or another value
        this.fretailmotherreport.get('policyType2').setValue(0, { emitEvent: false });
      }
    });
    this.fretailmotherreport.get('policyType3').valueChanges.subscribe((value: boolean) => {
      if (value) {
        // Checkbox 1 is checked, set numeric value in the form control
        this.fretailmotherreport.get('policyType3').setValue(1, { emitEvent: false });
      } else {
        // Checkbox 1 is unchecked, set numeric value to 0 or another value
        this.fretailmotherreport.get('policyType3').setValue(0, { emitEvent: false });
      }
    });
    this.fretailmotherreport.get('policyType4').valueChanges.subscribe((value: boolean) => {
      if (value) {
        // Checkbox 1 is checked, set numeric value in the form control
        this.fretailmotherreport.get('policyType4').setValue(1, { emitEvent: false });
      } else {
        // Checkbox 1 is unchecked, set numeric value to 0 or another value
        this.fretailmotherreport.get('policyType4').setValue(0, { emitEvent: false });
      }
    });
    this.fretailmotherreport.get('policyType5').valueChanges.subscribe((value: boolean) => {
      if (value) {
        // Checkbox 1 is checked, set numeric value in the form control
        this.fretailmotherreport.get('policyType5').setValue(1, { emitEvent: false });
      } else {
        // Checkbox 1 is unchecked, set numeric value to 0 or another value
        this.fretailmotherreport.get('policyType5').setValue(0, { emitEvent: false });
      }
    });
    this.fretailmotherreport.get('verticalTypeId').valueChanges.subscribe((value: number) => {
      this.fretailmotherreport.get('vertical1').setValue(0, { emitEvent: false });
      this.fretailmotherreport.get('vertical2').setValue(0, { emitEvent: false });
      this.fretailmotherreport.get('vertical3').setValue(0, { emitEvent: false });
      this.fretailmotherreport.get('vertical4').setValue(0, { emitEvent: false });
      this.fretailmotherreport.get('vertical5').setValue(0, { emitEvent: false });
      this.fretailmotherreport.get('vertical6').setValue(0, { emitEvent: false });
      if (value == 1) {
        // Checkbox 1 is checked, set numeric value in the form control
        this.fretailmotherreport.get('vertical1').setValue(1, { emitEvent: false });
        this.fretailmotherreport.get('vertical2').setValue(1, { emitEvent: false });
        this.fretailmotherreport.get('vertical3').setValue(1, { emitEvent: false });
        this.fretailmotherreport.get('vertical4').setValue(1, { emitEvent: false });
        this.fretailmotherreport.get('vertical5').setValue(1, { emitEvent: false });
        this.fretailmotherreport.get('vertical6').setValue(1, { emitEvent: false });
      }else if (value == 2) {
        // Checkbox 1 is checked, set numeric value in the form control
        this.fretailmotherreport.get('vertical1').setValue(1, { emitEvent: false });
        this.fretailmotherreport.get('vertical2').setValue(1, { emitEvent: false });
        this.fretailmotherreport.get('vertical3').setValue(1, { emitEvent: false });
      }else if (value == 3) {
        // Checkbox 1 is checked, set numeric value in the form control
        this.fretailmotherreport.get('vertical4').setValue(1, { emitEvent: false });
        this.fretailmotherreport.get('vertical5').setValue(1, { emitEvent: false });
        this.fretailmotherreport.get('vertical6').setValue(1, { emitEvent: false });
      } else {
        // Checkbox 1 is unchecked, set numeric value to 0 or another value
        this.fretailmotherreport.get('policyType5').setValue(0, { emitEvent: false });
      }
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
  
  getAllPolicyTerms(): any {
    this.commonService.getAllPolicyTerms(this.fretailmotherreport.value.packageTypeId).subscribe((response: IDropDownDto<any>[]) => {
      this._getPolicyTerms =  response;
    });
  }

  filterInsurancerCompaniesData(input: any) {
    if (input === undefined)
      return;
    this._filteredInsuranceCompaniesOptions = this._insuranceCompanies.filter(item => {
      return item.Name?.toLowerCase().indexOf(input.toLowerCase()) > -1
    });
  }

  getPackageTypes(): any {
    this.commonService.getPackageTypes().subscribe((response: IDropDownDto<number>[]) => {
      this._packageTypes = response;
    });
  }

  
  getPolicyTypes(): any {
    this.commonService.getPolicyTypes(SearchPolicyType.Motor_New).subscribe((response: any) => {
      this._policyTypes = response;
     
      //  this.getPolicyTerms()
    });
  }

  getTeleCallers(branchId: number): any {
    this.commonService.getTeleCallers(Vertical.Motor, branchId).subscribe((response: any) => {
      this._teleCallers = response;
    });
  }

  getReferences(branchId: number): any {
    this.commonService.getReferences(branchId).subscribe((response: any) => {
      this._references = response;
    });
  }

  getFosNames(branchId: number): any {
    this.commonService.getFosNames(Vertical.Motor, branchId).subscribe((response: any) => {
      this._fosNames = response;
    });
  }


  getVehicleClasses(): any {
    this.commonService.getVehicleClasses().subscribe((response: any) => {
      this._vehicleClasses = response;
    });
  }

  getRtoZones(): void {
    this.commonService.getRtoZones().subscribe((response: IRtoZoneDto[]) => {
      this._rtoZones = response;
    });
  }

  
  getModels(): any {
    let manufacturerId = this.fretailmotherreport.value.manufactureId;
    this.commonService.getModels(manufacturerId).subscribe((response: IDropDownDto<number>[]) => {
      this._models = response;
    });
  }

  getPos(branchId: number): void {
    this.commonService.getPos(Vertical.Motor, branchId).subscribe((response: IDropDownDto<number>[]) => {
      this._posDatas = response;
    })
  }


  
  getProducts(): void {
    this.commonService.getProduct().subscribe((response: any) => {
      this._products = response;
    });
  }

  getPlan() {
   let insuranceCompanyId = this.fretailmotherreport.controls['insuranceCompanyId'].value;
    this.commonService.getAllPlans(this.fretailmotherreport.value.product,insuranceCompanyId).subscribe((response: any) => {
      this._plans = response;
    });
  }

  getPlanType() {
    this.commonService.getPlanType().subscribe((response: any) => {
      this._planTypes = response;
    });
  }
  submit(){
    this.fretailmotherreport.get("branchId").setValue(this._branchId);
    let policyStartDate = this.commonService.getDateInString(new Date(this.fretailmotherreport.value.policyInspectionDateFromNew));
    let policyEndDate = this.commonService.getDateInString(new Date(this.fretailmotherreport.value.policyInspectionDateToNew));

    this.fretailmotherreport.patchValue({
      policyInspectionDateFrom: policyStartDate,
      policyInspectionDateTo :policyEndDate
    });

    this.reportService.getRetailCommercialMotherReport(this.fretailmotherreport.getRawValue()).subscribe((response: ICommonDto<any>) => {
      this.rows= response.Response;
      this.panelOpenState = false
      this.reportpanel.open();
    });

  }

  allColumns :any[] = JSON.parse(JSON.stringify(this.columns));
  toggle(col:any) {
    const isChecked = this.isChecked(col);
    if(col.name == 'Control No') return
    if (isChecked) {
      this.columns = this.columns.filter(c => {
        return c.name !== col.name;
      });
    } else {
      let index=  this.allColumns.findIndex(x=>x.name == col.name);
      this.columns.splice(index, 0, col);
      this.columns = [...this.columns]
    }
  }

  isChecked(col:any) {
    return (
      this.columns.find(c => {
        return c.name === col.name;
      }) !== undefined
    );
  }

  reset(){
    this.fretailmotherreport.reset()
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
    writeFile(wb, 'Motor-' + this.fretailmotherreport.value.policyInspectionDateFrom+ '-'  + this.fretailmotherreport.value.policyInspectionDateTo +'.xlsx');
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
