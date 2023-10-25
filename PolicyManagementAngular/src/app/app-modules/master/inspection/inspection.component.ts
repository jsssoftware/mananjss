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
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.css']
})
export class InspectionMasterComponent implements OnInit {
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  inspectionform = new FormGroup({
    InspectionCompanyId :new FormControl(''),
    InspectionCompanyName: new FormControl('',[Validators.required]),
    ContactName1: new FormControl('',[Validators.required]),
    ContactName2: new FormControl(''),
    ContactName3: new FormControl(''),  
    Phone1: new FormControl('',[Validators.required]),  
    Phone2: new FormControl(''),  
    Phone3: new FormControl(''),  
    Address: new FormControl('',[Validators.required]),  
    CityId: new FormControl('',[Validators.required]),  
    Pincode: new FormControl(''),  
    Email: new FormControl(''),  
    Website: new FormControl(''),  
    IsActive:new FormControl(true),
    BranchId:new FormControl('')
});

public _city: IDropDownDto<number>[] = [];
public  _branchId: number;
public _inspectionData: MatTableDataSource<any> = new MatTableDataSource<any>();
public _length: number = 0;
public _pageSize: number = 20;
public _pageNumber: number = 0;
public _input: string = "";
public _showAll: boolean =false;
displayedColumns: string[] = [
  'InspectionCompanyName',
  'ContactName1',
  'ContactName2',
  'ContactName3',
  'Phone1',
  'Phone2',
  'Phone3',
  'Address',
  'CityId',
  'Pincode',
  'Email',
  'Website',
  'IsActive',
  'Modify'
];
constructor(private commonService : ICommonService, private masterSerivice :MasterService,private  commonFunction :CommonFunction) { }

async ngOnInit(): Promise<void> {
  this._branchId = parseInt(sessionStorage.getItem("branchId") as string);
    await this.getCity();
    await this.getInspection();

}


 
getCity(): any {
  this.commonService.getCities().subscribe((response: IDropDownDto<number>[]) => {
    this._city  = response;
  });
}



pageChanged(event: PageEvent): void {
  this._pageNumber = event.pageIndex;
}

getInspection(): any {
  this.masterSerivice.getInspection(this._branchId).subscribe((response: IDataTableDto<any[]>) => {
    this._length = response.TotalCount;
    response.Data.forEach(y=>{
      y.City = this._city.find(x=>x.Value ==  y.City)?.Name
    })
    this._inspectionData = new MatTableDataSource(response.Data);
    this._inspectionData.paginator = this._paginator;
    this._inspectionData._updateChangeSubscription(); // <-- Refresh the datasource
  });
}

createInspection(){
  this.inspectionform.patchValue({
    BranchId : this._branchId
  });

  this.masterSerivice.createInspection(this.inspectionform.getRawValue()).subscribe((response: ICommonDto<any>) => {
    if (response.IsSuccess) {
      this.getInspection();
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


editInspection(data:any){
  let obj = Object.assign({}, data);;
  this.inspectionform.patchValue(obj);
}

iInspection(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this._inspectionData.filter = filterValue.trim().toLowerCase();
}


reset(){
  this.inspectionform.reset();
}

}
