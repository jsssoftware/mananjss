namespace PolicyManagement.Utilities.Enums
{
    public enum Vertical
    {
        
        Motor = 1,
     
        Health, //2
     
        Travel,//2
        
        Fire, //3
        Marine,//3
        PersonalAccident,//2
        Miscellaneous,
        Liablity =12,
        Engineering=13,
        Life=14,
        GroupHealth=15,
        
    }

    public enum PolicyManagementType
    {
        New = 1,
        Renew,
        InComplete,
        Correction,
        Verify,
        Modify,
        View
    }

    public enum VoucherStatus
    {
        Active = 1,
        Cancel = 2,
        Bounced = 3,
        Reject = 5,
    }

    public enum VoucherUpdateMode
    {
        Modification = 1,
        Cancel,
        Bounced
    }

    public enum VoucherFormMode
    {
        Add,
        View,
        Verification,
        Update,
        UpdateControlNumber
    }

    public enum ClaimsStatus
    {
        FollowUp = 1,
        Closed
    }

    public enum PolicyType
    {
        New = 1,
        Same_Company_Retention,
        Rollover,
        Other_Company_Retention
    }

    public enum PackageType
    {
        TP_ONLY = 1,
        OD_ONLY,
        COMPREHENSIVE,
        USAGE_BASE
    }
}
