using PolicyManagement.Dtos.Common;
using PolicyManagement.Models.Common;
using PolicyManagement.Models.Motor;
using System.Threading.Tasks;

namespace PolicyManagement.Services.Motor.Interface
{
    public interface IMotorService
    {
        Task<CommonDto<object>> CreateMotorPolicy(MotorPolicyFormDataModel model, BaseModel baseModel);
        Task<CommonDto<object>> UpdateMotorPolicy(int policyId, MotorPolicyFormDataModel model, BaseModel baseModel);
        Task<MotorPolicyFormDataModel> FindMotorPolicyByPolicyId(int policyId);
    }
}
