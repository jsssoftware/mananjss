import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  UrlTree
} from '@angular/router';
import { AuthorizationService } from './authorization-service';
import { Observable, forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(public authorizationService: AuthorizationService, public router: Router,
   ) {}
  canActivate(route: ActivatedRouteSnapshot):     
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const claimType: string = route.data.requestedClaim;

   let validationResult:boolean; 
   const observableResult=
      forkJoin([
            this.authorizationService.hasClaim(claimType), 
            of<boolean>(this.authorizationService.hasRole(expectedRole))
          ])
    .pipe(map(([bool1, bool2]) => {
        validationResult= bool1 || bool2;
        return validationResult;           
      }));
    observableResult.subscribe(x => {
      if (!x) {
        Swal.fire({
          icon: 'error',
          title: 'Un-Authorized',
          text: 'You do not have permissions to access this page, please contact your Research Manager or an Administrator',
        });
        this.router.navigate(['/user/dashboard']);
      }
    });
    return observableResult;
  }
}