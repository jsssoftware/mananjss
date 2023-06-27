using PolicyManagement.Infrastructures.EntityFramework;
using PolicyManagement.Models.Commercial;
using PolicyManagement.Models.Common;
using PolicyManagement.Models.UserManagement;
using PolicyManagement.Services.Commercial.Interface;
using PolicyManagement.Services.UserManagement.Interface;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace PolicyManagement.Api.Controllers.UserManangement
{
    [Authorize]
    [RoutePrefix("api/usermanagement")]
    public class UserManagementController : ApiController
    {
        private readonly IUserManagementService _usermanagementService;
        public UserManagementController(IUserManagementService usermanagementService) => _usermanagementService = usermanagementService;

        [Route("")]
        [HttpPost]
        public async Task<IHttpActionResult> CreateUser(tblUser user) => Json(await _usermanagementService.CreateUser(user, new BaseModel()));

        [Route("")]
        [HttpDelete]
        public async Task<IHttpActionResult> DeleteUser(tblUser user) => Json(await _usermanagementService.DeleteUser(user, new BaseModel()));

        [Route("roles/{branchId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetRoles(int branchId) => Json(await _usermanagementService.GetRoles(branchId));

        [Route("roles/create")]
        [HttpPost]
        public async Task<IHttpActionResult> CreateRole(tblUserRole userRole) => Json(await _usermanagementService.CreateRole(userRole, new BaseModel()));

        [Route("formlist")]
        [HttpGet]
        public async Task<IHttpActionResult> GetFormList() => Json(await _usermanagementService.GetFormList());

        [Route("userrights/create")]
        [HttpPost]
        public async Task<IHttpActionResult> CreateUserRights(List<tblUserRights> userRights) => Json(await _usermanagementService.CreateUserRights(userRights, new BaseModel()));
    }
}