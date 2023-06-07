using PolicyManagement.Dtos.Common;
using PolicyManagement.Models.Common;
using PolicyManagement.Models.Commercial;
using System.Threading.Tasks;

namespace PolicyManagement.Services.Commercial.Interface
{
    public interface ICommercialService
    {
        Task<CommonDto<object>> CreateCommercialPolicy(CommercialPolicyFormDataModel model, BaseModel baseModel);
        Task<CommonDto<object>> UpdateCommercialPolicy(int policyId, CommercialPolicyFormDataModel model, BaseModel baseModel);
        Task<CommercialPolicyFormDataModel> FindCommercialPolicyByPolicyId(int policyId);
    }
}
