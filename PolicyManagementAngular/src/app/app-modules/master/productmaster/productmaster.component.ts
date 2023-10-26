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
  selector: 'app-productmaster',
  templateUrl: './productmaster.component.html',
  styleUrls: ['./productmaster.component.css']
})
export class ProductmasterComponent implements OnInit {

  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  productmasterform = new FormGroup({
    ProductId: new FormControl(''),
    ProductDescription: new FormControl(''),
    ProductName: new FormControl('',[Validators.required]),
    VerticalId: new FormControl('',[Validators.required]),
    IsActive: new FormControl(true),  
    branchId:new FormControl(''),
  });

  public _verticals: any[] = [];
  public  _branchId: number;
  public _productsData: MatTableDataSource<any> = new MatTableDataSource<any>();
  public _length: number = 0;
  public _pageSize: number = 20;
  public _pageNumber: number = 0;
  public _input: string = "";
  public _showAll: boolean =false;

  
  displayedColumns: string[] = [
    'ProductName',
    'ProductDescription',
    'VerticalId',
    'IsActive',
    'Modify'
  ];
  constructor(private commonService : ICommonService, private masterSerivice :MasterService) { }

  async ngOnInit(): Promise<void> {
    this._branchId = parseInt(sessionStorage.getItem("branchId") as string);
    this.productmasterform.patchValue({
      branchId : this._branchId
    })
   await this.getVerticals()
   await this.getProducts()
  }


  reset(){
    this.productmasterform.reset();
  }

  createProducts(){
    this.masterSerivice.createProducts(this.productmasterform.getRawValue()).subscribe((response: ICommonDto<any>) => {
      if (response.IsSuccess) {
        this.getProducts();
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

  editProduct(data:any){
    let obj = Object.assign({}, data);;
    this.productmasterform.patchValue(obj);
  }

  IProductMaster(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._productsData.filter = filterValue.trim().toLowerCase();
  }

  getVerticals(): void {
    this.commonService.getVerticals().subscribe((response: any) => {
      this._verticals = response;
    });
  }

  getProducts(): void {
    this.masterSerivice.getProducts(this._branchId).subscribe((response: IDataTableDto<any[]>) => {
      this._length = response.TotalCount;
      
      response.Data.forEach(y=>{
        y.Vertical = this._verticals.find(x=>x.VerticalId ==  y.VerticalId)?.VerticalName
      });
     
      this._productsData = new MatTableDataSource( response.Data.sort(x=>x.InsuranceCompanyName));
      this._productsData.paginator = this._paginator;
      this._productsData._updateChangeSubscription(); // <-- Refresh the datasource
    });

  }

}