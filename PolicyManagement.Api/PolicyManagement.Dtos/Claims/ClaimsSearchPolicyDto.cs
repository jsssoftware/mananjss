using System;

namespace PolicyManagement.Dtos.Claims
{
    public class ClaimsSearchPolicyDto
    {
        public int PolicyId { get; set; }
        public string ControlNumber { get; set; }
        public string Customer { get; set; }
        public DateTime? PolicyExpiry { get; set; }
        public string PolicyExpiryString { get => PolicyExpiry.HasValue ? PolicyExpiry.Value.ToString("MM-dd-yyyy").Replace("-", "/") : string.Empty; }
        public string InsuranceCompany { get; set; }
        public string RegistrationNumber { get; set; }
        public string Model { get; set; }
        public string Vertical { get; set; }
        public int VerticalId { get; set; }
        public string Product { get; set; }
        public string Pos { get; set; }
    }
}
