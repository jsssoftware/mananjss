import { IDateDto } from "src/app/app-entites/dtos/common/date-dto";

export interface ITpOdPolicyFormDataModel {
    InsuranceCompany: number;
    PolicyNumber: string;
    StartDateString: string;
    StartDateDto: IDateDto | null;
    NumberOfYear: number;
    ExpiryDateString: string;
    ExpiryDateDto: IDateDto | null;
    NumberOfDays?: string;
    Coverage?:number;
    LineofBusiness?: string;
    RiskLocation?: string;
    NumberofLocation?: number;
    Occupancy?: string;
    BasementExposure?: string;
    LocationType?: string
    StorageRiskId?: string
    Hypothentication?: string
}