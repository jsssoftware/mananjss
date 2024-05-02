import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-motherreport',
  templateUrl: './motherreport.component.html',
  styleUrls: ['./motherreport.component.css']
})
export class MotherreportComponent implements OnInit {

  public _filteredInsuranceCompaniesOptions: IDropDownDto<number>[] = [];
  public _insuranceCompanies: IDropDownDto<number>[] = [];
  public _policyTerms: IPolicyTermDto[] = [];
  public _packageTypes: IDropDownDto<number>[] = [];
  public _getPolicyTerms: any[] = [];
  panelOpenState = false;
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

  rows :any[] = [];
 columns = [
    { prop: 'controlno', name: 'Control No' },
    { prop: 'loyaltycounter', name: 'Loyalty Counter' },
    { prop: 'customercode', name: 'Customer Code' },
    { prop: 'InsuranceCompanyName', name: 'Insurance Company' },
    { prop: 'policytype', name: 'Policy Type' },
    { prop: 'nameinpolicy', name: 'Name in Policy' },
    { prop: 'customertype', name: 'Customer Type' },
    { prop: 'customeraddress1', name: 'Customer Address' },
    { prop: 'cityname', name: 'City Name' },
    { prop: 'customerpincode1', name: 'Customer Pincode' },
    { prop: 'clustername', name: 'Cluster Name' },
    { prop: 'clustercode', name: 'Cluster Code' },
    { prop: 'territoryname', name: 'Territory Name' },
    { prop: 'customerphone1', name: 'Customer Phone 1' },
    { prop: 'customerphone2', name: 'Customer Phone 2' },
    { prop: 'customermobile1', name: 'Customer Mobile 1' },
    { prop: 'customermobile2', name: 'Customer Mobile 2' },
    { prop: 'inactivemobile1', name: 'Inactive Mobile 1' },
    { prop: 'inactivemobile2', name: 'Inactive Mobile 2' },
    { prop: 'isdecisionmaker', name: 'Is Decision Maker' },
    { prop: 'policystartdateod', name: 'Policy Start Date OD' },
    { prop: 'policyenddateod', name: 'Policy End Date OD' },
    { prop: 'NoofYearOD', name: 'No. of Year OD' },
    { prop: 'policytermname', name: 'Policy Term Name' },
    { prop: 'policypackagetype', name: 'Policy Package Type' },
    { prop: 'customeremail1', name: 'Customer Email 1' },
    { prop: 'aadhaarno', name: 'Aadhaar No' },
    { prop: 'customeremail2', name: 'Customer Email 2' },
    { prop: 'covernoteno', name: 'Cover Note No' },
    { prop: 'policyno', name: 'Policy No' },
    { prop: 'policystartdate', name: 'Policy Start Date' },
    { prop: 'policyenddate', name: 'Policy End Date' },
    { prop: 'noofyear', name: 'No. of Year' },
    { prop: 'financername', name: 'Financer Name' },
    { prop: 'PrevInsCompany', name: 'Previous Insurance Company' },
    { prop: 'previouspolicyno', name: 'Previous Policy No' },
    { prop: 'PreviousPolicyEndDate', name: 'Previous Policy End Date' },
    { prop: 'nomineename', name: 'Nominee Name' },
    { prop: 'nomineeage', name: 'Nominee Age' },
    { prop: 'NomineeRelation', name: 'Nominee Relation' },
    { prop: 'manufacturername', name: 'Manufacturer Name' },
    { prop: 'modelname', name: 'Model Name' },
    { prop: 'variantname', name: 'Variant Name' },
    { prop: 'fueltype', name: 'Fuel Type' },
    { prop: 'tppremium', name: 'TP Premium' },
    { prop: 'CubicCapacity', name: 'Cubic Capacity' },
    { prop: 'seatingcapacity', name: 'Seating Capacity' },
    { prop: 'makeyear', name: 'Make Year' },
    { prop: 'registrationno', name: 'Registration No' },
    { prop: 'engineno', name: 'Engine No' },
    { prop: 'chassisno', name: 'Chassis No' },
    { prop: 'rtozonename', name: 'RTO Zone Name' },
    { prop: 'vehicleclass', name: 'Vehicle Class' },
    { prop: 'grosspremium', name: 'Gross Premium' },
    { prop: 'vehicleidv', name: 'Vehicle IDV' },
    { prop: 'cngidv', name: 'CNG IDV' },
    { prop: 'ElectricAssessoriesIDV', name: 'Electric Accessories IDV' },
    { prop: 'NonElectricAssessoriesIDV', name: 'Non-Electric Accessories IDV' },
    { prop: 'totalidv', name: 'Total IDV' },
    { prop: 'od', name: 'OD' },
    { prop: 'ncbpercentage', name: 'NCB Percentage' },
    { prop: 'specialdiscount', name: 'Special Discount' },
    { prop: 'totalod', name: 'Total OD' },
    { prop: 'totalgrosspremium', name: 'Total Gross Premium' },
    { prop: 'Loading', name: 'Loading' },
    { prop: 'VoucherNo', name: 'Voucher No' },
    { prop: 'addonridername', name: 'Add-On Rider Name' },
    { prop: 'pan', name: 'PAN' },
    { prop: 'gstin', name: 'GSTIN' },
    { prop: 'TeleCaller', name: 'Telecaller' },
    { prop: 'POSName', name: 'POS Name' },
    { prop: 'FOS', name: 'FOS' },
    { prop: 'businessdoneby', name: 'Business Done By' },
    { prop: 'policyremarks', name: 'Policy Remarks' },
    { prop: 'policystatus', name: 'Policy Status' },
    { prop: 'EndorsementReason', name: 'Endorsement Reason' },
    { prop: 'policycanceldate', name: 'Policy Cancel Date' },
    { prop: 'referencename', name: 'Reference Name' },
    { prop: 'endorsegrosspremium', name: 'Endorse Gross Premium' },
    { prop: 'endorseod', name: 'Endorse OD' },
    { prop: 'addonod', name: 'Add-On OD' },
    { prop: 'gvw', name: 'GVW' },
    { prop: 'exshowroom', name: 'Ex-Showroom' },
    { prop: 'registrationdate', name: 'Registration Date' },
    { prop: 'irdacommissionreceived', name: 'IRDA Commission Received' },
    { prop: 'monthcycle', name: 'Month Cycle' },
    { prop: 'POSCommissionReceived', name: 'POS Commission Received' },
    { prop: 'commMonth', name: 'Comm Month' },
    { prop: 'PosManageByName', name: 'POS Managed By' },
    { prop: 'customercontact', name: 'Customer Contact' },
    { prop: 'customerdob', name: 'Customer DOB' },
    { prop: 'businesstypename', name: 'Business Type Name' },
    { prop: 'industryname', name: 'Industry Name' },
    { prop: 'designationname', name: 'Designation Name' },
    { prop: 'professionname', name: 'Profession Name' },
    { prop: 'akgslipno', name: 'AKG Slip No' },
    { prop: 'akgslipissuedate', name: 'AKG Slip Issue Date' },
    { prop: 'ODInsCompany', name: 'OD Insurance Company' },
    { prop: 'commissionpaytypename', name: 'Commission Pay Type Name' },
    { prop: 'policynood', name: 'Policy No OD' },
    { prop: 'vehicleusagename', name: 'Vehicle Usage Name' },
    { prop: 'commissionablepremium', name: 'Commissionable Premium' },
];

