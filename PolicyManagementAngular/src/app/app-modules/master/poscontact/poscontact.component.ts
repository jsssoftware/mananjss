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
  selector: 'app-poscontact',
  templateUrl: './poscontact.component.html',
  styleUrls: ['./poscontact.component.css']
})
export class PoscontactComponent implements OnInit {
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  posContactform = new FormGroup({
    POSId :new FormControl(''),
    POSContactName: new FormControl('',[Validators.required]),
    POSContactMobile1: new FormControl('',[Validators.required ,Validators.pattern('^[1-9][0-9]+$'),Validators.minLength(10), Validators.maxLength(10)]),
    POSContactMobile2: new FormControl(''),
    POSContactEmailID: new FormControl('',[Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]),
    IsMessageSend: new FormControl(''),
    IsMotor: new FormControl(''),  
    IsHealth:new FormControl(''),
    IsCommercial:new FormControl(''),
    IsLife:new FormControl(''),
    BranchId:new FormControl(''),
    POSContactID:new FormControl(''),
    IsActive:new FormControl(true),
  })

  public _pos: IDropDownDto<number>[] = [];
  public  _branchId: number;
  public _posContactData: MatTableDataSource<any> = new MatTableDataSource<any>();
  public _length: number = 0;
  public _pageSize: number = 20;
  public _pageNumber: number = 0;
  public _input: string = "";
  public _showAll: boolean =false;
  displayedColumns: string[] = [
    'POSId',
    'POSContactName',
    'POSContactMobile2',
    'POSContactMobile1',
    'POSContactEmailID',
    'IsMotor',
    'IsHealth',
    'IsLife',
    'IsCommercial',
    'IsActive',
    'IsMessageSend',
    'Modify'
  ];
  constructor(private commonService : ICommonService, private masterSerivice :MasterService) {
    this._branchId = parseInt(sessionStorage.getItem("branchId") as string);
   }

  async ngOnInit(): Promise<void> {
    await this.getPos();
   // await this.getPosContactData();
  }

  
  pageChanged(event: PageEvent): void {
    this._pageNumber = event.pageIndex;
  }

  getPos() :any {
    this.commonService.getPos(0, this._branchId).subscribe((response: IDropDownDto<number>[]) => {
      this._pos  = response;
      this.getPosContactData();
    });
  }


  
  getPosContactData(): any {
    this.masterSerivice.getPosContactData(this._branchId).subscribe((response: IDataTableDto<any[]>) => {
      this._length = response.TotalCount;
      response.Data.forEach(y=>{
        y.Pos = this._pos.find(x=>x.Value ==  y.POSId)?.Name
      })
      this._posContactData = new MatTableDataSource(response.Data);
      this._posContactData.paginator = this._paginator;
      this._posContactData._updateChangeSubscription(); // <-- Refresh the datasource
    });
  }

  
  editPosContactData(data:any){
    let obj = Object.assign({}, data);;
    this.posContactform.patchValue(obj);
  }

  iposContactFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._posContactData.filter = filterValue.trim().toLowerCase();
  }


  
  createPosContactData(){
    this.posContactform.patchValue({
      BranchId : this._branchId
    });
  
    this.masterSerivice.createPosContactData(this.posContactform.getRawValue()).subscribe((response: ICommonDto<any>) => {
      if (response.IsSuccess) {
        this.getPosContactData();
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

  reset(){
    this.posContactform.reset();
  }

  

}
