import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/common-module/material-module';
import { MaterialFileInputModule } from 'ngx-material-file-input'; 
import { PolicyManagementRoutingModule } from './policymanagement-routing.module';
import { InspectionDetailComponent } from 'src/app/shared/common-component/Policy/detail/inspection-detail/inspection-detail.component';
import { VoucherDetailComponent } from 'src/app/shared/common-component/Policy/detail/voucher-detail/voucher-detail.component';
import { DialogBoxComponent } from 'src/app/shared/common-component/Policy/dialog-box/dialog-box.component';
import { PolicyDataComponent } from 'src/app/shared/common-component/Policy/policy-data/policy-data.component';
import { PolicyManagementComponent } from 'src/app/shared/common-component/Policy/policy-management/policy-management.component'; 
import { MotorPolicyManagementComponent } from './motor/motor-policy-management/motor-policy-management.component';
import { HealthPolicyComponent } from './health/health-policy/health-policy.component';
import { HealthPolicyManagementComponent } from './health/health-policy-management/health-policy-management.component';
import { MotorPolicyComponent } from './motor/motor-policy/motor-policy.component';
   
@NgModule({
  declarations: [  
    InspectionDetailComponent, // in popup used
    VoucherDetailComponent, // in popup used

    DialogBoxComponent,
    PolicyDataComponent,
    PolicyManagementComponent,
    
    MotorPolicyComponent,
    MotorPolicyManagementComponent,
    HealthPolicyComponent,
    HealthPolicyManagementComponent,

  ],
  imports: [
    CommonModule,
    PolicyManagementRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFileInputModule
  ]
})
export class PolicyManagementModule { }
