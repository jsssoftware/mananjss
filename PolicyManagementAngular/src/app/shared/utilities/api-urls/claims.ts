export class Claims {
    public static readonly ClaimsById = "api/claims";
    public static readonly AddClaims = "api/claims";
    public static readonly UpdateClaims = "api/claims";
    public static readonly SearchClaims = "api/claims/search";
    public static readonly SearchPolicies = "api/claims/policies";
    public static readonly SearchPolicyById = "api/claims/policies";
    public static readonly ClaimsFollowUpDataByClaimsId = "api/claims/{claimsId}/follow-up-reasons";
    public static readonly ClaimsDocumentByPolicyId = "api/claims/documents";
    public static readonly DeleteClaimsDocumentByDocumentId = "api/claims/documents";
}