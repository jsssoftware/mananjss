using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PolicyManagement.Models.Claims
{
    public class ClaimsSearchPolicyModel
    {
        public string ControlNumber { get; set; }
        public int? VerticalId { get; set; }
        public int? ProductId { get; set; }
        public string RegistrationNumber { get; set; }
        public string PolicyNumber { get; set; }
        public int? ManufactureId { get; set; }
        public int? ModelId { get; set; }
        public string CustomerName { get; set; }
        public string CustomerPhone { get; set; }
        public int? PosId { get; set; }
        public int? InsuranceCompanyId { get; set; }
        public string PolicyStartFromDate { get; set; }
        public string PolicyStartToDate { get; set; }
        public bool HasExpiredData { get; set; }
    }
}