
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
    
public partial class View_SearchForm_Policies
{

    public int PolicyId { get; set; }

    public string ControlNo { get; set; }

    public short VerticalId { get; set; }

    public Nullable<int> ControlNumberDigit { get; set; }

    public string NameInPolicy { get; set; }

    public string RegistrationNo { get; set; }

    public Nullable<int> GrossPremium { get; set; }

    public Nullable<bool> IsActive { get; set; }

    public Nullable<bool> Flag1 { get; set; }

    public Nullable<bool> Flag2 { get; set; }

    public Nullable<bool> IsVerified { get; set; }

    public short BranchId { get; set; }

    public string BranchCode { get; set; }

    public string PolicyType { get; set; }

    public string VerticalName { get; set; }

    public string ProductName { get; set; }

    public string ManufacturerName { get; set; }

    public string ModelName { get; set; }

    public string POSName { get; set; }

    public string PolicyStatus { get; set; }

    public short PolicyStatusId { get; set; }

    public Nullable<System.DateTime> ExpiryDate { get; set; }

    public Nullable<System.DateTime> StartDate { get; set; }

    public string PolicyNumber { get; set; }

    public Nullable<short> InsuranceCompanyIdNumber { get; set; }

    public string InsuranceCompany { get; set; }

    public string PolicyRemarks { get; set; }

    public Nullable<int> CreatedBy { get; set; }

    public Nullable<bool> RenewalDone { get; set; }

    public Nullable<short> VerticalSegmentId { get; set; }

    public string MakeYear { get; set; }

    public Nullable<short> MakeYearId { get; set; }

}

}
