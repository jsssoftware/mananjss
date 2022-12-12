using System;

namespace PolicyManagement.Dtos.Common
{
    public class PreviousClaimDto
    {
        public int ClaimId { get; set; }
        public string ClaimNumber { get; set; }
        public int? AmountApproved { get; set; }
        public string Remark { get; set; }
        public string ClaimStatus { get; set; }
        public string ClaimReason { get; set; }
        public DateTime? ClaimSubmissionDate { get; set; }
        public string ClaimSubmissionDateString { get => ClaimSubmissionDate.HasValue ? ClaimSubmissionDate.Value.ToString("MM-dd-yyyy").Replace("-", "/") : string.Empty; }
    }
}
