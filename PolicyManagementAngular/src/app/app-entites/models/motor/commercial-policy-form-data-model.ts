import { IDateDto } from "src/app/app-entites/dtos/common/date-dto";
import { ICustomerInsuranceDetail } from "../../dtos/customer/customer-short-detail-dto";
import { IDocumentModel } from "../common/document-model";
import { ICustomerFormDataModel } from "../customer/customer-form-data-model";
import { IAddOnRiderModel } from "./add-on-rider-model";
import { IInspectionFormDataModel } from "./inspection-form-data-model";
import { IMarineFormDataModel } from "./marine-policy-form-data-model copy";
import { INominationFormDataModel } from "./nomination-form-data-model";
import { IPaymentFormDataModel } from "./payment-form-data-model";
import { IPolicySourceFormDataModel } from "./policy-source-form-data-model";
import { IPolicyTermFormDataModel } from "./policy-term-form-data-model";
import { IPremiumFormDataModel } from "./premium-form-data-model";
import { IPreviousPolicyFormDataModel } from "./previous-policy-form-data-model";
import { IProductPlanFormDataModel } from "./product-plan-form-data-model";
import { ITpOdPolicyFormDataModel } from "./tp-od-policy-form-data-model";
import { IVehicleFormDataModel } from "./vehicle-form-data-model";

export interface ICommercialPolicyFormDataModel {
    PolicyId:number;
    BranchId: string;
    VerticalCode: string;
    Customer: ICustomerFormDataModel;
    CoverNoteNumber: string;
    CoverNoteIssueDateString: string;
    CoverNoteIssueDateDto: IDateDto | null;
    PolicyTerm: IPolicyTermFormDataModel;
    TpPolicy: ITpOdPolicyFormDataModel;
    OdPolicy: ITpOdPolicyFormDataModel;
    InsuranceBranch: number; // not mapped in api
    NumberOfKiloMeterCovered: string;
    ExtendedKiloMeterCovered: string;
    FinanceBy: number;
    PreviousPolicy: IPreviousPolicyFormDataModel;
    InspectionData: IInspectionFormDataModel;
    PaymentData: IPaymentFormDataModel[];
    PolicySource: IPolicySourceFormDataModel;
    Premium: IPremiumFormDataModel;
    Document: any;
    ControlNumber: string;
    AddOnRider: IAddOnRiderModel;
    PreviousControlNumber: string;
    PolicyCancelReason: string;
    Vertical: string;
    VerticalId: number;
    VerticalSegmentId: number;
    ReconStatus: string;
    CommissionStatus: string;
    PolicyStatus: string;
    RenewalCounter: number;
    PolicyStatusId: number;
    DataEntryStatus: string;
    DataEntryStatusColor: string;
    PolicyStatusColor: string;
    CommissionStatusColor: string;
    ReconStatusColor: string;
    PolicyCancelReasonColor: string;
    Condition1: boolean;
    Condition2: boolean;
    IsBlockAgent: boolean;
    IsChangeAgent: boolean;
    IsPreviousPolicyApplicable:boolean;
    AddOnSelected: string;
    IsVerified:boolean;
    VerifiedBy?: string;
    VerifiedTime?: string;
    ModifiedBy?: string;
    ModifiedTime?: string;
    CreatedBy?: string;
    CreatedTime?: string;
    PreviousPolicyId:number;
    Flag1?:boolean
    Flag2?:boolean;
    InsuredPersonData?: ICustomerInsuranceDetail[];
    Vehicle : IVehicleFormDataModel;
    Nomination: INominationFormDataModel;
    ProductPlan : IProductPlanFormDataModel;
    Portabality: number | null;
    ContinueStartDate : any | null;
    ContinueStartDateDTO? :IDateDto | null;
    NumberOfChild:Number;
    NumberOfAdult:Number;
    TotalSumInsured:Number;
    FireCoverage:any;
    Marine?: IMarineFormDataModel;
    Misc?: IMiscFormDataModel
    Liability?: ILiabilityFormDataModel
    Enginnering?: IEnginneringFormDataModel
    Gmc?: IGmcDataModel

}

export interface IMiscFormDataModel {
    MiscRate: number
    Misc1: number,
    Misc2: number,
    Misc3: number,
    Misc4: number,
}


export interface ILiabilityFormDataModel {
    LiabilityTermId:number,
    TotalSumInsured: number,
    NoWorker: number,
    NatureCoverage: string,
    ExcessClause: string,
    RiskLocation: number,
    OtherInfo: string,
    RetroSpectiveDate: any,
    PolicyId?:number 
}

export interface IEnginneringFormDataModel {
    EnginneringTermId:number,
    TotalSumInsured: number,
    Rate: number,
    NatureofCoverage: string,
    RiskLocation: number,
    OtherInfo: string,
    PeriodDate: any,
    EnginneringId?:any 
    PolicyId?:number 
}


export interface IGmcDataModel {
    CoverageType: string,
    NoEmployee: number,
    GmcTermId: number,
    NoDependent: string,
    NoLife: number,
    Coverage: string,
    CooperateLimit: string,
    OtherInfo: string,
    PolicyId?:number 
    Covertype:number 
}