using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PolicyManagement.Models.UserManagement
{
    public class UserPermission
    {
        public int UserRightId { get; set; }

        public int UserRoleId { get; set; }

        public int FormId { get; set; }
        public string DisplayName { get; set; }


    }

}
