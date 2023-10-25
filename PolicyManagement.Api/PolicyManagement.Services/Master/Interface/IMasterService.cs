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
        Task<CommonDto<object>> CreateBank(tblBank bank, BaseModel baseModel);
        Task<DataTableDto<List<dynamic>>> GetBank(int branchId);
        Task<CommonDto<object>> CreateCity(tblCity city, BaseModel baseModel);
        Task<DataTableDto<List<dynamic>>> GetCity(int branchId);
        Task<CommonDto<object>> CreateProduct(tblProduct product, BaseModel baseModel);
        Task<DataTableDto<List<dynamic>>> GetProduct(int branchId);
        Task<CommonDto<object>> CreateInspectionCompany(tblInspectionCompany product, BaseModel baseModel);
        Task<DataTableDto<List<dynamic>>> GetInspectionCompany(int branchId);

        Task<CommonDto<object>> CreatePosType(tblType postype, BaseModel baseModel);
        Task<DataTableDto<List<dynamic>>> GetPosType(int branchId);

        Task<CommonDto<object>> CreatePosCategory(tblCategory poscategory, BaseModel baseModel);
        Task<DataTableDto<List<dynamic>>> GetPosCategory(int branchId);
        Task<CommonDto<object>> CreateRtoZone(tblRTOZone poscategory, BaseModel baseModel);
        Task<DataTableDto<List<dynamic>>> GetRtoZone(int branchId);

        Task<CommonDto<object>> CreateFinance(tblFinancer poscategory, BaseModel baseModel);
        Task<DataTableDto<List<dynamic>>> GetFinance(int branchId);

        Task<CommonDto<object>> CreateDepartment(tblDepartment poscategory, BaseModel baseModel);
        Task<DataTableDto<List<dynamic>>> GetDepartment(int branchId);

        Task<CommonDto<object>> CreateDesignation(tblDesignation poscategory, BaseModel baseModel);
        Task<DataTableDto<List<dynamic>>> GetDesignation(int branchId);

        Task<CommonDto<object>> CreateIndustry(tblIndustry poscategory, BaseModel baseModel);
        Task<DataTableDto<List<dynamic>>> GetIndustry(int branchId);

        Task<CommonDto<object>> CreateProfession(tblProfession poscategory, BaseModel baseModel);
        Task<DataTableDto<List<dynamic>>> GetProfession(int branchId);
    }
}
