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
    
    public partial class SearchClaims
    {
        public int ClaimsId { get; set; }
        public string ClaimsNumber { get; set; }
        public System.DateTime ClaimsEntryDate { get; set; }
        public string ClaimsStatus { get; set; }
        public int PolicyId { get; set; }
        public string PolicyNumber { get; set; }
        public string ControlNumber { get; set; }
        public Nullable<int> ControlNumberDigit { get; set; }
        public string CustomerName { get; set; }
        public string RegistrationNumber { get; set; }
        public string Mobile1 { get; set; }
        public string Mobile2 { get; set; }
        public string Phone1 { get; set; }
        public string Phone2 { get; set; }
        public string Model { get; set; }
        public string InsuranceCompany { get; set; }
        public short InsuranceCompanyId { get; set; }
        public string Vertical { get; set; }
        public short VerticalId { get; set; }
        public string Product { get; set; }
        public Nullable<int> PosId { get; set; }
    }
}
