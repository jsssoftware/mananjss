import { IDateDto } from "src/app/app-entites/dtos/common/date-dto";

export interface IInspectionFormDataModel {
    InspectionCompany: number;
    InspectionNumber: string;
    InspectionDateString: string;
    InspectionDateDto: IDateDto|null;
    InspectionTime: string;
    InspectionRemarks: string;
}