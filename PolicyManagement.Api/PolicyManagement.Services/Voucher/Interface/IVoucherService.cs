using PolicyManagement.Dtos.Common;
using PolicyManagement.Dtos.Voucher;
using PolicyManagement.Models.Voucher;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PolicyManagement.Services.Voucher.Interface
{
    public interface IVoucherService
    {
        Task<CommonDto<string>> AddVoucher(AddUpdateVoucherModel model);
        Task<CommonDto<string>> UpdateVoucher(int voucherId, AddUpdateVoucherModel model);
        Task<CommonDto<string>> UpdateVoucherControlNumber(int voucherId, AddUpdateVoucherModel model);
        Task<CommonDto<string>> VerifyVoucher(int voucherId, AddUpdateVoucherModel model);
        Task<List<DropDownDto<int>>> FindAllVoucherTypes();
        Task<List<VoucherSearchPolicyDto>> SearchPolicies(VoucherSearchPolicyModel model);
        Task<List<SearchVoucherDto>> SearchVouchers(SearchVoucherModel model);
        Task<VoucherDto> FindVoucherById(int voucherId);
    }
}
