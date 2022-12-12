using PolicyManagement.Utilities.Constants;
using System.Linq;
using System.Security.Claims;
using System.Web;

namespace PolicyManagement.Models.Common
{
    public class BaseModel
    {
        private readonly ClaimsIdentity _identity;
        public BaseModel()
        {
            _identity = (ClaimsIdentity)HttpContext.Current.User.Identity;
        }
        public string LoginUsername
        {
            get => _identity.Claims.FirstOrDefault(f => f.Type == ClaimsConstant.Username).Value;
        }
        public string LoginUserFullName
        {
            get => _identity.Claims.FirstOrDefault(f => f.Type == ClaimsConstant.UserFullName).Value;
        }
        public string LoginUserRole
        {
            get => _identity.Claims.FirstOrDefault(f => f.Type == ClaimsConstant.Role).Value;
        }
        public string LoginUserBranchName
        {
            get => _identity.Claims.FirstOrDefault(f => f.Type == ClaimsConstant.BranchName).Value;
        }
        public int LoginUserId
        {
            get
            {
                int.TryParse(_identity.Claims.FirstOrDefault(f => f.Type == ClaimsConstant.UserId).Value, out int userId);
                return userId;
            }
        }
        public int LoginUserBranchId
        {
            get
            {
                int.TryParse(_identity.Claims.FirstOrDefault(f => f.Type == ClaimsConstant.BranchId).Value, out int branchId);
                return branchId;
            }
        }
        public int LoginUserRoleId
        {
            get
            {
                int.TryParse(_identity.Claims.FirstOrDefault(f => f.Type == ClaimsConstant.RoleId).Value, out int roleId);
                return roleId;
            }
        }
        public int LoginUserTypeId
        {
            get
            {
                int.TryParse(_identity.Claims.FirstOrDefault(f => f.Type == ClaimsConstant.UserTypeId).Value, out int userTypeId);
                return userTypeId;
            }
        }
        public int LoginUserTeamMemberId
        {
            get
            {
                int.TryParse(_identity.Claims.FirstOrDefault(f => f.Type == ClaimsConstant.TeamMemberId).Value, out int teamMemberId);
                return teamMemberId;
            }
        }
        public bool LoginUserIsLocked
        {
            get
            {
                bool.TryParse(_identity.Claims.FirstOrDefault(f => f.Type == ClaimsConstant.IsLocked).Value, out bool isLocked);
                return isLocked;
            }
        }
    }
}