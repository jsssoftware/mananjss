using PolicyManagement.Dtos.Common;
using PolicyManagement.Models.Common;
using PolicyManagement.Models.Commercial;
using System.Threading.Tasks;
using PolicyManagement.Infrastructures.EntityFramework;
using PolicyManagement.Models.UserManagement;

namespace PolicyManagement.Services.UserManagement.Interface
{
    public interface IUserManagementService
    {
        Task<CommonDto<object>> CreateUser(tblUser users, BaseModel baseModel);
       
    }
}
