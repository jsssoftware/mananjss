namespace PolicyManagement.Models.Motor
{
    public class PremiumFormDataModel
    {
        public int VehicleIdv { get; set; }
        public int ElectricAccessoriesIdv { get; set; }
        public int NonElectricAccessoriesIdv { get; set; }
        public int CngLpgIdv { get; set; }
        public int TotalIdv { get; set; }
        public decimal Od { get; set; }
        public decimal AddOnRiderOd { get; set; }
        public decimal EndorseOd { get; set; }
        public int TotalOd { get; set; }
        public decimal Tp { get; set; }
        public decimal PassengerCover { get; set; }
        public decimal EndorseTp { get; set; }
        public int TotalTp { get; set; }
        public decimal NonCommissionComponentPremium { get; set; }
        public decimal GstPercentage { get; set; }
        public decimal GstValue { get; set; }
        public decimal GrossPremium { get; set; }
        public decimal EndorseGrossPremium { get; set; }
        public int TotalGrossPremium { get; set; }
        public decimal SpecialDiscount { get; set; }
        public decimal Loading { get; set; }
        public short Ncb { get; set; }
        public short CommissionPaidOn { get; set; }
        public decimal CommissionablePremium { get; set; }
        public decimal BasicTpGstPercentage { get; set; }
        public int NetPremium { get; set; }
        public decimal? FamilyDiscount { get; set; }
        public decimal? AdditionalDiscount { get; set; }
        public decimal? LongtermDiscount { get; set; }
        public decimal? SectionDiscount { get; set; }
    }
}
