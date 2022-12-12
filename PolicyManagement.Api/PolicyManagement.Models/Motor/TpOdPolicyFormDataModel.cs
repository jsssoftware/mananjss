using PolicyManagement.Dtos.Common;
using System;

namespace PolicyManagement.Models.Motor
{
    public class TpOdPolicyFormDataModel
    {
        public short InsuranceCompany { get; set; }
        public string PolicyNumber { get; set; }
        public string StartDateString { get; set; }
        public DateTime? StartDate { get; set; }
        public DateDto StartDateDto { get; set; }
        public short NumberOfYear { get; set; }
        public string ExpiryDateString { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public DateDto ExpiryDateDto { get; set; }
    }
}