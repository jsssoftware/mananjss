import { Observable } from "rxjs";
import { ICommonDto } from "src/app/app-entites/dtos/common/common-dto";
import { IDataTableDto } from "src/app/app-entites/dtos/common/data-table-dto";
import { IDropDownDto } from "src/app/app-entites/dtos/common/drop-down-dto";


export abstract class IMasterService {
  
    abstract createInsuranceBranch(model: any): Observable<ICommonDto<string>>;
    abstract getInsuranceBranch(branchId:any): Observable<IDataTableDto<any[]>>;
}
