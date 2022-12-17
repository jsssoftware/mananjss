import { element } from 'protractor';
import { UpperCasePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICommonDto } from 'src/app/app-entites/dtos/common/common-dto';
import { IDropDownDto } from 'src/app/app-entites/dtos/common/drop-down-dto';
import { IAddUpdateCustomerModel } from 'src/app/app-entites/models/customer/add-update-customer-model';
import { ICommonService } from 'src/app/app-services/common-service/abstracts/common.iservice';
import { ICustomerService } from 'src/app/app-services/customer-service/abstracts/customer.iservice';
import { Vertical } from 'src/app/shared/utilities/enums/enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit, AfterViewInit, ErrorStateMatcher {

  matcher = new ErrorStateMatcher();

  //#region Variables
  public _titles: IDropDownDto<number>[] = [];
  public _territories: IDropDownDto<number>[] = [];
  public _maritalStatus: IDropDownDto<number>[] = [];
  public _professions: IDropDownDto<number>[] = [];
  public _businessLines: IDropDownDto<number>[] = [];
  public _industries: IDropDownDto<number>[] = [];
  public _designations: IDropDownDto<number>[] = [];
  public _cities: IDropDownDto<number>[] = [];
  public _customerTypes: IDropDownDto<number>[] = [];
  public _selectedPolicyAddress: number = 0;
  public _selectedMobileCommunication: number = 0;
  public _selectedWhatsAppCommunication: number = 0;
  public _customerName: string = "";
  public _pushingArray: any = [];
  public _posDatas: IDropDownDto<number>[] = [];
  private _branchId: any;
  public _references: any;
  public _teamMembers: IDropDownDto<number>[] = [];
  public _genders: IDropDownDto<number>[] = [];
  public _titlesWithoutMS: IDropDownDto<number>[] = [];
  public _clusters: IDropDownDto<number>[] = [];
  public _customerContactAsterisk: boolean = false;
  public _panAsterisk: boolean = false;
  public _filteredCity1Options : IDropDownDto<number>[] = [];
  public _filteredCity2Options : IDropDownDto<number>[] = [];
  public _filteredCity3Options : IDropDownDto<number>[] = [];
  public defaultVertical = 0;
  public _customerId:any =0;
  //#endregion

  //#region Search Customer Form
  searchCustomerForm = new FormGroup({
    customerCode: new FormControl('')
  });
  //#endregion

  //#region Add Customer Form
  addCustomerForm = new FormGroup({
    customerNameSalutation: new FormControl(''),
    customerName: new FormControl('', [Validators.required]),
    customerType: new FormControl('', [Validators.required]),
    customerContactSalutation: new FormControl(''),
    customerContact: new FormControl(''),
    decisionMaker: new FormControl(false),
    customerCluster: new FormControl(''),
    companyTerritory: new FormControl(''),
    address1: new FormControl('', [Validators.required]),
    city1: new FormControl('', [Validators.required]),
    pincode1: new FormControl('', [Validators.pattern('^[1-9][0-9]{5}$')]),
    gstin1: new FormControl('', [Validators.pattern('^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$')]),
    address2: new FormControl(''),
    city2: new FormControl(''),
    pincode2: new FormControl('', [Validators.pattern('^[1-9][0-9]{5}$')]),
    gstin2: new FormControl('', [Validators.pattern('^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$')]),
    address3: new FormControl(''),
    city3: new FormControl(''),
    pincode3: new FormControl('', [Validators.pattern('^[1-9][0-9]{5}$')]),
    gstin3: new FormControl('', [Validators.pattern('^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$')]),
    mobile1: new FormControl('', [Validators.pattern('^[1-9][0-9]+$')]),
    mobile2: new FormControl('', [Validators.pattern('^[1-9][0-9]+$')]),
    phone1: new FormControl('', [Validators.pattern('^[0-9]+$')]),
    phone2: new FormControl('', [Validators.pattern('^[0-9]+$')]),
    email1: new FormControl('', [Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]), //pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    email2: new FormControl('', [Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]),
    referBy: new FormControl(''),
    pos: new FormControl(''),
    teamMember: new FormControl(''),
    reference: new FormControl(''),
    gender: new FormControl(''),
    passportNumber: new FormControl(''),
    pan: new FormControl('', [Validators.pattern('^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$')]),
    aadhaar: new FormControl('', [Validators.pattern('^[0-9]+$')]),
    maritalStatus: new FormControl(''),
    numberOfDependent: new FormControl(''),
    profession: new FormControl(''),
    lineOfBusiness: new FormControl(''),
    industry: new FormControl(''),
    designation: new FormControl(''),
    selectedPolicyAddress: new FormControl(),
    selectedMobileCommunication: new FormControl(),
    selectedWhatsAppCommunication: new FormControl(),
    dateOfBirth: new FormControl(''),
    dateOfAnniversary: new FormControl(''),
    communicationOptOut1: new FormControl(false),
    communicationOptOut2: new FormControl(false),
    communicationOptOut3: new FormControl(false),
    communicationOptOut4: new FormControl(false),
    isPos: new FormControl(false),
    isTeamMember: new FormControl(false)
  });
  //#endregion

  constructor(
    private commonService: ICommonService,
    private customerService: ICustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this._customerTypes = [
      {
        Name: "Company / Firm",
        Value: 1
      },
      {
        Name: "Individual",
        Value: 2
      }];

    let customerId = this.route.snapshot.paramMap.get('customerId');
    if (customerId != null) {
      this._customerId = parseInt(customerId);
    }
    this._customerName = this.route.snapshot.paramMap.get('name') as string;

    this._branchId = parseInt(sessionStorage.getItem("branchId") as string);
  }

  ngOnInit(): void {

    this.addCustomerForm.get("city1")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterCity1Data(input);
      else
        this.filterCity1Data(input.Name);
    }); 

    this.addCustomerForm.get("city2")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterCity2Data(input);
      else
        this.filterCity2Data(input.Name);
    }); 

    this.addCustomerForm.get("city3")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterCity3Data(input);
      else
        this.filterCity3Data(input.Name);
    }); 

  }




  ngAfterViewInit(): void {
    this.getTitles();
    this.getTerritories();
    this.getMaritalStatus();
    this.getProfessions();
    this.getBusinessLines();
    this.getIndustries();
    this.getDesignations();
    this.getCities();
    this.getPos(this._branchId);
    this.getReferences(this._branchId);
    this.getTeamMembers(this._branchId);
    this.getGenders();
    this.getClusters();
    this.getCustomerById(this._customerId);

    if (this._customerName != null) {
      this.addCustomerForm.patchValue({ customerName: this._customerName });
    }
  }

  filterCity1Data(input: any) {
    if (input === undefined)
      return;
    this._filteredCity1Options = this._cities.filter(item => {
      return item.Name.toLowerCase().indexOf(input.toLowerCase()) > -1
    });
  }
  
  
  filterCity2Data(input: any) {
    if (input === undefined)
      return;
    this._filteredCity2Options = this._cities.filter(item => {
      return item.Name.toLowerCase().indexOf(input.toLowerCase()) > -1
    });
  }

  filterCity3Data(input: any) {
    if (input === undefined)
      return;
    this._filteredCity3Options = this._cities.filter(item => {
      return item.Name.toLowerCase().indexOf(input.toLowerCase()) > -1
    });
  }

  
  displayFn(data: any): string {
    return data && data.Name ? data.Name : '';
  }
  
  getTitles(): void {
    this.customerService.getAllTitles().subscribe((response: IDropDownDto<number>[]) => {
      this._titles = response;
    });
  }

  getTerritories(): void {
    let branchId: any = sessionStorage.getItem("branchId");
    this.customerService.getAllTerritories(parseInt(branchId)).subscribe((response: IDropDownDto<number>[]) => {
      this._territories = response;
    });
  }

  getMaritalStatus(): void {
    this.customerService.getAllMaritalStatus().subscribe((response: IDropDownDto<number>[]) => {
      this._maritalStatus = response;
    });
  }

  getProfessions(): void {
    this.customerService.getAllProfessions().subscribe((response: IDropDownDto<number>[]) => {
      this._professions = response;
    });
  }

  getBusinessLines(): void {
    this.customerService.getAllLineOfBusinesses().subscribe((response: IDropDownDto<number>[]) => {
      this._businessLines = response;
    });
  }

  getIndustries(): void {
    this.customerService.getAllIndustries().subscribe((response: IDropDownDto<number>[]) => {
      this._industries = response;
    });
  }

  getDesignations(): void {
    this.customerService.getAllDesignations().subscribe((response: IDropDownDto<number>[]) => {
      this._designations = response;
    });
  }

  getCities(): void {
    this.commonService.getCities().subscribe((response: IDropDownDto<number>[]) => {
      this._cities = response;
    });
  }

  getAddCustomerPayload(): IAddUpdateCustomerModel {

    let branchId: any = sessionStorage.getItem("branchId");
    let model: IAddUpdateCustomerModel = {
      Id: this._customerId,
      Aadhaar: this.addCustomerForm.value.aadhaar,
      BranchId: parseInt(branchId),
      Address1: this.addCustomerForm.value.address1,
      Address2: this.addCustomerForm.value.address2,
      Address3: this.addCustomerForm.value.address3,
      City1: this.addCustomerForm.value.city1.Value,
      City2: this.addCustomerForm.value.city2.Value,
      City3: this.addCustomerForm.value.city3.Value,
      CommunicationOptOut1: this.addCustomerForm.value.communicationOptOut1,
      CommunicationOptOut2: this.addCustomerForm.value.communicationOptOut2,
      CommunicationOptOut3: this.addCustomerForm.value.communicationOptOut3,
      CommunicationOptOut4: this.addCustomerForm.value.communicationOptOut4,
      CustomerType: this.addCustomerForm.value.customerType,
      CompanyTerritory: this.addCustomerForm.value.companyTerritory,
      CustomerCluster: this.addCustomerForm.value.customerCluster,
      CustomerContact: this.addCustomerForm.value.customerContact,
      CustomerContactSalutation: this.addCustomerForm.value.customerContactSalutation,
      CustomerName: this.addCustomerForm.value.customerName,
      CustomerNameSalutation: this.addCustomerForm.value.customerNameSalutation,
      DateOfAnniversary: this.commonService.getDateInString(this.addCustomerForm.value.dateOfAnniversary),
      DateOfBirth: this.commonService.getDateInString(this.addCustomerForm.value.dateOfBirth),
      DecisionMaker: this.addCustomerForm.value.decisionMaker,
      Designation: this.addCustomerForm.value.designation,
      Email1: this.addCustomerForm.value.email1,
      Email2: this.addCustomerForm.value.email2,
      Gstin1: this.addCustomerForm.value.gstin1,
      Gstin2: this.addCustomerForm.value.gstin2,
      Gstin3: this.addCustomerForm.value.gstin3,
      Industry: this.addCustomerForm.value.industry,
      LineOfBusiness: this.addCustomerForm.value.lineOfBusiness,
      MaritalStatus: this.addCustomerForm.value.maritalStatus,
      Mobile1: this.addCustomerForm.value.mobile1,
      Mobile2: this.addCustomerForm.value.mobile2,
      NumberOfDependent: this.addCustomerForm.value.numberOfDependent,
      Pan: this.addCustomerForm.value.pan,
      Phone1: this.addCustomerForm.value.phone1,
      Phone2: this.addCustomerForm.value.phone2,
      Pincode1: this.addCustomerForm.value.pincode1,
      Pincode2: this.addCustomerForm.value.pincode2,
      Pincode3: this.addCustomerForm.value.pincode3,
      Pos: this.addCustomerForm.value.pos,
      Profession: this.addCustomerForm.value.profession,
      ReferBy: this.addCustomerForm.value.referBy,
      Reference: this.addCustomerForm.value.reference,
      SelectedMobileCommunication: this.addCustomerForm.value.selectedMobileCommunication,
      SelectedPolicyAddress: this.addCustomerForm.value.selectedPolicyAddress,
      SelectedWhatsAppCommunication: this.addCustomerForm.value.selectedWhatsAppCommunication,
      TeamMember: this.addCustomerForm.value.teamMember,
      Gender: this.addCustomerForm.value.gender,
      IsPos: this.addCustomerForm.value.isPos,
      IsTeamMember: this.addCustomerForm.value.isTeamMember,
      PassportNumber: this.addCustomerForm.value.passportNumber,
    };

    return model;
  }

  addCustomer(): void {
    if (this.addCustomerForm.invalid) return;
    let model = this.getAddCustomerPayload();
    console.log(model);

    this.customerService.addCustomer(model).subscribe((response: ICommonDto<any>) => {
      if (response.IsSuccess) {
        Swal.fire({
          icon: 'success',
          text: response.Message
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['./master/customer']);
          }
        });
      }
      else {
        if (response.Response == null) {
          Swal.fire({
            icon: 'error',
            text: response.Message,
          });
        }
        else {
          let htmlString = ``;
          if (response.Response.Type == 1) {
            htmlString = `<p style="color:red;">${response.Message}</p><table class="table" style="width: 100%;">
            <thead>
              <tr>
                <td>Mobile</td>
                <td>Input Field</td>
                <td>Name</td>
                <td>Code</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody>`;
            for (var i = 0; i < response.Response.Data.length; i++) {
              htmlString += `<tr>
                    <td>${response.Response.Data[i].Mobile}</td>
                    <td>${response.Response.Data[i].SelectedMobile}</td>
                    <td>${response.Response.Data[i].Name}</td>
                    <td>${response.Response.Data[i].Code}</td>
                    <td>${response.Response.Data[i].Description}</td>
                  </tr>`;
            }

            htmlString += `</tbody></table>`;
          }
          else {
            htmlString = `<p style="color:red;">${response.Message}</p><table class="table" style="width: 100%;">
            <thead>
              <tr>
                <td>Mobile</td>
                <td>Input Field</td>
                <td>Name</td>
                <td>Code</td>
                <td>Cluster Name</td>
                <td>Cluster Code</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody>`;
            for (var i = 0; i < response.Response.Data.length; i++) {
              htmlString += `<tr>
                    <td>${response.Response.Data[i].Mobile}</td>
                    <td>${response.Response.Data[i].SelectedMobile}</td>
                    <td>${response.Response.Data[i].Name}</td>
                    <td>${response.Response.Data[i].Code}</td>
                    <td>${response.Response.Data[i].ClusterName}</td>
                    <td>${response.Response.Data[i].ClusterCode}</td>
                    <td>${response.Response.Data[i].Description}</td>
                  </tr>`;
            }

            htmlString += `</tbody></table>`;
          }
          Swal.fire({
            icon: 'info',
            html: htmlString,
            text: response.Message,
            width: '1000px'
          });
        }
      }
    });
  }

  getCustomerByCode(): void {
    let code: string = this.searchCustomerForm.value.customerCode.trim();
    if (code.length == 0) return;
    this.customerService.getCustomerByCode(code).subscribe((response: ICommonDto<IAddUpdateCustomerModel>) => {
      if (response.IsSuccess) {
        this.setCustomerData(response.Response);
      }
      else {
        alert(response.Message);
      }
    });
  }

  getCustomerById(custmerId: number): void {
    this.customerService.getCustomerById(custmerId).subscribe((response: ICommonDto<IAddUpdateCustomerModel>) => {
      if (response.IsSuccess) {
        this.setCustomerData(response.Response);
      }
      else {
        alert(response.Message);
      }
    });
  }

  setCustomerData(data: IAddUpdateCustomerModel): void {
    debugger
    this.addCustomerForm.setValue({
      customerNameSalutation: data.CustomerNameSalutation,
      customerName: data.CustomerName,
      customerType: data.CustomerType,
      customerContactSalutation: data.CustomerContactSalutation,
      customerContact: data.CustomerContact,
      decisionMaker: data.DecisionMaker,
      customerCluster: data.CustomerCluster,
      companyTerritory: data.CompanyTerritory,
      address1: data.Address1,
      city1: data.City1,
      pincode1: data.Pincode1,
      gstin1: data.Gstin1,
      address2: data.Address2,
      city2: data.City2,
      pincode2: data.Pincode2,
      gstin2: data.Gstin2,
      address3: data.Address3,
      city3: data.City3,
      pincode3: data.Pincode3,
      gstin3: data.Gstin3,
      mobile1: data.Mobile1,
      mobile2: data.Mobile2,
      phone1: data.Phone1,
      phone2: data.Phone2,
      email1: data.Email1,
      email2: data.Email2,
      referBy: data.ReferBy,
      pos: data.Pos,
      teamMember: data.TeamMember,
      reference: data.Reference,
      pan: data.Pan,
      aadhaar: data.Aadhaar,
      maritalStatus: data.MaritalStatus,
      numberOfDependent: data.NumberOfDependent,
      profession: data.Profession,
      lineOfBusiness: data.LineOfBusiness,
      industry: data.Industry,
      designation: data.Designation,
      selectedPolicyAddress: data.SelectedPolicyAddress,
      selectedMobileCommunication: data.SelectedMobileCommunication,
      selectedWhatsAppCommunication: data.SelectedWhatsAppCommunication,
      dateOfBirth: new Date(data.DateOfBirth),
      dateOfAnniversary: new Date(data.DateOfAnniversary),
      communicationOptOut1: data.CommunicationOptOut1,
      communicationOptOut2: data.CommunicationOptOut2,
      communicationOptOut3: data.CommunicationOptOut3,
      communicationOptOut4: data.CommunicationOptOut4,
      gender: data.Gender,
      passportNumber: data.PassportNumber,
      isPos: data.IsPos,
      isTeamMember: data.IsTeamMember
    });

    this._selectedPolicyAddress = data.SelectedPolicyAddress;
    this._selectedMobileCommunication = data.SelectedMobileCommunication;
    this._selectedWhatsAppCommunication = data.SelectedWhatsAppCommunication;
  }

  cancelCustomer(): void {
    this.router.navigate(["/master/customer"]);
    // Swal.fire({
    //   position: 'top-end',
    //   icon: 'error',
    //   text: 'Adding customer has cancelled',
    //   showConfirmButton: false,
    //   timer: 3000
    // });
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

  getPanFromGstNumber() {
    if (this.addCustomerForm.controls.address1.valid && this.addCustomerForm.controls.city1.valid
      && this.addCustomerForm.controls.pincode1.valid && this.addCustomerForm.controls.gstin1.dirty) {
      let Pan: string = this.addCustomerForm.controls.gstin1.value.toString().substring(2, 6).toUpperCase()
        + this.addCustomerForm.controls.gstin1.value.toString().substring(6, 10).toUpperCase()
        + this.addCustomerForm.controls.gstin1.value.toString().substring(10, 12).toUpperCase();
      this.addCustomerForm.patchValue({ pan: Pan })
    }
  }

  customerContactValidation(event: number) {
    this.customerService.getAllTitlesWithoutMS().subscribe((response: IDropDownDto<number>[]) => {
      this._titlesWithoutMS = response;
    });

    if (event == 1) {
      this.genericSetValidator(['customerContact']);
      this.genericClearValidator(['pan']);
      this._customerContactAsterisk = true;
      this._panAsterisk = false;
    }
    else if (event == 2) {
      this.genericSetValidator(['pan']);
      this.genericClearValidator(['customerContact']);
      this._panAsterisk = true;
      this._customerContactAsterisk = false;
    }
    this.genericUpdateValueAndValidity(['customerContact','pan']);
  }

  referByValidation(event: number) {

    if (event == 1) {
      this.genericClearValidator(['teamMember', 'reference']);
      this.genericSetValidator(['pos']);

    }
    else if (event == 2) {
      this.genericClearValidator(['pos', 'reference']);
      this.genericSetValidator(['teamMember', 'mobile1']);

    }
    else {
      this.genericClearValidator(['pos', 'teamMember']);
      this.genericSetValidator(['reference', 'mobile1']);

    }
    this.genericUpdateValueAndValidity(['mobile1', 'reference', 'pos', 'teamMember']);
  }

  genericUpdateValueAndValidity = (args: string[]) => {
    args.forEach(element => {
      this.addCustomerForm.controls[element].updateValueAndValidity();
    });
  }

  genericClearValidator = (args: string[]) => {
    args.forEach(element => {
      this.addCustomerForm.controls[element].clearValidators();
      this.addCustomerForm.patchValue({ [element]: "" });
    });
  }

  genericSetValidator = (args: string[]) => {
    args.forEach(element => {
      this.addCustomerForm.controls[element].setValidators([Validators.required]);
      if(element == 'pan'){
        this.addCustomerForm.controls[element].setValidators([Validators.pattern('^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$')]);
      }
    });
  }

  mobileOrPhoneComparision(event: any) {
    if (this._pushingArray.includes(event.target.value) == false) {
      this._pushingArray.push(event.target.value);
    }
    else {
      Swal.fire({
        icon: 'error',
        text: event.target.dataset.placeholder + ' and other Mobile / Phone numbers cannot be same',
      });
      this.addCustomerForm.setErrors({ 'invalid': true });
    }
  }

  validateMultipleGstin() {
    if (this.addCustomerForm.controls.gstin1.value != '' && this.addCustomerForm.controls.gstin2.value != '') {
      if (this.addCustomerForm.controls.gstin1.value.toString().substring(0, 2) != this.addCustomerForm.controls.gstin2.value.toString().substring(0, 2)) {
        if (this.addCustomerForm.controls.gstin1.value.toString().substring(2, 12) != this.addCustomerForm.controls.gstin2.value.toString().substring(2, 12)) {
          Swal.fire({
            icon: 'error',
            text: 'GSTIN 1 and GSTIN 2 are not same',
          });
          this.addCustomerForm.setErrors({ 'invalid': true });
        }
      }
      else {
        Swal.fire({
          icon: 'error',
          text: 'State code should be different',
        });
        this.addCustomerForm.setErrors({ 'invalid': true });
      }
    }
    else if (this.addCustomerForm.controls.gstin1.value != '' && this.addCustomerForm.controls.gstin3.value != '') {
      if (this.addCustomerForm.controls.gstin1.value.toString().substring(0, 2) != this.addCustomerForm.controls.gstin3.value.toString().substring(0, 2)) {
        if (this.addCustomerForm.controls.gstin1.value.toString().substring(2, 12) != this.addCustomerForm.controls.gstin3.value.toString().substring(2, 12)) {
          Swal.fire({
            icon: 'error',
            text: 'GSTIN 1 and GSTIN 3 are not same',
          });
          this.addCustomerForm.setErrors({ 'invalid': true });
        }
      }
      else {
        Swal.fire({
          icon: 'error',
          text: 'State code should be different',
        });
        this.addCustomerForm.setErrors({ 'invalid': true });
      }
    }
    else if (this.addCustomerForm.controls.gstin2.value != '' && this.addCustomerForm.controls.gstin3.value != '') {
      if (this.addCustomerForm.controls.gstin2.value.toString().substring(0, 2) != this.addCustomerForm.controls.gstin3.value.toString().substring(0, 2)) {
        if (this.addCustomerForm.controls.gstin2.value.toString().substring(2, 12) != this.addCustomerForm.controls.gstin3.value.toString().substring(2, 12)) {
          Swal.fire({
            icon: 'error',
            text: 'GSTIN 2 and GSTIN 3 are not same',
          });
          this.addCustomerForm.setErrors({ 'invalid': true });
        }
      }
      else {
        Swal.fire({
          icon: 'error',
          text: 'State code should be different',
        });
        this.addCustomerForm.setErrors({ 'invalid': true });
      }
    }
  }

  getPos(branchId: number): void {
    this.commonService.getPos(Vertical.Motor, branchId).subscribe((response: IDropDownDto<number>[]) => {
      this._posDatas = response;
    })
  }

  getReferences(branchId: number): any {
    this.commonService.getReferences(branchId).subscribe((response: any) => {
      this._references = response;
    });
  }

  getTeamMembers(branchId: number): any {
    this.commonService.getAllTeamMembers(this.defaultVertical, branchId).subscribe((response: IDropDownDto<number>[]) => {
      this._teamMembers = response;
    });
  }

  getGenders(): any {
    this.commonService.getAllGenders().subscribe((response: IDropDownDto<number>[]) => {
      this._genders = response;
    });
  }

  checkboxSelection(checkboxName: string) {
    switch (checkboxName) {
      case "pos":
        this.addCustomerForm.patchValue({ isTeamMember: false });
        break;
      case "teamMember":
        this.addCustomerForm.patchValue({ isPos: false });
        break;
    }
  }

  getClusters() {
    console.log("getClusters");
    this.customerService.getAllClusters().subscribe((response: IDropDownDto<number>[]) => {
      console.log( response," response");
      this._clusters = response;
    })
  }
}