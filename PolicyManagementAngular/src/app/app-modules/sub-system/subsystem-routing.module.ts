import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth-guard/auth.guard'; 
import { AddClaimsComponent } from './claims/add-claims/add-claims.component';
import { ClaimsComponent } from './claims/claims.component';
import { SearchClaimsComponent } from './claims/search-claims/search-claims.component';
import { SearchPolicyClaimsComponent } from './claims/search-policy-claims/search-policy-claims.component';
import { AddInspectionComponent } from './inspection/add-inspection/add-inspection.component';
import { InspectionComponent } from './inspection/inspection.component';
import { SearchInspectionComponent } from './inspection/search-inspection/search-inspection.component';
import { AddVoucherComponent } from './voucher/add-voucher/add-voucher.component';
import { SearchVoucherComponent } from './voucher/search-voucher/search-voucher.component';
import { VoucherComponent } from './voucher/voucher.component';

const routes: Routes = [
  {
    path: 'subsystem', canActivateChild: [AuthGuard],
    children: [ 
      {
        path: 'voucher',
        component: VoucherComponent,
      },
      {
        path: 'voucher-form/:form-type/:voucherId/:mode',
        component: AddVoucherComponent,
      },
      {
        path: 'search-voucher/:form-type',
        component: SearchVoucherComponent,
      },
      {
        path: 'claims',
        component: ClaimsComponent,
      },
      {
        path: 'claims-search-policy',
        component: SearchPolicyClaimsComponent,
      },
      {
        path: 'claims/:form-type/:claimsId/:policyId/:verticalId',
        component: AddClaimsComponent,
      },
      {
        path: 'search-claims/:form-type',
        component: SearchClaimsComponent,
      },
      {
        path: 'inspection',
        component: InspectionComponent,
      },
      {
        path: 'inspection/:form-type/:inspectionId',
        component: AddInspectionComponent,
      },
      {
        path: 'inspection-search/:form-type',
        component: SearchInspectionComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubSystemRoutingModule { }
