
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
    
public partial class tblMenuItem
{

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
    public tblMenuItem()
    {

        this.tblMenuItem1 = new HashSet<tblMenuItem>();

    }


    public int Id { get; set; }

    public string Name { get; set; }

    public string DisplayName { get; set; }

    public string Icon { get; set; }

    public Nullable<int> ParentNode { get; set; }

    public string Link { get; set; }

    public bool IsActive { get; set; }

    public int OrderNo { get; set; }



    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]

    public virtual ICollection<tblMenuItem> tblMenuItem1 { get; set; }

    public virtual tblMenuItem tblMenuItem2 { get; set; }

}

}
