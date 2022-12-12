export interface ISearchVoucherModel {
    CustomerId?: number;
    CustomerName: string;
    PosId?: number;
    InsuranceCompanyId?: number;
    PolicyNumber: string;
    VoucherNumber: string;
    VoucherStartFromDate: string;
    VoucherStartToDate: string;
    Mode: number;
    IsShowAll: boolean;
}