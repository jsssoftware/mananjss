import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { MAT_DATE_FORMATS } from "@angular/material/core";
import { IAccountService } from "./account-service/abstracts/account.iservice";
import { AccountService } from "./account-service/account.service";
import { IApiManagerService } from "./api-manager/abstracts/api-manager-iservice";
import { ApiManagerService } from "./api-manager/api-manager.service";
import { IClaimsService } from "./claims/abstracts/claims.iservice";
import { ClaimsService } from "./claims/claims.service";
import { ICommonService } from "./common-service/abstracts/common.iservice";
import { CommonService } from "./common-service/common.service";
import { ICustomerService } from "./customer-service/abstracts/customer.iservice";
import { CustomerService } from "./customer-service/customer.service";
import { IInspectionService } from "./inspection/abstracts/inspection.iservice";
import { InspectionService } from "./inspection/inspection.service";
import { IMotorService } from "./motor-service/abstracts/motor.iservice";
import { MotorService } from "./motor-service/motor.service";
import { OAuthTokenInterceptor } from "./token-interceptor/oauth-token-interceptor";
import { IVoucherService } from "./voucher/abstracts/voucher.iservice";
import { VoucherService } from "./voucher/voucher.service";
import { CUSTOM_DATE_FORMAT } from "../shared/utilities/helpers/helper";
import { IRetailService } from "./health-service/abstracts/retail.iservice";
import { RetailService } from "./health-service/retail.service";

export const Services = [
  { provide: IApiManagerService, useClass: ApiManagerService },
  { provide: IAccountService, useClass: AccountService },
  { provide: ICommonService, useClass: CommonService },
  { provide: ICustomerService, useClass: CustomerService },
  { provide: IMotorService, useClass: MotorService },
  { provide: IVoucherService, useClass: VoucherService },
  { provide: IClaimsService, useClass: ClaimsService },
  { provide: IInspectionService, useClass: InspectionService },
  { provide: IRetailService, useClass: RetailService },
  { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMAT },
  { provide: HTTP_INTERCEPTORS, useClass: OAuthTokenInterceptor, multi: true }
];