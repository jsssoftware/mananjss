
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
    
public partial class tblEnginneringTerm
{

    public int EnginneringId { get; set; }

    public Nullable<int> Rate { get; set; }

    public string NatureofCoverage { get; set; }

    public Nullable<System.DateTime> PeriodDate { get; set; }

    public string OtherInfo { get; set; }

    public Nullable<short> RiskLocatiion { get; set; }

    public Nullable<int> PolicyId { get; set; }

    public Nullable<int> TotalSumInsured { get; set; }

}

}
