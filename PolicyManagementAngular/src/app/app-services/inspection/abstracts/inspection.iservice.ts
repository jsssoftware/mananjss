import { Observable } from "rxjs";
import { ICommonDto } from "src/app/app-entites/dtos/common/common-dto";
import { IInspectionDocumentDto } from "src/app/app-entites/dtos/inspection/inspection-document-dto";
import { IInspectionDto } from "src/app/app-entites/dtos/inspection/inspection-dto";
import { IInspectionSearchPolicyDto } from "src/app/app-entites/dtos/inspection/inspection-search-policy-dto";
import { ISearchInspectionDto } from "src/app/app-entites/dtos/inspection/search-inspection-dto";
import { IAddUpdateInspectionModel } from "src/app/app-entites/models/inspection/add-update-inspection-model";
import { IInspectionSearchPolicyModel } from "src/app/app-entites/models/inspection/inspection-search-policy-model";
import { ISearchInspectionModel } from "src/app/app-entites/models/inspection/search-inspection-model";

export abstract class IInspectionService {
    abstract getInspectionById(inspectionId: number): Observable<IInspectionDto>;
    abstract addInspection(model: IAddUpdateInspectionModel): Observable<ICommonDto<string>>;
    abstract updateInspection(inspectionId: number, model: IAddUpdateInspectionModel): Observable<ICommonDto<string>>;
    abstract getInspectionDocumentsByInspectionId(inspectionId: number): Observable<IInspectionDocumentDto[]>;
    abstract deleteInspectionDocument(documentId: number): Observable<ICommonDto<string>>;
    abstract searchInspections(model: ISearchInspectionModel): Observable<ISearchInspectionDto[]>;
    abstract searchPolicies(model: IInspectionSearchPolicyModel): Observable<IInspectionSearchPolicyDto[]>;
}