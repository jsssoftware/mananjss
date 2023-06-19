﻿using System;

namespace PolicyManagement.Dtos.Common
{
  
   public class UserDetailDto
    {
        public string BranchName { get; set; }
        public string Username { get; set; }
        public string TeamMember { get; set; }
        public string UserRole { get; set; }
        public string ReportedTo { get; set; }
        public int? Seniority { get; set; }
        public string MobileNumber { get; set; }
        public string EmailId { get; set; }
        public bool IsActive { get; set; }
        public bool? IsLocked { get; set; }

    }
}