import { Observable } from "rxjs";
import { ICommonDto } from "src/app/app-entites/dtos/common/common-dto";
import { IDataTableDto } from "src/app/app-entites/dtos/common/data-table-dto";
import { IDropDownDto } from "src/app/app-entites/dtos/common/drop-down-dto";


export abstract class IUserService {
    abstract getUserType(): Observable<IDropDownDto<number>[]>;
    abstract getUserRole(): Observable<IDropDownDto<number>[]>;
    abstract getUsers(): Observable<IDataTableDto<any[]>>;
    abstract getTeamMember(): Observable<IDropDownDto<number>[]>;
    abstract createUser(model: any): Observable<ICommonDto<string>>;

}
