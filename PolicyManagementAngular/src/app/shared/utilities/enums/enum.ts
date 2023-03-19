export enum Vertical {
    All,
    Motor,
    Health
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