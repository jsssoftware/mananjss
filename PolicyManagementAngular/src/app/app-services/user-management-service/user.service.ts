import { Injectable } from "@angular/core";
import { IDropDownDto } from "src/app/app-entites/dtos/common/drop-down-dto";
import { IApiManagerService } from "../api-manager/abstracts/api-manager-iservice";
import { Observable } from "rxjs";

import { ICommonDto } from "src/app/app-entites/dtos/common/common-dto";
import { IUserService } from "./abstracts/user.iservice";
import { Common } from "src/app/shared/utilities/api-urls/common";
import { IDataTableDto } from "src/app/app-entites/dtos/common/data-table-dto";


@Injectable()
export class UserService extends IUserService {

    constructor(private apiManagerService: IApiManagerService) { super(); }

    getUserType = (): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<string>>(Common.UserType);
    getUserRole = (): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<string>>(Common.UserRole);
    getUsers = (): Observable<IDataTableDto<any[]>> => this.apiManagerService.getRequest<IDataTableDto<any[]>>(Common.Users);
    getTeamMember = (): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<string>>(Common.TeamMember);
}