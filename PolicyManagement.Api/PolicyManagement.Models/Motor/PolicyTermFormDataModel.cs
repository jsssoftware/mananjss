using PolicyManagement.Dtos.Common;
using System;

namespace PolicyManagement.Models.Motor
{
    public class PolicyTermFormDataModel
    {
        public short PolicyType { get; set; }
        public short VehicleClass { get; set; }
        public string PackageType { get; set; }
        public short PackageTypeId { get; set; }
        public short PolicyTerm { get; set; }
        public string AcknowledgementSlipNumber { get; set; }
        public string AcknowledgementSlipIssueDateString { get; set; }
        public DateTime? AcknowledgementSlipIssueDate { get; set; }
        public DateDto AcknowledgementSlipIssueDateDto { get; set; }
    }
}