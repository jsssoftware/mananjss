using PolicyManagement.Models.Claims;
using PolicyManagement.Models.Common;
using PolicyManagement.Services.Claims.Interface;
using System.Threading.Tasks;
using System.Web.Http;

namespace PolicyManagement.Api.Controllers.Claims
{
    [Authorize]
    [RoutePrefix("api/claims")]
    public class ClaimsController : ApiController
    {
        private readonly IClaimsService _claimsService;

        public ClaimsController(IClaimsService claimsService) => _claimsService = claimsService;

        [Route("{claimsId:int}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetClaimsById(int claimsId) => Json(await _claimsService.FindClaimsById(claimsId));

        [Route("{claimsId:int}/follow-up-reasons")]
        [HttpGet]
        public async Task<IHttpActionResult> GetClaimsFollowUpDataByClaimsId(int claimsId) => Json(await _claimsService.FindClaimsFollowUpDataByClaimsId(claimsId));

        [Route("")]
        [HttpPost]
        public async Task<IHttpActionResult> AddClaims(AddUpdateClaimsModel model) => Json(await _claimsService.AddClaims(model));

        [Route("{claimsId:int}")]
        [HttpPut]
        public async Task<IHttpActionResult> UpdateClaims(int claimsId, AddUpdateClaimsModel model) => Json(await _claimsService.UpdateClaims(claimsId, model));

        [Route("policies")]
        [HttpPost]
        public async Task<IHttpActionResult> SearchPolicies(ClaimsSearchPolicyModel model) => Json(await _claimsService.SearchPolicies(model));

        [Route("policies/{policyId:int}")]
        [HttpGet]
        public async Task<IHttpActionResult> SearchPolicyById(int policyId) => Json(await _claimsService.SearchClaimsPolicyById(policyId));

        [Route("search")]
        [HttpPost]
        public async Task<IHttpActionResult> SearchClaims(SearchClaimsModel model) => Json(await _claimsService.SearchClaims(model));

        [Route("documents/{policyId:int}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetClaimsDocumentsByPolicyId(int policyId) => Json(await _claimsService.FindClaimsDocumentsByPolicyId(policyId));

        [Route("documents/{documentId:int}")]
        [HttpDelete]
        public async Task<IHttpActionResult> DeleteClaimsDocument(int documentId) => Json(await _claimsService.DeleteClaimsDocument(documentId, new BaseModel().LoginUserId));
    }
}
