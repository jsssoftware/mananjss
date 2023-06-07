using PolicyManagement.Models.Commercial;
using PolicyManagement.Models.Common;
using PolicyManagement.Services.Commercial.Interface;
using System.Threading.Tasks;
using System.Web.Http;

namespace PolicyManagement.Api.Controllers.Commercial
{
    [Authorize]
    [RoutePrefix("api/commercial")]
    public class CommercialController : ApiController
    {
        private readonly ICommercialService _commercialService;
        public CommercialController(ICommercialService commercialService) => _commercialService = commercialService;

        [Route("")]
        [HttpPost]
        public async Task<IHttpActionResult> CreatePolicy(CommercialPolicyFormDataModel model) => Json(await _commercialService.CreateCommercialPolicy(model, new BaseModel()));

        [Route("{policyId}")]
        [HttpPut]
        public async Task<IHttpActionResult> UpdatePolicy(int policyId, CommercialPolicyFormDataModel model) => Json(await _commercialService.UpdateCommercialPolicy(policyId, model, new BaseModel()));

        [Route("{policyId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetPolicyById(int policyId) => Json(await _commercialService.FindCommercialPolicyByPolicyId(policyId));

    }
}