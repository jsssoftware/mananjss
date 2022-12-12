using System;

namespace PolicyManagement.Dtos.Inspection
{
    public class SearchInspectionDto
    {
        public int InspectionId { get; set; }
        public string CustomerName { get; set; }
        public DateTime? InspectionDate { get; set; }
        public string InspectionDateString { get => InspectionDate.HasValue ? InspectionDate.Value.ToString("MM-dd-yyyy").Replace("-", "/") : string.Empty; }
        public string InsuranceCompany { get; set; }
        public string RegistrationNumber { get; set; }
        public string Manufacturer { get; set; }
        public string Model { get; set; }
        public string InspectionReason { get; set; }
        public string Status { get; set; }
        public string SubStatus { get; set; }
    }
}
