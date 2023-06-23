
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
    
public partial class tblUser
{

    public int UserId { get; set; }

    public string UserName { get; set; }

    public string UserPassword { get; set; }

    public string UserFullName { get; set; }

    public short BranchId { get; set; }

    public Nullable<int> UserRoleId { get; set; }

    public Nullable<short> TeamMemberId { get; set; }

    public Nullable<bool> IsLocked { get; set; }

    public bool IsActive { get; set; }

    public Nullable<int> CreatedBy { get; set; }

    public Nullable<System.DateTime> CreatedTime { get; set; }

    public Nullable<int> ModifiedBy { get; set; }

    public Nullable<System.DateTime> ModifiedTime { get; set; }

    public Nullable<int> CurrentSessionId { get; set; }

    public short ReportedTo { get; set; }



    public virtual tblBranch tblBranch { get; set; }

    public virtual tblTeamMember tblTeamMember { get; set; }

    public virtual tblUserRole tblUserRole { get; set; }

}

}
