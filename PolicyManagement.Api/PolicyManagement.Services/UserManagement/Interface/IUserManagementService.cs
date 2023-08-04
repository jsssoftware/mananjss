using PolicyManagement.Dtos.Common;
using PolicyManagement.Models.Common;
using PolicyManagement.Models.Commercial;
using System.Threading.Tasks;
using PolicyManagement.Infrastructures.EntityFramework;
using PolicyManagement.Models.UserManagement;
using System.Collections.Generic;

namespace PolicyManagement.Services.UserManagement.Interface
{
    public interface IUserManagementService
    {
        Task<CommonDto<object>> CreateUser(tblUser users, BaseModel baseModel);
        Task<CommonDto<object>> DeleteUser(tblUser users, BaseModel baseModel);
        Task<DataTableDto<List<RoleDetailDto>>> GetRoles(int branchId);
        Task<CommonDto<object>> CreateRole(UserRole userRole, BaseModel baseModel);
        Task<List<MainFormListModel>> GetFormList();
        Task<CommonDto<object>> CreateUserRights(List<tblUserRights> userRights, BaseModel baseModel);
        Task<List<MainFormListModel>> GetFormListUpdated(int BranchId, int UserRoleId);
    }
}
