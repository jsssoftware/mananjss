using PolicyManagement.Models.Common;
using System.Collections.Generic;

namespace PolicyManagement.Models.Claims
{
    public class AddUpdateClaimsModel : BaseModel
    {
        public AddUpdateClaimsModel()
        {
            ClaimsDocuments = new List<ClaimsDocumentModel>();
        }
        public int PolicyId { get; set; }
        public short VerticalId { get; set; }
        public int CustomerId { get; set; }
        public short BranchId { get; set; }
        public string PatientName { get; set; }
        public string ContactPerson { get; set; }
        public string ContactNumber { get; set; }
        public string ClaimNumber { get; set; }
        public string ClaimRegistrationDate { get; set; }
        public int ClaimTypeId { get; set; }
        public string ClaimSubmittedBy { get; set; }
        public string AdmissionDate { get; set; }
        public string DischargeDate { get; set; }
        public string ClaimReason { get; set; }
        public string HospitalName { get; set; }
        public string DocumentSubmissionDate { get; set; }
        public int AmountClaimed { get; set; }
        public int AmountApproved { get; set; }
        public string InsuranceCompanyRemark { get; set; }
        public short ClaimStatusId { get; set; }
        public int ClaimSubStatusId { get; set; }
        public string FollowUpDate { get; set; }
        public string FollowingReason { get; set; }
        public string Remark { get; set; }
        public List<ClaimsDocumentModel> ClaimsDocuments { get; set; }
        public string AccidentDateTimePlace { get; set; }
        public string WorkshopName { get; set; }
        public string WorkshopNumber { get; set; }
        public string ServiceAdvisorName { get; set; }
        public string ServiceAdvisorNumber { get; set; }
        public string SurveyorName { get; set; }
        public string SurveyorNumber { get; set; }
        public string SurveyorEmail { get; set; }
        public string VisibleDamages { get; set; }
        public string PendingConcerns { get; set; }
        public string ClaimNature { get; set; }
        public string DateOfIncident { get; set; }
        public string PersonLocation { get; set; }
    }
}