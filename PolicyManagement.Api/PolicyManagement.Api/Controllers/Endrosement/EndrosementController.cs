using PolicyManagement.Models.Common;
using PolicyManagement.Models.Endrosement;
using PolicyManagement.Models.Report;
using PolicyManagement.Services.EndrosementService.Interface;
using PolicyManagement.Services.Reports;
using PolicyManagement.Services.Reports.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace PolicyManagement.Api.Controllers.Endrosement
{
    [Authorize]
    [RoutePrefix("api/endrosement")]
    public class EndrosementController : ApiController
    {
        private readonly IEndrosementService _endrosementService;
        public EndrosementController(IEndrosementService endrosementService) => _endrosementService = endrosementService;

        [Route("findpolicydata")]
        [HttpPost]
        public async Task<IHttpActionResult> GetPolicyDatas(EndrosementModalFilter endrosementModalFilter) => Json(await _endrosementService.FindPolicyData(endrosementModalFilter));

        [Route("addupdateEndrosement")]
        [HttpPost]
        public async Task<IHttpActionResult> AddUpdateEndrosementData(EndorsementMasterModel endorsementMasterModel) => Json(await _endrosementService.AddUpdateEndrosementMaster(endorsementMasterModel,  new BaseModel()));

        [Route("previousEndrosement/{policyId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetPreviousEndrosement(int policyId) => Json(await _endrosementService.GetPreviousEndromentInfo(policyId));
    }
}
