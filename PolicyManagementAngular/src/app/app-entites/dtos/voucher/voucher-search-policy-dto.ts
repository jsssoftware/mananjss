export interface IVoucherSearchPolicyDto {
    PolicyId: number;
    PolicyNumber: string;
    ControlNumber: string;
    CustomerName: string;
    CustomerId: number;
    Pos: string;
    PosId: number;
    InsuranceCompany: string;
    InsuranceCompanyId: number;
    PolicyStartDate: Date;
    PolicyStartDateString: string;
    GrossPremium: number;
    Telecaller: string;
    Vertical: string;
    VerticalId: number;
}