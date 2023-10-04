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
  selector: 'app-manufacture',
  templateUrl: './manufacture.component.html',
  styleUrls: ['./manufacture.component.css']
})
export class ManufactureComponent implements OnInit {

  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  manufactureform = new FormGroup({
    ManufacturerId: new FormControl(''),
    ManufacturerName: new FormControl('',[Validators.required]),
    VehicleClassTypeId: new FormControl('',[Validators.required]),
    IsActive: new FormControl(true),  
    Branch2ManufacturerId:new FormControl(''),
  });

  public _vehicleClassType: IDropDownDto<number>[] = [];
  public  _branchId: number;
  public _manufactureData: MatTableDataSource<any> = new MatTableDataSource<any>();
  public _length: number = 0;
  public _pageSize: number = 20;
  public _pageNumber: number = 0;
  public _input: string = "";
  public _showAll: boolean =false;

  
  displayedColumns: string[] = [
    'ManufacturerName',
    'VehicleClassTypeId',
    'IsActive',
    'Modify'
  ];
  constructor(private commonService : ICommonService, private masterSerivice :MasterService) { }

  async ngOnInit(): Promise<void> {
    this._branchId = parseInt(sessionStorage.getItem("branchId") as string);
    this.manufactureform.patchValue({
      Branch2ManufacturerId : this._branchId
    })
    await this.getVehicleClassType();
    await this.getManufacture()

  }


  
  getManufacture(): any {
    
    this.masterSerivice.getManufacture(this._branchId).subscribe((response: IDataTableDto<any[]>) => {
      this._length = response.TotalCount;
      
      response.Data.forEach(y=>{
        y.VehicleClassType = this._vehicleClassType.find(x=>x.Value ==  y.VehicleClassTypeId)?.Name
      });
     
      this._manufactureData = new MatTableDataSource( response.Data.sort(x=>x.ManufacturerName));
      this._manufactureData.paginator = this._paginator;
      this._manufactureData._updateChangeSubscription(); // <-- Refresh the datasource

    });
  }

  reset(){
    this.manufactureform.reset();
  }

  createManufacture(){
    this.masterSerivice.createManufacture(this.manufactureform.getRawValue()).subscribe((response: ICommonDto<any>) => {
      if (response.IsSuccess) {
        this.getManufacture();
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

  editManufacture(data:any){
    let obj = Object.assign({}, data);;
    this.manufactureform.patchValue(obj);
  }

  iManufacture(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._manufactureData.filter = filterValue.trim().toLowerCase();
  }

  
  getVehicleClassType(): void {
    this.commonService.getVehicleClassType().subscribe((response: any) => {
      this._vehicleClassType = response;
    });
  }

}
