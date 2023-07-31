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
import { SearchPolicyType, Vertical } from 'src/app/shared/utilities/enums/enum';
import { RetailService } from 'src/app/app-services/health-service/retail.service';
import { CommercialService } from 'src/app/app-services/commercial-service/commercial.service';

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
  public Verticaltype:number;

  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;
  private _policyTypeId: any;

  constructor(
    private customerService: ICustomerService,
    private router: Router,
    private route: ActivatedRoute,
    private _commonFunction:CommonFunction,
    private _motorService:MotorService,
    private _healthService:RetailService,
    private _commercialService:CommercialService
  ) {
  }

  ngOnInit(): void {
    this._policyTypeId = this.route.snapshot.paramMap.get('policyType');
    this._headerTitle= this._commonFunction.getTitle((parseInt)(this._policyTypeId)); 
    this._motorService._headerTitle$.next(this._headerTitle);
    this._healthService._headerTitle$.next(this._headerTitle);
    this.Verticaltype  = Number(this.route.snapshot.paramMap.get('verticalType'));
    this._motorService._verticalId$.next( this.Verticaltype );
    this._healthService._verticalId$.next( this.Verticaltype );
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
    const data ={
      customerId:customerId,
      policyTypeId:this._policyTypeId
    }
    this.router.navigate(["/master/edit-customer", data]);
  }


  routeToMotorPolicy(customerId: number) {
    if( this.Verticaltype  == Vertical.Motor){
    this._motorService.vertical$.next("MOTOR");
      this.router.navigate(["/pms/motor", { customerId, policyTypeId: this._policyTypeId }]);
    }
    if( this.Verticaltype == Vertical.Health){
      this._healthService.vertical$.next("HEALTH");
      this.router.navigate(["/pms/health",  this.Verticaltype ,this._policyTypeId  ,{ customerId, policyTypeId: this._policyTypeId }]);
    }
    if( this.Verticaltype == Vertical.Pesonal_Accident){
      this._healthService.vertical$.next("PERSONAL ACCIDENT");
      this.router.navigate(["/pms/pa/" ,  this.Verticaltype ,this._policyTypeId ,{ customerId, policyTypeId: this._policyTypeId }]);
    }
    if( this.Verticaltype == Vertical.Travel){
      this._healthService.vertical$.next("Travel");
      this.router.navigate(["/pms/travel/" ,  this.Verticaltype ,this._policyTypeId ,{ customerId, policyTypeId: this._policyTypeId }]);
    }
    
    if( this.Verticaltype == Vertical.Fire){
      this._commercialService.vertical$.next("Fire");
      this.router.navigate(["/pms/fire/" ,  this.Verticaltype ,this._policyTypeId ,{ customerId, policyTypeId: this._policyTypeId }]);
    }
    if( this.Verticaltype == Vertical.Engineering){
      this._commercialService.vertical$.next("Engineering");
      this.router.navigate(["/pms/engineering/" ,  this.Verticaltype ,this._policyTypeId ,{ customerId, policyTypeId: this._policyTypeId }]);
    }
    if( this.Verticaltype == Vertical.Marine){
      this._commercialService.vertical$.next("Marine");
      this.router.navigate(["/pms/marine/" ,  this.Verticaltype ,this._policyTypeId ,{ customerId, policyTypeId: this._policyTypeId }]);
    }
    if( this.Verticaltype == Vertical.Misc){
      this._commercialService.vertical$.next("Miscelleneous");
      this.router.navigate(["/pms/misc/" ,  this.Verticaltype ,this._policyTypeId ,{ customerId, policyTypeId: this._policyTypeId }]);
    }
    if( this.Verticaltype == Vertical.Liabality){
      this._commercialService.vertical$.next("Liability");
      this.router.navigate(["/pms/liabality/" ,  this.Verticaltype ,this._policyTypeId ,{ customerId, policyTypeId: this._policyTypeId }]);
    }

  }

 
}
