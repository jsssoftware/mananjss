using PolicyManagement.Models.Common;
using PolicyManagement.Models.Inspection;
using PolicyManagement.Services.Inspection.Interface;
using System.Threading.Tasks;
using System.Web.Http;

namespace PolicyManagement.Api.Controllers.Inspection
{
    [Authorize]
    [RoutePrefix("api/inspections")]
    public class InspectionController : ApiController
    {
        private readonly IInspectionService _inspectionService;

        public InspectionController(IInspectionService inspectionService) => _inspectionService = inspectionService;

        [Route("{inspectionId:int}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetInspectionById(int inspectionId) => Json(await _inspectionService.FindInspectionById(inspectionId));

        [Route("")]
        [HttpPost]
        public async Task<IHttpActionResult> AddInspection(AddUpdateInspectionModel model) => Json(await _inspectionService.AddInspection(model));

        [Route("policies")]
        [HttpPost]
        public async Task<IHttpActionResult> SearchPolicies(InspectionSearchPolicyModel model) => Json(await _inspectionService.SearchPolicies(model));

        [Route("search")]
        [HttpPost]
        public async Task<IHttpActionResult> SearchInspection(SearchInspectionModel model) => Json(await _inspectionService.SearchInspections(model));

        [Route("{inspectionId:int}")]
        [HttpPut]
        public async Task<IHttpActionResult> UpdateInspection(int inspectionId, AddUpdateInspectionModel model) => Json(await _inspectionService.UpdateInspection(inspectionId, model));

        [Route("documents/{inspectionId:int}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetInspectionDocumentsByInspectionId(int inspectionId) => Json(await _inspectionService.FindInspectionDocumentsByInspectionId(inspectionId));

        [Route("documents/{documentId:int}")]
        [HttpDelete]
        public async Task<IHttpActionResult> DeleteInspectionDocument(int documentId) => Json(await _inspectionService.DeleteInspectionDocument(documentId, new BaseModel().LoginUserId));
    }
}
