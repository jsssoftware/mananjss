using PolicyManagement.Dtos.Common;
using System;

namespace PolicyManagement.Dtos.Claims
{
    public class ClaimsDto
    {
        public int ClaimsId { get; set; }
        public int PolicyId { get; set; }
        public string PatientName { get; set; }
        public string ContactPerson { get; set; }
        public string ContactNumber { get; set; }
        public string ClaimsNumber { get; set; }
        public DateTime? ClaimsRegistrationDate { get; set; }
        public DateDto ClaimsRegistrationDateDto
        {
            get => new DateDto
            {
                Day = ClaimsRegistrationDate.HasValue ? ClaimsRegistrationDate.Value.Day : 0,
                Month = ClaimsRegistrationDate.HasValue ? ClaimsRegistrationDate.Value.Month : 0,
                Year = ClaimsRegistrationDate.HasValue ? ClaimsRegistrationDate.Value.Year : 0
            };
        }
        public int ClaimsTypeId { get; set; }
        public string ClaimsSubmittedBy { get; set; }
        public DateTime? AdmissionDate { get; set; }
        public DateDto AdmissionDateDto
        {
            get => new DateDto
            {
                Day = AdmissionDate.HasValue ? AdmissionDate.Value.Day : 0,
                Month = AdmissionDate.HasValue ? AdmissionDate.Value.Month : 0,
                Year = AdmissionDate.HasValue ? AdmissionDate.Value.Year : 0
            };
        }
        public DateTime? DischargeDate { get; set; }
        public DateDto DischargeDateDto
        {
            get => new DateDto
            {
                Day = DischargeDate.HasValue ? DischargeDate.Value.Day : 0,
                Month = DischargeDate.HasValue ? DischargeDate.Value.Month : 0,
                Year = DischargeDate.HasValue ? DischargeDate.Value.Year : 0
            };
        }
        public string ClaimsReason { get; set; }
        public string HospitalName { get; set; }
        public DateTime? DocumentSubmissionDate { get; set; }
        public DateDto DocumentSubmissionDateDto
        {
            get => new DateDto
            {
                Day = DocumentSubmissionDate.HasValue ? DocumentSubmissionDate.Value.Day : 0,
                Month = DocumentSubmissionDate.HasValue ? DocumentSubmissionDate.Value.Month : 0,
                Year = DocumentSubmissionDate.HasValue ? DocumentSubmissionDate.Value.Year : 0
            };
        }
        public int AmountClaimed { get; set; }
        public int AmountApproved { get; set; }
        public string InsuranceComapnyRemarks { get; set; }
        public int ClaimsStatusId { get; set; }
        public int ClaimsSubStatusId { get; set; }
        public string ClaimsStatus { get; set; }
        public string ClaimsSubStatus { get; set; }
        public DateTime? FollowUpDate { get; set; }
        public DateDto FollowUpDateDto
        {
            get => new DateDto
            {
                Day = FollowUpDate.HasValue ? FollowUpDate.Value.Day : 0,
                Month = FollowUpDate.HasValue ? FollowUpDate.Value.Month : 0,
                Year = FollowUpDate.HasValue ? FollowUpDate.Value.Year : 0
            };
        }
        public string FollowUpReason { get; set; }
        public string Remarks { get; set; }
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
        public string RegistrationNumber { get; set; }
        public string ClaimNature { get; set; }
        public DateTime? DateOfIncident { get; set; }
        public DateDto DateOfIncidentDateDto
        {
            get => new DateDto
            {
                Day = DateOfIncident.HasValue ? DateOfIncident.Value.Day : 0,
                Month = DateOfIncident.HasValue ? DateOfIncident.Value.Month : 0,
                Year = DateOfIncident.HasValue ? DateOfIncident.Value.Year : 0
            };
        }
        public string PersonLocation { get; set; }
    }
}
