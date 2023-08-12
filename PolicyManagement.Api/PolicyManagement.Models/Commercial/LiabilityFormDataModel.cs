using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PolicyManagement.Models.Commercial
{
    public class Liability
    {
        public int PolicyId { get; set; }
        public int TotalSumInsured { get; set; }
        public string NoWorker { get; set; }
        public string NatureCoverage { get; set; }
        public string ExcessClause { get; set; }
        public string RiskLocation { get; set; }
        public string OtherInfo { get; set; }
        public DateTime RetroSpectiveDate { get; set; }

    }
}