  loadingIndicator = false;
  reorderable = true;
  ColumnMode = ColumnMode;

 //#region Policy Term Form
 fmotherreport = new FormGroup({
  insuranceCompanyId: new FormControl(''),
  policyInspectionDateFrom: new FormControl(''),
  policyInspectionDateFromNew: new FormControl(''),
  policyInspectionDateTo: new FormControl(''),
  policyInspectionDateToNew: new FormControl(''),
  packageTypeId: new FormControl(''),
  policyTermId: new FormControl(''),
  policyTypeId: new FormControl(''),
  ncbId: new FormControl(''),
  businessDoneBy: new FormControl(''),
  manufacturerId: new FormControl(''),
  vehicleClassId: new FormControl(''),
  modelId: new FormControl(''),
  rtoZoneId: new FormControl(''),
  referenceId: new FormControl(''),
  teleCallerId: new FormControl(''),
  fosId: new FormControl(''),
  addonRiderId: new FormControl(''),
  branchId: new FormControl(''),
  posNameId: new FormControl(''),
  posManagedBy: new FormControl(''),
  policyType1: new FormControl(''),
  policyType2: new FormControl(''),
  policyType3: new FormControl(''),
  policyType4: new FormControl(''),
  policyType5: new FormControl(''),
  ncb1: new FormControl(''),
  ncb2: new FormControl(''),
  ncb3: new FormControl(''),
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
    await this.getNcbs();
    await this.getVehicleClasses();
    await this.getRtoZones();
    await this.getTeleCallers(this._branchId);
    await this.getReferences(this._branchId);
    await this.getFosNames(this._branchId);
    await this.getPos(this._branchId);
    this.fmotherreport.get("insuranceCompanyId")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterInsurancerCompaniesData(input);
      else
        this.filterInsurancerCompaniesData(input.Name);
    });

