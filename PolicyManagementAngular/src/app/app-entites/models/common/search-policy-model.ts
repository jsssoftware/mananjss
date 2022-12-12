import { PolicyManagement } from "src/app/shared/utilities/enums/enum";

export interface ISearchPolicyModel {
    ControlNumber: IControlNumber;
    CustomerName: string;
    InsuranceCompany: number;
    PolicyNumber: string;
    RegistrationNumber: string;
    Manufacture: number;
    Model: number;
    Pos: number;
    PolicyStartDateFrom: string;
    PolicyStartDateTo: string;
    PolicyEndDateFrom: string;
    PolicyEndDateTo: string;
    MobileNumber: string;
    Vertical: number;
    Product: number;
    PolicyManagementType: PolicyManagement;
    // PageNumber: number;
    // PageSize: number;
    IsForDownload : boolean;
    IsForShowAll : boolean; 
}

export interface IControlNumber {
    Year: string;
    BranchCode: string;
    VerticalCode: string;
    Number: string;
}