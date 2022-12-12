namespace PolicyManagement.Models.Inspection
{
    public class InspectionSearchPolicyModel
    {
        public int BranchId { get; set; }
        public string ControlNumber { get; set; }
        public string CustomerName { get; set; }
        public int? CustomerId { get; set; }
        public int? InsuranceCompanyId { get; set; }
        public int? PosId { get; set; }
        public string PolicyNumber { get; set; }
        public string PolicyStartFromDate { get; set; }
        public string PolicyStartToDate { get; set; }
        public string RegistrationNumber { get; set; }
        public int? ManufacturerId { get; set; }
        public int? ModelId { get; set; }
        public string CustomerPhone { get; set; }
    }
}
