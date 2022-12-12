using PolicyManagement.Dtos.Common;
using System;

namespace PolicyManagement.Models.Motor
{
    public class VehicleFormDataModel
    {
        public short Manufacturer { get; set; }
        public short Model { get; set; }
        public int Varient { get; set; }
        public string FuelType { get; set; }
        public int Cc { get; set; }
        public int Seating { get; set; }
        public int Gvw { get; set; }
        public int Kw { get; set; }
        public int ExShowRoomValue { get; set; }
        public string RegistrationNumber { get; set; }
        public string EngineNumber { get; set; }
        public string ChassisNumber { get; set; }
        public int VehicleSegment { get; set; }
        public short RtoZone { get; set; }
        public string RiskZone { get; set; }
        public short MakeYear { get; set; }
        public string RegistrationDateString { get; set; }
        public DateTime? RegistrationDate { get; set; }
        public DateDto RegistrationDateDto { get; set; }
        public short Usage { get; set; }
        public bool IsSpecialRegistrationNumber { get; set; }
    }
}
