import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ICommonDto } from 'src/app/app-entites/dtos/common/common-dto';
import { IDateDto } from 'src/app/app-entites/dtos/common/date-dto';
import { IDropDownDto } from 'src/app/app-entites/dtos/common/drop-down-dto';
import { IVoucherSearchPolicyDto } from 'src/app/app-entites/dtos/voucher/voucher-search-policy-dto';
import { IAddUpdateVoucherModel } from 'src/app/app-entites/models/voucher/add-update-voucher-model';
import { IVoucherDto } from 'src/app/app-entites/dtos/voucher/voucher-dto';
import { ICommonService } from 'src/app/app-services/common-service/abstracts/common.iservice';
import { ICustomerService } from 'src/app/app-services/customer-service/abstracts/customer.iservice';
import { IVoucherService } from 'src/app/app-services/voucher/abstracts/voucher.iservice';
import { Vertical } from 'src/app/shared/utilities/enums/enum';
import Swal from 'sweetalert2';
import { SearchPolicyVoucherComponent } from '../search-policy-voucher/search-policy-voucher.component';

@Component({
  selector: 'app-add-voucher',
  templateUrl: './add-voucher.component.html',
  styleUrls: ['./add-voucher.component.css']
})
export class AddVoucherComponent implements OnInit, AfterViewInit {
  //#region Variables
  public _form: string = '';
  public _header: string = '';
  public _mode: number = 0;
  public _voucherId: number = 0;
  public _isControlNumberDisabled: boolean = false;
  public _isControlNumberSearchDisabled: boolean = false;
  public _isRemarksDisabled: boolean = false;
  public _isFormControlDisabled: boolean = false;
  public _isVoucherTypeDisabled: boolean = false;
  public _disabledControlsInUpdate: boolean = false;

  public _createdBy: string = '';
  public _createdDate: string = '';
  public _modifiedBy: string = '';
  public _modifiedDate: string = '';
  public _verifiedBy: string = '';
  public _verifiedDate: string = '';
  public _status: string = '';
  public _verificationStatus: string = '';
  public _voucherType: string = '';
  public _insuranceCompanies: IDropDownDto<number>[] = [];
  public _filteredInsuranceCompaniesOptions: IDropDownDto<number>[] = [];
  public _paymentTypes: IDropDownDto<number>[] = [];
  public _banks: IDropDownDto<number>[] = [];
  public _voucherTypes: IDropDownDto<number>[] = [];
  public _verticals: any;
  public _branchId: number;
  public _posDatas: IDropDownDto<number>[] = [];
  public _filteredPosOptions: IDropDownDto<number>[] = [];
  public _filteredCustomerOptions: IDropDownDto<number>[] = [];
  public _inHouseDatas: IDropDownDto<number>[] = [];
  public _filteredInHouseOptions: IDropDownDto<number>[] = [];
  public _customers: IDropDownDto<number>[] = [];
  public _customersNamePhone: IDropDownDto<number>[] = [];
  public _filteredOptions: IDropDownDto<number>[] = [];
  public _labelText: string = 'Remarks';
  public _updateMode: string = '';
  public _branchCode: string;

  public _modificationReason: string = '';
  public _cancelReason: string = '';
  public _bouncedAmount: number = 0;
  public _bouncedDate: string = '';
  public _bouncedReceiptNumber: string = '';

  //#endregion

  //#region Form
  voucherForm = new FormGroup({
    amount: new FormControl('', [Validators.required]),
    paymentDate: new FormControl('', [Validators.required]),
    bank: new FormControl('', [Validators.required]),
    insuranceCompany: new FormControl('', [Validators.required]),
    customerName: new FormControl('', [Validators.required]),
    vertical: new FormControl('', [Validators.required]),
    pos: new FormControl('', [Validators.required]),
    inhouse: new FormControl('', [Validators.required]),
    voucherType: new FormControl('', [Validators.required]),
    paymentMode: new FormControl('', [Validators.required]),
    controlNumber: new FormControl(''),
    policyNumber: new FormControl(''),
    policyId: new FormControl(''),
    referTypeId: new FormControl(''),
    accountUsedForChequeIssue: new FormControl(''),
    instrumentNumber: new FormControl(''),
    voucherDate: new FormControl(''),
    voucherNumber: new FormControl(''),
    remarks: new FormControl(''),
    searchcustomer: new FormControl(''),
    reason: new FormControl('', [Validators.required]),
    updateMode: new FormControl('', [Validators.required]),
    bouncedAmount: new FormControl('', [Validators.required]),
    bouncedDate: new FormControl('', [Validators.required]),
    bouncedReceiptNumber: new FormControl('', [Validators.required])
  });
  //#endregion


