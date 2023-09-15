using System;

namespace PolicyManagement.Models.Master
{
    public class TeamMemberUserModel
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

        public Nullable<bool> Isdefault { get; set; }

    }
}