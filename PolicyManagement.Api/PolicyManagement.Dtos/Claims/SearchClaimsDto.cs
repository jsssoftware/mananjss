using System;

namespace PolicyManagement.Dtos.Claims
{
    public class SearchClaimsDto
    {
        public int PolicyId { get; set; }
        public int ClaimsId { get; set; }
        public string ControlNumber { get; set; }
        public string CustomerName { get; set; }
        public string Vertical { get; set; }
        public int VerticalId { get; set; }
        public string Product { get; set; }
        public string RegistrationNumber { get; set; }
        public string Model { get; set; }
        public string InsuranceCompany { get; set; }
        public string ClaimsNumber { get; set; }
        public DateTime? ClaimsEntryDate { get; set; }
        public string ClaimsEntryDateString { get => ClaimsEntryDate.HasValue ? ClaimsEntryDate.Value.ToString("MM-dd-yyyy").Replace("-", "/") : string.Empty; }
        public string ClaimsStatus { get; set; }
    }
}