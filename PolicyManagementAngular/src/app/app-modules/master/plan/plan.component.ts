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
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  planform = new FormGroup({
    PlanId: new FormControl(''),
    PlanName: new FormControl('',[Validators.required]),
    VerticalId: new FormControl(''),
    ProductId: new FormControl(''),
    InsuranceCompanyId: new FormControl(''),
    IsActive: new FormControl(true),  
    branchId:new FormControl(''),
  });

  public _insuranceCompanies: IDropDownDto<number>[] = [];
  public _verticals: any[] = [];
  public _products: IDropDownDto<number>[] = [];
  public  _branchId: number;
  public _planData: MatTableDataSource<any> = new MatTableDataSource<any>();
  public _length: number = 0;
  public _pageSize: number = 20;
  public _pageNumber: number = 0;
  public _input: string = "";
  public _showAll: boolean =false;

  
  displayedColumns: string[] = [
    'PlanName',
    'VerticalId',
    'ProductId',
    'InsuranceCompanyId',
    'IsActive',
    'Modify'
  ];
  constructor(private commonService : ICommonService, private masterSerivice :MasterService) { }

  async ngOnInit(): Promise<void> {
    this._branchId = parseInt(sessionStorage.getItem("branchId") as string);
    this.planform.patchValue({
      branchId : this._branchId
    })
   await this.getInsuranceCompanies()
   await this.getVerticals()
   await this.getProducts()
   await this.getPlans()
  }


  getInsuranceCompanies(): any {
    this.commonService.getInsuranceCompanies(0).subscribe((response: IDropDownDto<number>[]) => {
      this._insuranceCompanies  = response;
      
    });
  }
  getPlans(): any {
    
    this.masterSerivice.getPlans(this._branchId).subscribe((response: IDataTableDto<any[]>) => {
      this._length = response.TotalCount;
      
      response.Data.forEach(y=>{

        y.InsuranceCompanyName = this._insuranceCompanies.find(x=>x.Value ==  y.InsuranceCompanyId)?.Name,
        y.Vertical = this._verticals.find(x=>x.VerticalId ==  y.VerticalId)?.VerticalName,
        y.Products = this._products.find(x=>x.Value ==  y.ProductId)?.Name
      });
     
      this._planData = new MatTableDataSource( response.Data.sort(x=>x.InsuranceCompanyName));
      this._planData.paginator = this._paginator;
      this._planData._updateChangeSubscription(); // <-- Refresh the datasource

    });
  }

  reset(){
    this.planform.reset();
  }

  createPlan(){
    this.masterSerivice.createPlan(this.planform.getRawValue()).subscribe((response: ICommonDto<any>) => {
      if (response.IsSuccess) {
        this.getPlans();
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

  editPlan(data:any){
    let obj = Object.assign({}, data);;
    this.planform.patchValue(obj);
  }

  iPlan(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._planData.filter = filterValue.trim().toLowerCase();
  }

  getVerticals(): void {
    this.commonService.getVerticals().subscribe((response: any) => {
      this._verticals = response;
    });
  }

  getProducts(): void {
    this.commonService.getProduct().subscribe((response: any) => {
      this._products = response;
    });
  }

}
