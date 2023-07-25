import { Injectable } from "@angular/core";
import { IDropDownDto } from "src/app/app-entites/dtos/common/drop-down-dto";
import { IApiManagerService } from "../api-manager/abstracts/api-manager-iservice";
import { Observable } from "rxjs";

import { ICommonDto } from "src/app/app-entites/dtos/common/common-dto";
import { IUserService } from "./abstracts/user.iservice";
import { Common } from "src/app/shared/utilities/api-urls/common";
import { IDataTableDto } from "src/app/app-entites/dtos/common/data-table-dto";
import { UserManangement } from "src/app/shared/utilities/api-urls/usermanagement";
import { IUserRoleModel } from "src/app/app-entites/models/usermanagement/user-role-model";


@Injectable()
export class UserService extends IUserService {

    constructor(private apiManagerService: IApiManagerService) { super(); }

    getUserType = (): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<string>>(Common.UserType);
    getUserRole = (branchId:any): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<string>>(`${Common.UserRole}/${branchId}`);
    getUsers = (branchId:any): Observable<IDataTableDto<any[]>> => this.apiManagerService.getRequest<IDataTableDto<any[]>>(`${Common.Users}/${branchId}`);
    getTeamMember = (branchId:any): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<string>>(`${Common.TeamMember}/${branchId}`);
    createUser = (model: any): Observable<ICommonDto<string>> => this.apiManagerService.postRequest<ICommonDto<string>>(UserManangement.CreateUser, model);
    getTeamMemberById = (teamMemberId :any): Observable<any[]> => this.apiManagerService.getRequest<any[]>(`${Common.TeaMemberId}/${teamMemberId}`);
    getRoles= (branchId:any): Observable<IDataTableDto<any[]>> => this.apiManagerService.getRequest<IDataTableDto<any[]>>(`${UserManangement.GetRoles}/${branchId}`);
    createRole = (model: any): Observable<ICommonDto<string>> => this.apiManagerService.postRequest<ICommonDto<string>>(UserManangement.CreateRole, model);
    getFormList = (): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<string>>(`${UserManangement.FormList}`);
    createUserRights = (model: any): Observable<ICommonDto<any>> => this.apiManagerService.postRequest<IUserRoleModel[]>(UserManangement.CreateUserRights, model);
    getRoleUpdated = (branchId: string,userRoleId:number): Observable<any[]> => this.apiManagerService.getRequest<any[]>(`${UserManangement.GetUpdatedRole}?branchId=${branchId}&userRoleId=${userRoleId}`);


}