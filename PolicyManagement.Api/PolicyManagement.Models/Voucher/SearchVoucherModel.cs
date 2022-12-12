using PolicyManagement.Models.Common;

namespace PolicyManagement.Models.Voucher
{
    public class SearchVoucherModel : BaseModel
    {
        public int? CustomerId { get; set; }
        public string CustomerName { get; set; }
        public short? PosId { get; set; }
        public short? InsuranceCompanyId { get; set; }
        public string PolicyNumber { get; set; }
        public string VoucherNumber { get; set; }
        public string VoucherStartFromDate { get; set; }
        public string VoucherStartToDate { get; set; }
        public int Mode { get; set; }
        public bool IsShowAll { get; set; }
    }
}
