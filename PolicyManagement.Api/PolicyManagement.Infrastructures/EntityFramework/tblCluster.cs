
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
    
public partial class tblCluster
{

    public int ClusterId { get; set; }

    public string ClusterCode { get; set; }

    public string ClusterName { get; set; }

    public Nullable<byte> ClusterContactTitleId { get; set; }

    public string ClusterContact { get; set; }

    public string ClusterAddress1 { get; set; }

    public Nullable<short> ClusterCityId1 { get; set; }

    public string ClusterPinCode1 { get; set; }

    public string ClusterAddress2 { get; set; }

    public Nullable<short> ClusterCityId2 { get; set; }

    public string ClusterPinCode2 { get; set; }

    public string ClusterPhone1 { get; set; }

    public string ClusterPhone2 { get; set; }

    public string ClusterMobile1 { get; set; }

    public string ClusterMobile2 { get; set; }

    public string ClusterEmail1 { get; set; }

    public string ClusterEmail2 { get; set; }

    public string ClusterProfile { get; set; }

    public bool IsActive { get; set; }

    public Nullable<short> BranchId { get; set; }

    public Nullable<int> CreatedBy { get; set; }

    public Nullable<System.DateTime> CreatedTime { get; set; }

    public Nullable<int> ModifiedBy { get; set; }

    public Nullable<System.DateTime> ModifiedTime { get; set; }



    public virtual tblBranch tblBranch { get; set; }

}

}
