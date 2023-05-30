import { Injectable } from "@angular/core";
import { Moment } from "moment";
import { Observable } from "rxjs";
import { IDataTableDto } from "src/app/app-entites/dtos/common/data-table-dto";
import { IDateDto } from "src/app/app-entites/dtos/common/date-dto";
import { IDropDownDto } from "src/app/app-entites/dtos/common/drop-down-dto";
import { IMenuItemDto } from "src/app/app-entites/dtos/common/menuitem-dto";
import { IPolicyDocumentDto } from "src/app/app-entites/dtos/common/policy-document-dto";
import { IPolicyInspectionDto } from "src/app/app-entites/dtos/common/policy-inspection-dto";
import { IPolicyVoucherDto } from "src/app/app-entites/dtos/common/policy-voucher-dto";
import { IPreviousClaimDto } from "src/app/app-entites/dtos/common/previous-claims-dto";
import { ISearchPolicyDto } from "src/app/app-entites/dtos/common/search-policy-dto";
import { IAddOnPlanOptionDto } from "src/app/app-entites/dtos/motor/add-on-plan-option-dto";
import { IPolicyTermDto } from "src/app/app-entites/dtos/motor/policy-term-dto";
import { IRtoZoneDto } from "src/app/app-entites/dtos/motor/rto-zone-dto";
import { IVarientDto } from "src/app/app-entites/dtos/motor/varient-dto";
import { IVehicleDto } from "src/app/app-entites/dtos/motor/vehicle-dto";
import { IYearDto } from "src/app/app-entites/dtos/motor/year-dto";
import { ISearchPolicyModel } from "src/app/app-entites/models/common/search-policy-model";
import { Common } from "src/app/shared/utilities/api-urls/common";
import { Vertical } from "src/app/shared/utilities/enums/enum";
import { IApiManagerService } from "../api-manager/abstracts/api-manager-iservice";
import { ICommonService } from "./abstracts/common.iservice";

@Injectable()
export class CommonService extends ICommonService {
   
    constructor(private apiManagerService: IApiManagerService) { super(); }

    getBanks = (): Observable<IDropDownDto<string>> => this.apiManagerService.getRequest<IDropDownDto<string>>(Common.Banks);

    getVerticalById = (verticalId: number): Observable<any> => this.apiManagerService.getRequest<any>(`${Common.Verticals}/${verticalId}`);

    getVerticals = (): Observable<any> => this.apiManagerService.getRequest<any>(`${Common.Verticals}`);

    getPolicyTypes = (type: number): Observable<any> => this.apiManagerService.getRequest<any>(`${Common.PolicyTypes}/${type}`);

    getVehicleClasses = (): Observable<any> => this.apiManagerService.getRequest(Common.VehicleClasses);

    getPackageTypes = (): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<number>[]>(Common.PackageTypes);

    getPolicyTerms = (policyTypeId: number, vehicleClassId: number, policyPackageTypeId: number): Observable<IPolicyTermDto[]> =>
        this.apiManagerService.getRequest<IPolicyTermDto[]>(`${Common.PolicyTerms}?policyTypeId=${policyTypeId}&vehicleClassId=${vehicleClassId}&policyPackageTypeId=${policyPackageTypeId}`);

    getInsuranceCompanies = (vertical: Vertical): Observable<IDropDownDto<number>[]> =>
        this.apiManagerService.getRequest<IDropDownDto<number>[]>(`${Common.InsuranceCompanies}/${vertical}`);

    getInsuranceCompanyBranches = (vertical: Vertical, insuranceCompanyId: number, branchId: number): Observable<IDropDownDto<number>[]> =>
        this.apiManagerService.getRequest<IDropDownDto<number>[]>(`${Common.InsuranceCompanyBranches}?vertical=${vertical}&insuranceCompanyId=${insuranceCompanyId}&branchId=${branchId}`);

    getNumberOfYears = (): Observable<IYearDto[]> => this.apiManagerService.getRequest<IYearDto[]>(Common.Years);

    getFinancers = (): Observable<any> => this.apiManagerService.getRequest<any>(Common.Financers);

    getInspectionCompanies = (): Observable<any> => this.apiManagerService.getRequest(Common.InspectionCompanies);

    getVehicles = (vehicleClassId: number): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest(`${Common.Vehicles}/${vehicleClassId}`);

    getManufacturers = (): Observable<any> => this.apiManagerService.getRequest(Common.Manufacturers);

    getModels = (manufacturerId: number): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<number>[]>(`${Common.Models}/${manufacturerId}`);

