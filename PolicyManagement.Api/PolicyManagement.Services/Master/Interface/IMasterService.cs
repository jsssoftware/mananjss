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
        Task<CommonDto<object>> CreatePosContact(tblPOSContact tblPOSContact, BaseModel baseModel);
        Task<DataTableDto<List<dynamic>>> GetPosContact(int branchId);
        Task<CommonDto<object>> CreateInsuranceCompany(tblInsuranceCompany tblPOSContact, BaseModel baseModel);
        Task<DataTableDto<List<dynamic>>> GetInusranceCompany(int branchId);
        Task<CommonDto<object>> CreateCluster(tblCluster tblPOSContact, BaseModel baseModel);
        Task<DataTableDto<List<dynamic>>> GetCluster(int branchId);
        Task<CommonDto<object>> CreatePlan(tblPlan tblPOSContact, BaseModel baseModel);
        Task<DataTableDto<List<dynamic>>> GetPlan(int branchId);

        Task<CommonDto<object>> CreateAddonPlan(tblAddonPlanOption tblPOSContact, BaseModel baseModel);
        Task<DataTableDto<List<dynamic>>> GetAddonPlan(int branchId);

    }
}
