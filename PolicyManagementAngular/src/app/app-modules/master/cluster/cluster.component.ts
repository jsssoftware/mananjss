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
  selector: 'app-cluster',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.css']
})
export class ClusterComponent implements OnInit {
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  clusterform = new FormGroup({
    ClusterId :new FormControl(''),
    ClusterName: new FormControl('',[Validators.required]),
    ClusterContact: new FormControl(''),
    ClusterAddress1: new FormControl(''),
    ClusterCityId1: new FormControl(''),  
    ClusterPinCode1: new FormControl(''),  
    ClusterAddress2: new FormControl(''),  
    ClusterCityId2: new FormControl(''),  
    ClusterPinCode2: new FormControl(''),  
    ClusterMobile1: new FormControl('',[Validators.pattern('^[1-9][0-9]+$'),Validators.minLength(10), Validators.maxLength(10)]),  
    ClusterMobile2: new FormControl('',[Validators.pattern('^[1-9][0-9]+$'),Validators.minLength(10), Validators.maxLength(10)]),  
    ClusterEmail1: new FormControl('',[Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]),  
    ClusterEmail2: new FormControl('',[Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]),  
    ClusterPhone1: new FormControl(''),  
    ClusterPhone2: new FormControl(''),  
    ClusterProfile: new FormControl(''),  
    IsActive:new FormControl(true),
    BranchId:new FormControl('')
});

public _city: IDropDownDto<number>[] = [];
public _type: IDropDownDto<number>[] = [];
public  _branchId: number;
public _clusterData: MatTableDataSource<any> = new MatTableDataSource<any>();
public _length: number = 0;
public _pageSize: number = 20;
public _pageNumber: number = 0;
public _input: string = "";
public _showAll: boolean =false;
displayedColumns: string[] = [
  'ClusterName',
  'ClusterContact',
  'ClusterAddress1',
  'ClusterCityId1',
  'ClusterPinCode1',
  'ClusterAddress2',
  'ClusterCityId2',
  'ClusterPinCode2',
  'ClusterPhone1',
  'ClusterPhone2',
  'ClusterEmail1',
  'ClusterEmail2',
  'ClusterProfile',
  'IsActive',
  'Modify'
];
constructor(private commonService : ICommonService, private masterSerivice :MasterService,private  commonFunction :CommonFunction) { }

async ngOnInit(): Promise<void> {
  this._branchId = parseInt(sessionStorage.getItem("branchId") as string);
    await this.getCity();
    await this.getClusterData();

}


 
getCity(): any {
  this.commonService.getCities().subscribe((response: IDropDownDto<number>[]) => {
    this._city  = response;
  });
}



pageChanged(event: PageEvent): void {
  this._pageNumber = event.pageIndex;
}

getClusterData(): any {
  this.masterSerivice.getClusterData(this._branchId).subscribe((response: IDataTableDto<any[]>) => {
    this._length = response.TotalCount;
    response.Data.forEach(y=>{
      y.City1 = this._city.find(x=>x.Value ==  y.ClusterCityId1)?.Name,
      y.City2 = this._city.find(x=>x.Value ==  y.ClusterCityId2)?.Name
    })
    this._clusterData = new MatTableDataSource(response.Data);
    this._clusterData.paginator = this._paginator;
    this._clusterData._updateChangeSubscription(); // <-- Refresh the datasource
  });
}

createClusterData(){
  this.clusterform.patchValue({
    BranchId : this._branchId
  });

  this.masterSerivice.createClusterData(this.clusterform.getRawValue()).subscribe((response: ICommonDto<any>) => {
    if (response.IsSuccess) {
      this.getClusterData();
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


editClusterData(data:any){
  let obj = Object.assign({}, data);;
  this.clusterform.patchValue(obj);
}

iclusterFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this._clusterData.filter = filterValue.trim().toLowerCase();
}


reset(){
  this.clusterform.reset();
}

}
