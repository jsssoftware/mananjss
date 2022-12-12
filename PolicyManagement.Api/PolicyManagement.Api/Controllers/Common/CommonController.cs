using Newtonsoft.Json;
using PolicyManagement.Models.Common;
using PolicyManagement.Services.Common.Interface;
using PolicyManagement.Utilities.Enums;
using System.Threading.Tasks;
using System.Web.Http;

namespace PolicyManagement.Api.Controllers.Common
{
    //[Authorize]
    [RoutePrefix("api/common")]
    public class CommonController : ApiController
    {
        private readonly ICommonService _commonService;
        public CommonController(ICommonService commonService)
        {
            _commonService = commonService;
        }
      
        [Route("{policyId}/previous-claims")]
        [Route("{policyId}/claims")]
        [HttpGet]
        public async Task<IHttpActionResult> GetClaimsByPolicyId(int policyId) => Json(await _commonService.FindClaimsByPolicyId(policyId));

        [Route("{policyId}/vouchers")]
        [HttpGet]
        public async Task<IHttpActionResult> GetVoucherByPolicyId(int policyId) => Json(await _commonService.FindVoucherByPolicyId(policyId));

        [Route("{policyId}/inspections")]
        [HttpGet]
        public async Task<IHttpActionResult> GetInspectionByPolicyId(int policyId) => Json(await _commonService.FindInspectionByPolicyId(policyId));
        
        [Route("{policyId}/documents")]
        [HttpGet]
        public async Task<IHttpActionResult> GetPolicyDocumentsById(int policyId) => Json(await _commonService.FindPolicyDocumentsById(policyId));

