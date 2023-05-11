import { Observable } from "rxjs";
import { ICommonDto } from "src/app/app-entites/dtos/common/common-dto";
import { IHealthPolicyFormDataModel } from "src/app/app-entites/models/motor/health-policy-form-data-model";

export abstract class IRetailService {
     abstract createPolicy(model: any): Observable<ICommonDto<string>>;
     abstract updatePolicy(policyId: number,model: any): Observable<ICommonDto<string>>;
     abstract getReatilPolicyById(policyId: number): Observable<IHealthPolicyFormDataModel>;
}