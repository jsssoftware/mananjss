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


    public class RetailMotherReport
    {
        public int InsuranceCompanyId { get; set; }
        public string PolicyInspectionDateFrom { get; set; }
        public string PolicyInspectionDateTo { get; set; }
        public int BusinessDoneBy { get; set; }
        public int ReferenceId { get; set; }
        public int TeleCallerId { get; set; }
        public int FosId { get; set; }
        public int BranchId { get; set; }
        public int PosmanagedBy { get; set; }
        public bool PolicyType1 { get; set; }
        public bool PolicyType2 { get; set; }
        public bool PolicyType3 { get; set; }
        public bool PolicyType4 { get; set; }
        public bool PolicyType5 { get; set; }
        public int PosNameId { get; set; }
        public bool Vertical1 { get; set; }
        public bool Vertical2 { get; set; }
        public bool Vertical3 { get; set; }
        public bool Vertical4 { get; set; }
        public bool Vertical5 { get; set; }
        public bool Vertical6 { get; set; }
        public int Product { get; set; }
        public int Plan { get; set; }
        public int PlanTypes { get; set; }
    }


    public class RenewPerfomance
    {
        public int InsuranceCompanyId { get; set; }
        public string ExpiryDateFrom { get; set; }
        public string ExpiryDateTo { get; set; }
        public int InsuranceType { get; set; }
        public int BusinessType { get; set; }
        public int TeamMemberId { get; set; }
        public int TeamMemberType { get; set; }
        public int BranchId { get; set; }
      
    }

    public class AgentSwapFilter
    {
        public string number { get; set; }
        public string CustomerName { get; set; }
        public short InsuranceCompany { get; set; }
        public long PolicyNumber { get; set; }
        public string RegistrationNumber { get; set; }
        public string PolicyStartDateFrom { get; set; }
        public string PolicyStartDateTo { get; set; }
        public int PosNameId { get; set; }
        public int BranchId { get; set; }
        public int VerticalId { get; set; }
    }

    public class AgentSwapUpdate
    {
        public int ReferenceId { get; set; }
        public short TeleCallerId { get; set; }
        public short FosId { get; set; }
        public int PosNameId { get; set; }
        public string PolicyRemarks { get; set; }
        public int PolicyId { get; set; }
        public int BranchId { get; set; }
    }

    public class RenewDump
    {
        public int InsuranceCompanyId { get; set; }
        public string ExpiryDateFrom { get; set; }
        public string ExpiryDateTo { get; set; }
        public int BranchId { get; set; }
        public int VerticalId { get; set; }


    }


    public class CustomerCluster
    {
        public string Number { get; set; }
        public string CustomerName { get; set; }
        public string CustomerCode { get; set; }
        public string CustomerPhoneNo { get; set; }
        public string  ClusterName { get; set; }
        public string ClusterCode { get; set; }
        public string ClusterPhoneNumber { get; set; }
        public int VerticalId { get; set; }
        public int PolicyActivation { get; set; }
        public int Filter { get; set; }

    }


    public class POSPerfomanceReport
    {
        public string TeamMemberName { get; set; }
        public string POSCode { get; set; }
        public string POSName { get; set; }
        public string CategoryName { get; set; }
        public string CompanyName { get; set; }
        public decimal? ODSum { get; set; }
        public int NoOfPolicies { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
        public string PolicyType { get; set; }
        public string ManagedBy { get; set; }
    }


    public class POSPerfomance
    {
        public DateTime policyStartDateFrom { get; set; }
        public DateTime policyStartDateTo { get; set; }
        public int reportType { get; set; }
        public int? insureCompanyId { get; set; }
        public int? posId { get; set; }
        public int? teamMemberId { get; set; }
    }


    public class DataEntryPerfomance
    {
        public int InsuranceCompanyId { get; set; }
        public int BranchId { get; set; }
        public int VerticalId { get; set; }
        public int PosNameId { get; set; }
        public DateTime policyStartDateFrom { get; set; }
        public DateTime policyStartDateTo { get; set; }
        public int reportType { get; set; }
      
    }


    public class LostDataCalling
    {
        public int? InsuranceCompanyId { get; set; }
        public int BranchId { get; set; }
        public int VerticalId { get; set; }
        public int? PosNameId { get; set; }
        public int? Inhouse { get; set; }
        public DateTime policyEndDateFrom { get; set; }
        public DateTime policyEndDateTo { get; set; }
        public int teamMemberType { get; set; }

    }


    public class RECReport
    {
        public int? InsuranceCompanyId { get; set; }
        public int BranchId { get; set; }
        public int VerticalId { get; set; }
        public int? PosNameId { get; set; }
        public int? InhouseId { get; set; }
        public int? RefrenceId { get; set; }
        public DateTime policyStartDateFrom { get; set; }
        public DateTime policyStartDateTo { get; set; }
        public int RECType { get; set; }

    }



}
