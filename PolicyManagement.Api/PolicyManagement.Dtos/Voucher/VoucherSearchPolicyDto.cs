using System;

namespace PolicyManagement.Dtos.Voucher
{
    public class VoucherSearchPolicyDto
    {
        public int PolicyId { get; set; }
        public string PolicyNumber { get; set; }
        public string ControlNumber { get; set; }
        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public int PosId { get; set; }
        public string Pos { get; set; }
        public short InsuranceCompanyId { get; set; }
        public string InsuranceCompany { get; set; }
        public DateTime? PolicyStartDate { get; set; }
        public string PolicyStartDateString { get => PolicyStartDate.HasValue ? PolicyStartDate.Value.ToString("MM-dd-yyyy").Replace("-", "/") : string.Empty; }
        public int GrossPremium { get; set; }
        public string Telecaller { get; set; }
        public int VerticalId { get; set; }
        public string Vertical { get; set; }
    }
}