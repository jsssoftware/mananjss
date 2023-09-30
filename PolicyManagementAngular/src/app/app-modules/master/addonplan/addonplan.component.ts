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
  selector: 'app-addonplan',
  templateUrl: './addonplan.component.html',
  styleUrls: ['./addonplan.component.css']
})
export class AddonplanComponent implements OnInit {


  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  addonplanform = new FormGroup({
    AddonPlanOptionId: new FormControl(''),
    AddonPlanOptionName: new FormControl('',[Validators.required]),
    VerticalId: new FormControl(''),
    AddonPlanOptionDescripation: new FormControl(''),
    IsActive: new FormControl(true),  
    branchId:new FormControl(''),
  });

  public _insuranceCompanies: IDropDownDto<number>[] = [];
  public _verticals: any[] = [];
  public _products: IDropDownDto<number>[] = [];
  public  _branchId: number;
  public _addonPlan: MatTableDataSource<any> = new MatTableDataSource<any>();
  public _length: number = 0;
  public _pageSize: number = 20;
  public _pageNumber: number = 0;
  public _input: string = "";
  public _showAll: boolean =false;

  
  displayedColumns: string[] = [
    'AddonPlanOptionName',
    'VerticalId',
    'AddonPlanOptionDescripation',
    'IsActive',
    'Modify'
  ];
  constructor(private commonService : ICommonService, private masterSerivice :MasterService) { }

  async ngOnInit(): Promise<void> {
    this._branchId = parseInt(sessionStorage.getItem("branchId") as string);
    this.addonplanform.patchValue({
      branchId : this._branchId
    })
   await this.getVerticals()
   await this.getAddonPlans()
  }

  getAddonPlans(): any {
    
    this.masterSerivice.getAddonPlans(this._branchId).subscribe((response: IDataTableDto<any[]>) => {
      this._length = response.TotalCount;
      
      response.Data.forEach(y=>{
        y.Vertical = this._verticals.find(x=>x.VerticalId ==  y.VerticalId)?.VerticalName
      });
     
      this._addonPlan = new MatTableDataSource( response.Data.sort(x=>x.InsuranceCompanyName));
      this._addonPlan.paginator = this._paginator;
      this._addonPlan._updateChangeSubscription(); // <-- Refresh the datasource

    });
  }

  reset(){
    this.addonplanform.reset();
  }

  createAddOnPlan(){
    this.masterSerivice.createAddonPlan(this.addonplanform.getRawValue()).subscribe((response: ICommonDto<any>) => {
      if (response.IsSuccess) {
        this.getAddonPlans();
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

  editAddOnPlan(data:any){
    let obj = Object.assign({}, data);;
    this.addonplanform.patchValue(obj);
  }

  IAddonPlan(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._addonPlan.filter = filterValue.trim().toLowerCase();
  }

  getVerticals(): void {
    this.commonService.getVerticals().subscribe((response: any) => {
      this._verticals = response;
    });
  }
}
