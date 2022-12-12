using PolicyManagement.Models.Common;
using System.Collections.Generic;

namespace PolicyManagement.Models.Inspection
{
    public class AddUpdateInspectionModel : BaseModel
    {
        public AddUpdateInspectionModel()
        {
            InspectionDocuments = new List<InspectionDocumentModel>();
        }
        public int PolicyId { get; set; }
        public string ControlNumber { get; set; }
        public string CustomerName { get; set; }
        public int CustomerId { get; set; }
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
        public string InspectionDate { get; set; }
        public int InspectionReasonId { get; set; }
        public int ReferTypeId { get; set; }
        public int PosId { get; set; }
        public int TeamMemberId { get; set; }
        public string InspectionLeadNumber { get; set; }
        public int InspectionCompanyId { get; set; }
        public string SurveyorName { get; set; }
        public string SurveyorMobile { get; set; }
        public string SurveyorEmail { get; set; }
        public short InspectionStatusId { get; set; }
        public int InspectionSubStatusId { get; set; }
        public string Remarks { get; set; }
        public List<InspectionDocumentModel> InspectionDocuments { get; set; }
    }
}
