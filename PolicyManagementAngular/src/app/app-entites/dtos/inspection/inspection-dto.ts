import { IDateDto } from "../common/date-dto";

export interface IInspectionDto {
    ControlNumber: string;
    CustomerName: string;
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
    InspectionDateDto: IDateDto;
    InspectionReasonId: number;
    ReferTypeId: number;
    PosId: number | null;
    TeamMemberId: number | null;
    InspectionLeadNumber: string;
    InspectionCompanyId: number;
    SurveyorName: string;
    SurveyorMobile: string;
    SurveyorEmail: string;
    InspectionStatusId: number;
    InspectionSubStatusId: number;
    Remarks: string;
    InspectionStatus: string;
    InspectionSubStatus: string;
}