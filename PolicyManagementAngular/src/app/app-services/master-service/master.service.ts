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

}