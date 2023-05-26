using PolicyManagement.Models.Commercial;
using PolicyManagement.Models.Common;
using PolicyManagement.Services.Commercial.Interface;
using System.Threading.Tasks;
using System.Web.Http;

namespace PolicyManagement.Api.Controllers.Commercial
{
    [Authorize]
    [RoutePrefix("api/retail")]
    public class CommercialController : ApiController
    {
        private readonly ICommercialService _healthService;
        public CommercialController(ICommercialService healthService) => _healthService = healthService;

        [Route("")]
        [HttpPost]
        public async Task<IHttpActionResult> CreatePolicy(CommercialPolicyFormDataModel model) => Json(await _healthService.CreateHealthPolicy(model, new BaseModel()));

        [Route("{policyId}")]
        [HttpPut]
        public async Task<IHttpActionResult> UpdatePolicy(int policyId, CommercialPolicyFormDataModel model) => Json(await _healthService.UpdateHealthPolicy(policyId, model, new BaseModel()));

        [Route("{policyId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetMotorPolicyById(int policyId) => Json(await _healthService.FindHealthPolicyByPolicyId(policyId));

    }
}