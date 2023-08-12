using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PolicyManagement.Models.Commercial
{
    public class EnginneringDataFormModel
    {
        public int PolicyId { get; set; }
        public int TotalSumInsured { get; set; }
        public int Rate { get; set; }
        public string NatureofCoverage { get; set; }
        public DateTime? PeriodDate { get; set; }
        public short? RiskLocation { get; set; }
        public string OtherInfo { get; set; }

    }
}
