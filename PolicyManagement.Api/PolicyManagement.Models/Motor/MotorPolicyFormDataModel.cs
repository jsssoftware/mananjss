using PolicyManagement.Dtos.Common;
using PolicyManagement.Models.Common;
using PolicyManagement.Models.Customer;
using System;
using System.Collections.Generic;

namespace PolicyManagement.Models.Motor
{
    public class MotorPolicyFormDataModel
    {
        public MotorPolicyFormDataModel()
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
    }
}