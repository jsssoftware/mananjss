//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PolicyManagement.Infrastructures.EntityFramework
{
    using System;
    using System.Collections.Generic;
    
    public partial class tblInsuranceCompanyBranch
    {
        public int InsuranceCompanyBranchId { get; set; }
        public Nullable<int> InsuranceCompanyId { get; set; }
        public string InsuranceCompanyBranchName { get; set; }
        public string InsuranceCompanyBranchCode { get; set; }
        public Nullable<bool> IsMotor { get; set; }
        public Nullable<bool> IsHealth { get; set; }
        public Nullable<bool> IsCommercial { get; set; }
        public Nullable<bool> IsLife { get; set; }
        public string AgencyName { get; set; }
        public string AgencyCode { get; set; }
        public Nullable<int> BranchId { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> DefaultCode { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDateTime { get; set; }
        public Nullable<int> ModifiedBy { get; set; }
        public Nullable<System.DateTime> ModifiedDateTime { get; set; }
    }
}
