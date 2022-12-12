using PolicyManagement.Dtos.Common;
using PolicyManagement.Dtos.Customer;
using PolicyManagement.Models.Customer;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PolicyManagement.Services.Customer.Interface
{
    public interface ICustomerService
    {
        Task<DataTableDto<List<CustomerDto>>> FindCustomrByName(string name, int pageNumber, int pageSize);
        Task<List<DropDownDto<int>>> FindAllTitles();
        Task<List<DropDownDto<int>>> FindAllTerritories(int branchId);
        Task<List<DropDownDto<int>>> FindAllMaritalStatus();
        Task<List<DropDownDto<int>>> FindAllProfessions();
        Task<List<DropDownDto<int>>> FindAllLineOfBusinesses();
        Task<List<DropDownDto<int>>> FindAllIndustries();
        Task<List<DropDownDto<int>>> FindAllDesignations();
        Task<CommonDto<object>> AddCustomer(AddUpdateCustomerModel model);
        Task<CommonDto<AddUpdateCustomerModel>> FindCustomerByCode(string customerCode);
        Task<CommonDto<AddUpdateCustomerModel>> FindCustomerById(int customerId);
        Task<CustomerShortDetailDto> FindCustomerShortDetailById(int customerId);
        Task<List<DropDownDto<int>>> FindAllTitlesWithoutMS();
        Task<List<DropDownDto<int>>> FindAllClusters(int branchId);
        Task<List<DropDownDto<int>>> FindAllCustomerNames();
    }
}
