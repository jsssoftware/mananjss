using System;

namespace PolicyManagement.Dtos.Common
{
    public class SearchPolicyDto
    {
        public int PolicyId { get; set; }
        public string ControlNo { get; set; }
        public int ControlNumberDigit { get; set; }
        public int CustomerId { get; set; }
        public short PolicyPackageTypeId { get; set; }
        public short VerticalId { get; set; }
        public short ProductId { get; set; }
        public short ManufacturerId { get; set; }
        public short ModelId { get; set; }
        public int POSId { get; set; }
        public string NameInPolicy { get; set; }
        public string RegistrationNo { get; set; }
        public int? GrossPremium { get; set; }
        public bool IsActive { get; set; }
        public bool Flag1 { get; set; }
        public bool Flag2 { get; set; }
        public bool IsVerified { get; set; }
        public short BranchId { get; set; }
        public string PolicyType { get; set; }
        public string VerticalName { get; set; }
        public string ProductName { get; set; }
        public string ManufacturerName { get; set; }
        public string ModelName { get; set; }
        public string POSName { get; set; }
        public string PolicyStatus { get; set; }
        public short PolicyStatusId { get; set; }
        public DateTime ExpiryDate { get; set; }
        public DateTime StartDate { get; set; }
        public string ExpiryDateInString { get; set; }
        public string StartDateInString { get; set; }
        public string PolicyNumber { get; set; }
        public short InsuranceCompanyIdNumber { get; set; }
        public string InsuranceCompany { get; set; }
        public string PolicyRemarks { get; set; }
        public int CreatedBy { get; set; }
        public bool RenewalDone { get; set; }
        public short VerticalSegmentId { get; set; }
    }

    public class SearchPolicyDownloadDto
    { 
        public string ControlNo { get; set; } 
        public string NameInPolicy { get; set; }
        public string RegistrationNo { get; set; }
        public int? GrossPremium { get; set; } 
        public string PolicyType { get; set; }
        public string VerticalName { get; set; }
        public string ProductName { get; set; }
        public string ManufacturerName { get; set; }
        public string ModelName { get; set; }
        public string POSName { get; set; }
        public string PolicyStatus { get; set; }
        public DateTime StartDate { get; set; } 
        public DateTime ExpiryDate { get; set; } 
        public string StartDateInString { get; set; }
        public string ExpiryDateInString { get; set; } 
        public string PolicyNumber { get; set; }
        public short InsuranceCompanyIdNumber { get; set; }
        public string InsuranceCompany { get; set; }
        public string PolicyRemarks { get; set; }  
    }

    public class SearchPolicyFinalDownloadDto
    {
        public string ControlNo { get; set; }
        public string NameInPolicy { get; set; }
        public string RegistrationNo { get; set; }
        public int? GrossPremium { get; set; }
        public string PolicyType { get; set; }
        public string VerticalName { get; set; }
        public string ProductName { get; set; }
        public string ManufacturerName { get; set; }
        public string ModelName { get; set; }
        public string POSName { get; set; }
        public string PolicyStatus { get; set; } 
        public string StartDate { get; set; }
        public string ExpiryDate { get; set; }
        public string PolicyNumber { get; set; }
        public short InsuranceCompanyIdNumber { get; set; }
        public string InsuranceCompany { get; set; }
        public string PolicyRemarks { get; set; }
    }
}