    this.fmotherreport.get("manufacturerId")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterdManufacturerData(input);
      else
        this.filterdManufacturerData(input.Name);
    });


    this.fmotherreport.get('ncb1').valueChanges.subscribe((value: boolean) => {
      if (value) {
        // Checkbox 1 is checked, set numeric value in the form control
        this.fmotherreport.get('ncb1').setValue(1, { emitEvent: false });
      } else {
        // Checkbox 1 is unchecked, set numeric value to 0 or another value
        this.fmotherreport.get('ncb1').setValue(0, { emitEvent: false });
      }
    });
    this.fmotherreport.get('ncb2').valueChanges.subscribe((value: boolean) => {
      if (value) {
        // Checkbox 1 is checked, set numeric value in the form control
        this.fmotherreport.get('ncb2').setValue(1, { emitEvent: false });
      } else {
        // Checkbox 1 is unchecked, set numeric value to 0 or another value
        this.fmotherreport.get('ncb2').setValue(0, { emitEvent: false });
      }
    });
    this.fmotherreport.get('ncb3').valueChanges.subscribe((value: boolean) => {
      if (value) {
        // Checkbox 1 is checked, set numeric value in the form control
        this.fmotherreport.get('ncb3').setValue(1, { emitEvent: false });
      } else {
        // Checkbox 1 is unchecked, set numeric value to 0 or another value
        this.fmotherreport.get('ncb3').setValue(0, { emitEvent: false });
      }
    });
    this.fmotherreport.get('policyType1').valueChanges.subscribe((value: boolean) => {
      if (value) {
        // Checkbox 1 is checked, set numeric value in the form control
        this.fmotherreport.get('policyType1').setValue(1, { emitEvent: false });
      } else {
        // Checkbox 1 is unchecked, set numeric value to 0 or another value
        this.fmotherreport.get('policyType1').setValue(0, { emitEvent: false });
      }
    });
    this.fmotherreport.get('policyType2').valueChanges.subscribe((value: boolean) => {
      if (value) {
        // Checkbox 1 is checked, set numeric value in the form control
        this.fmotherreport.get('policyType2').setValue(1, { emitEvent: false });
      } else {
        // Checkbox 1 is unchecked, set numeric value to 0 or another value
        this.fmotherreport.get('policyType2').setValue(0, { emitEvent: false });
      }
    });
    this.fmotherreport.get('policyType3').valueChanges.subscribe((value: boolean) => {
      if (value) {
        // Checkbox 1 is checked, set numeric value in the form control
        this.fmotherreport.get('policyType3').setValue(1, { emitEvent: false });
      } else {
        // Checkbox 1 is unchecked, set numeric value to 0 or another value
        this.fmotherreport.get('policyType3').setValue(0, { emitEvent: false });
      }
    });
    this.fmotherreport.get('policyType4').valueChanges.subscribe((value: boolean) => {
      if (value) {
        // Checkbox 1 is checked, set numeric value in the form control
        this.fmotherreport.get('policyType4').setValue(1, { emitEvent: false });
      } else {
        // Checkbox 1 is unchecked, set numeric value to 0 or another value
        this.fmotherreport.get('policyType4').setValue(0, { emitEvent: false });
      }
    });
    this.fmotherreport.get('policyType5').valueChanges.subscribe((value: boolean) => {
      if (value) {
        // Checkbox 1 is checked, set numeric value in the form control
        this.fmotherreport.get('policyType5').setValue(1, { emitEvent: false });
      } else {
        // Checkbox 1 is unchecked, set numeric value to 0 or another value
        this.fmotherreport.get('policyType5').setValue(0, { emitEvent: false });
      }
    });

  }


  
  getInsuranceCompanies(): any {
    this.commonService.getInsuranceCompanies(Vertical.Motor).subscribe((response: IDropDownDto<number>[]) => {
      this._insuranceCompanies =  response;
    });
  }
  
  getAllPolicyTerms(): any {
    this.commonService.getAllPolicyTerms(this.fmotherreport.value.packageTypeId).subscribe((response: IDropDownDto<any>[]) => {
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

  
  getNcbs(): any {
    this.commonService.getNcbs().subscribe((response: any) => {
      this._ncbs = response;
    });
  }


  
  getManufacturerForBind(value: number): string {
    return value ? this._manufacturers.filter(f => f.Value == value)[0].Name : '';
  }

  
  filterdManufacturerData(input: any) {
    if (input === undefined)
      return;
    this._filteredManufacturerOptions = this._manufacturers.filter(item => {
      return item.Name?.toLowerCase().indexOf(input.toLowerCase()) > -1
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
    let manufacturerId = this.fmotherreport.value.manufactureId;
    this.commonService.getModels(manufacturerId).subscribe((response: IDropDownDto<number>[]) => {
      this._models = response;
    });
  }

  getPos(branchId: number): void {
    this.commonService.getPos(Vertical.Motor, branchId).subscribe((response: IDropDownDto<number>[]) => {
      this._posDatas = response;
    })
  }

  submit(){
    this.fmotherreport.get("branchId").setValue(this._branchId);
    let policyStartDate = this.commonService.getDateInString(new Date(this.fmotherreport.value.policyInspectionDateFromNew));
    let policyEndDate = this.commonService.getDateInString(new Date(this.fmotherreport.value.policyInspectionDateToNew));

    this.fmotherreport.patchValue({
      policyInspectionDateFrom: policyStartDate,
      policyInspectionDateTo :policyEndDate
    });

    this.reportService.getMotorMotherReport(this.fmotherreport.getRawValue()).subscribe((response: ICommonDto<any>) => {
      this.rows= response.Response
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
    this.fmotherreport.reset()
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
    writeFile(wb, 'Motor-' + this.fmotherreport.value.policyInspectionDateFrom+ '-'  + this.fmotherreport.value.policyInspectionDateTo +'.xlsx');
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
