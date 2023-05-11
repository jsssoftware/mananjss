using PolicyManagement.Dtos.Common;
using PolicyManagement.Models.Common;
using PolicyManagement.Models.Health;
using System.Threading.Tasks;

namespace PolicyManagement.Services.Health.Interface
{
    public interface IRetailService
    {
        Task<CommonDto<object>> CreateHealthPolicy(RetailPolicyFormDataModel model, BaseModel baseModel);
        Task<CommonDto<object>> UpdateHealthPolicy(int policyId, RetailPolicyFormDataModel model, BaseModel baseModel);
        Task<RetailPolicyFormDataModel> FindHealthPolicyByPolicyId(int policyId);
    }
}
