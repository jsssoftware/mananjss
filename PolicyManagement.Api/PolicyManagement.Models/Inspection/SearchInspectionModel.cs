namespace PolicyManagement.Models.Inspection
{
    public class SearchInspectionModel
    {
        public int BranchId { get; set; }
        public string CustomerName { get; set; }
        public string ContactNumber { get; set; }
        public string InspectionReferenceNumber { get; set; }
        public string InspectionDate { get; set; }
        public int? InsuranceCompanyId { get; set; }
        public int? PosId { get; set; }
        public string RegistrationNumber { get; set; }
        public int? InspectionReasonId { get; set; }
        public int? ManufacturerId { get; set; }
        public int? ModelId { get; set; }
        public string InspectionEntryFromDate { get; set; }
        public string InspectionEntryToDate { get; set; }
    }
}
