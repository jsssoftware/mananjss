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
        public int? NumberOfDays { get; set; }
        public int? Coverage { get; set; }
        public string LineofBusiness { get; set; }
        public string RiskLocation { get; set; }
        public int? NumberofLocation { get; set; }
        public string Occupancy { get; set; }
        public byte? BasementExposure { get; set; }
        public int? LocationType { get; set; }

    }
}