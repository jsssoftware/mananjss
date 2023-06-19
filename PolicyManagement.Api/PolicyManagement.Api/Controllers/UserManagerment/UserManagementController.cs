using PolicyManagement.Infrastructures.EntityFramework;
using PolicyManagement.Models.Commercial;
using PolicyManagement.Models.Common;
using PolicyManagement.Models.UserManagement;
using PolicyManagement.Services.Commercial.Interface;
using PolicyManagement.Services.UserManagement.Interface;
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

  

    }
}