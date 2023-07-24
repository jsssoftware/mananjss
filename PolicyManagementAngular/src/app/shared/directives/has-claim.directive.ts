import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { AuthorizationService } from '../auth-guard/authorization-service';

@Directive({
  selector: '[appHasClaim]'
})
export class HasClaimDirective {

  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authorizationServie: AuthorizationService) { }

    @Input('appHasClaim') set
    appHasClaim(claimType: any) {
      this.authorizationServie.hasClaim(claimType).subscribe(e => {
          
        if (e) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      });
    }

}
