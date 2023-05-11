import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, ReplaySubject } from "rxjs";
import { ICommonDto } from "src/app/app-entites/dtos/common/common-dto";
import { IMotorPolicyFormDataModel } from "src/app/app-entites/models/motor/motor-policy-form-data-model";
import { Motor } from "../../shared/utilities/api-urls/motor";
import { IApiManagerService } from "../api-manager/abstracts/api-manager-iservice";
import { IMotorService } from "./abstracts/motor.iservice";

@Injectable()
export class MotorService extends IMotorService {
    vertical$ = new BehaviorSubject<string>("");
    _headerTitle$ = new BehaviorSubject<string>("");
    _verticalId$ = new BehaviorSubject<any | null>("");

    constructor(private apiManagerService: IApiManagerService) { 
        super(); 
    }
 
    createPolicy = (model: any): Observable<ICommonDto<string>> => this.apiManagerService.postRequest<ICommonDto<string>>(Motor.CreateMotorPolicy, model);
    updatePolicy = (policyId:number,model: any): Observable<ICommonDto<string>> => this.apiManagerService.putRequest<ICommonDto<string>>(`${Motor.UpdateMotorPolicy}/${policyId}`, model);
    getMotorPolicyById = (policyId: number): Observable<IMotorPolicyFormDataModel> => this.apiManagerService.getRequest<IMotorPolicyFormDataModel>(`${Motor.MotorPolicyById}/${policyId}`);

}
