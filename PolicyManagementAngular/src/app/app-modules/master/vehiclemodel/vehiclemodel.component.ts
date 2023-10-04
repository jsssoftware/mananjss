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
  selector: 'app-vehiclemodel',
  templateUrl: './vehiclemodel.component.html',
  styleUrls: ['./vehiclemodel.component.css']
})
export class VehiclemodelComponent implements OnInit {

  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  vehiclemodelform = new FormGroup({
    ManufacturerId: new FormControl('',[Validators.required]),
    ModelName: new FormControl('',[Validators.required]),
    VehicleClassTypeId: new FormControl(''),
    IsActive: new FormControl(true),  
    Branch2ManufacturerId:new FormControl(''),
    ModelId:new FormControl(''),
  });

  public _vehicleClassType: IDropDownDto<number>[] = [];
  public _manufactures: IDropDownDto<number>[] = [];
  public  _branchId: number;
  public _vehicleClassData: MatTableDataSource<any> = new MatTableDataSource<any>();
  public _length: number = 0;
  public _pageSize: number = 20;
  public _pageNumber: number = 0;
  public _input: string = "";
  public _showAll: boolean =false;

  
  displayedColumns: string[] = [
    'ModelName',
    'VehicleClassTypeId',
    'ManufacturerName',
    'IsActive',
    'Modify'
  ];
  constructor(private commonService : ICommonService, private masterSerivice :MasterService) { }

  async ngOnInit(): Promise<void> {
    this._branchId = parseInt(sessionStorage.getItem("branchId") as string);
    this.vehiclemodelform.patchValue({
      Branch2ManufacturerId : this._branchId
    })
    await this.getManufacture();
    await this.getVehicleClassType();
    await this.getVehicleModel()

  }


  
  getVehicleModel(): any {
    
    this.masterSerivice.getVehicleModel(this._branchId).subscribe((response: IDataTableDto<any[]>) => {
      this._length = response.TotalCount;
      
      response.Data.forEach(y=>{
        y.VehicleClassType = this._vehicleClassType.find(x=>x.Value ==  y.VehicleClassTypeId)?.Name,
        y.ManufacturerName = this._manufactures.find(x=>x.Value ==  y.ManufacturerId)?.Name
      });
     
      this._vehicleClassData = new MatTableDataSource( response.Data.sort(x=>x.ModelName).sort(y=>y.ManufacturerName));
      this._vehicleClassData.paginator = this._paginator;
      this._vehicleClassData._updateChangeSubscription(); // <-- Refresh the datasource

    });
  }

  reset(){
    this.vehiclemodelform.reset();
  }

  creatVehicleModel(){
    this.masterSerivice.creatVehicleModel(this.vehiclemodelform.getRawValue()).subscribe((response: ICommonDto<any>) => {
      if (response.IsSuccess) {
        this.getVehicleModel();
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

  editVehicleClass(data:any){
    let obj = Object.assign({}, data);;
    this.vehiclemodelform.patchValue(obj);
  }

  IVehicleClass(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._vehicleClassData.filter = filterValue.trim().toLowerCase();
  }

  
  getVehicleClassType(): void {
    this.commonService.getVehicleClassType().subscribe((response: any) => {
      this._vehicleClassType = response;
    });
  }
  
  getManufacture(): void {
    this.commonService.getManufacturers().subscribe((response: any) => {
      this._manufactures = response;
    });
  }

}
