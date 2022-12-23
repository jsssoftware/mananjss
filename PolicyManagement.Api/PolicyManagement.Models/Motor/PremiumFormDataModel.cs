namespace PolicyManagement.Models.Motor
{
    public class PremiumFormDataModel
    {
        public int VehicleIdv { get; set; }
        public int ElectricAccessoriesIdv { get; set; }
        public int NonElectricAccessoriesIdv { get; set; }
        public int CngLpgIdv { get; set; }
        public int TotalIdv { get; set; }
        public int Od { get; set; }
        public int AddOnRiderOd { get; set; }
        public int EndorseOd { get; set; }
        public int TotalOd { get; set; }
        public int Tp { get; set; }
        public int PassengerCover { get; set; }
        public int EndorseTp { get; set; }
        public int TotalTp { get; set; }
        public int NonCommissionComponentPremium { get; set; }
        public decimal GstPercentage { get; set; }
        public decimal GstValue { get; set; }
        public decimal GrossPremium { get; set; }
        public int EndorseGrossPremium { get; set; }
        public int TotalGrossPremium { get; set; }
        public decimal SpecialDiscount { get; set; }
        public decimal Loading { get; set; }
        public short Ncb { get; set; }
        public short CommissionPaidOn { get; set; }
        public decimal CommissionablePremium { get; set; }
    }
}
