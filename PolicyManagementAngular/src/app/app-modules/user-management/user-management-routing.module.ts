import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from 'src/app/shared/auth-guard/auth.guard';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { RouterModule, Routes } from '@angular/router';
import { ManageRolesComponent } from './manage-roles/manage-roles.component';

const routes: Routes = [
  {
    path: 'user',  canActivateChild: [AuthGuard],
    children: [ 
      {
        path: 'manage-user',
        component: ManageUserComponent,
      },
      {
        path: 'manage-role',
        component: ManageRolesComponent,
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
