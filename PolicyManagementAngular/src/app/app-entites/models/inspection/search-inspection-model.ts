export interface ISearchInspectionModel {
    BranchId: number;
    CustomerName: string;
    ContactNumber: string;
    InspectionReferenceNumber: string;
    InspectionDate: string;
    InsuranceCompanyId?: number;
    PosId?: number;
    RegistrationNumber: string;
    InspectionReasonId?: number;
    ManufacturerId?: number;
    ModelId?: number;
    InspectionEntryFromDate: string;
    InspectionEntryToDate: string;
}