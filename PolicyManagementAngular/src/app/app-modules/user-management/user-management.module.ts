import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/common-module/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserService } from 'src/app/app-services/user-management-service/user.service';
import { ManageRolesComponent } from './manage-roles/manage-roles.component';
import { UserRoleMappingComponent } from './user-role-mapping/user-role-mapping.component';



@NgModule({
  declarations: [
    ManageUserComponent,
    ManageRolesComponent,
    UserRoleMappingComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    UserManagementRoutingModule
  ],
  providers:[UserService]

})
export class UserManagementModule { }
