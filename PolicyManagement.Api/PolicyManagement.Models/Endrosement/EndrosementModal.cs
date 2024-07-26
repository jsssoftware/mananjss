using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PolicyManagement.Models.Endrosement
{
    public class EndrosementModalFilter
    {
            public string number { get; set; }
            public string CustomerName { get; set; }
            public short InsuranceCompany { get; set; }
            public long PolicyNumber { get; set; }
            public string PolicyStartDateFrom { get; set; }
            public string PolicyStartDateTo { get; set; }
            public int PosNameId { get; set; }
            public int BranchId { get; set; }
            public int VerticalId { get; set; }
    }

    public class EndorsementMasterModel
    {
        public short EndrosementType { get; set; }
        public int EndorsementId { get; set; }
        public int PolicyId { get; set; }
        public short? BranchId { get; set; }
        public int VerticalId { get; set; }
        public string EndrosementDate { get; set; }
        public short EndrosementReason { get; set; }
        public short ManufactureId { get; set; }
        public int? OD { get; set; }
        public int? GrossPremium { get; set; }
        public int? ShortfallAmount { get; set; }
        public string ShortfallVoucherNo { get; set; }
        public int? ElectricAccessoriesIDV { get; set; }
        public int? NonElectricAccessoriesIDV { get; set; }
        public int? Cngidv { get; set; }
        public int? VehicleIdv { get; set; }
        public short? NcbPercentage { get; set; }
        public short? BounceReason { get; set; }
        public DateTime? ChequeBounceDate { get; set; }
        public int? OdRecoverable { get; set; }
        public int? PremiumRecoverable { get; set; }
        public short? VehicleClassId { get; set; }
        public short? ManufacturerId { get; set; }
        public short? ModelId { get; set; }
        public short? Variant { get; set; }
        public string Remark { get; set; }
        public short? AddOnRiderId { get; set; }
        public DateTime? RiskExpireDate { get; set; }
        public short? RtoZone { get; set; }
        public short? RiskZone { get; set; }
        public string RegistrationNumber { get; set; }
        public int? AlternateInsuranceCompanyId { get; set; }
        public string AlternatePolicyNumber { get; set; }
        public DateTime? AlternateInceptionDate { get; set; }
        public short PolicyTypeId { get; set; }
        public bool PolicyReinstate { get; set; } = false;
        public bool CancelledNCBRecoverable { get; set; } = false;
        public bool NCBRecovered { get; set; } = false;
        public bool IsModified { get; set; }
        public int PolicyNo { get; set; }


    }


    public enum EndorsementReason
    {
        CancellationChequeBounce = 1,
        CancellationTheft = 2,
        CancellationTotalLoss = 3,
        CancellationNCBFalsificationForfeit = 4,
        ChangeOfOwnershipNameOnly = 5,
        CorrectionInData = 9,
        AdditionOfCNGLPG = 10,
        RemovalOfCNGLPG = 11,
        AdditionOfAccessoriesPassengerDiscount = 12,
        RemovalOfAccessoriesPassengerDiscount = 13,
        NCBRecoveryWrongDeclaration = 14,
        NCBPercentAddedClientRequest = 15,
        ChangeOfOwnershipNCBAdjustment = 16,
        AdditionOfAddOnPlan = 17,
        CancellationCustomerRequest = 18,
        CancellationDoubleInsuranceByInsCo = 20,
        CancellationVehicleNotDelivered = 21,
        CancellationByInsuranceCompany = 22,
        PolicyReinstateChequeBounce = 24,
        CancellationNCBReservingFalsificationRefund = 25,
        NCBRecoverable = 26,
        NCBRecovered = 27,
        CancellationDoubleEntryMistakeInSoftware = 28,
        CancellationWrongRiskDate = 29,
        CancellationVehicleSold = 30,
        SwappingOfDSACode = 31,
        AdditionOfDSACode = 32,
        VehicleModelOrVariantOrClassChange = 33,
        CancellationAsPerCommissionStatementSMS = 34,
        MemberAdditionHealth = 35,
        MemberDeletionHealth = 36,
        ChangeOfDOBIncreaseSlabHealth = 37,
        ChangeOfDOBDecreaseSlabHealth = 38,
        CancellationNonDisclosureHealth = 39,
        CancellationChangeOfPlanTravel = 40,
        ExtensionOfTripTravel = 41,
        CancellationTripCancelledTravel = 42,
        ReturnExtensionDateChangeTravel = 43,
        ChangeOfPolicyPeriodIncreaseTravel = 44,
        ChangeRiskClassToHigherPA = 45,
        AdditionOfSumInsuredFire = 46,
        AdditionOfLocationFire = 47,
        EnhancedSumInsuredMarineOpen = 48,
        CollectionAtEndMarineOpen = 49,
        DeletionOfSumInsuredFireMarine = 50,
        DeletionOfLocationFire = 51,
        ChangeRiskClassToLowerPA = 52,
        ChangeOfPolicyPeriodDecreaseTravel = 53,
        MemberAdditionAndDeletionGPAMisc = 54,
        CancellationCaseRejectedByCompany = 55,
        CancellationNCBFalsificationShortScale = 56,
        NCBRecoverableCancel = 57,
        RTOLocationChange = 58,
        PolicyNotCancel = 60,
        AdditionOfIDV = 61,
        RemovalOfIDV = 62,
        NCBRecoveredCancel = 63
    }

    public class PolicyResult
    {
        public int PolicyId { get; set; }
        public string ControlNo { get; set; }
        public short VerticalId { get; set; }
        public string NameInPolicy { get; set; }
        public string RegistrationNo { get; set; }
        public decimal? GrossPremium { get; set; }
        public string BranchCode { get; set; }
        public string ManufacturerName { get; set; }
        public string POSName { get; set; }
        public DateTime? PolicyStartDate { get; set; }
        public DateTime? PolicyEndDate { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public DateTime? StartDate { get; set; }
        public string PolicyNumber { get; set; }
        public string InsuranceCompanyName { get; set; }
        public string PolicyRemarks { get; set; }
        public int? CreatedBy { get; set; }
        public bool RenewalDone { get; set; }
        public short? VerticalSegmentId { get; set; }
        public string ModelName { get; set; }
        public int? TotalIDV { get; set; }
        public string VariantName { get; set; }
        public int? ReferenceId { get; set; }
        public int? TeleCallerId { get; set; }
        public int? FOSId { get; set; }
        public int POSId { get; set; }
        public string PlanName { get; set; }
        public string ProductName { get; set; }
        public string VerticalName { get; set; }
        public short? InsuranceCompanyId { get; set; }
        public short? ProductId { get; set; }
        public string CustomerName { get; set; }
        public int NCBPercentage { get; set; }
        public string CoverNoteNo { get; set; }
        public short PolicyTypeId { get; set; }
        public string PlanTypeName { get; set; }
        public double controlNumberDigit { get; set; }
    }


}
