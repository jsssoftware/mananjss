import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime } from 'rxjs/operators';
import { ICommonDto } from 'src/app/app-entites/dtos/common/common-dto';
import { IDataTableDto } from 'src/app/app-entites/dtos/common/data-table-dto';
import { IDropDownDto } from 'src/app/app-entites/dtos/common/drop-down-dto';
import { ICommonService } from 'src/app/app-services/common-service/abstracts/common.iservice';
import { MasterService } from 'src/app/app-services/master-service/master.service';
import { CommonFunction } from 'src/app/shared/utilities/helpers/common-function';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit {

  @ViewChild(MatPaginator) _paginator!: MatPaginator;
    posform = new FormGroup({
      POSId :new FormControl(''),
      POSName: new FormControl('',[Validators.required]),
      POSManagedBy: new FormControl(''),
      POSLocationId: new FormControl(''),
      POSAddress1: new FormControl(''),
      POSCityId1: new FormControl(''),  
      POSPinCode1: new FormControl(''),  
      POSAddress2: new FormControl(''),  
      POSCityId2: new FormControl(''),  
      POSPinCode2: new FormControl(''),  
      POSMobile1: new FormControl('',[Validators.pattern('^[1-9][0-9]+$'),Validators.minLength(10), Validators.maxLength(10)]),  
      POSMobile2: new FormControl('',[Validators.pattern('^[1-9][0-9]+$'),Validators.minLength(10), Validators.maxLength(10)]),  
      POSEmail1: new FormControl('',[Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]),  
      POSEmail2: new FormControl('',[Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]),  
      POSPhone1: new FormControl(''),  
      POSPhone2: new FormControl(''),  
      POSDOB: new FormControl(''),  
      POSDOJ: new FormControl(''),  
      CategoryId: new FormControl(''),  
      TypeId: new FormControl(''),  
      IsMotor: new FormControl(''),  
      IsHealth:new FormControl(''),
      IsCommercial:new FormControl(''),
      IsLife:new FormControl(''),
      IsActive:new FormControl(true),
      BranchId:new FormControl('')
  });
  
  public _city: IDropDownDto<number>[] = [];
  public _postitle: IDropDownDto<number>[] = [];
  public _category: IDropDownDto<number>[] = [];
  public _location: IDropDownDto<number>[] = [];
  public _type: IDropDownDto<number>[] = [];
  public _posTitle: IDropDownDto<number>[] = [];
  public _teammembers: IDropDownDto<number>[] = [];
  public  _branchId: number;
  public _posData: MatTableDataSource<any> = new MatTableDataSource<any>();
  public _length: number = 0;
  public _pageSize: number = 20;
  public _pageNumber: number = 0;
  public _input: string = "";
  public _showAll: boolean =false;
  displayedColumns: string[] = [
    'POSName',
    'POSManagedBy',
    'POSLocationId',
    'POSAddress1',
    'POSCityId1',
    'POSPinCode1',
    'POSAddress2',
    'POSCityId2',
    'POSPinCode2',
    'POSMobile1',
    'POSMobile2',
    'POSPhone1',
    'POSPhone2',
    'POSEmail1',
    'POSEmail2',
    'POSDOB',
    'POSDOJ',
    'CategoryId',
    'TypeId',
    'IsMotor',
    'IsHealth',
    'IsCommercial',
    'IsLife',
    'IsActive',
    'Modify'
  ];
  constructor(private commonService : ICommonService, private masterSerivice :MasterService,private  commonFunction :CommonFunction) { }

  async ngOnInit(): Promise<void> {
    this._branchId = parseInt(sessionStorage.getItem("branchId") as string);
      await this.getPosTitle();
      await this.getCity();
      await this.getPosType();
      await  this.getPosCategory();
      await  this.getTeamMembers();
      await  this.getPosData();
      await  this.getLocation();

  }

  
 
  getPosTitle(): any {
    this.commonService.getPosTitle().subscribe((response: IDropDownDto<number>[]) => {
      this._postitle  = response;
    });
  }
 
  getPosType(): any {
    this.commonService.getType().subscribe((response: IDropDownDto<number>[]) => {
      this._type  = response;
    });
  }
  
  getPosCategory(): any {
    this.commonService.getCategory().subscribe((response: IDropDownDto<number>[]) => {
      this._category  = response;
    });
  }
  
  getLocation(): any {
    this.commonService.getTerritory().subscribe((response: IDropDownDto<number>[]) => {
      this._location  = response;
    });
  }
  
 
  getCity(): any {
    this.commonService.getCities().subscribe((response: IDropDownDto<number>[]) => {
      this._city  = response;
    });
  }

  getTeamMembers(): any {
    this.commonService.getAllTeamMembers(0, this._branchId).subscribe((response: IDropDownDto<number>[]) => {
      this._teammembers  = response;
    });
  }
  reset(){
    this.posform.reset();
  }

  createPosData(){
    this.posform.patchValue({
      BranchId : this._branchId
    });
  
    this.masterSerivice.createPosData(this.posform.getRawValue()).subscribe((response: ICommonDto<any>) => {
      if (response.IsSuccess) {
        this.getPosData();
        Swal.fire({
          icon: 'success',
          title: 'Done',
          text: response.Message,
        }).then((result) => {
          if (result.isConfirmed) {
            this.reset();
          };
        })
      }
      else {
        if (response.Response == null) {
          Swal.fire({
            icon: 'error',
            title: 'Sorry',
            text: response.Message,
          });
        }
        else {
          if (response.Response.IsError) {
            Swal.fire({
              icon: 'error',
              title: 'Sorry',
              text: response.Message,
            });
          }
          else {
            Swal.fire({
              title: 'Warning',
              text: response.Message,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes, Save it!',
              cancelButtonText: 'Cancel'
            }).then(async (result) => {
              if (result.isConfirmed) {
                

              }
            })
          }
        }
      }
    });
  }
  

  pageChanged(event: PageEvent): void {
    this._pageNumber = event.pageIndex;
  }

  getPosData(): any {
    this.masterSerivice.getPosData(this._branchId).subscribe((response: IDataTableDto<any[]>) => {
      this._length = response.TotalCount;
      response.Data.forEach(y=>{
        y.City1 = this._city.find(x=>x.Value ==  y.POSCityId1)?.Name,
        y.City2 = this._city.find(x=>x.Value ==  y.POSCityId2)?.Name,
        y.Type = this._type.find(x=>x.Value ==  y.TypeId)?.Name,
        y.Title = this._posTitle.find(x=>x.Value ==  y.POSTitleId)?.Name,
        y.Category = this._type.find(x=>x.Value ==  y.CategoryId)?.Name,
        y.ManagedBy = this._teammembers.find(x=>x.Value ==  y.POSManagedBy)?.Name
        y.Location = this._location.find(x=>x.Value ==  y.POSLocationId)?.Name
      })
      this._posData = new MatTableDataSource(response.Data);
      this._posData.paginator = this._paginator;
      this._posData._updateChangeSubscription(); // <-- Refresh the datasource
    });
  }


  
  editPosData(data:any){
    let obj = Object.assign({}, data);;
    this.posform.patchValue(obj);
  }

  iposFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._posData.filter = filterValue.trim().toLowerCase();
  }

}
