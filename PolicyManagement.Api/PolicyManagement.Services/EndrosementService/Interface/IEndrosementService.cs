using PolicyManagement.Dtos.Common;
using PolicyManagement.Models.Endrosement;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PolicyManagement.Services.EndrosementService.Interface
{
   public interface  IEndrosementService
    {
        Task<DataTableDto<List<dynamic>>> FindPolicyData(EndrosementModalFilter endrosementModalFilter);
    }
}
