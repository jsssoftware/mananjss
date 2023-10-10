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
  selector: 'app-variantmaster',
  templateUrl: './variantmaster.component.html',
  styleUrls: ['./variantmaster.component.css']
})
export class VariantmasterComponent implements OnInit {

  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  variantform = new FormGroup({
    VariantId: new FormControl(''),
    ManufacturerId: new FormControl('',[Validators.required]),
    VariantName: new FormControl('',[Validators.required]),
    ExShowroomValue: new FormControl(''),
    FuelTypeId: new FormControl('',[Validators.required]),
    VehicleClassId: new FormControl('',[Validators.required]),
    VehicleClassTypeId: new FormControl('',[Validators.required]),
    ModelId: new FormControl(''),
    CubicCapacity: new FormControl(''),
    SeatCapacity: new FormControl(''),
    GVW: new FormControl(''),
    KW: new FormControl(''),
    VariantCode: new FormControl(''),
    VehicleSegmentId: new FormControl(''),
    SearchVehicle: new FormControl(''),
    IsActive: new FormControl(true),  
    branchId:new FormControl(''),
  });

  public _vehicleClassType: IDropDownDto<number>[] = [];
  public _vehicleClass: IDropDownDto<number>[] = [];
  public _manufactures: IDropDownDto<number>[] = [];
  public _fuelType: IDropDownDto<number>[] = [];
  public _vehicleSegement: IDropDownDto<number>[] = [];
  public _model: IDropDownDto<number>[] = [];
  public _verticals: any[] = [];
  public  _branchId: number;
  public _varientData: MatTableDataSource<any> = new MatTableDataSource<any>();
  public _length: number = 0;
  public _pageSize: number = 20;
  public _pageNumber: number = 0;
  public _input: string = "";
  public _showAll: boolean =false;

  
  displayedColumns: string[] = [
    'ManufacturerId',
    'ModelName',
    'VariantName',
    'ExShowroomValue',
    'FuelTypeId',
    'VehicleClassId',
    'CubicCapacity',
    'SeatCapacity',
    'GVW',
    'KW',
    'VariantCode',
    'VehicleSegmentId',
    'IsActive',
    'Modify'
  ];
  constructor(private commonService : ICommonService, private masterSerivice :MasterService) { }

  async ngOnInit(): Promise<void> {
    this._branchId = parseInt(sessionStorage.getItem("branchId") as string);
    this.variantform.patchValue({
      branchId : this._branchId
    })
   await this.getVehicleClassType()
   await this.getVehicleClasses()
   await this.getVehicleSegment()
   await this.getFuelType()
   await this.getVarient()
  }


  getModels(): any {
    this.commonService.getModels(this.variantform.value.ManufacturerId).subscribe((response: IDropDownDto<number>[]) => {
      this._model  = response;
      
    });
  }

  getVehicleClasses(): any {
    this.commonService.getVehicleClasses().subscribe((response: IDropDownDto<number>[]) => {
      this._vehicleClass  = response;
      
    });
  }

  getFuelType(): any {
    this.commonService.getFuelType().subscribe((response: IDropDownDto<number>[]) => {
      this._fuelType  = response;
      
    });
  }
  getVarient(): any {
    
    this.masterSerivice.getVarient(this._branchId).subscribe((response: IDataTableDto<any[]>) => {
      this._length = response.TotalCount;
      
      response.Data.forEach(y=>{
        y.Vertical = this._verticals.find(x=>x.VerticalId ==  y.VerticalId)?.VerticalName
        y.VehicleClassType = this._vehicleClassType.find(x=>x.Value ==  y.VehicleClassTypeId)?.Name,
        y.ManufacturerName = this._manufactures.find(x=>x.Value ==  y.ManufacturerId)?.Name
        y.FuelType = this._fuelType.find(x=>x.Value ==  y.FuelTypeId)?.Name
        y.ModelName = this._model.find(x=>x.Value ==  y.ModelId)?.Name
        y.VehicleClass = this._vehicleClass.find(x=>x.Value ==  y.VehicleClassId)?.Name
        y.VehicleSegment = this._vehicleSegement.find(x=>x.Value ==  y.VehicleSegmentId)?.Name
      });
     
      this._varientData = new MatTableDataSource( response.Data.sort(x=>x.InsuranceCompanyName));
      this._varientData.paginator = this._paginator;
      this._varientData._updateChangeSubscription(); // <-- Refresh the datasource

    });
  }

  reset(){
    this.variantform.reset();
  }

  createVariant(){
   
    this.masterSerivice.createVarient(this.variantform.getRawValue()).subscribe((response: ICommonDto<any>) => {
      if (response.IsSuccess) {
        this.getVarient();
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

  editAddonPlanCombo(data:any){
    debugger
    let obj = Object.assign({}, data);
    this.variantform.patchValue(obj);
    

  }

  IVariant(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._varientData.filter = filterValue.trim().toLowerCase();
  }

  
  getVehicleClassType(): void {
    this.commonService.getVehicleClassType().subscribe((response: any) => {
      this._vehicleClassType = response;
    });
  }
  
  
  getManufactureByVehicleClass(): void {
    this.commonService.getManufactureByVehicleClassType(this.variantform.value.VehicleClassTypeId).subscribe((response: any) => {
      this._manufactures = response;
    });
  }
  
  getVehicleSegment(): void {
    this.commonService.getVehicleSegment().subscribe((response: any) => {
      this._vehicleSegement = response;
    });
  }



}
