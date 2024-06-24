export enum Vertical {
    All,
    Motor,
    Health,
    Pesonal_Accident = 6,
    Travel = 3,
    Engineering = 13,
    Fire = 4,
    Misc = 7,
    Liabality = 12,
    Marine = 5,
    Life = 14,
    GMC =15

}

export enum PolicyManagement {
    New = 1,
    Renew,
    InComplete,
    Correction,
    Verify,
    Modify,
    View
}

export enum PolicyType {
    New = 1,
    SameCompanyRetention,
    Rollover,
    OtherCompanyRetention,
    Renewal
}

export enum FormMode {
    Add = 1,
    Update,
    View
}

export enum SearchPolicyType{
    Motor_New=1,
    Motor_Renew,
    Motor_Incomplete,
    Motor_Correction,
    Motor_Verify,
    Motor_Modify,
    Motor_View,
    Motor_rollover
}

export enum SearchPolicyTypeName{
    Motor_New='New Policy Data Entry',
    Motor_Renew='Renew Policy Data Entry',
    Motor_Incomplete='Data entry Incomplete',
    Motor_Correction='Data Entry Correction',
    Motor_Verify='Verify Policy Data Entry',
    Motor_Modify='Modify Policy Data Entry',
    Motor_View='View Policy Data',
    Motor_rollover='Rollover Policy'
}

export enum PackageType{
    TP_ONLY=1,
    OD_ONLY,
    COMPREHENSIVE,
    USAGE_BASE
}

export enum Common{
    ZERO =22,
    NCB50VALUE = 6
}

export enum ProductPlanType{
    Floater =2,
    Individual = 1,
    Hybrid=3
}

export enum Portabality{
    NotApplicable =1,
    Yes,
    No
}
export enum VerticalSegment{
    Motor =1,
    Retail,
    Commercial
}
export enum FullApplicationAccess{
    AdminBusiness = 'Admin, Business Head'
}



export enum EndorsementReason {
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
    RemovalOfIDV = 62
  }
  