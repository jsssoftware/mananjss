import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, ReplaySubject } from "rxjs";
import { ICommonDto } from "src/app/app-entites/dtos/common/common-dto";
import { IHealthPolicyFormDataModel } from "src/app/app-entites/models/motor/health-policy-form-data-model";
import { Retail } from "src/app/shared/utilities/api-urls/retail";
import { Motor } from "../../shared/utilities/api-urls/motor";
import { IApiManagerService } from "../api-manager/abstracts/api-manager-iservice";
import { IRetailService } from "./abstracts/retail.iservice";

@Injectable()
export class RetailService extends IRetailService {
    vertical$ = new BehaviorSubject<string>("");
    _headerTitle$ = new BehaviorSubject<string>("");
    _verticalId$ = new BehaviorSubject<any | null>("");

    constructor(private apiManagerService: IApiManagerService) { 
        super(); 
    }
 
    createPolicy = (model: any): Observable<ICommonDto<string>> => this.apiManagerService.postRequest<ICommonDto<string>>(Retail.CreateRetailPolicy, model);
    updatePolicy = (policyId:number,model: any): Observable<ICommonDto<string>> => this.apiManagerService.putRequest<ICommonDto<string>>(`${Retail.UpdateRetailPolicy}/${policyId}`, model);
    getReatilPolicyById = (policyId: number): Observable<IHealthPolicyFormDataModel> => this.apiManagerService.getRequest<IHealthPolicyFormDataModel>(`${Retail.UpdateRetailPolicy}/${policyId}`);

}
