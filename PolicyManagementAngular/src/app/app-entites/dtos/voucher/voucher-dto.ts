import { IDateDto } from "src/app/app-entites/dtos/common/date-dto"

export interface IVoucherDto {
    ControlNumber: string;
    InsuranceCompanyId: number;
    CustomerId: number;
    CustomerName: string;
    PolicyNumber: string;
    PolicyId: number;
    VerticalId: number;
    ReferTypeId: number;
    PosId: number;
    InHouseId: number;
    VoucherTypeId: number;
    PaymentModeId: number;
    InstrumentNumber: string;
    PaymentAmount: number;
    PaymentDate: string;
    PaymentDateDto: IDateDto;
    VoucherDateDto: IDateDto;
    BankId: number;
    AccountUsedForChequeIssue: string;
    Remarks: string;
    VoucherNumber: string;
    CreatedBy: string;
    CreatedDateString: string;
    ModifiedBy: string;
    ModifiedDateString: string;
    VerifiedBy: string;
    VerifiedDateString: string;
    ModificationReason: string;
    BouncedAmount: number;
    BouncedDateDto: IDateDto;
    BouncedReceiptNumber: string;
    CancellationReason: string;
    Status: string;
    VoucherType: string;
    VerificationStatus:string;
}