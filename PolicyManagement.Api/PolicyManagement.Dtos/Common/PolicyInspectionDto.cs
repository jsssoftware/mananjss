using System;

namespace PolicyManagement.Dtos.Common
{
    public class PolicyInspectionDto
    {
        public int Id { get; set; }
        public DateTime? Date { get; set; }
        public string DateString { get => Date.HasValue ? Date.Value.ToString("dd-MM-yyyy").Replace("-", "/") : "N/A"; }
        public string Reason { get; set; }
        public string Status { get; set; }
        public string SubStatus { get; set; }
        public string LeadNumber { get; set; }
        public string InspectionCompany { get; set; }
        public string SurveyorName { get; set; }
        public string ContactPerson { get; set; }
        public string Remarks { get; set; }
        public string CreatedBy { get; set; }
    }
}