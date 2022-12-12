import { IInspectionDocumentModel } from "./inspection-document-model";

export interface IAddUpdateInspectionModel {
    PolicyId: number;
    ControlNumber: string;
    CustomerName: string;
    CustomerId: number;
    ContactPerson: string;
    MobileNumber: string;
    Email: string;
    LocationAddress: string;
    RegistrationNumber: string;
    MakeYearId: number;
    ManufactureId: number;
    ModelId: number;
    InsuranceCompanyId: number;
    EngineNumber: string;
    ChassisNumber: string;
    InspectionDate: string;
    InspectionReasonId: number;
    ReferTypeId: number;
    PosId: number;
    TeamMemberId: number;
    InspectionLeadNumber: string;
    InspectionCompanyId: number;
    SurveyorName: string;
    SurveyorMobile: string;
    SurveyorEmail: string;
    InspectionStatusId: number;
    InspectionSubStatusId: number;
    Remarks: string;
    InspectionDocuments: IInspectionDocumentModel[];
}