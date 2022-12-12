using PolicyManagement.Dtos.Common;
using System;

namespace PolicyManagement.Models.Motor
{
    public class InspectionFormDataModel
    {
        public byte InspectionCompany { get; set; }
        public string InspectionNumber { get; set; }
        public string InspectionDateString { get; set; }
        public DateTime? InspectionDate { get; set; }
        public DateDto InspectionDateDto { get; set; }
        public string InspectionTime { get; set; }
        public string InspectionRemarks { get; set; }
    }
}
