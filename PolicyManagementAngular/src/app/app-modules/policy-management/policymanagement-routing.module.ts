import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth-guard/auth.guard';  
import { HealthPolicyManagementComponent } from './health/health-policy-management/health-policy-management.component';
import { HealthPolicyComponent } from './health/health-policy/health-policy.component';

import { MotorPolicyManagementComponent } from './motor/motor-policy-management/motor-policy-management.component';
import { MotorPolicyComponent } from './motor/motor-policy/motor-policy.component';
  
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
        component: HealthPolicyComponent,
      },
      {
        path: 'health/:id/:policyType',
        component: HealthPolicyComponent,
      },
      {
        path: 'health/health-policy-management',
        component: HealthPolicyManagementComponent,
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyManagementRoutingModule { }
