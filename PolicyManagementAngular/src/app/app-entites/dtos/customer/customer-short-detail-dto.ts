export interface ICustomerShortDetailDto
{
    NameInPolicy: string;
    AddressInPolicy: string;
    CustomerCode: string;
    ClusterCode: string;
    Email: string;
    Cluster: string;
    CustomerType: string;
    ContactPerson: string;
    ContactNumber: string;
    Pan: string;
    Gstin: string;
    Gender: string;
    DateOfBirth: string;
    PassportNumber: string;
    CustomerId: number;
    ClusterId?:number,
    Profession :  string;
    Name? :  string;
    CityId? :  number;
    ReferById? :  number;
    ReferByName? :  string;
    PosId? :  number;
    TeamMemebrId? :  number;
    ReferenceId? :  number;

}

export interface ICustomerInsuranceDetail{
    Name: string;
    Address: string;
    CustomerCode: string;
    Code: string;
    Email: string;
    Cluster: string;
    CustomerType: string;
    ContactPerson: string;
    Mobile: string;
    Pan: string;
    Gstin: string;
    Gender: string;
    DateOfBirth: Date;
    PassportNumber: string;
    CustomerId: number;
    ClusterId?:number
    Profession :  string;
    RelationProposer?: number;
    SumInsuredIndividual?: number;
    SumInsuredFloater?: number;
    CumulativeBonus?: string;
    Deductable?: string;
    LoadingReason?: string;
    Loading?: string;
    Ped?: string;
    PedExclusion?: string;
    Ppc?: string;
    AnualIncome?: string;
    RiskClass?: number;
    NomineeName?: string;
    NomineeRelationship?: string;
    Aadhar?: string;
    GenderId:number;
    BranchId:number;
    CityId:number;
    uid:number;
    ReferById? :  number;
    PosId? :  number;
    TeamMemebrId? :  number;
    ReferenceId? :  number;
    NomineeRelationShipName? :  string;
    PedName? :  string;
    PpcName? :  string;
    RelationProposerName?: string;
    ProfessionName?: string;
    Age?: Number;
}