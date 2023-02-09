import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ICustomerService } from 'src/app/app-services/customer-service/abstracts/customer.iservice';
import { debounceTime } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { IDropDownDto } from 'src/app/app-entites/dtos/common/drop-down-dto';
import { CommonFunction } from 'src/app/shared/utilities/helpers/common-function';
import { MotorService } from 'src/app/app-services/motor-service/motor.service';
import { SearchPolicyType } from 'src/app/shared/utilities/enums/enum';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  public _columns: string[] = ["Name", "Address", "Mobile", "ClusterName", "Code", "Type", "City", "PinCode", "Id"];
  public _customerDatas: MatTableDataSource<any> = new MatTableDataSource<any>();
  public _length: number = 0;
  public _pageSize: number = 20;
  public _input: string = "";
  public _headerTitle:any;

  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;
  private _policyTypeId: any;

  constructor(
    private customerService: ICustomerService,
    private router: Router,
    private route: ActivatedRoute,
    private _commonFunction:CommonFunction,
    private _motorService:MotorService
  ) {
  }

  ngOnInit(): void {
    this._policyTypeId = this.route.snapshot.paramMap.get('policyType');
    this._headerTitle= this._commonFunction.getTitle((parseInt)(this._policyTypeId)); 
    this._motorService._headerTitle$.next(this._headerTitle);
  }

  pageChanged(event: PageEvent): void {
    this.getCustomerDatas(event.pageIndex);
  }

  searchCustomer(value: Event): void {
    this._input = (<HTMLInputElement>value.target).value;
    if (this._input == "") return;
    this._paginator.pageIndex = 0;
    this.getCustomerDatas(0);
  }

  getCustomerDatas(pageNumber: number): void {
    this.customerService.getCustomerByName(this._input.trim(), pageNumber, this._pageSize).pipe(debounceTime(200)).subscribe((response: any) => {
      this._customerDatas = response.Data;
      this._length = response.TotalCount;
      //if (isResetPaginator)
      this._customerDatas.paginator = this._paginator;
      // console.log(response);
    });
  }

  addCustomer(): void {
    const data ={
      name:this._input,
      policyTypeId:this._policyTypeId
    }
    let VType  = this.route.snapshot.paramMap.get('verticalType');
    this._motorService._verticalId$.next(VType);
    this.router.navigate(["/master/add-customer", data]);
  }

  editCustomer(customerId: any): void {
    this.router.navigate(["/master/edit-customer", customerId]);
  }


  routeToMotorPolicy(customerId: number) {
    let VType  = this.route.snapshot.paramMap.get('verticalType');
    this._motorService._verticalId$.next(VType);
    if(VType=='1')
      this.router.navigate(["/pms/motor", { customerId, policyTypeId: this._policyTypeId }]);
    if(VType=='2')
      this.router.navigate(["/pms/health", { customerId, policyTypeId: this._policyTypeId }]);
  }

 
}
