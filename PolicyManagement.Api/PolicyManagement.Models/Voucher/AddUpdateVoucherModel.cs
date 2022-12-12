using PolicyManagement.Models.Common;

namespace PolicyManagement.Models.Voucher
{
    public class AddUpdateVoucherModel : BaseModel
    {
        public string ControlNumber { get; set; }
        public short InsuranceCompanyId { get; set; }
        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public string PolicyNumber { get; set; }
        public short VerticalId { get; set; }
        public bool IsPos { get; set; }
        public bool IsInHouse { get; set; }
        public int Pos { get; set; }
        public int InHouse { get; set; }
        public short VoucherTypeId { get; set; }
        public short PaymentModeId { get; set; }
        public short PolicyId { get; set; }
        public string InstrumentNumber { get; set; }
        public int PaymentAmount { get; set; }
        public string PaymentDate { get; set; }
        public short Bank { get; set; }
        public string AccountUsedForChequeIssue { get; set; }
        public short ReferenceId { get; set; }
        public short ReferTypeId { get; set; }
        public string Remarks { get; set; }
        public string Reason { get; set; }
        public int UpdateMode { get; set; }
        public int BouncedAmount { get; set; }
        public string BouncedDate { get; set; }
        public string BouncedReceiptNumber { get; set; }
        public bool? IsVoucherVerified { get; set; }
        public string BranchCode { get; set; }
    }
}
