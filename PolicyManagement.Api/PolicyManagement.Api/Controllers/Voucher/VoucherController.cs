using PolicyManagement.Models.Voucher;
using PolicyManagement.Services.Voucher.Interface;
using System.Threading.Tasks;
using System.Web.Http;

namespace PolicyManagement.Api.Controllers.Voucher
{
    [Authorize]
    [RoutePrefix("api/voucher")]
    public class VoucherController : ApiController
    {
        private readonly IVoucherService _voucherService;

        public VoucherController(IVoucherService voucherService) => _voucherService = voucherService;

        [Route("")]
        [HttpPost]
        public async Task<IHttpActionResult> AddVoucher(AddUpdateVoucherModel model) => Json(await _voucherService.AddVoucher(model));

        [Route("{voucherId:int}")]
        [HttpPut]
        public async Task<IHttpActionResult> UpdateVoucher(int voucherId, AddUpdateVoucherModel model) => Json(await _voucherService.UpdateVoucher(voucherId, model));

        [Route("{voucherId:int}")]
        [HttpPatch]
        public async Task<IHttpActionResult> UpdateVoucherControlNumber(int voucherId, AddUpdateVoucherModel model) => Json(await _voucherService.UpdateVoucherControlNumber(voucherId, model));

        [Route("verify/{voucherId:int}")]
        [HttpPatch]
        public async Task<IHttpActionResult> VerifyVoucher(int voucherId, AddUpdateVoucherModel model) => Json(await _voucherService.VerifyVoucher(voucherId, model));

        [Route("types")]
        [HttpGet]
        public async Task<IHttpActionResult> FindAllVoucherTypes() => Json(await _voucherService.FindAllVoucherTypes());

        [Route("policies")]
        [HttpPost]
        public async Task<IHttpActionResult> SearchPolicies(VoucherSearchPolicyModel model) => Json(await _voucherService.SearchPolicies(model));

        [Route("search")]
        [HttpPost]
        public async Task<IHttpActionResult> SearchVouchers(SearchVoucherModel model) => Json(await _voucherService.SearchVouchers(model));

        [Route("{voucherId:int}")]
        [HttpGet]
        public async Task<IHttpActionResult> FindVoucherById(int voucherId) => Json(await _voucherService.FindVoucherById(voucherId));
    }
}