  constructor(private customerService: ICustomerService,
    private voucherService: IVoucherService,
    private commonService: ICommonService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog) {

    const formType = this.route.snapshot.paramMap.get('form-type') as string;

    this._form = formType;
    this._branchId = parseInt(sessionStorage.getItem("branchId") as string);
    this._branchCode = sessionStorage.getItem("branchId") as string;
    this._voucherId = parseInt(this.route.snapshot.paramMap.get('voucherId') as string);
    this._mode = parseInt(this.route.snapshot.paramMap.get('mode') as string);

    switch (this._mode) {
      case 0:
        this._header = 'Add New Voucher';
        this._isControlNumberDisabled = true;
        break;
      case 1: // View
        this._isControlNumberDisabled = this._isFormControlDisabled = this._isRemarksDisabled = this._isControlNumberSearchDisabled = true;
        this._header = 'View Voucher';
        break;
      case 2: // Verification
        this._isControlNumberDisabled = this._isFormControlDisabled = this._isControlNumberSearchDisabled = true;
        this._header = 'Voucher Approval';

        break;
      case 3: // Update
        this._header = 'Update Voucher';
        this._disabledControlsInUpdate = this._isControlNumberDisabled = true;
        break;
      case 4: // Update Control Number
        this._header = 'Control Number Updation in Voucher';
        this._isFormControlDisabled = this._isRemarksDisabled = this._isControlNumberDisabled = true;
        break;
    }
  }

  ngAfterViewInit(): void {
    this.getInsuranceCompanies();
    this.getPaymentModes();
    this.getBanks();
    this.getVoucherTypes();
    this.getVerticals();
    this.getPos(Vertical.All);
    this.getInHouse(Vertical.All);
    this.getCustomers();
    this.getCustomersNamePhone();
    if (this._form === 'update') {
      this.setVoucherDetails();
    }

    if (this._mode == 0) {
      this.voucherForm.get('reason')?.clearValidators();
      this.voucherForm.get('reason')?.updateValueAndValidity();
      this.voucherForm.get('updateMode')?.clearValidators();
      this.voucherForm.get('updateMode')?.updateValueAndValidity();
      this.voucherForm.get('bouncedAmount')?.clearValidators();
      this.voucherForm.get('bouncedAmount')?.updateValueAndValidity();
      this.voucherForm.get('bouncedDate')?.clearValidators();
      this.voucherForm.get('bouncedDate')?.updateValueAndValidity();
      this.voucherForm.get('bouncedReceiptNumber')?.clearValidators();
      this.voucherForm.get('bouncedReceiptNumber')?.updateValueAndValidity();
    }
  }

