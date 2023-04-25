import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, ReplaySubject } from "rxjs";
import { ICommonDto } from "src/app/app-entites/dtos/common/common-dto";
import { IHealthPolicyFormDataModel } from "src/app/app-entites/models/motor/health-policy-form-data-model";
import { Health } from "src/app/shared/utilities/api-urls/health";
import { Motor } from "../../shared/utilities/api-urls/motor";
import { IApiManagerService } from "../api-manager/abstracts/api-manager-iservice";
import { IHealthService } from "./abstracts/health.iservice";

@Injectable()
export class HealthService extends IHealthService {
    vertical$ = new BehaviorSubject<string>("");
    _headerTitle$ = new BehaviorSubject<string>("");
    _verticalId$ = new BehaviorSubject<string | null>("");

    constructor(private apiManagerService: IApiManagerService) { 
        super(); 
    }
 
    createPolicy = (model: any): Observable<ICommonDto<string>> => this.apiManagerService.postRequest<ICommonDto<string>>(Health.CreateHealthPolicy, model);
    updatePolicy = (policyId:number,model: any): Observable<ICommonDto<string>> => this.apiManagerService.putRequest<ICommonDto<string>>(`${Health.UpdateHealthPolicy}/${policyId}`, model);
    getHealthPolicyById = (policyId: number): Observable<IHealthPolicyFormDataModel> => this.apiManagerService.getRequest<IHealthPolicyFormDataModel>(`${Health.HealthPolicyById}/${policyId}`);

}
