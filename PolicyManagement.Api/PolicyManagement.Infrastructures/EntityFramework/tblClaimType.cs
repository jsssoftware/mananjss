
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
    
public partial class tblClaimType
{

    public int ClaimTypeId { get; set; }

    public string ClaimType { get; set; }

    public Nullable<int> VerticalId { get; set; }

    public bool IsActive { get; set; }

    public Nullable<int> CreatedBy { get; set; }

    public Nullable<System.DateTime> CreatedTime { get; set; }

    public Nullable<int> ModifiedBy { get; set; }

    public Nullable<System.DateTime> ModifiedTime { get; set; }

    public Nullable<byte> DisplayOrder { get; set; }

}

}
