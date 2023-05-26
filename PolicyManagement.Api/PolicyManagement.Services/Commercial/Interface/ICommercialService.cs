using PolicyManagement.Dtos.Common;
using PolicyManagement.Models.Common;
using PolicyManagement.Models.Commercial;
using System.Threading.Tasks;

namespace PolicyManagement.Services.Commercial.Interface
{
    public interface ICommercialService
    {
        Task<CommonDto<object>> CreateHealthPolicy(CommercialPolicyFormDataModel model, BaseModel baseModel);
        Task<CommonDto<object>> UpdateHealthPolicy(int policyId, CommercialPolicyFormDataModel model, BaseModel baseModel);
        Task<CommercialPolicyFormDataModel> FindHealthPolicyByPolicyId(int policyId);
    }
}
