using System;

namespace PolicyManagement.Dtos.Common
{
    public class PolicyVoucherDto
    {
        public int VoucherId { get; set; }
        public string VoucherNumber { get; set; }
        public int VoucherAmount { get; set; }
        public string VoucherType { get; set; }
        public DateTime? VoucherDate { get; set; }
        public string VoucherDateString { get => VoucherDate.HasValue ? VoucherDate.Value.ToString("dd-MM-yyyy").Replace("-", "/") : "N/A"; }
        public string VoucherStatus { get; set; }
        public string VoucherRemark { get; set; }
        public string PaymentMode { get; set; }
        public int PaymentAmount { get; set; }
        public string InstrumentNumber { get; set; }
        public DateTime? PaymentDate { get; set; }
        public string PaymentDateString { get => PaymentDate.HasValue ? PaymentDate.Value.ToString("dd-MM-yyyy").Replace("-", "/") : "N/A"; }
        public string Bank { get; set; }
        public string CancelReason { get; set; }
        public DateTime? BoucneDate { get; set; }
        public string BoucneDateString { get => BoucneDate.HasValue ? BoucneDate.Value.ToString("dd-MM-yyyy").Replace("-", "/") : "N/A"; }
        public int BounceAmount { get; set; }
        public string Verification { get; set; }
    }
}