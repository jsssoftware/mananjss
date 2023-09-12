using PolicyManagement.Models.Common;
using PolicyManagement.Models;
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



    }
}
