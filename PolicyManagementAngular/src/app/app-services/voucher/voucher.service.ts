import { Injectable } from "@angular/core";
import { IDropDownDto } from "src/app/app-entites/dtos/common/drop-down-dto";
import { IApiManagerService } from "../api-manager/abstracts/api-manager-iservice";
import { IVoucherService } from "./abstracts/voucher.iservice";
import { Observable } from "rxjs";
import { Voucher } from "src/app/shared/utilities/api-urls/voucher";
import { IVoucherSearchPolicyDto } from "src/app/app-entites/dtos/voucher/voucher-search-policy-dto";
import { IVoucherSearchPolicyModel } from "src/app/app-entites/models/voucher/voucher-search-policy-model";
import { ISearchVoucherDto } from "src/app/app-entites/dtos/voucher/search-voucher-dto";
import { ISearchVoucherModel } from "src/app/app-entites/models/voucher/search-voucher-model";
import { ICommonDto } from "src/app/app-entites/dtos/common/common-dto";
import { IAddUpdateVoucherModel } from "src/app/app-entites/models/voucher/add-update-voucher-model";
import { IVoucherDto } from "src/app/app-entites/dtos/voucher/voucher-dto";

@Injectable()
export class VoucherService extends IVoucherService {

    constructor(private apiManagerService: IApiManagerService) { super(); }

    getVoucherTypes = (): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<string>>(Voucher.VoucherTypes);

    searchPolicies = (model: IVoucherSearchPolicyModel): Observable<IVoucherSearchPolicyDto[]> => this.apiManagerService.postRequest<IVoucherSearchPolicyDto[]>(Voucher.SearchPolicies, model);

    searchVouchers = (model: ISearchVoucherModel): Observable<ISearchVoucherDto[]> => this.apiManagerService.postRequest<ISearchVoucherDto[]>(Voucher.SearchVouchers, model);

    addVoucher = (model: IAddUpdateVoucherModel): Observable<ICommonDto<string>> => this.apiManagerService.postRequest<ICommonDto<string>>(Voucher.AddVoucher, model);

    updateVoucher = (voucherId: number, model: IAddUpdateVoucherModel): Observable<ICommonDto<string>> => this.apiManagerService.putRequest<ICommonDto<string>>(`${Voucher.UpdateVoucher}/${voucherId}`, model);

    updateVoucherControlNumber = (voucherId: number, model: any): Observable<ICommonDto<string>> => this.apiManagerService.patchRequest<ICommonDto<string>>(`${Voucher.UpdateVoucher}/${voucherId}`, model);

    verifyVoucher = (voucherId: number, model: any): Observable<ICommonDto<string>> => this.apiManagerService.patchRequest<ICommonDto<string>>(`${Voucher.VerifyVoucher}/${voucherId}`, model);

    getVoucherById = (voucherId: number): Observable<IVoucherDto> => this.apiManagerService.getRequest<IVoucherDto>(`${Voucher.VoucherById}/${voucherId}`);
}