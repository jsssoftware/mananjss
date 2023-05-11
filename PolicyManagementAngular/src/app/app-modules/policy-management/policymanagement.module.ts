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
import { RetailPolicyComponent } from './retail/retail-policy/retail-policy.component';
import { HealthPolicyManagementComponent } from './retail/health-policy-management/health-policy-management.component';
import { MotorPolicyComponent } from './motor/motor-policy/motor-policy.component';
import { MotorService } from 'src/app/app-services/motor-service/motor.service';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { TwoDigitDecimaNumberDirective } from 'src/app/shared/utilities/directive/twodecimal.directive';
import { NumbersOnlyDirective } from 'src/app/shared/utilities/directive/numberonly.directive';
import { PrintErrorComponent } from 'src/app/shared/common-component/print-error/print-error.component';
import { PreviewDialogComponent } from 'src/app/shared/utilities/dialog/preview-dialog/preview-dialog.component';
import { DisableControlDirective } from 'src/app/shared/utilities/directive/disabledcontrol.directive';
import { RetailService } from 'src/app/app-services/health-service/retail.service';
import { PaPolicyManagementComponent } from './retail/pa-policy-management/pa-policy-management.component';
import { TravelPolicyManagementComponent } from './retail/travel-policy-management/travel-policy-management.component';

@NgModule({
  declarations: [  
    InspectionDetailComponent, // in popup used
    VoucherDetailComponent, // in popup used
    DialogBoxComponent,
    PolicyDataComponent,
    PolicyManagementComponent,
    MotorPolicyComponent,
    MotorPolicyManagementComponent,
    RetailPolicyComponent,
    HealthPolicyManagementComponent,
    TwoDigitDecimaNumberDirective,
    NumbersOnlyDirective,
    PrintErrorComponent,
    PreviewDialogComponent,
    DisableControlDirective,
    PaPolicyManagementComponent,
    TravelPolicyManagementComponent
  ],
  imports: [
    CommonModule,
    PolicyManagementRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    NgxDocViewerModule,
  ],
  providers:[MotorService,RetailService]
})
export class PolicyManagementModule { }
