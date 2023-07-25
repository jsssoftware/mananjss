import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth-guard/auth.guard';  
import { HealthPolicyManagementComponent } from './retail/health-policy-management/health-policy-management.component';
import { RetailPolicyComponent } from './retail/retail-policy/retail-policy.component';
import { MotorPolicyManagementComponent } from './motor/motor-policy-management/motor-policy-management.component';
import { MotorPolicyComponent } from './motor/motor-policy/motor-policy.component';
import { PaPolicyManagementComponent } from './retail/pa-policy-management/pa-policy-management.component';
import { TravelPolicyManagementComponent } from './retail/travel-policy-management/travel-policy-management.component';
import { CommercialPolicyManagementComponent } from './commercial/commercial-policy-management/commercial-policy-management.component';
import { EngineeringPolicyManagementComponent } from './commercial/engineering-policy-management/engineering-policy-management.component';
import { FirePolicyManagementComponent } from './commercial/fire-policy-management/fire-policy-management.component';
import { GmcPolicyManagementComponent } from './commercial/gmc-policy-management/gmc-policy-management.component';
import { LiabalityPolicyManagementComponent } from './commercial/liabality-policy-management/liabality-policy-management.component';
import { MarinePolicyManagementComponent } from './commercial/marine-policy-management/marine-policy-management.component';
import { MiscPolicyManagementComponent } from './commercial/misc-policy-management/misc-policy-management.component';
import { RoleGuard } from 'src/app/shared/auth-guard/authorization.gurad';

const routes: Routes = [
  {
    path: 'pms',  canActivateChild: [AuthGuard],
    children: [ 
      {
        path: 'motor',
        data: { requestedClaim: 'motor' },
        canActivate: [RoleGuard],
        component: MotorPolicyComponent,
      },
      {
        path: 'motor/:id/:policyType',
        component: MotorPolicyComponent,
      },
      {
        path: 'motor/motor-policy-management',
        component: MotorPolicyManagementComponent,
      }, 
    

      {
        path: 'health',
        data: { requestedClaim: 'health' },
        canActivate: [RoleGuard],
        component: RetailPolicyComponent,
      },
      {
        path: 'health/:verticalId/:policyType',
        data: { requestedClaim: 'health' },
        canActivate: [RoleGuard],
        component: RetailPolicyComponent,
      },
      {
        path: 'health/health-policy-management',
        data: { requestedClaim: 'health' },
        canActivate: [RoleGuard],
        component: HealthPolicyManagementComponent,
      },
      {
        path: 'pa',
        data: { requestedClaim: 'pa' },
        canActivate: [RoleGuard],
        component: RetailPolicyComponent,
      },
      {
        path: 'pa/:verticalId/:policyType',
        data: { requestedClaim: 'pa' },
        canActivate: [RoleGuard],
        component: RetailPolicyComponent,
      },
      {
        path: 'pa/pa-policy-management',
        data: { requestedClaim: 'pa' },
        canActivate: [RoleGuard],
        component: PaPolicyManagementComponent,
      },
      {
        path: 'travel',
        data: { requestedClaim: 'travel' },
        canActivate: [RoleGuard],
        component: RetailPolicyComponent,
      },
      {
        path: 'travel/:verticalId/:policyType',
        data: { requestedClaim: 'travel' },
        canActivate: [RoleGuard],
        component: RetailPolicyComponent,
      },
      {
        path: 'travel/travel-policy-management',
        data: { requestedClaim: 'travel' },
        canActivate: [RoleGuard],
        component: TravelPolicyManagementComponent,
      },
      {
        path: 'engineering',
        data: { requestedClaim: 'engineering' },
        canActivate: [RoleGuard],
        component: CommercialPolicyManagementComponent,
      },
      {
        path: 'engineering/:verticalId/:policyType',
        data: { requestedClaim: 'engineering' },
        canActivate: [RoleGuard],
        component: CommercialPolicyManagementComponent,
      },
      {
        path: 'engineering/engineering-policy-management',
        data: { requestedClaim: 'engineering' },
        canActivate: [RoleGuard],
        component: EngineeringPolicyManagementComponent,
      },
      {
        path: 'fire',
        data: { requestedClaim: 'fire' },
        canActivate: [RoleGuard],
        component: CommercialPolicyManagementComponent,
      },
      {
        path: 'fire/:verticalId/:policyType',
        data: { requestedClaim: 'fire' },
        canActivate: [RoleGuard],
        component: CommercialPolicyManagementComponent,
      },
      {
        path: 'fire/fire-policy-management',
        data: { requestedClaim: 'fire' },
        canActivate: [RoleGuard],
        component: FirePolicyManagementComponent,
      },
      {
        path: 'gmc',
        data: { requestedClaim: 'gmc' },
        canActivate: [RoleGuard],
        component: CommercialPolicyManagementComponent,
      },
      {
        path: 'gmc/:verticalId/:policyType',
        data: { requestedClaim: 'gmc' },
        canActivate: [RoleGuard],
        component: CommercialPolicyManagementComponent,
      },
      {
        path: 'gmc/gmc-policy-management',
        data: { requestedClaim: 'gmc' },
        canActivate: [RoleGuard],
        component: GmcPolicyManagementComponent,
      },
      {
        path: 'liabality',
        data: { requestedClaim: 'liabality' },
        canActivate: [RoleGuard],
        component: CommercialPolicyManagementComponent,
      },
      {
        path: 'liabality/:verticalId/:policyType',
        data: { requestedClaim: 'liabality' },
        canActivate: [RoleGuard],
        component: CommercialPolicyManagementComponent,
      },
      {
        path: 'liabality/liabality-policy-management',
        data: { requestedClaim: 'liabality' },
        canActivate: [RoleGuard],
        component: LiabalityPolicyManagementComponent,
      },
      {
        path: 'marine',
        data: { requestedClaim: 'marine' },
        canActivate: [RoleGuard],
        component: CommercialPolicyManagementComponent,
      },
      {
        path: 'marine/:verticalId/:policyType',
        data: { requestedClaim: 'marine' },
        canActivate: [RoleGuard],
        component: CommercialPolicyManagementComponent,
      },
      {
        path: 'marine/marine-policy-management',
        data: { requestedClaim: 'marine' },
        canActivate: [RoleGuard],
        component: MarinePolicyManagementComponent,
      },
      {
        path: 'misc',
        data: { requestedClaim: 'misc' },
        canActivate: [RoleGuard],
        component: CommercialPolicyManagementComponent,
      },
      {
        path: 'misc/:verticalId/:policyType',
        data: { requestedClaim: 'misc' },
        canActivate: [RoleGuard],
        component: CommercialPolicyManagementComponent,
      },
      {
        path: 'misc/misc-policy-management',
        data: { requestedClaim: 'misc' },
        canActivate: [RoleGuard],
        component: MiscPolicyManagementComponent,
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [RoleGuard]

})
export class PolicyManagementRoutingModule { }
