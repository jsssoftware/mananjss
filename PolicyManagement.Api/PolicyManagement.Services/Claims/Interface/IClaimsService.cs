using PolicyManagement.Dtos.Claims;
using PolicyManagement.Dtos.Common;
using PolicyManagement.Models.Claims;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PolicyManagement.Services.Claims.Interface
{
    public interface IClaimsService
    {
        Task<CommonDto<string>> AddClaims(AddUpdateClaimsModel model);
        Task<CommonDto<string>> UpdateClaims(int voucherId, AddUpdateClaimsModel model);
        Task<List<SearchClaimsDto>> SearchClaims(SearchClaimsModel model);
        Task<List<ClaimsSearchPolicyDto>> SearchPolicies(ClaimsSearchPolicyModel model);
        Task<SearchClaimsPolicyDto> SearchClaimsPolicyById(int policyId);
        Task<ClaimsDto> FindClaimsById(int claimsId);
        Task<List<FollowUpDto>> FindClaimsFollowUpDataByClaimsId(int claimsId);
        Task<List<ClaimsDocumentDto>> FindClaimsDocumentsByPolicyId(int policyId);
        Task<CommonDto<string>> DeleteClaimsDocument(int documentId, int loggedInUser);
    }
}
