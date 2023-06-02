import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, ReplaySubject } from "rxjs";
import { ICommonDto } from "src/app/app-entites/dtos/common/common-dto";
import { ICommercialPolicyFormDataModel } from "src/app/app-entites/models/motor/commercial-policy-form-data-model";
import { Commercial } from "src/app/shared/utilities/api-urls/commercial";
import { IApiManagerService } from "../api-manager/abstracts/api-manager-iservice";
import { ICommercialService } from "./abstracts/commercial.iservice";

@Injectable()
export class CommercialService extends ICommercialService {
    vertical$ = new BehaviorSubject<string>("");
    _headerTitle$ = new BehaviorSubject<string>("");
    _verticalId$ = new BehaviorSubject<any | null>("");

    constructor(private apiManagerService: IApiManagerService) { 
        super(); 
    }
 
    createPolicy = (model: any): Observable<ICommonDto<string>> => this.apiManagerService.postRequest<ICommonDto<string>>(Commercial.CreateRetailPolicy, model);
    updatePolicy = (policyId:number,model: any): Observable<ICommonDto<string>> => this.apiManagerService.putRequest<ICommonDto<string>>(`${Commercial.UpdateRetailPolicy}/${policyId}`, model);
    getCommercialPolicyById = (policyId: number): Observable<ICommercialPolicyFormDataModel> => this.apiManagerService.getRequest<ICommercialPolicyFormDataModel>(`${Commercial.UpdateRetailPolicy}/${policyId}`);

}
