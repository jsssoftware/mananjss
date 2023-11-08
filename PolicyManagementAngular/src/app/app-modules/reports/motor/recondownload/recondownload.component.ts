import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropDownDto } from 'src/app/app-entites/dtos/common/drop-down-dto';
import { CommonService } from 'src/app/app-services/common-service/common.service';
import { IReportService } from 'src/app/app-services/report-service/abstracts/report.iservice';
import { Vertical } from 'src/app/shared/utilities/enums/enum';
import { CommonFunction } from 'src/app/shared/utilities/helpers/common-function';

@Component({
  selector: 'app-recondownload',
  templateUrl: './recondownload.component.html',
  styleUrls: ['./recondownload.component.css']
})
export class RecondownloadComponent implements OnInit {
  policyStartDates : any;
  policyEndDate : any;
  _branchId : number;
  reconDownloadform = new FormGroup({
    InsuranceCompanyId: new FormControl(''),
    MonthCycle: new FormControl(''),
    BranchId:new FormControl(''),
    DataType:new FormControl(''),
  });

  public _insuranceCompanies: IDropDownDto<number>[] = [];
  public _monthCycle: any[] = [];

  constructor(private reportService : IReportService, private commonService:  CommonService, private commonfunction:  CommonFunction) { 
    this._branchId = parseInt(sessionStorage.getItem("branchId") as string);
  }

  ngOnInit(): void {
    this.getInsuranceCompanies();
    this.getMonthCycle();
  }


  ongenerateExcel() {
    let monthcycle:any =  this._monthCycle.find(x=>x.MonthCycleId == this.reconDownloadform.value.MonthCycle)?.CycleStartDate
    this.reconDownloadform.patchValue({
      BranchId : this._branchId,
      MonthCycle :monthcycle?.split("T")[0]
    });
  
    this.reportService.motorDownloadExcel(this.reconDownloadform.value).subscribe((res: any) => {
      var binaryData = atob(res.Response);
  
      const blob = new Blob([new Uint8Array(binaryData.length).map((_, index) => binaryData.charCodeAt(index))], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
  
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
  
      // Create a link element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = res.Message; // Set the desired file name
      a.click();
  
      // Revoke the object URL to free up resources
      window.URL.revokeObjectURL(url);
    });
  }

  

  getInsuranceCompanies(): any {
    this.commonService.getInsuranceCompanies(Vertical.Motor).subscribe((response: IDropDownDto<number>[]) => {
      this._insuranceCompanies  = response;
    });
  }

  getMonthCycle(): any {
    this.commonService.getMonthCycle().subscribe((response: any[]) => {
      this._monthCycle  = response;
    });
  }

}
