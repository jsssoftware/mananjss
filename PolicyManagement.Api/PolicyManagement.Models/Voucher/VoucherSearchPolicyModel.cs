using System;

namespace PolicyManagement.Models.Voucher
{
    public class VoucherSearchPolicyModel
    {
        public string ControlNumber { get; set; }
        public int? CustomerId { get; set; }
        public string CustomerName { get; set; }
        public string PolicyNumber { get; set; }
        public short? PosId { get; set; }
        public short? InsuranceCompanyId { get; set; }
        public string PolicyStartFromDate { get; set; }
        public string PolicyStartToDate { get; set; }
    }

    public class PosCommisonMotorModel
    {
        public int BranchId { get; set; }
        public DateTime MonthCycle { get; set; }
        public int MonthCycleId { get; set; }
        public string PolicyStartToDate { get; set; }
        public int VerticalType { get; set; }
        public string MonthCycleStart { get; set; }

    }
}
