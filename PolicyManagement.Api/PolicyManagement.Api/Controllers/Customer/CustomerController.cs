using PolicyManagement.Models.Common;
using PolicyManagement.Models.Customer;
using PolicyManagement.Services.Customer.Interface;
using System.Threading.Tasks;
using System.Web.Http;

namespace PolicyManagement.Api.Controllers.Customer
{
    [Authorize]
    [RoutePrefix("api/customer")]
    public class CustomerController : ApiController
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService) => _customerService = customerService;

        [Route("")]
        [HttpGet]
        public async Task<IHttpActionResult> GetCustomerByName(string name, int pageNumber, int pageSize) => Json(await _customerService.FindCustomrByName(name, pageNumber, pageSize));

        [Route("titles")]
        [HttpGet]
        public async Task<IHttpActionResult> GetAllTitles() => Json(await _customerService.FindAllTitles());

        [Route("territories/{branchId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetAllTerritories(int branchId) => Json(await _customerService.FindAllTerritories(branchId));

        [Route("marital-status")]
        [HttpGet]
        public async Task<IHttpActionResult> GetAllMaritalStatus() => Json(await _customerService.FindAllMaritalStatus());

        [Route("professions")]
        [HttpGet]
        public async Task<IHttpActionResult> GetAllProfessions() => Json(await _customerService.FindAllProfessions());

        [Route("business-lines")]
        [HttpGet]
        public async Task<IHttpActionResult> GetAllLineOfBusinesses() => Json(await _customerService.FindAllLineOfBusinesses());

        [Route("industries")]
        [HttpGet]
        public async Task<IHttpActionResult> GetAllIndustries() => Json(await _customerService.FindAllIndustries());

        [Route("designations")]
        [HttpGet]
        public async Task<IHttpActionResult> GetAllDesignations() => Json(await _customerService.FindAllDesignations());

        [Route("")]
        [HttpPost]
        public async Task<IHttpActionResult> AddCustomer(AddUpdateCustomerModel model) => Json(await _customerService.AddCustomer(model));

        [Route("customer-code/{code}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetCustomerByCode(string code) => Json(await _customerService.FindCustomerByCode(code));

        [Route("{customerId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetCustomerById(int customerId) => Json(await _customerService.FindCustomerById(customerId));

        [Route("short-detail/{customerId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetCustomerShortDetailById(int customerId) => Json(await _customerService.FindCustomerShortDetailById(customerId));

        [Route("titlesWithoutMS")]
        [HttpGet]
        public async Task<IHttpActionResult> GetAllTitlesWithoutMS() => Json(await _customerService.FindAllTitlesWithoutMS());

        [Route("clusters")]
        [HttpGet]
        public async Task<IHttpActionResult> GetAllClusters() => Json(await _customerService.FindAllClusters(new BaseModel().LoginUserBranchId));

        [Route("names")]
        [HttpGet]
        public async Task<IHttpActionResult> GetAllCustomerNames() => Json(await _customerService.FindAllCustomerNames());
    }
}
