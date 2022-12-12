import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/common-module/material-module';
import { MaterialFileInputModule } from 'ngx-material-file-input'; 
import { SubSystemRoutingModule } from './subsystem-routing.module';
import { VoucherComponent } from './voucher/voucher.component';
import { SearchVoucherComponent } from './voucher/search-voucher/search-voucher.component';
import { AddVoucherComponent } from './voucher/add-voucher/add-voucher.component';
import { SearchPolicyVoucherComponent } from './voucher/search-policy-voucher/search-policy-voucher.component';
import { ClaimsComponent } from './claims/claims.component';
import { SearchPolicyClaimsComponent } from './claims/search-policy-claims/search-policy-claims.component';
import { AddClaimsComponent } from './claims/add-claims/add-claims.component';
import { SearchClaimsComponent } from './claims/search-claims/search-claims.component';
import { ClaimsFollowUpDataComponent } from './claims/claims-follow-up-data/claims-follow-up-data.component';
import { ViewClaimsComponent } from './claims/view-claims/view-claims.component';
import { InspectionComponent } from './inspection/inspection.component';
import { AddInspectionComponent } from './inspection/add-inspection/add-inspection.component';
import { SearchInspectionComponent } from './inspection/search-inspection/search-inspection.component';
import { SearchPolicyInspectionComponent } from './inspection/search-policy-inspection/search-policy-inspection.component';



@NgModule({
  declarations: [  
    VoucherComponent,
    SearchVoucherComponent,
    AddVoucherComponent,
    SearchPolicyVoucherComponent,
    ClaimsComponent,
    SearchPolicyClaimsComponent,
    AddClaimsComponent,
    SearchClaimsComponent,
    ClaimsFollowUpDataComponent,
    ViewClaimsComponent,
    InspectionComponent,
    AddInspectionComponent,
    SearchInspectionComponent,
    SearchPolicyInspectionComponent,
  ],
  imports: [
    CommonModule,
    SubSystemRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFileInputModule
  ]
})
export class SubSystemModule { }
