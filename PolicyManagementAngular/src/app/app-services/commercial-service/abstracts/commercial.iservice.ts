import { Observable } from "rxjs";
import { ICommonDto } from "src/app/app-entites/dtos/common/common-dto";
import { ICommercialPolicyFormDataModel } from "src/app/app-entites/models/motor/commercial-policy-form-data-model";

export abstract class ICommercialService {
     abstract createPolicy(model: any): Observable<ICommonDto<string>>;
     abstract updatePolicy(policyId: number,model: any): Observable<ICommonDto<string>>;
     abstract getCommercialPolicyById(policyId: number): Observable<ICommercialPolicyFormDataModel>;
}