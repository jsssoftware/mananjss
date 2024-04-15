using System.Collections.Generic;

namespace PolicyManagement.Models.Report { 

    public class ReportModel
    {
        public string InsuranceCompanyId { get; set; }
        public string MonthCycle { get; set; }
        public int? DataType { get; set; }
        public string BranchId { get; set; }
    }

    public class UploadReconFile
    {
        public string Data { get; set; }
        public int VerticalId { get; set; }
        public int BranchId { get; set; }

    }
}
