using PolicyManagement.Models.Common;
using PolicyManagement.Models.Health;
using PolicyManagement.Models.Motor;
using PolicyManagement.Services.Health.Interface;
using System.Threading.Tasks;
using System.Web.Http;

namespace PolicyManagement.Api.Controllers.Heath
{
    [Authorize]
    [RoutePrefix("api/health")]
    public class HealthController : ApiController
    {
        private readonly IHealthService _healthService;
        public HealthController(IHealthService healthService) => _healthService = healthService;

        [Route("")]
        [HttpPost]
        public async Task<IHttpActionResult> CreatePolicy(HealthPolicyFormDataModel model) => Json(await _healthService.CreateHealthPolicy(model, new BaseModel()));

        [Route("{policyId}")]
        [HttpPut]
        public async Task<IHttpActionResult> UpdatePolicy(int policyId, HealthPolicyFormDataModel model) => Json(await _healthService.UpdateHealthPolicy(policyId, model, new BaseModel()));

        [Route("{policyId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetMotorPolicyById(int policyId) => Json(await _healthService.FindHealthPolicyByPolicyId(policyId));

    }
}