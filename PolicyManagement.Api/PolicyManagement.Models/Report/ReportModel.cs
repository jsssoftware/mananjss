using System;
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


    public class MotherReport
    {
        public int InsuranceCompanyId { get; set; }
        public string PolicyInspectionDateFrom { get; set; }
        public string PolicyInspectionDateTo { get; set; }
        public int PackageTypeId { get; set; }
        public int PolicyTermId { get; set; }
        public int PolicyTypeId { get; set; }
        public int NcbId { get; set; }
        public int BusinessDoneBy { get; set; }
        public int ManufacturerId { get; set; }
        public int VehicleClassId { get; set; }
        public int ModelId { get; set; }
        public int RtoZoneId { get; set; }
        public int ReferenceId { get; set; }
        public int TeleCallerId { get; set; }
        public int FosId { get; set; }
        public int AddonRideId { get; set; }
        public int BranchId { get; set; }
        public int PosmanagedBy { get; set; }
        public int PolicyType1 { get; set; }
        public int PolicyType2 { get; set; }
        public int PolicyType3 { get; set;}
        public int PolicyType4 { get; set;}
        public int PolicyType5 { get; set;}
        public int Ncb1 { get; set; }
        public int Ncb2 { get; set;}
        public int Ncb3 { get; set;}
        public int PosNameId { get; set;}



    }
}
