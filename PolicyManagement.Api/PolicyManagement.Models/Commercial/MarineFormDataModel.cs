﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PolicyManagement.Models.Commercial
{
    public class MarineFormDataModel
    {
        public short? VoyageType { get; set; }
        public short? CoverageInland { get; set; }
        public string FromTransitDomestic { get; set; }
        public string ToTransitDomestic { get; set; }
        public decimal Rate { get; set; }
        public long TotalSumInsured { get; set; }
        public long SumInsured { get; set; }
        public long EndroseSumInsured { get; set; }
        public int PerLocationLimit { get; set; }
        public int PerSendingLimit { get; set; }
        public int MarineTermId { get; set; }

    }
}
