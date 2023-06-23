import { Observable } from "rxjs";
import { ICommonDto } from "src/app/app-entites/dtos/common/common-dto";
import { IDataTableDto } from "src/app/app-entites/dtos/common/data-table-dto";
import { IDropDownDto } from "src/app/app-entites/dtos/common/drop-down-dto";


export abstract class IUserService {
    abstract getUserType(): Observable<IDropDownDto<number>[]>;
    abstract getUserRole(branchId:any): Observable<IDropDownDto<number>[]>;
    abstract getUsers(branchId:any): Observable<IDataTableDto<any[]>>;
    abstract getTeamMember(branchId:any): Observable<IDropDownDto<number>[]>;
    abstract createUser(model: any): Observable<ICommonDto<string>>;
    abstract getRoles(branchId:any): Observable<IDataTableDto<any[]>>;
    abstract createRole(model: any): Observable<ICommonDto<string>>;
}
