import { Observable } from "rxjs";
import { IClaimsDocumentDto } from "src/app/app-entites/dtos/claims/claims-document-dto";
import { IClaimsDto } from "src/app/app-entites/dtos/claims/claims-dto";
import { IClaimsSearchPolicyDto } from "src/app/app-entites/dtos/claims/claims-search-policy-dto";
import { IFollowUpDto } from "src/app/app-entites/dtos/claims/follow-up-dto";
import { ISearchClaimsDto } from "src/app/app-entites/dtos/claims/search-claims-dto";
import { ISearchClaimsPolicyDto } from "src/app/app-entites/dtos/claims/search-claims-policy-dto";
import { ICommonDto } from "src/app/app-entites/dtos/common/common-dto";
import { IAddUpdateClaimsModel } from "src/app/app-entites/models/claims/add-update-claims-model";
import { IClaimsSearchPolicyModel } from "src/app/app-entites/models/claims/claims-search-policy-model";
import { ISearchClaimsModel } from "src/app/app-entites/models/claims/search-claims-model";

export abstract class IClaimsService {
    abstract getClaimsById(claimsId: number): Observable<IClaimsDto>;
    abstract addClaims(model: IAddUpdateClaimsModel): Observable<ICommonDto<string>>;
    abstract updateClaims(claimsId: number, model: IAddUpdateClaimsModel): Observable<ICommonDto<string>>;
    abstract searchClaims(model: ISearchClaimsModel): Observable<ISearchClaimsDto[]>;
    abstract searchPolicies(model: IClaimsSearchPolicyModel): Observable<IClaimsSearchPolicyDto[]>;
    abstract searchPolicyById(policyId: number): Observable<ISearchClaimsPolicyDto>;
    abstract getClaimsFollowUpDataByClaimsId(claimsId: number): Observable<IFollowUpDto[]>;
    abstract getClaimsDocumentsByPolicyId(policyId: number): Observable<IClaimsDocumentDto[]>;
    abstract deleteClaimsDocument(documentId: number): Observable<ICommonDto<string>>;
}