import { Observable } from "rxjs";
import { ICommonDto } from "src/app/app-entites/dtos/common/common-dto";

export abstract class IReportService {
     abstract motorDownloadExcel(Model :any): Observable<ICommonDto<string>>;
     abstract motorUploadExcel(Model :any): Observable<ICommonDto<string>>;

}