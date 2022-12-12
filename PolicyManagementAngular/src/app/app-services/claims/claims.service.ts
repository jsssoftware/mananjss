import { Injectable } from "@angular/core";
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
import { Claims } from "src/app/shared/utilities/api-urls/claims";
import { IApiManagerService } from "../api-manager/abstracts/api-manager-iservice";
import { IClaimsService } from "./abstracts/claims.iservice";

@Injectable()
export class ClaimsService extends IClaimsService {

    constructor(private apiManagerService: IApiManagerService) { super(); }

    addClaims = (model: IAddUpdateClaimsModel): Observable<ICommonDto<string>> => this.apiManagerService.postRequest(Claims.AddClaims, model);

    updateClaims = (claimsId: number, model: IAddUpdateClaimsModel): Observable<ICommonDto<string>> => this.apiManagerService.putRequest(`${Claims.UpdateClaims}/${claimsId}`, model);

    searchClaims = (model: ISearchClaimsModel): Observable<ISearchClaimsDto[]> => this.apiManagerService.postRequest<ISearchClaimsDto[]>(Claims.SearchClaims, model);

    searchPolicies = (model: IClaimsSearchPolicyModel): Observable<IClaimsSearchPolicyDto[]> => this.apiManagerService.postRequest<IClaimsSearchPolicyDto[]>(Claims.SearchPolicies, model);

    searchPolicyById = (policyId: number): Observable<ISearchClaimsPolicyDto> => this.apiManagerService.getRequest<ISearchClaimsPolicyDto>(`${Claims.SearchPolicyById}/${policyId}`);

    getClaimsById = (claimsId: number): Observable<IClaimsDto> => this.apiManagerService.getRequest<IClaimsDto>(`${Claims.ClaimsById}/${claimsId}`);

    getClaimsFollowUpDataByClaimsId = (claimsId: number): Observable<IFollowUpDto[]> => this.apiManagerService.getRequest<IFollowUpDto[]>(`${Claims.ClaimsFollowUpDataByClaimsId.replace('{claimsId}', claimsId.toString())}`);

    getClaimsDocumentsByPolicyId = (policyId: number): Observable<IClaimsDocumentDto[]> => this.apiManagerService.getRequest<IClaimsDocumentDto[]>(`${Claims.ClaimsDocumentByPolicyId}/${policyId}`);

    deleteClaimsDocument = (documentId: number): Observable<ICommonDto<string>> => this.apiManagerService.deleteRequest<ICommonDto<string>>(`${Claims.DeleteClaimsDocumentByDocumentId}/${documentId}`);
}