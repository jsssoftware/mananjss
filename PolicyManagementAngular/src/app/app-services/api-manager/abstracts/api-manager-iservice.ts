import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class IApiManagerService {
    abstract getRequest<T>(url: string): Observable<any>;
    abstract getRequestDownloadFile(url: string): Observable<any>;
    abstract postRequest<T>(url: string, model: any): Observable<any>;
    abstract putRequest<T>(url: string, model: any): Observable<any>;
    abstract patchRequest<T>(url: string, model: any): Observable<any>;
    abstract postRequestWithHeader<T>(url: string, model: any, headers: HttpHeaders): Observable<any>;
    abstract postRequestDownloadFile(url: string, model: any): Observable<any>;
    abstract deleteRequest<T>(url: string): Observable<any>;
}