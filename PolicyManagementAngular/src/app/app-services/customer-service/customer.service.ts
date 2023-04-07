import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICommonDto } from "src/app/app-entites/dtos/common/common-dto";
import { IDropDownDto } from "src/app/app-entites/dtos/common/drop-down-dto";
import { ICustomerShortDetailDto } from "src/app/app-entites/dtos/customer/customer-short-detail-dto";
import { IAddUpdateCustomerModel } from "src/app/app-entites/models/customer/add-update-customer-model";
import { Customer } from "src/app/shared/utilities/api-urls/customer";
import { IApiManagerService } from "../api-manager/abstracts/api-manager-iservice";
import { ICustomerService } from "./abstracts/customer.iservice";

@Injectable()
export class CustomerService extends ICustomerService {
    constructor(private apiManagerService: IApiManagerService) { super(); }

    getCustomerByName = (name: string, pageNumber: number, pageSize: number): Observable<any> =>
        this.apiManagerService.getRequest(`${Customer.CustomerByName}?name=${name}&pageNumber=${pageNumber}&pageSize=${pageSize}`);

    getCustomerNames = (): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<number>[]>(`${Customer.CustomerNames}`);

    getAllTitles = (): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<number>[]>(Customer.Titles);

    getAllTerritories = (branchId: number): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<number>[]>(`${Customer.Territories}/${branchId}`);

    getAllMaritalStatus = (): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<number>[]>(Customer.MaritalStatus);

    getAllProfessions = (): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<number>[]>(Customer.Professions);

    getAllLineOfBusinesses = (): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<number>[]>(Customer.BusinessLines);

    getAllIndustries = (): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<number>[]>(Customer.Industries);

    getAllDesignations = (): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<number>[]>(Customer.Designations);

    addCustomer = (model: IAddUpdateCustomerModel): Observable<ICommonDto<string>> => this.apiManagerService.postRequest<ICommonDto<string>>(Customer.AddCustomer, model);

    getCustomerByCode = (code: string): Observable<ICommonDto<IAddUpdateCustomerModel>> =>
        this.apiManagerService.getRequest<ICommonDto<IAddUpdateCustomerModel>>(`${Customer.CustomerByCode}/${code}`);

    getCustomerById = (customerId: number): Observable<ICommonDto<IAddUpdateCustomerModel>> =>
        this.apiManagerService.getRequest<ICommonDto<IAddUpdateCustomerModel>>(`${Customer.CustomerById}/${customerId}`);

    getCustomerShortDetailById = (customerId: number): Observable<ICustomerShortDetailDto> =>
        this.apiManagerService.getRequest<ICustomerShortDetailDto>(`${Customer.CustomerShortDetailById}/${customerId}`);

    getAllTitlesWithoutMS = (): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<number>[]>(Customer.TitlesWithoutMS);

    getAllClusters = (): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<number>[]>(Customer.AllClusters);

    getCustomerDataByClusterId = (customerId: number): Observable<ICustomerShortDetailDto> =>
    this.apiManagerService.getRequest<ICustomerShortDetailDto>(`${Customer.Clusters}/${customerId}`);
}