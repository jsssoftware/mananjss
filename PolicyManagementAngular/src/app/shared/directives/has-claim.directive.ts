import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { AuthorizationService } from '../auth-guard/authorization-service';
import { FullApplicationAccess } from '../utilities/enums/enum';

@Directive({
  selector: '[appHasClaim]'
})
export class HasClaimDirective {

  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authorizationServie: AuthorizationService) { }

    @Input('appHasClaim') set
    appHasClaim(claimType: any) {
      const adminBusinessHeadRight = this.authorizationServie.hasRole(FullApplicationAccess.AdminBusiness);
      if(adminBusinessHeadRight){
        this.viewContainer.createEmbeddedView(this.templateRef);
        return;
      }
      this.authorizationServie.hasClaim(claimType).subscribe(e => {
          
        if (e) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      });
    }

}
