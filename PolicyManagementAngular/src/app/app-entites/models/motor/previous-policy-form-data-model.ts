import { IDateDto } from "src/app/app-entites/dtos/common/date-dto";

export interface IPreviousPolicyFormDataModel {
    LastYearInsuranceCompany: number;
    PreviousPolicyNumber: string;
    LastPolicyExpiryDateString: string;
    LastPolicyExpiryDateDto: IDateDto|null;
    PreviousPolicyPlan?:string|null,
    PreviousPolicySumInsured?: number|null,
}