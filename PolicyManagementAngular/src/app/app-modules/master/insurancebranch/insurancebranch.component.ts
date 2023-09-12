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
  selector: 'app-insurancebranch',
  templateUrl: './insurancebranch.component.html',
  styleUrls: ['./insurancebranch.component.css']
})
export class InsurancebranchComponent implements OnInit {

  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  insurancebranchform = new FormGroup({
    insuranceCompanyId: new FormControl('',[Validators.required]),
    insuranceCompanyBranchName: new FormControl('',[Validators.required]),
    insuranceCompanyBranchCode: new FormControl(''),
    agencyName: new FormControl(''),
    agencyCode: new FormControl(''),
    isActive: new FormControl(true),  
    branchId:new FormControl(''),
    insuranceCompanyBranchId :new FormControl(0),
  });

  public _insuranceCompanies: IDropDownDto<number>[] = [];
  public  _branchId: number;
  public _insuranceBranchData: MatTableDataSource<any> = new MatTableDataSource<any>();
  public _length: number = 0;
  public _pageSize: number = 20;
  public _pageNumber: number = 0;
  public _input: string = "";
  public _showAll: boolean =false;

  
  displayedColumns: string[] = [
    'InsuranceCompanyBranchName',
    'InsuranceCompanyBranchCode',
    'AgencyName',
    'AgencyCode',
    'IsActive',
    'Modify'
  ];
  constructor(private commonService : ICommonService, private masterSerivice :MasterService) { }

  ngOnInit(): void {
    this._branchId = parseInt(sessionStorage.getItem("branchId") as string);
    this.insurancebranchform.patchValue({
      BranchId : this._branchId
    })
    this.getInsuranceCompanies()
    this.getInsuranceBranch()
  }


  getInsuranceCompanies(): any {
    this.commonService.getInsuranceCompanies(0).subscribe((response: IDropDownDto<number>[]) => {
      this._insuranceCompanies  = response;
    });
  }
  getInsuranceBranch(): any {
    
    this.masterSerivice.getInsuranceBranch(this._branchId).subscribe((response: IDataTableDto<any[]>) => {
      this._length = response.TotalCount;
      this._insuranceBranchData = new MatTableDataSource(response.Data);
      this._insuranceBranchData.paginator = this._paginator;
      this._insuranceBranchData._updateChangeSubscription(); // <-- Refresh the datasource

    });
  }

  reset(){
    this.insurancebranchform.reset();
  }

  createInsuranceBranch(){
    this.masterSerivice.createInsuranceBranch(this.insurancebranchform.getRawValue()).subscribe((response: ICommonDto<any>) => {
      if (response.IsSuccess) {
        this.getInsuranceBranch();
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

  editInusranceBranch(data:any){
    debugger
    this.insurancebranchform.patchValue({
      insuranceCompanyId: data.InsuranceCompanyId,
      insuranceCompanyBranchName:  data.InsuranceCompanyBranchName,
      insuranceCompanyBranchCode:  data.InsuranceCompanyBranchCode,
      agencyName:  data.AgencyName,
      agencyCode:  data.AgencyCode,
      isActive:  data.IsActive,  
      branchId: data.BranchId,
      insuranceCompanyBranchId : data.InsuranceCompanyBranchId,
    })
  }
}
