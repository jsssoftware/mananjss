using PolicyManagement.Dtos.Common;
using System;

namespace PolicyManagement.Dtos.Claims
{
    public class FollowUpDto
    {
        public string FollowUpReason { get; set; }
        public DateTime FollowUpDate { get; set; }
        public string FollowUpDateString { get => FollowUpDate.ToString("MM-dd-yyyy").Replace("-", "/"); }
    }
}
