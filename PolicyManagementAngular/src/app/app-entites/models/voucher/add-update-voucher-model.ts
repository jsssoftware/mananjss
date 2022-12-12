export interface IAddUpdateVoucherModel {
    ControlNumber: string;
    InsuranceCompanyId: string;
    CustomerId?: number;
    CustomerName: string;
    PolicyNumber: string;
    VerticalId: number;
    IsPos: boolean;
    IsInHouse: boolean;
    Pos?: number;
    InHouse?: number;
    VoucherTypeId: number;
    PaymentModeId: number;
    PolicyId: number;
    InstrumentNumber: string;
    PaymentAmount: number;
    PaymentDate: string;
    Bank: number;
    AccountUsedForChequeIssue: string;
    Remarks:string;
    ReferTypeId: number;
    UpdateMode: number;
    Reason: number;
    BouncedAmount: number;
    BouncedDate: string;
    BouncedReceiptNumber: string;
    BranchCode:string;
}