    getVarients = (manufacturerId: number, modelId: number, vehicleClassId: number): Observable<IVarientDto[]> =>
        this.apiManagerService.getRequest(`${Common.Varients}?manufacturerId=${manufacturerId}&modelId=${modelId}&vehicleClassId=${vehicleClassId}`);

    getMakeYears = (type: number): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<number>[]>(`${Common.MakeYears}/${type}`);

    getRtoZones = (): Observable<IRtoZoneDto[]> => this.apiManagerService.getRequest<IRtoZoneDto[]>(Common.RtoZones);

    getUsages = (): Observable<any> => this.apiManagerService.getRequest(Common.Usages);

    getNcbs = (): Observable<any> => this.apiManagerService.getRequest(Common.Ncbs);

    getCommissionPaidOn = (vertical: Vertical): Observable<any> => this.apiManagerService.getRequest(`${Common.CommissionPaidOn}/${vertical}`);

    getAddOnRiders = (insuranceCompanyId: number, verticalId: number): Observable<IDropDownDto<number>[]> =>
        this.apiManagerService.getRequest<IDropDownDto<number>[]>(`${Common.AddOnRiders}?insuranceCompanyId=${insuranceCompanyId}&verticalId=${verticalId}`);

    getAddOnPlanOptions = (addOnRiderId: number, verticalId: number,policyId: number): Observable<IAddOnPlanOptionDto[]> =>
        this.apiManagerService.getRequest<IAddOnPlanOptionDto[]>(`${Common.AddOnPlanOptions}?addOnRiderId=${addOnRiderId}&verticalId=${verticalId}&policyId=${policyId}`);

    getRelations = (): Observable<any> => this.apiManagerService.getRequest(Common.Relations);

    getTeleCallers = (vertical: Vertical, branchId: number): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<number>[]>(`${Common.TeleCallers}?vertical=${vertical}&branchId=${branchId}`);

    getReferences = (branchId: number): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<number>[]>(`${Common.References}/${branchId}`);

    getFosNames = (vertical: Vertical, branchId: number): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<number>[]>(`${Common.FosNames}?vertical=${vertical}&branchId=${branchId}`);

    getDsaNames = (): Observable<any> => this.apiManagerService.getRequest(Common.DsaNames);

    getBranchs = (): Observable<any> => this.apiManagerService.getRequest(Common.Branchs);

    getCities = (): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest(Common.Cities);

    getDate = (date: string, year: number): Observable<IDateDto> => this.apiManagerService.getRequest<IDateDto>(`${Common.Date}?date=${date}&year=${year}`);

    getDocumentTypes = (code: string = 'all'): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<number>[]>(`${Common.DocumentTypes}/${code}`);

    getPaymentModes = (): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<number>[]>(Common.PaymentModes);

    getPos = (vertical: Vertical, branchId: number): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<number>[]>(`${Common.Pos}?vertical=${vertical}&branchId=${branchId}`);

    getPosManagedByPosId = (posId: number): Observable<IDropDownDto<number>> => this.apiManagerService.getRequest<IDropDownDto<number>>(`${Common.PosManagedBy}/${posId}`);

    getVehicleDetails = (varientId: number): Observable<IVehicleDto> => this.apiManagerService.getRequest<IVehicleDto>(`${Common.VehicleDetails}/${varientId}`);

    getDateInString(date: any): string {
        try {
            if (date != "Invalid Date" && date != "" && date != undefined && date != null) {
                let day = (<Moment>date).toDate().getDate();
                let month = (<Moment>date).toDate().getMonth() + 1;
                let year = (<Moment>date).toDate().getFullYear();
                return `${month > 9 ? month : `0${month}`}/${day > 9 ? day : `0${day}`}/${year}`;
            }
            return "";
        }
        catch (ex) {
            try {
                if (date != "Invalid Date" && date != "" && date != undefined && date != null) {
                    let day = (<Date>date).getDate();
                    let month = (<Date>date).getMonth() + 1;
                    let year = (<Date>date).getFullYear();
                    return `${month > 9 ? month : `0${month}`}/${day > 9 ? day : `0${day}`}/${year}`;
                }
                return "";
            } catch (error) {
                return ""
            }
        }
    }

    getAllPolicies = (model: ISearchPolicyModel, pageNumber: number, pageSize: number): Observable<IDataTableDto<ISearchPolicyDto[]>> =>
        this.apiManagerService.postRequest<IDataTableDto<ISearchPolicyDto[]>>(Common.Policies, model);

    getDateFromIDateDto = (date: IDateDto): Date | null => date != null ? (new Date(`${date.Year}-${date.Month}-${date.Day}`)) : null;

