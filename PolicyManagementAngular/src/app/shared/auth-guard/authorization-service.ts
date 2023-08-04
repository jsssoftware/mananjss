import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { SessionStorageManagementService } from './session-storage-management.service';

export class Credentials {
  email: '';
  username = '';
  role = '';
  userId: number = null;
  claims: ClaimModel[] = [];
  userTeams:any;
}
export interface ClaimModel {
  claimType: string;
  claimValue: string;
}

const credentialsKey = 'credentialsKey';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  public currentCredentialsSubject: BehaviorSubject<Credentials> = new BehaviorSubject<Credentials>(null);
   constructor(private sessionStorageManagementService: SessionStorageManagementService) {
    // TODO: This is a security issue, should switch to HTTP only cookies
        const savedCredentials = localStorage.getItem(credentialsKey) || sessionStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this.currentCredentialsSubject.next(JSON.parse(savedCredentials));
    }
  }

  setCredentials(credentials?: Credentials, remember?: boolean) {
    this.currentCredentialsSubject.next(credentials);

    if (credentials) {
      const storage = remember ? this.sessionStorageManagementService : localStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      localStorage.removeItem(credentialsKey);
      this.sessionStorageManagementService.removeItem(credentialsKey);
    }
  }

  get credentials() {
    return this.currentCredentialsSubject.value;
  }

  hasRole(expectedRole: any): boolean {
    let userDetails = JSON.parse((sessionStorage.getItem("userDetails")));
    if (expectedRole) {
     
       let authCredentails = userDetails.LoginUserRole;
      
      if(expectedRole.includes(","))
      {
      return expectedRole.toLocaleLowerCase().includes(authCredentails?.toLocaleLowerCase());
      }
      else
      {
        return authCredentails?.role.toLocaleLowerCase() === expectedRole.toLocaleLowerCase();
      }
    } else {
      return false;
    }
  }

  hasClaim(claimType: any, claimValue?: any): Observable<boolean> {
    let ret = false;
    if (!claimType) {
      return of<boolean>(false);
    }

    if (typeof claimType === 'string') {
      ret = this.isClaimValid(claimType, claimValue);
    } else {
      const claims: string[] = claimType;

      if (claims) {
        for (let index = 0; index < claims.length; index++) {

          ret = this.isClaimValid(claims[index]);
          if (ret) {
            break;
          }
        }
      }
    }
    return of<boolean>(ret);
  }

  private isClaimValid(claimType: string, claimValue?: string): boolean {
    if (typeof this.credentials === 'string') {
      var authCredentails = JSON.parse(this.credentials);
    }else{
      authCredentails = this.credentials;
    }
    if (!authCredentails) {
      return false;
    }
    let string = authCredentails[0].DisplayName;
    if(string == claimType){
      return true
    }
    let find  = authCredentails.find((x:any)=>x.DisplayName.toString() == claimType.toString());
    if(claimType.includes(",")){
      return authCredentails.some((c:any) => claimType.toLocaleLowerCase().includes(c?.DisplayName.toLocaleLowerCase()))
    } else{
      return (
        authCredentails.find((c:any) => c?.DisplayName.toLocaleLowerCase() == claimType.toLocaleLowerCase()) != null
      );
    }
  } 
}
