using PolicyManagement.Models.Common;
using PolicyManagement.Models.Health;
using PolicyManagement.Models.Motor;
using PolicyManagement.Services.Health.Interface;
using System.Threading.Tasks;
using System.Web.Http;

namespace PolicyManagement.Api.Controllers.Heath
{
    [Authorize]
    [RoutePrefix("api/retail")]
    public class RetailController : ApiController
    {
        private readonly IRetailService _healthService;
        public RetailController(IRetailService healthService) => _healthService = healthService;

        [Route("")]
        [HttpPost]
        public async Task<IHttpActionResult> CreatePolicy(RetailPolicyFormDataModel model) => Json(await _healthService.CreateHealthPolicy(model, new BaseModel()));

        [Route("{policyId}")]
        [HttpPut]
        public async Task<IHttpActionResult> UpdatePolicy(int policyId, RetailPolicyFormDataModel model) => Json(await _healthService.UpdateHealthPolicy(policyId, model, new BaseModel()));

        [Route("{policyId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetMotorPolicyById(int policyId) => Json(await _healthService.FindHealthPolicyByPolicyId(policyId));

    }
}