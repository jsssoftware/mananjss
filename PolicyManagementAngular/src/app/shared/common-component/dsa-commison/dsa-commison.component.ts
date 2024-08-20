import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { ColumnMode, id } from '@swimlane/ngx-datatable';
import { ICommonDto } from 'src/app/app-entites/dtos/common/common-dto';
import { IDropDownDto } from 'src/app/app-entites/dtos/common/drop-down-dto';
import { ICommonService } from 'src/app/app-services/common-service/abstracts/common.iservice';
import { ReportService } from 'src/app/app-services/report-service/report.service';
import { Vertical } from 'src/app/shared/utilities/enums/enum';
import { DatePipe } from '@angular/common';
import { CommonFunction } from '../../utilities/helpers/common-function';
import Swal from 'sweetalert2';
import { CommonService } from 'src/app/app-services/common-service/common.service';
import { VoucherService } from 'src/app/app-services/voucher/voucher.service';
import { callbackify } from 'util';

@Component({
  selector: 'app-dsa-commison',
  templateUrl: './dsa-commison.component.html',
  styleUrls: ['./dsa-commison.component.css']
})
export class DsaCommisonComponent implements OnInit {
  public _posDatas: IDropDownDto<number>[] = [];
  public _monthCycle:any[] = [];
  _branchId : number;
  poscommision = new FormGroup({
    commisoncycle: new FormControl('', [Validators.required]),
    insuranceCompany: new FormControl(''),
    customerName: new FormControl(''),
    posName: new FormControl(''),
    commisionper: new FormControl(''),   
    controlNumber: new FormControl(''),   
    posNameId: new FormControl(''),   
    branchId: new FormControl(''),   
    verticalType: new FormControl(''),   
    monthCycleStart: new FormControl(''),   
    monthCycleId: new FormControl(''),  
    isRecalculation  : new FormControl(false)
 })
  constructor(
    private commonService: CommonService,
    private voucherService :VoucherService
  ) {
    this._branchId = parseInt(sessionStorage.getItem("branchId"));
   }

  ngOnInit(): void {
    this.getPos( this._branchId);
    this.getMonthCycle();
    }

  exportexcel(){

  }

  search(){

  }

  reset(){
    this.isConfirmed =  false;
  }

  
  getPos(branchId: number): void {
    this.commonService.getPos(Vertical.Motor, branchId).subscribe((response: IDropDownDto<number>[]) => {
      this._posDatas = response;
    })
  }

  
  getMonthCycle(): any {
    this.commonService.getMonthCycle().subscribe((response: any[]) => {
      this._monthCycle  = response;
    });
  }

  isConfirmed :boolean=  true
  commisonSlabMotor(type : number){
    let monthcycle:any =  this._monthCycle.find(x=>x.MonthCycleId == this.poscommision.value.commisoncycle)?.CycleStartDate
    this.poscommision.patchValue({
      branchId : this._branchId,
      monthCycleStart :monthcycle?.split("T")[0],
      monthCycleId :this.poscommision.value.commisoncycle,
      verticalType : type
    });
    
    this.voucherService.CommisionSlabCalculation(this.poscommision.value).subscribe(async (response: any) => {
      if (!response.IsSuccess &&  this.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Done',
          text: response.Message,
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        }).then((result) => {
          this.poscommision.patchValue({
            isRecalculation: false
          });
          if (result.isConfirmed) {
           this.isConfirmed =  true;
           this.poscommision.patchValue({
            isRecalculation : true
          });
          };
        })
      }
      else
      if (response.IsSuccess) {
        Swal.fire({
          icon: 'success',
          title: 'Done',
          text: response.Message,
          }).then((result) => {
          if (result.isConfirmed) {
           this.reset()
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

}
