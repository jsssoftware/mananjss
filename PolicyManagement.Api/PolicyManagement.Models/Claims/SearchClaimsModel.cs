namespace PolicyManagement.Models.Claims
{
    public class SearchClaimsModel
    {
        public string ControlNumber { get; set; }
        public string CustomerName { get; set; }
        public string MobileNumber { get; set; }
        public int? PosId { get; set; }
        public int? InsuranceCompanyId { get; set; }
        public string PolicyNumber { get; set; }
        public string ClaimsNumber { get; set; }
        public string RegistrationNumber { get; set; }
        public string ClaimsEntryFromDate { get; set; }
        public string ClaimsEntryToDate { get; set; }
        public int Mode { get; set; }
        public bool IsShowAll { get; set; }
    }
}