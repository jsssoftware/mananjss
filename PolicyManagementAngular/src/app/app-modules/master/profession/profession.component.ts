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
  selector: 'app-profession',
  templateUrl: './profession.component.html',
  styleUrls: ['./profession.component.css']
})
export class ProfessionComponent implements OnInit {

  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  form = new FormGroup({
    ProfessionName: new FormControl('',[Validators.required]),
    ProfessionId: new FormControl(''),
    Branch2FinancerId: new FormControl(''),
    IsActive: new FormControl(true),  
  });

  public  _branchId: number;
  public _matData: MatTableDataSource<any> = new MatTableDataSource<any>();
  public _length: number = 0;
  public _pageSize: number = 20;
  public _pageNumber: number = 0;
  public _input: string = "";
  public _showAll: boolean =false;
  public _state: IDropDownDto<number>[] = [];

  
  displayedColumns: string[] = [
    'Name',
    'IsActive',
    'Modify'
  ];
  constructor(private commonService : ICommonService, private masterSerivice :MasterService) { }

  async ngOnInit(): Promise<void> {   
    this._branchId = parseInt(sessionStorage.getItem("branchId") as string); 
    await this.get()

  }

  
  get(): any {
    
    this.masterSerivice.getProfession(this._branchId).subscribe((response: IDataTableDto<any[]>) => {
      this._length = response.TotalCount;
     
      this._matData = new MatTableDataSource( response.Data);
      this._matData.paginator = this._paginator;
      this._matData._updateChangeSubscription(); // <-- Refresh the datasource

    });
  }

  reset(){
    this.form.reset();
  }

  create(){
    this.form.patchValue({
      Branch2FinancerId : this._branchId
    });
    this.masterSerivice.createProfession(this.form.getRawValue()).subscribe((response: ICommonDto<any>) => {
      if (response.IsSuccess) {
        this.get();
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

  edit(data:any){
    let obj = Object.assign({}, data);;
    this.form.patchValue(obj);
  }

  iFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._matData.filter = filterValue.trim().toLowerCase();
  }

}
