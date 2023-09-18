using PolicyManagement.Dtos.Common;
using PolicyManagement.Models.Common;
using PolicyManagement.Models;
using System.Threading.Tasks;
using PolicyManagement.Infrastructures.EntityFramework;
using System.Collections.Generic;

namespace PolicyManagement.Services.Master.Interface
{
    public interface IMasterService
    {
        Task<DataTableDto<List<dynamic>>> GetInsuranceBranch(int branchId);
        Task<CommonDto<object>> CreateInsuranceBranch(tblInsuranceCompanyBranch users, BaseModel baseModel);
        Task<CommonDto<object>> CreateTeamMember(tblTeamMember teamMember, BaseModel baseModel);
        Task<DataTableDto<List<dynamic>>> GetTeamMember(int branchId);
        Task<CommonDto<object>> CreatePos(tblPOS teamMember, BaseModel baseModel);
        Task<DataTableDto<List<dynamic>>> GetPos(int branchId);

    }
}
