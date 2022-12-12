export interface IVoucherSearchPolicyModel {
    ControlNumber: string
    CustomerId?: number
    CustomerName: string
    PolicyNumber: string
    PosId?: number;
    InsuranceCompanyId?: number;
    PolicyStartFromDate: string
    PolicyStartToDate: string;
}