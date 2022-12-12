using PolicyManagement.Dtos.Common;
using System;

namespace PolicyManagement.Dtos.Inspection
{
    public class InspectionDto
    {
        public string ControlNumber { get; set; }
        public string CustomerName { get; set; }
        public string ContactPerson { get; set; }
        public string MobileNumber { get; set; }
        public string Email { get; set; }
        public string LocationAddress { get; set; }
        public string RegistrationNumber { get; set; }
        public int MakeYearId { get; set; }
        public int ManufactureId { get; set; }
        public int ModelId { get; set; }
        public int InsuranceCompanyId { get; set; }
        public string EngineNumber { get; set; }
        public string ChassisNumber { get; set; }
        public DateTime? InspectionDate { get; set; }
        public DateDto InspectionDateDto
        {
            get => new DateDto
            {
                Day = InspectionDate.HasValue ? InspectionDate.Value.Day : 0,
                Month = InspectionDate.HasValue ? InspectionDate.Value.Month : 0,
                Year = InspectionDate.HasValue ? InspectionDate.Value.Year : 0
            };
        }
        public int InspectionReasonId { get; set; }
        public int ReferTypeId { get; set; }
        public int? PosId { get; set; }
        public int? TeamMemberId { get; set; }
        public string InspectionLeadNumber { get; set; }
        public int InspectionCompanyId { get; set; }
        public string SurveyorName { get; set; }
        public string SurveyorMobile { get; set; }
        public string SurveyorEmail { get; set; }
        public int InspectionStatusId { get; set; }
        public string InspectionStatus { get; set; }
        public int InspectionSubStatusId { get; set; }
        public string InspectionSubStatus { get; set; }
        public string Remarks { get; set; }
    }
}
