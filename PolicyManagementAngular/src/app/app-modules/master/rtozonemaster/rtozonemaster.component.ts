import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime } from 'rxjs/operators';
import { ICommonDto } from 'src/app/app-entites/dtos/common/common-dto';
import { IDataTableDto } from 'src/app/app-entites/dtos/common/data-table-dto';
import { IDropDownDto } from 'src/app/app-entites/dtos/common/drop-down-dto';
import { ICommonService } from 'src/app/app-services/common-service/abstracts/common.iservice';
import { MasterService } from 'src/app/app-services/master-service/master.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-rtozonemaster',
  templateUrl: './rtozonemaster.component.html',
  styleUrls: ['./rtozonemaster.component.css']
})
export class RtozonemasterComponent implements OnInit {

  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  rtozoneform = new FormGroup({
    RTOZoneName: new FormControl('',[Validators.required]),
    RTOZoneId: new FormControl(''),
    State: new FormControl(''),
    RTOZoneCode: new FormControl('',[Validators.required]),
    RiskZone: new FormControl(''),
    IsActive: new FormControl(true),  
  });

  public  _branchId: number;
  public _rtozoneData: MatTableDataSource<any> = new MatTableDataSource<any>();
  public _length: number = 0;
  public _pageSize: number = 20;
  public _pageNumber: number = 0;
  public _input: string = "";
  public _showAll: boolean =false;
  public _state: IDropDownDto<number>[] = [];

  
  displayedColumns: string[] = [
    'RTOZoneCode',
    'RTOZoneName',
    'RiskZone',
    'State',
    'IsActive',
    'Modify'
  ];
  constructor(private commonService : ICommonService, private masterSerivice :MasterService) { }

  async ngOnInit(): Promise<void> {   
    this._branchId = parseInt(sessionStorage.getItem("branchId") as string); 
    await this.getState()
    await this.getRtoZone()

  }


 
  getState(): any {
    this.commonService.getState().subscribe((response: IDropDownDto<number>[]) => {
      this._state  = response;
    });
  }
  
  getRtoZone(): any {
    
    this.masterSerivice.getRtoZone(this._branchId).subscribe((response: IDataTableDto<any[]>) => {
      this._length = response.TotalCount;
      
      response.Data.forEach(y=>{
        y.StateName = this._state.find(x=>x.Value ==  y.State)?.Name
      });
     
      this._rtozoneData = new MatTableDataSource( response.Data);
      this._rtozoneData.paginator = this._paginator;
      this._rtozoneData._updateChangeSubscription(); // <-- Refresh the datasource

    });
  }

  reset(){
    this.rtozoneform.reset();
  }

  create(){
    this.masterSerivice.createRtoZone(this.rtozoneform.getRawValue()).subscribe((response: ICommonDto<any>) => {
      if (response.IsSuccess) {
        this.getRtoZone();
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

  edit(data:any){
    let obj = Object.assign({}, data);;
    this.rtozoneform.patchValue(obj);
  }

  iFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._rtozoneData.filter = filterValue.trim().toLowerCase();
  }

}
