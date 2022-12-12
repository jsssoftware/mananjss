using PolicyManagement.Utilities.Enums;

namespace PolicyManagement.Models.Common
{
    public class SearchPolicyModel : BaseModel
    {
        public ControlNumber ControlNumber { get; set; }
        public string CustomerName { get; set; }
        public int InsuranceCompany { get; set; }
        public string PolicyNumber { get; set; }
        public string RegistrationNumber { get; set; }
        public int Manufacture { get; set; }
        public int Model { get; set; }
        public int Pos { get; set; }
        public string PolicyStartDateFrom { get; set; }
        public string PolicyStartDateTo { get; set; }
        public string PolicyEndDateFrom { get; set; }
        public string PolicyEndDateTo { get; set; }
        public string MobileNumber { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public PolicyManagementType PolicyManagementType { get; set; }
        public int Product { get; set; }
        public int Vertical { get; set; } 
        public bool IsForDownload { get; set; } 
        public bool IsForShowAll { get; set; } 
    }

    public class ControlNumber
    {
        public string Year { get; set; }
        public string BranchCode { get; set; }
        public string VerticalCode { get; set; }
        public string Number { get; set; }
    }
}
