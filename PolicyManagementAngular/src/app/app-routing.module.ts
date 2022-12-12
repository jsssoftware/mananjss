import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/common-component/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: "full"},
  { path: 'user', 
    loadChildren: () => import('./app-modules/dashboard/systeminitial.module').then(m => m.SystemInitialModule)
  },
  { path: 'pms', 
    loadChildren: () => import('./app-modules/policy-management/policymanagement.module').then(m => m.PolicyManagementModule) 
  }, 
  { path: 'subsystem', 
    loadChildren: () => import('./app-modules/sub-system/subsystem.module').then(m => m.SubSystemModule) 
  }, 
  { path: 'master', 
    loadChildren: () => import('./app-modules/master/master.module').then(m => m.MasterModule) 
  },
  { path: '', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