  ngOnInit(): void {
    this.voucherForm.get("customerName")?.valueChanges.subscribe(input => {
      if (typeof (input) == "string")
        this.filterData(input);
      else
        this.filterData(input.Name);
    });

    this.voucherForm.get('referTypeId')?.valueChanges.subscribe(value => {
      if (value == '1') {
        this.voucherForm.get('inhouse')?.setValidators(Validators.required);
        this.voucherForm.get('inhouse')?.updateValueAndValidity();
        this.voucherForm.get('pos')?.clearValidators();
        this.voucherForm.get('pos')?.updateValueAndValidity();
        this.voucherForm.patchValue({ pos: '' });
      }
      else {
        this.voucherForm.get('pos')?.setValidators(Validators.required);
        this.voucherForm.get('pos')?.updateValueAndValidity();
        this.voucherForm.get('inhouse')?.clearValidators();
        this.voucherForm.get('inhouse')?.updateValueAndValidity();
        this.voucherForm.patchValue({ inhouse: '' });
      }
    });

    this.voucherForm.get('updateMode')?.valueChanges.subscribe(value => {
      if (value == '1') {
        this._labelText = 'Reason for Modification';
      }
      else if (value == '2') {
        this._labelText = 'Reason for Cancellation';
      }

      switch (value) {
        case '1':
        case '2':
          this.voucherForm.get('bouncedAmount')?.clearValidators();
          this.voucherForm.get('bouncedAmount')?.updateValueAndValidity();
          this.voucherForm.get('bouncedDate')?.clearValidators();
          this.voucherForm.get('bouncedDate')?.updateValueAndValidity();
          this.voucherForm.get('bouncedReceiptNumber')?.clearValidators();
          this.voucherForm.get('bouncedReceiptNumber')?.updateValueAndValidity();
          this.voucherForm.get('reason')?.setValidators(Validators.required);
          this.voucherForm.get('reason')?.updateValueAndValidity();
          break;
        case '3':
          this.voucherForm.get('reason')?.clearValidators();
          this.voucherForm.get('reason')?.updateValueAndValidity();
          this.voucherForm.get('bouncedAmount')?.setValidators(Validators.required);
          this.voucherForm.get('bouncedAmount')?.updateValueAndValidity();
          this.voucherForm.get('bouncedDate')?.setValidators(Validators.required);
          this.voucherForm.get('bouncedDate')?.updateValueAndValidity();
          this.voucherForm.get('bouncedReceiptNumber')?.setValidators(Validators.required);
          this.voucherForm.get('bouncedReceiptNumber')?.updateValueAndValidity();
          break;
      }
    });

    this.voucherForm.get("paymentMode")?.valueChanges.subscribe(value => {
      if (value === 1) {
        this.voucherForm.get('instrumentNumber')?.setValidators(Validators.required);
        this.voucherForm.get('instrumentNumber')?.updateValueAndValidity();
      }
      else {
        this.voucherForm.get('instrumentNumber')?.clearValidators();
        this.voucherForm.get('instrumentNumber')?.updateValueAndValidity();
      }

      if (value === 2) {
        this.voucherForm.get('bank')?.clearValidators();
        this.voucherForm.get('bank')?.updateValueAndValidity();
        this.voucherForm.get('bank')?.disable();
        this.voucherForm.get('instrumentNumber')?.disable();
      }
      else {
        this.voucherForm.get('bank')?.setValidators(Validators.required);
        this.voucherForm.get('bank')?.updateValueAndValidity();
        this.voucherForm.get('bank')?.enable();
        this.voucherForm.get('instrumentNumber')?.enable();
      }
    });

    this.voucherForm.get("voucherType")?.valueChanges.subscribe(value => {
      if (value > 3) {
        this.voucherForm.get('controlNumber')?.clearValidators();
        this.voucherForm.get('controlNumber')?.updateValueAndValidity();
        this.voucherForm.get('insuranceCompany')?.clearValidators();
        this.voucherForm.get('insuranceCompany')?.updateValueAndValidity();
        this.voucherForm.get('customerName')?.clearValidators();
        this.voucherForm.get('customerName')?.updateValueAndValidity();
        this.voucherForm.get('policyNumber')?.clearValidators();
        this.voucherForm.get('policyNumber')?.updateValueAndValidity();
        this.voucherForm.get('vertical')?.clearValidators();
        this.voucherForm.get('vertical')?.updateValueAndValidity();
      }
      else {
        this.voucherForm.get('insuranceCompany')?.setValidators(Validators.required);
        this.voucherForm.get('insuranceCompany')?.updateValueAndValidity();
        this.voucherForm.get('customerName')?.setValidators(Validators.required);
        this.voucherForm.get('customerName')?.updateValueAndValidity();
        this.voucherForm.get('vertical')?.setValidators(Validators.required);
        this.voucherForm.get('vertical')?.updateValueAndValidity();
      }
    });

    this.voucherForm.get("pos")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterPosData(input);
      else
        this.filterPosData(input.Name);
    });

    this.voucherForm.get("inhouse")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterInHouseData(input);
      else
        this.filterInHouseData(input.Name);
    });

    this.voucherForm.get("searchcustomer")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterCustomerData(input);
      else
        this.filterCustomerData(input.Name);
    });

    this.voucherForm.get("insuranceCompany")?.valueChanges.subscribe(input => {
      if (input == null || input === undefined || input === '')
        return;

      if (typeof (input) == "string")
        this.filterInsurancerCompaniesData(input);
      else
        this.filterInsurancerCompaniesData(input.Name);
    });
  }

  onSubmit() {
    if (this.voucherForm.invalid) return;

    const model = this.getPayload();
    switch (this._mode) {
      case 0:
        this.voucherService.addVoucher(model).subscribe((response: ICommonDto<string>) => {
          if (response.IsSuccess) {
            Swal.fire({
              icon: 'success',
              title: 'Done',
              text: response.Message,
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['./subsystem/voucher']);
              }
            });
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Sorry',
              text: response.Message,
            });
          }
        });
        break
      case 3:
        this._updateMode = model.UpdateMode.toString();
        this.voucherService.updateVoucher(this._voucherId, model).subscribe((response: ICommonDto<string>) => {
          if (response.IsSuccess) {
            this.setVoucherDetails();
            Swal.fire({
              icon: 'success',
              title: 'Done',
              text: response.Message,
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['./subsystem/voucher']);
              }
            });
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Sorry',
              text: response.Message,
            });
          }
        });
        break
      case 4:
        this._updateMode = model.UpdateMode.toString();

        this.voucherService.updateVoucherControlNumber(this._voucherId, { ControlNumber: this.voucherForm.get('controlNumber')?.value }).subscribe((response: ICommonDto<string>) => {
          if (response.IsSuccess) {
            this.setVoucherDetails();
            Swal.fire({
              icon: 'success',
              title: 'Done',
              text: response.Message,
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['./subsystem/voucher']);
              }
            });
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Sorry',
              text: response.Message,
            });
          }
        });
        break
    }
  };

  approveVoucher(): void {
    this.verifyVoucher(true);
  }

  rejectVoucher(): void {
    this.verifyVoucher(false);
  }

  verifyVoucher(isVerified: boolean): void {
    if (this.voucherForm.get('remarks')?.invalid) return;

    const remarks = this.voucherForm.get('remarks')?.value;
    this.voucherService.verifyVoucher(this._voucherId, { IsVoucherVerified: isVerified, Remarks: remarks }).subscribe((response: ICommonDto<string>) => {
      if (response.IsSuccess) {
        Swal.fire({
          icon: 'success',
          title: 'Done',
          text: response.Message,
        });
        this._isRemarksDisabled = true;
        this.setVoucherDetails();
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Sorry',
          text: response.Message,
        });
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(SearchPolicyVoucherComponent, {
      width: '90%',
      height: '90%'
    }).afterClosed().subscribe((data) => {
      this.setPolicyData(data);
    });
  }

  filterData(input: any) {
    if (input === undefined)
      return;
    this._filteredOptions = this._customers.filter(item => {
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

  filterCustomerData(input: any) {
    if (input === undefined)
      return;
    this._filteredCustomerOptions = this._customersNamePhone.filter(item => {
      return item.Name.toLowerCase().indexOf(input.toLowerCase()) > -1
    });
  }

  filterInHouseData(input: any) {
    if (input === undefined)
      return;
    this._filteredInHouseOptions = this._inHouseDatas.filter(item => {
      return item.Name.toLowerCase().indexOf(input.toLowerCase()) > -1
    });
  }

  filterInsurancerCompaniesData(input: any) {
    if (input === undefined)
      return;
    this._filteredInsuranceCompaniesOptions = this._insuranceCompanies.filter(item => {
      return item.Name.toLowerCase().indexOf(input.toLowerCase()) > -1
    });
  }

  displayFn(data: any): string {
    return data && data.Name ? data.Name : '';
  }

  getInsuranceCompanies(): void {
    this.commonService.getInsuranceCompanies(Vertical.All).subscribe((response: IDropDownDto<number>[]) => {
      this._insuranceCompanies = response;
    });
  }

  getInsuranceCompanyName(value: number): string {
    return value ? this._insuranceCompanies.filter(f => f.Value == value)[0].Name : '';
  }

  getPosName(value: number): string {
    return value ? this._posDatas.filter(f => f.Value == value)[0].Name : '';
  }

  getInHouseName(value: number): string {
    return value ? this._inHouseDatas.filter(f => f.Value == value)[0].Name : '';
  }

  
  getCustomerNameMobile(value: number): string {
    return value ? this._customersNamePhone.filter(f => f.Value == value)[0].Name : '';
  }

  getPaymentModes(): void {
    this.commonService.getPaymentModes().subscribe((response: IDropDownDto<number>[]) => {
      this._paymentTypes = response;
    });
  }

  getBanks(): void {
    this.commonService.getBanks().subscribe((response: IDropDownDto<number>[]) => {
      this._banks = response;
    });
  }

  getVoucherTypes(): void {
    this.voucherService.getVoucherTypes().subscribe((response: IDropDownDto<number>[]) => {
      this._voucherTypes = response;
    });
  }

  getVerticals(): void {
    this.commonService.getVerticals().subscribe((response: any) => {
      this._verticals = response;
    });
  }

  getPos(vertical: number): void {
    this.commonService.getPos(vertical, this._branchId).subscribe((response: IDropDownDto<number>[]) => {
      this._posDatas = response;
    });
  }

  getInHouse(vertical: number): void {
    this.commonService.getAllTeamMembers(vertical, this._branchId).subscribe((response: IDropDownDto<number>[]) => {
      this._inHouseDatas = response;
    });
  }

  getCustomers(): void {
    this.customerService.getCustomerNames().subscribe((response: IDropDownDto<number>[]) => {
      this._customers = response;
    });
  }

  getCustomersNamePhone(): void {
    this.customerService.getCustomerNamesAndPhone().subscribe((response: IDropDownDto<number>[]) => {
      this._customersNamePhone = response;
    });
  }

  setPolicyData(data: IVoucherSearchPolicyDto): void {
    if (!data || data == null) return;

    this.voucherForm.patchValue({
      controlNumber: data.ControlNumber,
      insuranceCompany: data.InsuranceCompanyId,
      customerName: { Name: data.CustomerName, Value: data.CustomerId },
      vertical: data.VerticalId,
      pos: data.PosId,
      policyNumber: data.PolicyNumber,
      referTypeId: data ? data.PosId && data.PosId > 0 ? '2' : '1' : '',
      policyId: data.PolicyId
    });
  }

  getPayload(): IAddUpdateVoucherModel {
    let data = this.voucherForm.get('customerName')?.value
    let customerId;
    let customerName;
    if (typeof (data) == "string") { customerName = data; }
    else {
      customerId = data.Value;
      customerName = data.Name;
    }

    let referTypeId: number = this.voucherForm.get('referTypeId')?.value;

    return {
      CustomerId: customerId,
      CustomerName: customerName,
      IsInHouse: referTypeId == 1,
      IsPos: referTypeId == 2,
      ReferTypeId: referTypeId,
      AccountUsedForChequeIssue: this.voucherForm.get('accountUsedForChequeIssue')?.value,
      Bank: this.voucherForm.get('bank')?.value,
      ControlNumber: this.voucherForm.get('controlNumber')?.value,
      InstrumentNumber: this.voucherForm.get('instrumentNumber')?.value,
      InsuranceCompanyId: this.voucherForm.get('insuranceCompany')?.value,
      PaymentAmount: this.voucherForm.get('amount')?.value,
      PaymentDate: this.commonService.getDateInString(this.voucherForm.get('paymentDate')?.value),
      PaymentModeId: this.voucherForm.get('paymentMode')?.value,
      PolicyId: this.voucherForm.get('policyId')?.value,
      PolicyNumber: this.voucherForm.get('policyNumber')?.value,
      VerticalId: this.voucherForm.get('vertical')?.value,
      VoucherTypeId: this.voucherForm.get('voucherType')?.value,
      InHouse: this.voucherForm.get('inhouse')?.value,
      Pos: this.voucherForm.get('pos')?.value,
      Remarks: this.voucherForm.get('remarks')?.value,
      BouncedAmount: this.voucherForm.get('bouncedAmount')?.value,
      BouncedDate: this.commonService.getDateInString(this.voucherForm.get('bouncedDate')?.value),
      BouncedReceiptNumber: this.voucherForm.get('bouncedReceiptNumber')?.value,
      Reason: this.voucherForm.get('reason')?.value,
      UpdateMode: parseInt(this.voucherForm.get('updateMode')?.value),
      BranchCode: this._branchCode,
      SearchCustomer: this.voucherForm.get('searchcustomer')?.value,
    }
  }

  setVoucherDetails(): void {
    this.voucherService.getVoucherById(this._voucherId).subscribe((response: IVoucherDto) => {

      this._createdBy = response.CreatedBy;
      this._createdDate = response.CreatedDateString;
      this._modifiedBy = response.ModifiedBy;
      this._modifiedDate = response.ModifiedDateString;
      this._verifiedBy = response.VerifiedBy;
      this._verifiedDate = response.VerifiedDateString;
      this._status = response.Status;
      this._isVoucherTypeDisabled = response.VoucherTypeId > 0;

      this._modificationReason = response.ModificationReason;
      this._cancelReason = response.CancellationReason;
      this._bouncedAmount = response.BouncedAmount;
      this._bouncedDate = `${this.padLeftZero(response.BouncedDateDto.Day)}/${this.padLeftZero(response.BouncedDateDto.Month)}/${this.padLeftZero(response.BouncedDateDto.Year)}`;
      this._bouncedReceiptNumber = response.BouncedReceiptNumber;

      this._verificationStatus = response.VerificationStatus;
      this._voucherType = response.VoucherType;

      let reason = '';
      if (this._mode == 4) {
        reason = 'Control Number Updation';
        this._updateMode = '1';
      }
      else {
        reason = this._updateMode != '' ? this._updateMode == '1' ? response.ModificationReason : response.CancellationReason : '';
      }

      this.voucherForm.setValue({
        amount: response.PaymentAmount,
        paymentDate: this.commonService.getDateFromIDateDto(response.PaymentDateDto as IDateDto),
        bank: response.BankId,
        insuranceCompany: response.InsuranceCompanyId,
        customerName: { Name: response.CustomerName, Value: response.CustomerId },
        vertical: response.VerticalId,
        pos: response.PosId,
        inhouse: response.InHouseId,
        voucherType: response.VoucherTypeId,
        paymentMode: response.PaymentModeId,
        controlNumber: response.ControlNumber,
        policyNumber: response.PolicyNumber,
        policyId: response.PolicyId,
        referTypeId: response.ReferTypeId,
        accountUsedForChequeIssue: response.AccountUsedForChequeIssue,
        instrumentNumber: response.InstrumentNumber,
        voucherDate: this.commonService.getDateFromIDateDto(response.VoucherDateDto as IDateDto),
        voucherNumber: response.VoucherNumber,
        remarks: response.Remarks,
        reason: reason,
        updateMode: this._updateMode,
        bouncedAmount: response.BouncedAmount,
        bouncedDate: this.commonService.getDateFromIDateDto(response.BouncedDateDto as IDateDto),
        bouncedReceiptNumber: response.BouncedReceiptNumber,
        searchcustomer :  response.SearchCustomer
      });

      if (this._mode == 1 || this._mode == 2 || this._mode == 4) { this.voucherForm.get('bank')?.disable(); }
    });
  }

  onClose(): void {
    this.router.navigate(['./subsystem/voucher']);
  }

  padLeftZero = (value: number): string => value > 9 ? `${value}` : `0${value}`;
}