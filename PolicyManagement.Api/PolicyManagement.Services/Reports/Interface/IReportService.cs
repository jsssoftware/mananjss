using PolicyManagement.Dtos.Common;
using PolicyManagement.Models.Common;
using PolicyManagement.Models.Report;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PolicyManagement.Services.Reports.Interface
{
    public interface IReportService
    {
        Task<CommonDto<object>> GetMotorReconDownload(ReportModel reportModel);
        Task<CommonDto<object>> GetMotorReconUpload(UploadReconFile uploadReconFile);
        Task<CommonDto<object>> GetMotorMotherReport(MotherReport motherReport);
        Task<CommonDto<object>> GetRetailCommercialMotherReport(RetailMotherReport retailMotherReport);
        Task<CommonDto<object>> GetRenewPerfomanceReport(RenewPerfomance renewPerfomance);
        Task<DataTableDto<List<dynamic>>> FindMotorPolicyData(AgentSwapFilter agentSwapFilter);
        Task<CommonDto<object>> UpdateAgentsData(AgentSwapUpdate model, BaseModel baseModel);
        Task<CommonDto<object>> GetRenewalDump(RenewDump renewDump);
        Task<CommonDto<object>> GetCustomerCluster(CustomerCluster customerCluster);
        Task<CommonDto<object>> GetPosPerfomanceReports(POSPerfomance pOSPerfomance);
    }
}
