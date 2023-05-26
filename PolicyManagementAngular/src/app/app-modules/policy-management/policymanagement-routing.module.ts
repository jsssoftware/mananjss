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

const routes: Routes = [
  {
    path: 'pms',  canActivateChild: [AuthGuard],
    children: [ 
      {
        path: 'motor',
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
        component: RetailPolicyComponent,
      },
      {
        path: 'health/:verticalId/:policyType',
        component: RetailPolicyComponent,
      },
      {
        path: 'health/health-policy-management',
        component: HealthPolicyManagementComponent,
      },
      {
        path: 'pa',
        component: RetailPolicyComponent,
      },
      {
        path: 'pa/:verticalId/:policyType',
        component: RetailPolicyComponent,
      },
      {
        path: 'pa/pa-policy-management',
        component: PaPolicyManagementComponent,
      },
      {
        path: 'travel',
        component: RetailPolicyComponent,
      },
      {
        path: 'travel/:verticalId/:policyType',
        component: RetailPolicyComponent,
      },
      {
        path: 'travel/travel-policy-management',
        component: TravelPolicyManagementComponent,
      },
      {
        path: 'engineering',
        component: CommercialPolicyManagementComponent,
      },
      {
        path: 'engineering/:verticalId/:policyType',
        component: CommercialPolicyManagementComponent,
      },
      {
        path: 'engineering/engineering-policy-management',
        component: EngineeringPolicyManagementComponent,
      },
      {
        path: 'fire',
        component: CommercialPolicyManagementComponent,
      },
      {
        path: 'fire/:verticalId/:policyType',
        component: CommercialPolicyManagementComponent,
      },
      {
        path: 'engineering/engineering-policy-management',
        component: FirePolicyManagementComponent,
      },
      {
        path: 'fire',
        component: CommercialPolicyManagementComponent,
      },
      {
        path: 'fire/:verticalId/:policyType',
        component: CommercialPolicyManagementComponent,
      },
      {
        path: 'fire/fire-policy-management',
        component: FirePolicyManagementComponent,
      },
      {
        path: 'gmc',
        component: CommercialPolicyManagementComponent,
      },
      {
        path: 'gmc/:verticalId/:policyType',
        component: CommercialPolicyManagementComponent,
      },
      {
        path: 'gmc/gmc-policy-management',
        component: GmcPolicyManagementComponent,
      },
      {
        path: 'liabality',
        component: CommercialPolicyManagementComponent,
      },
      {
        path: 'liabality/:verticalId/:policyType',
        component: CommercialPolicyManagementComponent,
      },
      {
        path: 'liabality/liabality-policy-management',
        component: LiabalityPolicyManagementComponent,
      },
      {
        path: 'marine',
        component: CommercialPolicyManagementComponent,
      },
      {
        path: 'marine/:verticalId/:policyType',
        component: CommercialPolicyManagementComponent,
      },
      {
        path: 'marine/marine-policy-management',
        component: MarinePolicyManagementComponent,
      },
      {
        path: 'misc',
        component: CommercialPolicyManagementComponent,
      },
      {
        path: 'marine/:verticalId/:policyType',
        component: CommercialPolicyManagementComponent,
      },
      {
        path: 'misc/misc-policy-management',
        component: MiscPolicyManagementComponent,
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyManagementRoutingModule { }
