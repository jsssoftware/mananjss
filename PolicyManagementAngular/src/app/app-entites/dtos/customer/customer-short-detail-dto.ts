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

}

export interface ICustomerInsuranceDetail{
    Name: string;
    Address: string;
    CustomerCode: string;
    ClusterCode: string;
    Email: string;
    Cluster: string;
    CustomerType: string;
    ContactPerson: string;
    Mobile: string;
    Pan: string;
    Gstin: string;
    Gender: string;
    DateOfBirth: string;
    PassportNumber: string;
    CustomerId: number;
    ClusterId?:number
    Profession :  string;
    RelationProposer?: string;
    SumInsuredIndividual?: string;
    SumInsuredFloater?: string;
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


}