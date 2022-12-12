import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ILoginModel } from "src/app/app-entites/models/account/login-model";
import { Account } from "src/app/shared/utilities/api-urls/account";
import { IApiManagerService } from "../api-manager/abstracts/api-manager-iservice";
import { IAccountService } from "./abstracts/account.iservice";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class AccountService extends IAccountService {
    constructor(private apiManagerService: IApiManagerService) { super(); }

    login(model: ILoginModel): Observable<any> {
        let request: string = `username=${model.Username}&password=${model.Password}&grant_type=password&branchId=${model.BranchId}`;

        let headers: HttpHeaders = new HttpHeaders(
            {
                'Content-Type': 'application/x-www-form-urlencoded'
            });

        return this.apiManagerService.postRequestWithHeader(Account.Token, request, headers);
    }

    getBranchId(): number {
        return 1;
    }
}
