import { Injectable } from "@angular/core";
import { IDropDownDto } from "src/app/app-entites/dtos/common/drop-down-dto";
import { IApiManagerService } from "../api-manager/abstracts/api-manager-iservice";
import { Observable } from "rxjs";

import { ICommonDto } from "src/app/app-entites/dtos/common/common-dto";
import { IMasterService } from "./abstracts/master.iservice";
import { Common } from "src/app/shared/utilities/api-urls/common";
import { IDataTableDto } from "src/app/app-entites/dtos/common/data-table-dto";
import { UserManangement } from "src/app/shared/utilities/api-urls/usermanagement";
import { IUserRoleModel } from "src/app/app-entites/models/usermanagement/user-role-model";
import { Master } from "src/app/shared/utilities/api-urls/master";


@Injectable()
export class MasterService extends IMasterService {

    constructor(private apiManagerService: IApiManagerService) { super(); }

    getInsuranceBranch= (branchId:any): Observable<IDataTableDto<any[]>> => this.apiManagerService.getRequest<IDataTableDto<any[]>>(`${Master.GetInsuranceBranch}/${branchId}`);
    createInsuranceBranch = (model: any): Observable<ICommonDto<string>> => this.apiManagerService.postRequest<ICommonDto<string>>(Master.CreateInsuranceBranch, model);

    getTeamMember= (branchId:any): Observable<IDataTableDto<any[]>> => this.apiManagerService.getRequest<IDataTableDto<any[]>>(`${Master.GetTeamMember}/${branchId}`);
    createTeamMember = (model: any): Observable<ICommonDto<string>> => this.apiManagerService.postRequest<ICommonDto<string>>(Master.CreateTeamMember, model);

    getPosData= (branchId:any): Observable<IDataTableDto<any[]>> => this.apiManagerService.getRequest<IDataTableDto<any[]>>(`${Master.GetPos}/${branchId}`);
    createPosData = (model: any): Observable<ICommonDto<string>> => this.apiManagerService.postRequest<ICommonDto<string>>(Master.CreatePos, model);

    getPosContactData= (branchId:any): Observable<IDataTableDto<any[]>> => this.apiManagerService.getRequest<IDataTableDto<any[]>>(`${Master.GetPosContact}/${branchId}`);
    createPosContactData = (model: any): Observable<ICommonDto<string>> => this.apiManagerService.postRequest<ICommonDto<string>>(Master.CreatePosContact, model);
    
    getInsuranceCompanyData= (branchId:any): Observable<IDataTableDto<any[]>> => this.apiManagerService.getRequest<IDataTableDto<any[]>>(`${Master.GetInusranceCompany}/${branchId}`);
    createInusraanceComanyData = (model: any): Observable<ICommonDto<string>> => this.apiManagerService.postRequest<ICommonDto<string>>(Master.CreateInusranceCompany, model);

    getClusterData= (branchId:any): Observable<IDataTableDto<any[]>> => this.apiManagerService.getRequest<IDataTableDto<any[]>>(`${Master.GetCluster}/${branchId}`);
    createClusterData = (model: any): Observable<ICommonDto<string>> => this.apiManagerService.postRequest<ICommonDto<string>>(Master.CreateCluster, model);

    getPlans= (branchId:any): Observable<IDataTableDto<any[]>> => this.apiManagerService.getRequest<IDataTableDto<any[]>>(`${Master.GetPlan}/${branchId}`);
    createPlan = (model: any): Observable<ICommonDto<string>> => this.apiManagerService.postRequest<ICommonDto<string>>(Master.CreatePlan, model);

    getAddonPlans= (branchId:any): Observable<IDataTableDto<any[]>> => this.apiManagerService.getRequest<IDataTableDto<any[]>>(`${Master.GetAddonPlan}/${branchId}`);
    createAddonPlan = (model: any): Observable<ICommonDto<string>> => this.apiManagerService.postRequest<ICommonDto<string>>(Master.CreateAddonPlan, model);

    getManufacture= (branchId:any): Observable<IDataTableDto<any[]>> => this.apiManagerService.getRequest<IDataTableDto<any[]>>(`${Master.GetManufacture}/${branchId}`);
    createManufacture = (model: any): Observable<ICommonDto<string>> => this.apiManagerService.postRequest<ICommonDto<string>>(Master.CreateManufacture, model);

    getVehicleModel= (branchId:any): Observable<IDataTableDto<any[]>> => this.apiManagerService.getRequest<IDataTableDto<any[]>>(`${Master.GetVehicleModel}/${branchId}`);
    creatVehicleModel = (model: any): Observable<ICommonDto<string>> => this.apiManagerService.postRequest<ICommonDto<string>>(Master.CreateVehicleModel, model);
    
    getAddonPlanCombo= (branchId:any): Observable<IDataTableDto<any[]>> => this.apiManagerService.getRequest<IDataTableDto<any[]>>(`${Master.GetAddonPlanCombo}/${branchId}`);
    createAddonPlanCombo = (model: any): Observable<ICommonDto<string>> => this.apiManagerService.postRequest<ICommonDto<string>>(Master.CreateAddonPlanCombo, model);

     
    getVarient= (branchId:any): Observable<IDataTableDto<any[]>> => this.apiManagerService.getRequest<IDataTableDto<any[]>>(`${Master.GetVarient}/${branchId}`);
    createVarient = (model: any): Observable<ICommonDto<string>> => this.apiManagerService.postRequest<ICommonDto<string>>(Master.CreateVarient, model);
     
    getBanks= (branchId:any): Observable<IDataTableDto<any[]>> => this.apiManagerService.getRequest<IDataTableDto<any[]>>(`${Master.GetBank}/${branchId}`);
    createBanks = (model: any): Observable<ICommonDto<string>> => this.apiManagerService.postRequest<ICommonDto<string>>(Master.CreateBank, model);

    getCity= (branchId:any): Observable<IDataTableDto<any[]>> => this.apiManagerService.getRequest<IDataTableDto<any[]>>(`${Master.GetCity}/${branchId}`);
    createCity = (model: any): Observable<ICommonDto<string>> => this.apiManagerService.postRequest<ICommonDto<string>>(Master.CreateCity, model);


}