        [Route("inspections/{inspectionId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetInspectionById(int inspectionId) => Json(await _commonService.FindInspectionById(inspectionId));
        
        [Route("vouchers/{voucherId}")]
        [HttpGet]
        public async Task<IHttpActionResult> FindVoucherById(int voucherId) => Json(await _commonService.FindVoucherById(voucherId));

        [Route("policy-types/{type}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetPolicyTypes(int type) => Json(await _commonService.FindAllPolicyTypes(type));

        [Route("vehicle-classes")]
        [HttpGet]
        public async Task<IHttpActionResult> GetVehicleClasses() => Json(await _commonService.FindAllVehicleClasses());

        [Route("verticals")]
        [HttpGet]
        public async Task<IHttpActionResult> GetVerticals() => Json(await _commonService.FindAllVerticals());

        [Route("verticals/{verticalId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetVerticalById(int verticalId) => Json(await _commonService.FindVerticalById(verticalId));

        [Route("package-types")]
        [HttpGet]
        public async Task<IHttpActionResult> GetPackageTypes() => Json(await _commonService.FindAllPackageTypes());

        [Route("policy-terms")]
        [HttpGet]
        public async Task<IHttpActionResult> GetPolicyTerms(int policyTypeId, int vehicleClassId, int policyPackageTypeId) => Json(await _commonService.FindAllPolicyTerms(policyTypeId, vehicleClassId, policyPackageTypeId));

        [Route("insurance-companies/{vertical}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetInsuranceCompanies(Vertical vertical) => Json(await _commonService.FindAllInsuranceCompanies(vertical));

        [Route("insurance-company-branches")]
        [HttpGet]
        public async Task<IHttpActionResult> GetInsuranceCompanyBranches(Vertical vertical, int insuranceCompanyId, int branchId) => Json(await _commonService.FindAllInsuranceCompanyBranches(vertical, insuranceCompanyId, branchId));

        [Route("years")]
        [HttpGet]
        public async Task<IHttpActionResult> GetNumberOfYears() => Json(await _commonService.FindAllNumberOfYears());

        [Route("financers")]
        [HttpGet]
        public async Task<IHttpActionResult> GetFinancers() => Json(await _commonService.FindAllFinancers());

        [Route("inspection-companies")]
        [HttpGet]
        public async Task<IHttpActionResult> GetInspectionCompanies() => Json(await _commonService.FindAllInspectionCompanies());

        [Route("manufacturers")]
        [HttpGet]
        public async Task<IHttpActionResult> GetManufacturers() => Json(await _commonService.FindAllManufacturers());

        [Route("models/{manufacturerId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetModels(int manufacturerId) => Json(await _commonService.FindAllModels(manufacturerId));

        [Route("varients")]
        [HttpGet]
        public async Task<IHttpActionResult> GetVarients(int manufacturerId, int modelId, int vehicleClassId) => Json(await _commonService.FindAllVarients(manufacturerId, modelId, vehicleClassId));

        [Route("vehicles/{vehicleClassId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetVehicles(int vehicleClassId) => Json(await _commonService.FindAllVehicles(vehicleClassId));

        [Route("vehicles/varients/{varientId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetVehicleDetails(int varientId) => Json(await _commonService.FindVehicleDetailByVariantId(varientId));

        [Route("make-years/{type}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetMakeYears(int type) => Json(await _commonService.FindAllMakeYears(type));

        [Route("rto-zones")]
        [HttpGet]
        public async Task<IHttpActionResult> GetRtoZoes() => Json(await _commonService.FindAllRtoZones());

        [Route("usages")]
        [HttpGet]
        public async Task<IHttpActionResult> GetUsages() => Json(await _commonService.FindAllUsages());

        [Route("ncbs")]
        [HttpGet]
        public async Task<IHttpActionResult> GetNcbs() => Json(await _commonService.FindAllNcbs());

        [Route("commission-paid-on")]
        [HttpGet]
        public async Task<IHttpActionResult> GetCommissionPaidOn() => Json(await _commonService.FindAllCommissionPaidOn());

        [Route("add-on-riders")]
        [HttpGet]
        public async Task<IHttpActionResult> GetAddOnRiders(int insuranceCompanyId, int verticalId) => Json(await _commonService.FindAllAddOnRiders(insuranceCompanyId, verticalId));

        [Route("add-on-plan-options")]
        [HttpGet]
        public async Task<IHttpActionResult> GetAddOnPlanOptions(int addOnRiderId, int verticalId,int policyId) => Json(await _commonService.FindAllAddOnPlanOptions(addOnRiderId, verticalId, policyId));

        [Route("relations")]
        [HttpGet]
        public async Task<IHttpActionResult> GetRelations() => Json(await _commonService.FindAllRelations());

        [Route("tele-callers")]
        [HttpGet]
        public async Task<IHttpActionResult> GetTeleCallers(Vertical vertical, int branchId) => Json(await _commonService.FindAllTeleCallers(vertical, branchId));

        [Route("references/{branchId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetReferences(int branchId) => Json(await _commonService.FindAllReferences(branchId));

        [Route("fos-names")]
        [HttpGet]
        public async Task<IHttpActionResult> GetFosNames(Vertical vertical, int branchId) => Json(await _commonService.FindAllFosNames(vertical, branchId));

        [Route("banks")]
        [HttpGet]
        public async Task<IHttpActionResult> GetBanks() => Json(await _commonService.FindAllBanks());

        [AllowAnonymous]
        [Route("branchs")]
        [HttpGet]
        public async Task<IHttpActionResult> GetBranchs() => Json(await _commonService.FindAllBranchs());

        [Route("cities")]
        [HttpGet]
        public async Task<IHttpActionResult> GetCities() => Json(await _commonService.FindAllCities());

        [Route("date")]
        [HttpGet]
        public IHttpActionResult GetDate(string date, int year) => Json(_commonService.CalculateDate(date, year));

        [Route("document-types/{code}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetDocumentTypes(string code) => Json(await _commonService.FindAllDocumentTypes(code));

        [Route("pos")]
        [HttpGet]
        public async Task<IHttpActionResult> GetAllPos(Vertical vertical, int branchId) => Json(await _commonService.FindAllPos(vertical, branchId));

        [Route("pos-managed-by/{posId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetPosManagedBy(int posId) => Json(await _commonService.FindPosManagedByPosId(posId));

        [Route("payment-modes")]
        [HttpGet]
        public async Task<IHttpActionResult> GetAllPaymentModes() => Json(await _commonService.FindAllPaymentModes());

        [Route("policies")]
        [HttpPost]
        public async Task<IHttpActionResult> GetAllPolicies(SearchPolicyModel model)
        { 
            if (model.IsForDownload)
                return Json(await _commonService.FindAllPoliciesDownload(model)); 
            return Json(await _commonService.FindAllPolicies(model));
        }
        

        [Route("team-members")]
        [HttpGet]
        public async Task<IHttpActionResult> GetAllTeamMembers(Vertical vertical, int branchId) => Json(await _commonService.FindAllTeamMembers(vertical, branchId));

        [Route("genders")]
        [HttpGet]
        public async Task<IHttpActionResult> GetAllGenders() => Json(await _commonService.FindAllGenders());

        [Route("me")]
        [HttpGet]
        public async Task<IHttpActionResult> GetLoggedInUserData() => Json(await Task.FromResult(new BaseModel()));

        [Route("products/{verticalId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetProducts(int verticalId) => Json(await _commonService.FindAllProducts(verticalId));

        [Route("claims-type/{verticalId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetClaimsType(int verticalId) => Json(await _commonService.FindClaimsType(verticalId));

        [Route("claims-status")]
        [HttpGet]
        public async Task<IHttpActionResult> GetClaimsStatus() => Json(await _commonService.FindAllClaimsStatus());

        [Route("claims-sub-status/{claimsStatusId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetClaimsSubStatus(int claimsStatusId) => Json(await _commonService.FindAllClaimsSubStatus(claimsStatusId));

        [Route("inspection-status")]
        [HttpGet]
        public async Task<IHttpActionResult> GetInspectionStatus() => Json(await _commonService.FindAllInspectionStatus());

        [Route("inspection-sub-status/{inspectionStatusId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetInspectionSubStatus(int inspectionStatusId) => Json(await _commonService.FindAllInspectionSubStatus(inspectionStatusId));

        [Route("inspection-reasons")]
        [HttpGet]
        public async Task<IHttpActionResult> GetInspectionReasons() => Json(await _commonService.FindAllInspectionReasons());

        [Authorize]
        [Route("menus")]
        [HttpGet]
        public async Task<IHttpActionResult> GetMenus() => Json(await _commonService.GetMenus(), new JsonSerializerSettings
        {
            PreserveReferencesHandling = PreserveReferencesHandling.Objects
        });



        [Route("products")]
        [HttpGet]
        public async Task<IHttpActionResult> GetProducts() => Json(await _commonService.FindAllProducts());


        [Route("plans/{productId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetPlans(int productId) => Json(await _commonService.FindAllPlans(productId));


        [Route("planTypes")]
        [HttpGet]
        public async Task<IHttpActionResult> GetPlanTypes() => Json(await _commonService.FindAllPlanTypes());

        [Route("portability")]
        [HttpGet]
        public async Task<IHttpActionResult> GetPortability() => Json(await _commonService.FindAllPortability());
    }
}