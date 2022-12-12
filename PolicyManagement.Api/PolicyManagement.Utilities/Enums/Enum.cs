namespace PolicyManagement.Utilities.Enums
{
    public enum Vertical
    {
        /// <summary>
        /// VerticalSegmentId = 1 VerticalSegment = Motor
        /// </summary>
        Motor = 1,
        /// <summary>
        /// VerticalSegmentId = 2 VerticalSegment = Health
        /// </summary>
        Health, //2
        /// <summary>
        /// VerticalSegmentId = 2 VerticalSegment = Health
        /// </summary>
        Travel,//2
        /// <summary>
        /// VerticalSegmentId = 2 VerticalSegment = Health
        /// </summary>
        PersonalAccident,//2
        /// <summary>
        /// VerticalSegmentId = 2 VerticalSegment = Health
        /// </summary>
        GroupHealth,//2
        /// <summary>
        /// VerticalSegmentId = 3 VerticalSegment = Commercial
        /// </summary>
        Fire, //3
        /// <summary>
        /// VerticalSegmentId = 3 VerticalSegment = Commercial
        /// </summary>
        Marine,//3
        /// <summary>
        /// VerticalSegmentId = 3 VerticalSegment = Commercial
        /// </summary>
        Miscellaneous,//3
        /// <summary>
        /// VerticalSegmentId = 3 VerticalSegment = Commercial
        /// </summary>
        Liablity, //3
        /// <summary>
        /// VerticalSegmentId = 3 VerticalSegment = Commercial
        /// </summary>
        Engineering, //3
        /// <summary>
        /// VerticalSegmentId = 4 VerticalSegment = Life
        /// </summary>
        Life
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
}
