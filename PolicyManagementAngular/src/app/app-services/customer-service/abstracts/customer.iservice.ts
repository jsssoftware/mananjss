import { Observable } from "rxjs";
import { ICommonDto } from "src/app/app-entites/dtos/common/common-dto";
import { IDropDownDto } from "src/app/app-entites/dtos/common/drop-down-dto";
import { ICustomerShortDetailDto } from "src/app/app-entites/dtos/customer/customer-short-detail-dto";
import { IAddUpdateCustomerModel } from "src/app/app-entites/models/customer/add-update-customer-model";

export abstract class ICustomerService {
    abstract getCustomerByName(name: string, pageNumber: number, pageSize: number): Observable<any>;
    abstract getCustomerNames(): Observable<IDropDownDto<number>[]>;
    abstract getCustomerNamesAndPhone(): Observable<IDropDownDto<number>[]>;
    abstract getAllTitles(): Observable<IDropDownDto<number>[]>;
    abstract getAllTerritories(branchId: number): Observable<IDropDownDto<number>[]>;
    abstract getAllMaritalStatus(): Observable<IDropDownDto<number>[]>;
    abstract getAllProfessions(): Observable<IDropDownDto<number>[]>;
    abstract getAllLineOfBusinesses(): Observable<IDropDownDto<number>[]>;
    abstract getAllIndustries(): Observable<IDropDownDto<number>[]>;
    abstract getAllDesignations(): Observable<IDropDownDto<number>[]>;
    abstract addCustomer(model: IAddUpdateCustomerModel): Observable<ICommonDto<string>>;
    abstract getCustomerByCode(code: string): Observable<ICommonDto<IAddUpdateCustomerModel>>;
    abstract getCustomerById(customerId: number): Observable<ICommonDto<IAddUpdateCustomerModel>>;
    abstract getCustomerShortDetailById(customerId: number): Observable<ICustomerShortDetailDto>;
    abstract getAllTitlesWithoutMS(): Observable<IDropDownDto<number>[]>;
    abstract getAllClusters(): Observable<IDropDownDto<number>[]>;
    abstract getCustomerDataByClusterId(clusterId: number): Observable<ICustomerShortDetailDto>;

}