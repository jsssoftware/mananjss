import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime } from 'rxjs/operators';
import { ICommonDto } from 'src/app/app-entites/dtos/common/common-dto';
import { IDataTableDto } from 'src/app/app-entites/dtos/common/data-table-dto';
import { IDropDownDto } from 'src/app/app-entites/dtos/common/drop-down-dto';
import { IAddOnPlanOptionDto } from 'src/app/app-entites/dtos/motor/add-on-plan-option-dto';
import { ICommonService } from 'src/app/app-services/common-service/abstracts/common.iservice';
import { MasterService } from 'src/app/app-services/master-service/master.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-addonridercombo',
  templateUrl: './addonridercombo.component.html',
  styleUrls: ['./addonridercombo.component.css']
})
export class AddonridercomboComponent implements OnInit {

  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  addonplancomboform = new FormGroup({
    AddonRiderId: new FormControl(''),
    InsuranceCompanyId: new FormControl(''),
    VerticalId: new FormControl('',[Validators.required]),
    AddonRiderName: new FormControl('',[Validators.required]),
    AddOnPlanOptionList: new FormControl(''),
    IsActive: new FormControl(true),  
    branchId:new FormControl(''),
  });

  _addOnRiderArray: string[] = [];
  public _insuranceCompanies: IDropDownDto<number>[] = [];
  public _verticals: any[] = [];
  public  _branchId: number;
  public _addonPlanComboData: MatTableDataSource<any> = new MatTableDataSource<any>();
  public _length: number = 0;
  public _pageSize: number = 20;
  public _pageNumber: number = 0;
  public _input: string = "";
  public _showAll: boolean =false;
  public _addOnPlanOptions: IAddOnPlanOptionDto[] = [];

  
  displayedColumns: string[] = [
    'AddonRiderName',
    'VerticalId',
    'InsuranceCompanyId',
    'AddonPlan',
    'IsActive',
    'Modify'
  ];
  constructor(private commonService : ICommonService, private masterSerivice :MasterService,private formbuilder: FormBuilder) { }

  async ngOnInit(): Promise<void> {
    this._branchId = parseInt(sessionStorage.getItem("branchId") as string);
    this.addonplancomboform.patchValue({
      branchId : this._branchId
    })
   await this.getVerticals()
   await this.getAddonPlanCombo()
  }


  getInsuranceCompanies(): any {
    this.commonService.getInsuranceCompanies(this.addonplancomboform.value.VerticalId).subscribe((response: IDropDownDto<number>[]) => {
      this._insuranceCompanies  = response;
      
    });
  }
  getAddonPlanCombo(): any {
    
    this.masterSerivice.getAddonPlanCombo(this._branchId).subscribe((response: IDataTableDto<any[]>) => {
      this._length = response.TotalCount;
      
      response.Data.forEach(y=>{
        y.InsuranceCompanyName = this._insuranceCompanies.find(x=>x.Value ==  y.InsuranceCompanyId)?.Name,
        y.Vertical = this._verticals.find(x=>x.VerticalId ==  y.VerticalId)?.VerticalName
        y.AddonPlan = y.AddOnPlanOptionList?.filter((y: any)=>y.IsPlanAvailable ==  true).map((x: any)=> {
          return x.AddonPlanOptionName
        })?.join(' , ');
      });
     
      this._addonPlanComboData = new MatTableDataSource( response.Data.sort(x=>x.InsuranceCompanyName));
      this._addonPlanComboData.paginator = this._paginator;
      this._addonPlanComboData._updateChangeSubscription(); // <-- Refresh the datasource

    });
  }

  reset(){
    this.addonplancomboform.reset();
  }

  createAddonPlanCombo(){
    this.addonplancomboform.patchValue({ AddOnPlanOptionList
      : this._addOnPlanOptions});// Yes

    this.masterSerivice.createAddonPlanCombo(this.addonplancomboform.getRawValue()).subscribe((response: ICommonDto<any>) => {
      if (response.IsSuccess) {
        this.getAddonPlanCombo();
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

  editAddonPlanCombo(data:any){
    let obj = Object.assign({}, data);
    this.addonplancomboform.patchValue(obj);
    this.addonplancomboform.patchValue({ AddOnPlanOptionList
      : obj.AddOnPlanOptionList});// Yes
      this._addOnPlanOptions =(obj.AddOnPlanOptionList);

  }

  iAddonPlanCombo(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._addonPlanComboData.filter = filterValue.trim().toLowerCase();
  }

  getVerticals(): void {
    this.commonService.getVerticals().subscribe((response: any) => {
      this._verticals = response;
    });
  }

  
  getAddOnPlanOptions(): void {
    this.commonService.getAddOnPlanOptions(0, this.addonplancomboform.value.VerticalId, 0).subscribe((response: IAddOnPlanOptionDto[]) => {
      response.forEach((value, index) => {       
      this._addOnPlanOptions = response;
      this.getInsuranceCompanies();
    });
  });
}

  
  





}
