using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PolicyManagement.Models.UserManagement
{
    public class CreateUser
    {

        public string ConfirmPassword { get; set; }
        public bool IsActive { get; set; }
        public bool IsLocked { get; set; }
        public string ReportedTo { get; set; }
        public string TeamMemberId { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string UserPassword { get; set; }
        public int UserRoleId { get; set; }


    }
}
