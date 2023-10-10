using PolicyManagement.Dtos.Common;
using PolicyManagement.Models.Common;
using PolicyManagement.Models;
using System.Threading.Tasks;
using PolicyManagement.Infrastructures.EntityFramework;
using System.Collections.Generic;
using PolicyManagement.Models.Master;

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
        Task<CommonDto<object>> CreateInsuranceCompany(tblInsuranceCompany tblInsuranceCompany, BaseModel baseModel);
        Task<DataTableDto<List<dynamic>>> GetInusranceCompany(int branchId);
        Task<CommonDto<object>> CreateCluster(tblCluster tblCluster, BaseModel baseModel);
        Task<DataTableDto<List<dynamic>>> GetCluster(int branchId);
        Task<CommonDto<object>> CreatePlan(tblPlan tblPlan, BaseModel baseModel);
        Task<DataTableDto<List<dynamic>>> GetPlan(int branchId);

        Task<CommonDto<object>> CreateAddonPlan(tblAddonPlanOption tblAddonPlanOption, BaseModel baseModel);
        Task<DataTableDto<List<dynamic>>> GetAddonPlan(int branchId);
        Task<CommonDto<object>> CreateManufacture(tblManufacturer tblManufacturer, BaseModel baseModel);
        Task<DataTableDto<List<dynamic>>> GetManufacture(int branchId);
        Task<CommonDto<object>> CreateVehicleModel(tblModel tblModel, BaseModel baseModel);
        Task<DataTableDto<List<dynamic>>> GetVehicleModel(int branchId);
        Task<CommonDto<object>> CreateAddOnRiderCombo(AddOnRider addOnRider, BaseModel baseModel);
        Task<DataTableDto<List<dynamic>>> GetAddOnRiderCombo(int branchId);
        Task<CommonDto<object>> CreateVarient(tblVariant variant, BaseModel baseModel);
        Task<DataTableDto<List<dynamic>>> GetVarient(int branchId);

    }
}
