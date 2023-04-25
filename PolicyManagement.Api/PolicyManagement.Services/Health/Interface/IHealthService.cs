using PolicyManagement.Dtos.Common;
using PolicyManagement.Models.Common;
using PolicyManagement.Models.Health;
using System.Threading.Tasks;

namespace PolicyManagement.Services.Health.Interface
{
    public interface IHealthService
    {
        Task<CommonDto<object>> CreateHealthPolicy(HealthPolicyFormDataModel model, BaseModel baseModel);
        Task<CommonDto<object>> UpdateHealthPolicy(int policyId, HealthPolicyFormDataModel model, BaseModel baseModel);
        Task<HealthPolicyFormDataModel> FindHealthPolicyByPolicyId(int policyId);
    }
}
