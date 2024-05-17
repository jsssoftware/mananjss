using PolicyManagement.Models.Common;
using PolicyManagement.Models.Report;
using PolicyManagement.Services.Reports.Interface;
using System.Threading.Tasks;
using System.Web.Http;

namespace PolicyManagement.Api.Controllers.Reports
{
    [Authorize]
    [RoutePrefix("api/reports")]
    public class ReportController : ApiController
    {
        private readonly IReportService _reportService;
        public ReportController(IReportService reportService) => _reportService = reportService;

        [Route("motorrecondownload")]
        [HttpPost]
        public async Task<IHttpActionResult> GetMotorReconDownload(ReportModel reportModel) => Json(await _reportService.GetMotorReconDownload(reportModel));

        [Route("motorreconupload")]
        [HttpPost]
        public async Task<IHttpActionResult> GetMotorReconUpload(UploadReconFile uploadReconFile) => Json(await _reportService.GetMotorReconUpload(uploadReconFile));

        [Route("motormotherreport")]
        [HttpPost]
        public async Task<IHttpActionResult> GetMotorMotherReport(MotherReport motherReport) => Json(await _reportService.GetMotorMotherReport(motherReport));

        [Route("retailcommercialmotherreport")]
        [HttpPost]
        public async Task<IHttpActionResult> GetRetailCommercialMotherReport(RetailMotherReport motherReport) => Json(await _reportService.GetRetailCommercialMotherReport(motherReport));

        [Route("renewperfomancereport")]
        [HttpPost]
        public async Task<IHttpActionResult> GetRenewPerfomanceReport(RenewPerfomance renewPerfomance) => Json(await _reportService.GetRenewPerfomanceReport(renewPerfomance));

        [Route("findmotorpolicydata")]
        [HttpPost]
        public async Task<IHttpActionResult> GetPolicyDatas(AgentSwapFilter agentSwapFilter) => Json(await _reportService.FindMotorPolicyData(agentSwapFilter));

    }
}