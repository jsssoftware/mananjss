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
  selector: 'app-citymaster',
  templateUrl: './citymaster.component.html',
  styleUrls: ['./citymaster.component.css']
})
export class CitymasterComponent implements OnInit {

  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  citymasterform = new FormGroup({
    CityId: new FormControl(''),
    CityName: new FormControl('',[Validators.required]),
    PinCode: new FormControl(''),
    StateId: new FormControl('',[Validators.required]),
    Branch2CityId: new FormControl(''),
    IsActive: new FormControl(true),  
  });

  public  _branchId: number;
  public _cityData: MatTableDataSource<any> = new MatTableDataSource<any>();
  public _state: IDropDownDto<number>[] = [];

  public _length: number = 0;
  public _pageSize: number = 20;
  public _pageNumber: number = 0;
  public _input: string = "";
  public _showAll: boolean =false;

  
  displayedColumns: string[] = [
    'CityName',
    'State',
    'PinCode',
    'IsActive',
    'Modify'
  ];
  constructor(private commonService : ICommonService, private masterSerivice :MasterService) { }

  async ngOnInit(): Promise<void> {   
    this._branchId = parseInt(sessionStorage.getItem("branchId") as string); 
    await this.getState()
    await this.getCity();
  }


  
  getState(): any {
    this.commonService.getState().subscribe((response: IDropDownDto<number>[]) => {
      this._state  = response;
      
    });
  }

  getCity(): any {
    
    this.masterSerivice.getCity(this._branchId).subscribe((response: IDataTableDto<any[]>) => {
      this._length = response.TotalCount;
      response.Data.forEach(y=>{
        y.State = this._state.find(x=>x.Value ==  y.StateId)?.Name
      });
      this._cityData = new MatTableDataSource( response.Data);
      this._cityData.paginator = this._paginator;
      this._cityData._updateChangeSubscription(); // <-- Refresh the datasource

    });
  }

  reset(){
    this.citymasterform.reset();
  }

  createCity(){
    this.masterSerivice.createCity(this.citymasterform.getRawValue()).subscribe((response: ICommonDto<any>) => {
      if (response.IsSuccess) {
        this.getCity();
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

  editCity(data:any){
    let obj = Object.assign({}, data);;
    this.citymasterform.patchValue(obj);
  }

  iCity(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._cityData.filter = filterValue.trim().toLowerCase();
  }


}
