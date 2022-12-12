using PolicyManagement.Dtos.Common;
using PolicyManagement.Dtos.Inspection;
using PolicyManagement.Models.Inspection;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PolicyManagement.Services.Inspection.Interface
{
    public interface IInspectionService
    {
        Task<CommonDto<string>> AddInspection(AddUpdateInspectionModel model);
        Task<CommonDto<string>> UpdateInspection(int inspectionId, AddUpdateInspectionModel model);
        Task<List<InspectionSearchPolicyDto>> SearchPolicies(InspectionSearchPolicyModel model);
        Task<InspectionDto> FindInspectionById(int inspectionId);
        Task<List<InspectionDocumentDto>> FindInspectionDocumentsByInspectionId(int inspectionId);
        Task<CommonDto<string>> DeleteInspectionDocument(int documentId, int loggedInUser);
        Task<List<SearchInspectionDto>> SearchInspections(SearchInspectionModel model);
    }
}
