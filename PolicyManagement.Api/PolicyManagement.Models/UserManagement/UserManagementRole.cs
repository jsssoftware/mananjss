using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PolicyManagement.Models.UserManagement
{
    public class UserRole
    {


        public int UserRoleId { get; set; }

        public string UserRoleName { get; set; }

        public string UserRoleDescription { get; set; }

        public bool IsActive { get; set; }
        public Nullable<int> BranchId { get; set; }

        public string[] VerticalId { get; set; }

        public Nullable<int> Level { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedTime { get; set; }

    }
}
