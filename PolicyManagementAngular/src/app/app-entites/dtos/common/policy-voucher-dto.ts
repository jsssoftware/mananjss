export interface IPolicyVoucherDto {
    VoucherId: number;
    VoucherNumber: string;
    VoucherAmount: number;
    VoucherType: string;
    VoucherDateString: string;
    VoucherStatus: string;
    VoucherRemark: string;
    PaymentMode: string;
    PaymentAmount: number;
    InstrumentNumber: string;
    PaymentDateString: string;
    Bank: string;
    CancelReason: string;
    BoucneDateString: string;
    BounceAmount: number;
    Verification: string;
}