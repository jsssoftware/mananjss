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
  selector: 'app-poscategory',
  templateUrl: './poscategory.component.html',
  styleUrls: ['./poscategory.component.css']
})
export class PoscategoryComponent implements OnInit {

  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  poscategorymasterform = new FormGroup({
    CategoryId: new FormControl(''),
    CategoryName: new FormControl('',[Validators.required]),
    Description: new FormControl(''),
    IsActive: new FormControl(true),  
  });

  public  _branchId: number;
  public _poscategorydata: MatTableDataSource<any> = new MatTableDataSource<any>();
  public _length: number = 0;
  public _pageSize: number = 20;
  public _pageNumber: number = 0;
  public _input: string = "";
  public _showAll: boolean =false;

  
  displayedColumns: string[] = [
    'PosType',
    'PosTypeDescription',
    'IsActive',
    'Modify'
  ];
  constructor(private commonService : ICommonService, private masterSerivice :MasterService) { }

  async ngOnInit(): Promise<void> {   
    this._branchId = parseInt(sessionStorage.getItem("branchId") as string); 
    await this.getPosCategory()

  }


  
  getPosCategory(): any {
    
    this.masterSerivice.getPosCategory(this._branchId).subscribe((response: IDataTableDto<any[]>) => {
      this._length = response.TotalCount;
      
      this._poscategorydata = new MatTableDataSource( response.Data);
      this._poscategorydata.paginator = this._paginator;
      this._poscategorydata._updateChangeSubscription(); // <-- Refresh the datasource

    });
  }

  reset(){
    this.poscategorymasterform.reset();
  }

  createPosCategory(){
    this.masterSerivice.createPosCategory(this.poscategorymasterform.getRawValue()).subscribe((response: ICommonDto<any>) => {
      if (response.IsSuccess) {
        this.getPosCategory();
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

  editPosCategory(data:any){
    let obj = Object.assign({}, data);;
    this.poscategorymasterform.patchValue(obj);
  }

  iPosCategory(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._poscategorydata.filter = filterValue.trim().toLowerCase();
  }
}
