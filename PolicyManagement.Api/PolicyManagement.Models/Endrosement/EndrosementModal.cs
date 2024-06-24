using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PolicyManagement.Models.Endrosement
{
    public class EndrosementModalFilter
    {
            public string number { get; set; }
            public string CustomerName { get; set; }
            public short InsuranceCompany { get; set; }
            public long PolicyNumber { get; set; }
            public string PolicyStartDateFrom { get; set; }
            public string PolicyStartDateTo { get; set; }
            public int PosNameId { get; set; }
            public int BranchId { get; set; }
            public int VerticalId { get; set; }
    }
}
