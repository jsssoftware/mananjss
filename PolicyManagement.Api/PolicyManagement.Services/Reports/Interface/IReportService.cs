using PolicyManagement.Dtos.Common;
using PolicyManagement.Models.Common;
using PolicyManagement.Models.Report;
using System.Threading.Tasks;

namespace PolicyManagement.Services.Reports.Interface
{
    public interface IReportService
    {
        Task<CommonDto<object>> GetMotorReconDownload(ReportModel reportModel);
        Task<CommonDto<object>> GetMotorReconUpload(UploadReconFile uploadReconFile);
    }
}