    getAllTeamMembers = (vertical: Vertical, branchId: number): Observable<IDropDownDto<number>[]> =>
        this.apiManagerService.getRequest<IDropDownDto<number>[]>(`${Common.TeamMembers}?vertical=${vertical}&branchId=${branchId}`);

    getAllGenders = (): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<number>[]>(`${Common.Genders}`);

    getLoggedInUserDetail = (): Observable<any> => this.apiManagerService.getRequest<any>(Common.Me);

    getProducts = (verticalId: number): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<number>[]>(`${Common.Products}/${verticalId}`);

    getPreviousClaims = (policyId: number): Observable<IPreviousClaimDto[]> => this.apiManagerService.getRequest<IPreviousClaimDto[]>(Common.PreviousClaims.replace('{policyId}', `${policyId}`));

    getClaimStatus = (): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<number>[]>(Common.ClaimsStatus);

    getSubClaimStatus = (claimsStatusId: number): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<number>[]>(`${Common.ClaimsSubStatus}/${claimsStatusId}`);

    getClaimTypes = (verticalId: number): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<number>[]>(`${Common.ClaimTypes}/${verticalId}`);

    getInspectionStatus = (): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<number>[]>(Common.InspectionStatus);

    getInspectionSubStatus = (inspectionStatusId: number): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<number>[]>(`${Common.InspectionSubStatus}/${inspectionStatusId}`);

    getInspectionReasons = (): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<number>[]>(Common.InspectionReasons);

    getPolicyClaimsByPolicyId = (policyId: number): Observable<IPreviousClaimDto[]> => this.apiManagerService.getRequest<IPreviousClaimDto[]>(Common.PolicyClaimsByPolicyId.replace('{policyId}', `${policyId}`));

    getPolicyVoucherByPolicyId = (policyId: number): Observable<IPolicyVoucherDto[]> => this.apiManagerService.getRequest<IPolicyVoucherDto[]>(Common.PolicyVoucherByPolicyId.replace('{policyId}', `${policyId}`));

    getPolicyInspectionByPolicyId = (policyId: number): Observable<IPolicyInspectionDto[]> => this.apiManagerService.getRequest<IPolicyInspectionDto[]>(Common.PolicyInspectionByPolicyId.replace('{policyId}', `${policyId}`));

    getClaimsById = (claimsId: number): Observable<IPreviousClaimDto> => this.apiManagerService.getRequest<IPreviousClaimDto>(`${Common.ClaimsById}/${claimsId}`);

    getVoucherById = (voucherId: number): Observable<IPolicyVoucherDto> => this.apiManagerService.getRequest<IPolicyVoucherDto>(`${Common.VoucherById}/${voucherId}`);

    getInspectionById = (inspectionId: number): Observable<IPolicyInspectionDto> => this.apiManagerService.getRequest<IPolicyInspectionDto>(`${Common.InspectionById}/${inspectionId}`);

    getPolicyDocumentsByPolicyId = (policyId: number): Observable<IPolicyDocumentDto[]> => this.apiManagerService.getRequest<IPolicyDocumentDto[]>(Common.PolicyDocumentsByPolicyId.replace('{policyId}', `${policyId}`));

    getMenus = (): Observable<IMenuItemDto[]> => this.apiManagerService.getRequest<IMenuItemDto[]>(Common.Menus);

    getProduct = (): Observable<IDropDownDto<string>> => this.apiManagerService.getRequest<IDropDownDto<string>>(Common.Product);
    getPlan = (productId: number): Observable<IDropDownDto<string>> => this.apiManagerService.getRequest<IDropDownDto<string>>(`${Common.Plan}/${productId}`);
    getPlanType = (): Observable<IDropDownDto<string>> => this.apiManagerService.getRequest<IDropDownDto<string>>(Common.PlanType);
    getPortability = (): Observable<IDropDownDto<string>> => this.apiManagerService.getRequest<IDropDownDto<string>>(Common.Portability);
    getRiskClass = (): Observable<IDropDownDto<string>> => this.apiManagerService.getRequest<IDropDownDto<string>>(Common.RIskClass);
    getPed = (): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<number>[]>(Common.Ped);
    getPpc = (): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<number>[]>(Common.Ppc);
    getCoverage = (): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<number>[]>(Common.Coverage);
    getOccupancy = (): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<number>[]>(Common.Occupancy);
    getBasementExposure = (): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<number>[]>(Common.BasementExposure);
    getProfession = (): Observable<IDropDownDto<number>[]> => this.apiManagerService.getRequest<IDropDownDto<number>[]>(Common.Profession);
    getDateDays = (date: string, year: number, days : number): Observable<IDateDto> => this.apiManagerService.getRequest<IDateDto>(`${Common.Date}?date=${date}&year=${year}&days=${days}`);
}