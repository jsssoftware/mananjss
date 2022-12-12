using System;

namespace PolicyManagement.Dtos.Voucher
{
    public class SearchVoucherDto
    {
        public int VoucherId { get; set; }
        public string VoucherNumber { get; set; }
        public DateTime VoucherDate { get; set; }
        public string PolicyNumber { get; set; }
        public string VoucherDateString { get => VoucherDate.ToString("MM-dd-yyyy").Replace("-", "/"); }
        public int VoucherAmount { get; set; }
        public string VoucherType { get; set; }
        public string PaymentMode { get; set; }
        public string Bank { get; set; }
        public string InstrumentNumber { get; set; }
        public string Pos { get; set; }
        public string Customer { get; set; }
        public string InsuranceCompany { get; set; }
        public string TeamMember { get; set; }
    }
}
