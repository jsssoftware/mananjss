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
  selector: 'app-bankmaster',
  templateUrl: './bankmaster.component.html',
  styleUrls: ['./bankmaster.component.css']
})
export class BankmasterComponent implements OnInit {

  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  bankmasterform = new FormGroup({
    BankId: new FormControl(''),
    BankName: new FormControl(''),
    BankCode: new FormControl(''),
    IsActive: new FormControl(true),  
  });

  public  _branchId: number;
  public _bankData: MatTableDataSource<any> = new MatTableDataSource<any>();
  public _length: number = 0;
  public _pageSize: number = 20;
  public _pageNumber: number = 0;
  public _input: string = "";
  public _showAll: boolean =false;

  
  displayedColumns: string[] = [
    'BankName',
    'BankCode',
    'IsActive',
    'Modify'
  ];
  constructor(private commonService : ICommonService, private masterSerivice :MasterService) { }

  async ngOnInit(): Promise<void> {   
    this._branchId = parseInt(sessionStorage.getItem("branchId") as string); 
    await this.getBanks()

  }


  
  getBanks(): any {
    
    this.masterSerivice.getBanks(this._branchId).subscribe((response: IDataTableDto<any[]>) => {
      this._length = response.TotalCount;
      
      this._bankData = new MatTableDataSource( response.Data);
      this._bankData.paginator = this._paginator;
      this._bankData._updateChangeSubscription(); // <-- Refresh the datasource

    });
  }

  reset(){
    this.bankmasterform.reset();
  }

  createBanks(){
    this.masterSerivice.createBanks(this.bankmasterform.getRawValue()).subscribe((response: ICommonDto<any>) => {
      if (response.IsSuccess) {
        this.getBanks();
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

  editBank(data:any){
    let obj = Object.assign({}, data);;
    this.bankmasterform.patchValue(obj);
  }

  iBank(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._bankData.filter = filterValue.trim().toLowerCase();
  }

  
}
