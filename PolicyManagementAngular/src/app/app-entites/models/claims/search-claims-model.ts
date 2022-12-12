export interface ISearchClaimsModel {
    ControlNumber: string;
    CustomerName: string;
    MobileNumber: string;
    PosId?: number;
    InsuranceCompanyId?: number;
    PolicyNumber: string;
    ClaimsNumber: string;
    RegistrationNumber: string;
    ClaimsEntryFromDate: string;
    ClaimsEntryToDate: string;
    Mode: number;
    IsShowAll: boolean;
}