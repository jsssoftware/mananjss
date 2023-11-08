import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { IDropDownDto } from 'src/app/app-entites/dtos/common/drop-down-dto';
import { CommonService } from 'src/app/app-services/common-service/common.service';
import { IReportService } from 'src/app/app-services/report-service/abstracts/report.iservice';
import { Vertical } from 'src/app/shared/utilities/enums/enum';
@Component({
  selector: 'app-reconupload',
  templateUrl: './reconupload.component.html',
  styleUrls: ['./reconupload.component.css']
})
export class ReconuploadComponent implements OnInit {
  matcher = new ErrorStateMatcher();

  public listAccepts: string =
    ".xlsx";
    _branchId : number;
  reconUploadForm = new FormGroup({
    browse: new FormControl(''),
    base64Data:  new FormControl(''),
    verticalId: new FormControl(''),
    branchId: new FormControl('')
  });
  constructor(private reportService : IReportService, private commonService:  CommonService) {
    this._branchId = parseInt(sessionStorage.getItem("branchId") as string);

   }

  ngOnInit(): void {
    
  }

  onUploadExcel() {   

    let reader = new FileReader();
    let documents: any ={};
    reader.readAsDataURL(this.reconUploadForm.value.browse._files[0]);

    reader.onload = () => {
      
      documents = {
        Data: reader.result as string,
        FileName: this.reconUploadForm.value.browse._fileNames,
      };
      this.reportService.motorUploadExcel(documents).subscribe((res: any) => {
     
      });
    }

   
  }

}
