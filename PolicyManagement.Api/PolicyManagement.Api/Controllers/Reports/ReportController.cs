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

    }
}