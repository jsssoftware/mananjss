import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth-guard/auth.guard';  
import { HealthPolicyManagementComponent } from './retail/health-policy-management/health-policy-management.component';
import { RetailPolicyComponent } from './retail/retail-policy/retail-policy.component';

import { MotorPolicyManagementComponent } from './motor/motor-policy-management/motor-policy-management.component';
import { MotorPolicyComponent } from './motor/motor-policy/motor-policy.component';
import { PaPolicyManagementComponent } from './retail/pa-policy-management/pa-policy-management.component';
import { TravelPolicyManagementComponent } from './retail/travel-policy-management/travel-policy-management.component';
  
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
        path: 'pa:',
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
        path: 'travel:',
        component: RetailPolicyComponent,
      },
      {
        path: 'travel/:verticalId/:policyType',
        component: RetailPolicyComponent,
      },
      {
        path: 'travel/travel-policy-management',
        component: TravelPolicyManagementComponent,
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyManagementRoutingModule { }
