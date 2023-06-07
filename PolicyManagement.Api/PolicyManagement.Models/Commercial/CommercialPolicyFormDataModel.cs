using PolicyManagement.Dtos.Common;
using PolicyManagement.Models.Common;
using PolicyManagement.Models.Customer;
using PolicyManagement.Models.Health;
using PolicyManagement.Models.Motor;
using System;
using System.Collections.Generic;
using PolicyManagement.Infrastructures.EntityFramework;

namespace PolicyManagement.Models.Commercial
{
    public class CommercialPolicyFormDataModel
    {
        public CommercialPolicyFormDataModel()
        {
            PaymentData = new List<PaymentFormDataModel>();
            Document = new List<DocumentModel>();
        }
        public int PolicyId { get; set; }
        public int? PreviousPolicyId { get; set; }
        public CustomerFormDataModel Customer { get; set; }
        public PolicyTermFormDataModel PolicyTerm { get; set; }
        public string CoverNoteNumber { get; set; }
        public string CoverNoteIssueDateString { get; set; }
        public DateTime? CoverNoteIssueDate { get; set; }
        public DateDto CoverNoteIssueDateDto { get; set; }
        public TpOdPolicyFormDataModel TpPolicy { get; set; }
        public TpOdPolicyFormDataModel OdPolicy { get; set; }
        public NominationFormDataModel Nomination { get; set; }
        public int InsuranceBranch { get; set; }
        public int NumberOfKiloMeterCovered { get; set; }
        public int ExtendedKiloMeterCovered { get; set; }
        public short FinanceBy { get; set; }
        public PreviousPolicyFormDataModel PreviousPolicy { get; set; }
        public InspectionFormDataModel InspectionData { get; set; }
        public List<PaymentFormDataModel> PaymentData { get; set; }
        public VehicleFormDataModel Vehicle { get; set; }
        public PolicySourceFormDataModel PolicySource { get; set; }
        public PremiumFormDataModel Premium { get; set; }
        public string BranchId { get; set; }
        public string VerticalCode { get; set; }
        public List<DocumentModel> Document { get; set; }
        public AddOnRiderModel AddOnRider { get; set; }
        public string ControlNumber { get; set; }
        public short RenewalCounter { get; set; }
        public short VerticalSegmentId { get; set; }
        public short VerticalId { get; set; }
        public string Vertical { get; set; }
        public string PreviousControlNumber { get; set; }
        public short PolicyStatusId { get; set; }
        public string PolicyStatus { get; set; }
        public int PolicyCancelReasonId { get; set; }
        public string PolicyCancelReason { get; set; }
        public string DataEntryStatus { get; set; }
        public string ReconStatus { get; set; }
        public short? IsReconDone { get; set; }
        public string CommissionStatus { get; set; }
        public short? IsCommissionReceived { get; set; }
        public short? POSCommMonthCycleId { get; set; }
        public short? IRDACommMonthCycleId { get; set; }
        public string PolicyStatusColor { get; set; }
        public string DataEntryStatusColor { get; set; }
        public string CommissionStatusColor { get; set; }
        public string ReconStatusColor { get; set; }
        public string PolicyCancelReasonColor { get; set; }
        public bool Condition1 { get; set; }
        public bool Condition2 { get; set; }
        public bool IsBlockAgent { get; set; }
        public bool IsChangeAgent { get; set; }
        public string AddOnSelected { get; set; }
        public bool IsVerified { get; set; }
        public string CreatedBy { get; set; }
        public string VerifiedBy { get; set; }
        public DateTime? CreatedTime { get; set; }
        public DateTime? VerifiedTime { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedTime { get; set; }
        public bool? IsPreviousPolicyApplicable { get; set; }
        public bool? Flag2 { get; set; }
        public bool? Flag1 { get; set; }
        public string QcCreatedBy { get; set; }
        public DateTime? QcCreatedTime { get; set; }
        public List<InsuredPersonModel> InsuredPersonData { get; set; }
        public short GenderId { get; set; }
        public ProductPlanModel ProductPlan { get; set; }
        public short? Portabality { get; set; }
        public DateTime? ContinueStartDate { get; set; }
        public DateDto ContinueStartDateDTO { get; set; }
        public int? NumberOfChild { get; set; }
        public int? NumberOfAdult { get; set; }
        public int? TotalSumInsured { get; set; }
        public tblFireCoverage FireCoverage { get; set; }


    }
}