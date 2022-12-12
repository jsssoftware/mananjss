using PolicyManagement.Dtos.Common;

namespace PolicyManagement.Dtos.Motor
{
    public class RtoZoneDto : DropDownDto<int>
    {
        public string RtoZoneCode { get; set; }
        public string RiskZone { get; set; }
    }
}
