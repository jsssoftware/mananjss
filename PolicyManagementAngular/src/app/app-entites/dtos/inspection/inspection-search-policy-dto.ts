export interface IInspectionSearchPolicyDto {
    ControlNumber: string;
    Customer: string;
    RegistrationNumber: string;
    Manufacturer: string;
    ManufacturerId: number;
    Model: string;
    ModelId: number;
    MakeYear: string;
    MakeYearId: number;
    InsuranceCompany: string;
    InsuranceCompanyId: number;
    Pos: string;
    PosId?: number;
    PolicyExpiryString: string;
    EngineNumber: string;
    ChassisNumber: string;
}