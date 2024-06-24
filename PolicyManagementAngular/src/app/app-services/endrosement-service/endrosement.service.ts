import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, ReplaySubject } from "rxjs";
import { ICommonDto } from "src/app/app-entites/dtos/common/common-dto";
import { IHealthPolicyFormDataModel } from "src/app/app-entites/models/motor/health-policy-form-data-model";
import { Report } from "src/app/shared/utilities/api-urls/report";
import { Retail } from "src/app/shared/utilities/api-urls/retail";
import { Motor } from "../../shared/utilities/api-urls/motor";
import { IApiManagerService } from "../api-manager/abstracts/api-manager-iservice";
import { IEndrosementService } from "./abstracts/endrosement.iservice";
import { IDataTableDto } from "src/app/app-entites/dtos/common/data-table-dto";
import { Endrosement } from "src/app/shared/utilities/api-urls/endrosement";

@Injectable()
export class EndrosementService extends IEndrosementService {
    
    
    constructor(private apiManagerService: IApiManagerService) { 
        super(); 
    }
 
   
    getPolicyDatas = (model:any): Observable<IDataTableDto<any[]>> => this.apiManagerService.postRequest<ICommonDto<string>>(Endrosement.getPolicyDatas,model);
  
}
