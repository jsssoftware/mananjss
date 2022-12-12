using PolicyManagement.Models.Common;
using PolicyManagement.Models.Motor;
using PolicyManagement.Services.Motor.Interface;
using System.Threading.Tasks;
using System.Web.Http;

namespace PolicyManagement.Api.Controllers.Motor
{
    [Authorize]
    [RoutePrefix("api/motor")]
    public class MotorController : ApiController
    {
        private readonly IMotorService _motorService;

        public MotorController(IMotorService motorService) => _motorService = motorService;

        [Route("")]
        [HttpPost]
        public async Task<IHttpActionResult> CreatePolicy(MotorPolicyFormDataModel model) => Json(await _motorService.CreateMotorPolicy(model, new BaseModel()));

        [Route("{policyId}")]
        [HttpPut]
        public async Task<IHttpActionResult> UpdatePolicy(int policyId, MotorPolicyFormDataModel model) => Json(await _motorService.UpdateMotorPolicy(policyId, model, new BaseModel()));

        [Route("{policyId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetMotorPolicyById(int policyId) => Json(await _motorService.FindMotorPolicyByPolicyId(policyId));

    }
}