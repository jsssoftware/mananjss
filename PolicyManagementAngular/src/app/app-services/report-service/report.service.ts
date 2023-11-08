import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, ReplaySubject } from "rxjs";
import { ICommonDto } from "src/app/app-entites/dtos/common/common-dto";
import { IHealthPolicyFormDataModel } from "src/app/app-entites/models/motor/health-policy-form-data-model";
import { Report } from "src/app/shared/utilities/api-urls/report";
import { Retail } from "src/app/shared/utilities/api-urls/retail";
import { Motor } from "../../shared/utilities/api-urls/motor";
import { IApiManagerService } from "../api-manager/abstracts/api-manager-iservice";
import { IReportService } from "./abstracts/report.iservice";

@Injectable()
export class ReportService extends IReportService {
    
    
    constructor(private apiManagerService: IApiManagerService) { 
        super(); 
    }
 
    motorDownloadExcel = (model:any): Observable<ICommonDto<string>> => this.apiManagerService.postRequest<ICommonDto<string>>(Report.motorDownloadExcel,model);
    motorUploadExcel = (model:any): Observable<ICommonDto<string>> => this.apiManagerService.postRequest<ICommonDto<string>>(Report.motorUploadExcel,model);

  
}
