using PolicyManagement.Dtos.Common;
using System;

namespace PolicyManagement.Dtos.Voucher
{
    public class VoucherDto
    {
        public string ControlNumber { get; set; }
        public string VoucherNumber { get; set; }
        public int InsuranceCompanyId { get; set; }
        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public string PolicyNumber { get; set; }
        public int PolicyId { get; set; }
        public short VerticalId { get; set; }
        public short ReferTypeId { get; set; }
        public int PosId { get; set; }
        public int InHouseId { get; set; }
        public short VoucherTypeId { get; set; }
        public string VoucherType { get; set; }
        public short PaymentModeId { get; set; }
        public string InstrumentNumber { get; set; }
        public int PaymentAmount { get; set; }
        public DateTime? VoucherDate { get; set; }
        public DateDto VoucherDateDto
        {
            get => new DateDto
            {
                Day = VoucherDate.HasValue ? VoucherDate.Value.Day : 0,
                Month = VoucherDate.HasValue ? VoucherDate.Value.Month : 0,
                Year = VoucherDate.HasValue ? VoucherDate.Value.Year : 0
            };
        }
        public DateTime? PaymentDate { get; set; }
        public DateDto PaymentDateDto
        {
            get => new DateDto
            {
                Day = PaymentDate.HasValue ? PaymentDate.Value.Day : 0,
                Month = PaymentDate.HasValue ? PaymentDate.Value.Month : 0,
                Year = PaymentDate.HasValue ? PaymentDate.Value.Year : 0
            };
        }
        public short BankId { get; set; }
        public string AccountUsedForChequeIssue { get; set; }
        public string Remarks { get; set; }
        public string CreatedBy { get; set; }
        public int CreatedId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedDateString { get => CreatedDate.HasValue ? CreatedDate.Value.ToString("dd-MM-yyyy").Replace("-", "/") : "N/A"; }
        public string ModifiedBy { get; set; } = "N/A";
        public int ModifiedId { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedDateString { get => ModifiedDate.HasValue ? ModifiedDate.Value.ToString("dd-MM-yyyy").Replace("-", "/") : "N/A"; }
        public string VerifiedBy { get; set; } = "N/A";
        public int VerifiedId { get; set; }
        public DateTime? VerifiedDate { get; set; }
        public string VerifiedDateString { get => VerifiedDate.HasValue ? VerifiedDate.Value.ToString("dd-MM-yyyy").Replace("-", "/") : "N/A"; }
        public string ModificationReason { get; set; }
        public int BouncedAmount { get; set; }
        public DateTime? BouncedDate { get; set; }
        public DateDto BouncedDateDto
        {
            get => new DateDto
            {
                Day = BouncedDate.HasValue ? BouncedDate.Value.Day : 0,
                Month = BouncedDate.HasValue ? BouncedDate.Value.Month : 0,
                Year = BouncedDate.HasValue ? BouncedDate.Value.Year : 0
            };
        }
        public string BouncedReceiptNumber { get; set; }
        public string CancellationReason { get; set; }
        public int StatusId { get; set; }
        public string Status { get; set; }
        public string VerificationStatus { get; set; }
    }
}
