export interface IClaimsSearchPolicyModel {
    ControlNumber: string;
    VerticalId?: number;
    ProductId?: number;
    RegistrationNumber: string;
    PolicyNumber: string;
    ManufactureId?: number;
    ModelId?: number;
    CustomerName: string;
    CustomerPhone: string;
    PosId?: number;
    InsuranceCompanyId?: number;
    PolicyStartFromDate: string
    PolicyStartToDate: string;
    HasExpiredData: boolean;
}