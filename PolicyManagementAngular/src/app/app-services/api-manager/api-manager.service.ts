import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IApiManagerService } from './abstracts/api-manager-iservice';
import { Observable } from 'rxjs';

@Injectable()
export class ApiManagerService extends IApiManagerService {

  private readonly _baseUrl: string;
  constructor(private http: HttpClient) {
    super();
    //this._baseUrl = 'https://localhost:44382/';
    this._baseUrl = '';
  }

  getRequest = <T>(url: string): Observable<any> => this.http.get<T>(`${this._baseUrl}${url}`);

  getRequestDownloadFile = (url: string): Observable<any> => this.http.get(`${this._baseUrl}${url}`, { responseType: 'blob' });

  postRequest = <T>(url: string, model: any): Observable<any> => this.http.post<T>(`${this._baseUrl}${url}`, model);

  putRequest = <T>(url: string, model: any): Observable<any> => this.http.put<T>(`${this._baseUrl}${url}`, model);

  patchRequest = <T>(url: string, model: any): Observable<any> => this.http.patch<T>(`${this._baseUrl}${url}`, model);

  postRequestWithHeader = <T>(url: string, model: any, headers: HttpHeaders): Observable<any> => this.http.post<T>(`${this._baseUrl}${url}`, model, { headers: headers });

  postRequestDownloadFile = (url: string, model: any): Observable<any> => this.http.post<any>(`${this._baseUrl}${url}`, model, { responseType: 'blob' as 'json' });

  deleteRequest = <T>(url: string): Observable<any> => this.http.delete<T>(`${this._baseUrl}${url}`);

  // getRequest<T>(url: string): Observable<any> {

  //   let token = sessionStorage.getItem('oauth-token') || "";
  //   return this.http.get<T>(`${this._baseUrl}${url}`, { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) });
  // }

  // getRequestDownloadFile(url: string): Observable<any> {
  //   let token = sessionStorage.getItem('oauth-token') || "";
  //   return this.http.get(`${this._baseUrl}${url}`, { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }), responseType: 'blob' });
  // }

  // postRequest<T>(url: string, model: any): Observable<any> {
  //   let token = sessionStorage.getItem('oauth-token') || "";
  //   return this.http.post<T>(`${this._baseUrl}${url}`, model, { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) });
  // }

  // postRequestWithHeader<T>(url: string, model: any, headers: HttpHeaders): Observable<any> {
  //   return this.http.post<T>(`${this._baseUrl}${url}`, model, { headers: headers });
  // }

  // postRequestDownloadFile(url: string, model: any): Observable<any> {
  //   let token = sessionStorage.getItem('oauth-token') || "";
  //   return this.http.post<any>(`${this._baseUrl}${url}`, model, { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }), responseType: 'blob' as 'json' });
  // }
}
