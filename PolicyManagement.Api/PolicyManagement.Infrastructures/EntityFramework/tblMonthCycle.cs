
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
    
public partial class tblMonthCycle
{

    public int MonthCycleId { get; set; }

    public string MonthCycle { get; set; }

    public System.DateTime CycleStartDate { get; set; }

    public System.DateTime CycleEndDate { get; set; }

    public Nullable<int> CommissionFreeze { get; set; }

    public Nullable<int> CommissionFreezeNonMotor { get; set; }

    public Nullable<bool> IsActive { get; set; }

    public Nullable<int> CreatedBy { get; set; }

    public Nullable<System.DateTime> CreatedTime { get; set; }

    public Nullable<int> ModifiedBy { get; set; }

    public Nullable<System.DateTime> ModifiedTime { get; set; }

}

}
