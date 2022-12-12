import { IDateDto } from "../common/date-dto";

export interface ISearchClaimsPolicyDto {
    PolicyId?: number;
    CustomerId?: number;
    ControlNumber?: string;
    PolicyNumber?: string;
    PolicyExpiryDateDto?: IDateDto;
    InsuranceCompany?: string;
    Pos?: string;
    Branch?: string;
    Customer?: string;
    Product?: string;
    Plan?: string;
    PlanType?: string;
    Manufacture?: string;
    Model?: string;
    MakeYear?: string;
    RegistrationNumber?: string;
    VerticalName: string;
}