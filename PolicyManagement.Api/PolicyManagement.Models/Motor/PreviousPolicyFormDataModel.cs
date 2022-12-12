using PolicyManagement.Dtos.Common;
using System;

namespace PolicyManagement.Models.Motor
{
    public class PreviousPolicyFormDataModel
    {
        public short LastYearInsuranceCompany { get; set; }
        public string PreviousPolicyNumber { get; set; }
        public string LastPolicyExpiryDateString { get; set; }
        public DateTime? LastPolicyExpiryDate { get; set; }
        public DateDto LastPolicyExpiryDateDto { get; set; }
    }
}
