using System;

namespace PolicyManagement.Dtos.Common
{
  
   public class UserDetailDto
    {
        public string BranchName { get; set; }
        public string UserName { get; set; }
        public string TeamMember { get; set; }
        public string UserRole { get; set; }
        public int ReportedTo { get; set; }
        public int? Seniority { get; set; }
        public string MobileNumber { get; set; }
        public string EmailId { get; set; }
        public bool IsActive { get; set; }
        public bool? IsLocked { get; set; }

        public int? TeamMemberId { get; set; }
        public int? UserRoleId { get; set; }
        public int UserId { get; set; }
        public string UserPassword { get; set; }
        public int BranchId { get; set; }
        public string ReportedToName { get; set; }

    }

    public class RoleDetailDto
    {
        public string BranchName { get; set; }
        public string RoleName { get; set; }
        public string UserRoleDescription { get; set; }
        public bool IsActive { get; set; }
        public int RoleId { get; set; }
        public int BranchId { get; set; }
        public string VerticalData { get; set; }


    }
}