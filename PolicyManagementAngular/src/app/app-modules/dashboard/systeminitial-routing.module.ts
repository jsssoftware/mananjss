import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth-guard/auth.guard';  
import { SearchPolicyComponent } from 'src/app/shared/common-component/search-policy/search-policy.component';
import { DashboardComponent } from './dashboard.component';
import { WorkInProgressComponent } from '../../shared/common-component/work-in-progress/work-in-progress.component';
  
const routes: Routes = [
  {
    path: 'user', canActivateChild: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'wip',
        component: WorkInProgressComponent,
      },
      {
        path: 'search-policy',
        component: SearchPolicyComponent
      },
      {
        path: 'search-policy/:policyType/:verticalType',
        component: SearchPolicyComponent
      }       
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemInitialRoutingModule { }
