using PolicyManagement.Models.Common;
using PolicyManagement.Models.Master;
using PolicyManagement.Services.Master.Interface;
using System.Threading.Tasks;
using System.Web.Http;
using PolicyManagement.Infrastructures.EntityFramework;

namespace PolicyManagement.Api.Controllers.Master
{
    [Authorize]
    [RoutePrefix("api/master")]
    public class MasterController : ApiController
    {
        private readonly IMasterService _masterService;

        public MasterController(IMasterService masterService) => _masterService = masterService;

        [Route("insurancebranch/{branchId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetInsuranceBranch(int branchId) => Json(await _masterService.GetInsuranceBranch(branchId));

        [Route("insurancebranch/create")]
        [HttpPost]
        public async Task<IHttpActionResult> CreateInsuranceBranch(tblInsuranceCompanyBranch insuranceCompanyBranch) => Json(await _masterService.CreateInsuranceBranch(insuranceCompanyBranch, new BaseModel()));

        [Route("teammember/{branchId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetTeamMembers(int branchId) => Json(await _masterService.GetTeamMember(branchId));

        [Route("teammember/create")]
        [HttpPost]
        public async Task<IHttpActionResult> CreateTeamMember(tblTeamMember teamMember) => Json(await _masterService.CreateTeamMember(teamMember, new BaseModel()));

        [Route("pos/create")]
        [HttpPost]
        public async Task<IHttpActionResult> CreatePos(tblPOS pos) => Json(await _masterService.CreatePos(pos, new BaseModel()));

        [Route("pos/{branchId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetPos(int branchId) => Json(await _masterService.GetPos(branchId));


        [Route("poscontact/create")]
        [HttpPost]
        public async Task<IHttpActionResult> CreatePosContact(tblPOSContact pos) => Json(await _masterService.CreatePosContact(pos, new BaseModel()));

        [Route("poscontact/{branchId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetPosContact(int branchId) => Json(await _masterService.GetPosContact(branchId));


        [Route("insurancecompany/create")]
        [HttpPost]
        public async Task<IHttpActionResult> CreateInsuranceCompany(tblInsuranceCompany insuranceCompany) => Json(await _masterService.CreateInsuranceCompany(insuranceCompany, new BaseModel()));

        [Route("insurancecompany/{branchId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetInsuranceCompany(int branchId) => Json(await _masterService.GetInusranceCompany(branchId));

        [Route("cluster/create")]
        [HttpPost]
        public async Task<IHttpActionResult> CreateCluster(tblCluster cluster) => Json(await _masterService.CreateCluster(cluster, new BaseModel()));

        [Route("cluster/{branchId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetCluster(int branchId) => Json(await _masterService.GetCluster(branchId));

        [Route("plan/create")]
        [HttpPost]
        public async Task<IHttpActionResult> CreatePlan(tblPlan plan) => Json(await _masterService.CreatePlan(plan, new BaseModel()));

        [Route("plan/{branchId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetPlan(int branchId) => Json(await _masterService.GetPlan(branchId));

        [Route("addonplan/create")]
        [HttpPost]
        public async Task<IHttpActionResult> CreateAddonPlan(tblAddonPlanOption plan) => Json(await _masterService.CreateAddonPlan(plan, new BaseModel()));

        [Route("addonplan/{branchId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetAddonPlan(int branchId) => Json(await _masterService.GetAddonPlan(branchId));

        [Route("manufacture/create")]
        [HttpPost]
        public async Task<IHttpActionResult> CreateManufacture(tblManufacturer manufacturer) => Json(await _masterService.CreateManufacture(manufacturer, new BaseModel()));

        [Route("manufacture/{branchId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetManufacture(int branchId) => Json(await _masterService.GetManufacture(branchId));

        [Route("vehiclemodel/{branchId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetVehicleModel(int branchId) => Json(await _masterService.GetVehicleModel(branchId));

        [Route("vehiclemodel/create")]
        [HttpPost]
        public async Task<IHttpActionResult> CreateVehicleModel(tblModel model) => Json(await _masterService.CreateVehicleModel(model, new BaseModel()));

        [Route("addonplancombo/{branchId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetAddOnRiderCombo(int branchId) => Json(await _masterService.GetAddOnRiderCombo(branchId));

        [Route("addonplancombo/create")]
        [HttpPost]
        public async Task<IHttpActionResult> CreateAddOnRiderCombo(AddOnRider model) => Json(await _masterService.CreateAddOnRiderCombo(model, new BaseModel()));

        [Route("varient/{branchId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetVarient(int branchId) => Json(await _masterService.GetVarient(branchId));

        [Route("varient/create")]
        [HttpPost]
        public async Task<IHttpActionResult> CreateVarient(tblVariant model) => Json(await _masterService.CreateVarient(model, new BaseModel()));

        [Route("bank/{branchId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetBank(int branchId) => Json(await _masterService.GetBank(branchId));

        [Route("bank/create")]
        [HttpPost]
        public async Task<IHttpActionResult> CreateBank(tblBank model) => Json(await _masterService.CreateBank(model, new BaseModel()));


        [Route("city/{branchId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetCity(int branchId) => Json(await _masterService.GetCity(branchId));

        [Route("city/create")]
        [HttpPost]
        public async Task<IHttpActionResult> CreateCity(tblCity model) => Json(await _masterService.CreateCity(model, new BaseModel()));
    }
}
