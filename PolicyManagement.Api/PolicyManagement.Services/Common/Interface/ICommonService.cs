using PolicyManagement.Dtos.Common;
using PolicyManagement.Dtos.Motor;
using PolicyManagement.Infrastructures.EntityFramework;
using PolicyManagement.Models.Common;
using PolicyManagement.Utilities.Enums;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PolicyManagement.Services.Common.Interface
{
    public interface ICommonService
    {
        Task<List<DropDownDto<int>>> FindAllBanks();
        Task<VerticalDto> FindVerticalById(int verticalId);
        Task<List<PreviousClaimDto>> FindClaimsByPolicyId(int policyId);
        Task<List<PolicyVoucherDto>> FindVoucherByPolicyId(int policyId);
        Task<List<PolicyInspectionDto>> FindInspectionByPolicyId(int policyId);
        Task<List<DropDownDto<int>>> FindAllPolicyTypes(int type);
        Task<List<DropDownDto<int>>> FindAllVehicleClasses();
        Task<List<DropDownDto<int>>> FindAllPackageTypes();
        Task<List<PolicyTermDto>> FindAllPolicyTerms(int policyTypeId, int vehicleClassId, int policyPackageTypeId);
        Task<List<DropDownDto<int>>> FindAllInsuranceCompanies(Vertical vertical);
        Task<List<DropDownDto<int>>> FindAllInsuranceCompanyBranches(Vertical vertical, int insuranceCompanyId, int branchId);
        Task<List<YearDto>> FindAllNumberOfYears();
        Task<List<DropDownDto<int>>> FindAllFinancers();
        Task<List<DropDownDto<int>>> FindAllInspectionCompanies();
        Task<List<DropDownDto<int>>> FindAllManufacturers();
        Task<List<DropDownDto<int>>> FindAllModels(int manufacturerId);
        Task<List<VarientDto>> FindAllVarients(int manufacturerId, int modelId, int vehicleClassId);
        Task<List<DropDownDto<int>>> FindAllVehicles(int vehicleClassId);
        Task<VehicleDto> FindVehicleDetailByVariantId(int variantId);
        Task<List<DropDownDto<int>>> FindAllMakeYears(int type);
        Task<List<DropDownDto<int>>> FindAllUsages();
        Task<List<DropDownDto<int>>> FindAllNcbs();
        Task<List<DropDownDto<int>>> FindAllCommissionPaidOn();
        Task<List<DropDownDto<int>>> FindAllAddOnRiders(int insuranceCompanyId, int verticalId);
        Task<List<AddOnPlanOptionDto>> FindAllAddOnPlanOptions(int addOnRiderId, int verticalId,int policyId);
        Task<List<DropDownDto<int>>> FindAllRelations();
        Task<List<DropDownDto<int>>> FindAllTeleCallers(Vertical vertical, int branchId);
        Task<List<DropDownDto<int>>> FindAllReferences(int branchId);
        Task<List<DropDownDto<int>>> FindAllFosNames(Vertical vertical, int branchId);
        Task<List<DropDownDto<int>>> FindAllTeamMembers(Vertical vertical, int branchId);
        Task<List<DropDownDto<string>>> FindAllBranchs();
        Task<List<DropDownDto<short>>> FindAllCities();
        DateDto CalculateDate(string dateString, int year);
        Task<string> GenerateCustomerCode();
        Task<string> GenerateControlNumber(string branchCode, string verticalCode);
        Task<List<RtoZoneDto>> FindAllRtoZones();
        Task<decimal> FindGstPercentage();
        Task<List<DropDownDto<int>>> FindAllDocumentTypes(string code);
        Task<List<DropDownDto<int>>> FindAllPaymentModes();
        Task<List<DropDownDto<int>>> FindAllPos(Vertical vertical, int branchId);
        Task<DropDownDto<int>> FindPosManagedByPosId(int posId);
        Task<DataTableDto<List<SearchPolicyDto>>> FindAllPolicies(SearchPolicyModel model);
        DateDto GetDate(DateTime? date);
        Task<List<DropDownDto<int>>> FindAllGenders();
        Task<string> GenerateVoucherNumber(string branchCode, int branchId);
        Task<List<VerticalDto>> FindAllVerticals();
        Task<List<DropDownDto<int>>> FindAllProducts(int verticalId);
        Task<List<DropDownDto<int>>> FindClaimsType(int verticalId);
        Task<List<DropDownDto<int>>> FindAllClaimsStatus();
        Task<List<DropDownDto<int>>> FindAllClaimsSubStatus(int claimsStatusId);
        Task<List<DropDownDto<int>>> FindAllInspectionStatus();
        Task<List<DropDownDto<int>>> FindAllInspectionSubStatus(int inspectionStatusId);
        Task<List<DropDownDto<int>>> FindAllInspectionReasons();
        Task<PolicyInspectionDto> FindInspectionById(int inspectionId);
        Task<PolicyVoucherDto> FindVoucherById(int voucherId);
        Task<List<PolicyDocumentDto>> FindPolicyDocumentsById(int policyId);
        Task<DataTableDto<List<SearchPolicyFinalDownloadDto>>> FindAllPoliciesDownload(SearchPolicyModel model);
        Task<List<tblMenuItem>> GetMenus();
        Task<List<DropDownDto<int>>> FindAllProducts();
        Task<List<DropDownDto<int>>> FindAllPlans(int _productId);
        Task<List<DropDownDto<int>>> FindAllPlanTypes();
        Task<List<DropDownDto<int>>> FindAllPortability(); 
    }
}
