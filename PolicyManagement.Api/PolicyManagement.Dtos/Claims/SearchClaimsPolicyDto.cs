using PolicyManagement.Dtos.Common;
using System;

namespace PolicyManagement.Dtos.Claims
{
    public class SearchClaimsPolicyDto
    {
        public int PolicyId { get; set; }
        public int CustomerId { get; set; }
        public string ControlNumber { get; set; }
        public string PolicyNumber { get; set; }
        public DateTime? PolicyExpiryDate { get; set; }
        public DateDto PolicyExpiryDateDto
        {
            get => new DateDto
            {
                Day = PolicyExpiryDate.HasValue ? PolicyExpiryDate.Value.Day : 0,
                Month = PolicyExpiryDate.HasValue ? PolicyExpiryDate.Value.Month : 0,
                Year = PolicyExpiryDate.HasValue ? PolicyExpiryDate.Value.Year : 0
            };
        }
        public string InsuranceCompany { get; set; }
        public string Pos { get; set; }
        public string Branch { get; set; }
        public string Customer { get; set; }
        public string Product { get; set; }
        public string Plan { get; set; }
        public string PlanType { get; set; }

        public string Manufacture { get; set; }
        public string Model { get; set; }
        public string MakeYear { get; set; }
        public string RegistrationNumber { get; set; }
        public string VerticalName { get; set; }
    }
}
