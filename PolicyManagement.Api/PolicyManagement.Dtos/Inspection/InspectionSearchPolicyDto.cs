using System;

namespace PolicyManagement.Dtos.Inspection
{
    public class InspectionSearchPolicyDto
    {
        public string ControlNumber { get; set; }
        public string Customer { get; set; }
        public string RegistrationNumber { get; set; }
        public string Manufacturer { get; set; }
        public int ManufacturerId { get; set; }
        public string Model { get; set; }
        public int ModelId { get; set; }
        public string MakeYear { get; set; }
        public int MakeYearId { get; set; }
        public string InsuranceCompany { get; set; }
        public string EngineNumber { get; set; }
        public string ChassisNumber { get; set; }
        public int InsuranceCompanyId { get; set; }
        public string Pos { get; set; }
        public int? PosId { get; set; }
        public DateTime? PolicyExpiry { get; set; }
        public string PolicyExpiryString { get => PolicyExpiry.HasValue ? PolicyExpiry.Value.ToString("MM-dd-yyyy").Replace("-", "/") : string.Empty; }
    }
}
