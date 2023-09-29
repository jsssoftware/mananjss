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
  selector: 'app-insurancecompany',
  templateUrl: './insurancecompany.component.html',
  styleUrls: ['./insurancecompany.component.css']
})
export class InsurancecompanyComponent implements OnInit {
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  insuranceCompanyform = new FormGroup({
    InsuranceCompanyId :new FormControl(''),
    InsuranceCompanyName :new FormControl(''),
    CompanyCode: new FormControl('',[Validators.required]),
    IsMotor: new FormControl(''),  
    IsHealth:new FormControl(''),
    IsCommercial:new FormControl(''),
    IsLife:new FormControl(''),
    BranchId:new FormControl(''),
    Website1:new FormControl(''),
    Website2:new FormControl(''),
    InsCompShortName:new FormControl(''),
    TollFreeNo:new FormControl(''),
    IsActive:new FormControl(true),
  })

  public  _branchId: number;
  public _insuranceCompany: MatTableDataSource<any> = new MatTableDataSource<any>();
  public _length: number = 0;
  public _pageSize: number = 20;
  public _pageNumber: number = 0;
  public _input: string = "";
  public _showAll: boolean =false;

  displayedColumns: string[] = [
    'InsuranceCompanyName',
    'IsMotor',
    'IsHealth',
    'IsCommercial',
    'IsLife',
    'CompanyCode',
    'Website1',
    'Website2',
    'IsActive',
    'Modify'
  ];
  constructor(private commonService : ICommonService, private masterSerivice :MasterService,private  commonFunction :CommonFunction) { }

  async ngOnInit(): Promise<void> {
    this._branchId = parseInt(sessionStorage.getItem("branchId") as string);
    await this.getInsuranceCompany();
  }


  createInsuranceCompany(){
    this.insuranceCompanyform.patchValue({
      BranchId : this._branchId
    });
  
    this.masterSerivice.createInusraanceComanyData(this.insuranceCompanyform.getRawValue()).subscribe((response: ICommonDto<any>) => {
      if (response.IsSuccess) {
        this.getInsuranceCompany()
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

  reset(){
    this.insuranceCompanyform.reset();
  }

  getInsuranceCompany(){
    this.masterSerivice.getInsuranceCompanyData(this._branchId).subscribe((response: IDataTableDto<any[]>) => {
      this._length = response.TotalCount;
      this._insuranceCompany = new MatTableDataSource(response.Data);
      this._insuranceCompany.paginator = this._paginator;
      this._insuranceCompany._updateChangeSubscription(); // <-- Refresh the datasource
    });  
  }

  
  editInsuranceCompany(data:any){
    let obj = Object.assign({}, data);;
    this.insuranceCompanyform.patchValue(obj);
  }

  iInsuranceCompany(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._insuranceCompany.filter = filterValue.trim().toLowerCase();
  }
}
