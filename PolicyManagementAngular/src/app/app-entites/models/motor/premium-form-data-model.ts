export interface IPremiumFormDataModel {
    VehicleIdv: number;
    ElectricAccessoriesIdv: number;
    NonElectricAccessoriesIdv: number;
    CngLpgIdv: number;
    TotalIdv: number;
    Od: number;
    AddOnRiderOd: number;
    EndorseOd: number;
    TotalOd: number;
    Tp: number;
    PassengerCover: number;
    EndorseTp: number;
    TotalTp: number;
    NonCommissionComponentPremium: number; // Not mapped in Api... ask to sir...
    GstPercentage: number;
    GstValue: number;
    GrossPremium: number;
    EndorseGrossPremium: number;
    TotalGrossPremium: number;
    SpecialDiscount: number;
    Loading: number;
    Ncb: number;
    CommissionPaidOn: number;
    CommissionablePremium: number;
    BasicTpGstPercentage :number;
    NetPremium:Number;
    FamilyDiscount?:number;
    AdditionalDiscount?:number;
    LongtermDiscount?:number;
    SectionDiscount?:number;
    MaxDaysSingleTrip?:number;
    TerrorimsPremium?:number;
}