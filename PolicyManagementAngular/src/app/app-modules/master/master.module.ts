import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/common-module/material-module';
import { MaterialFileInputModule } from 'ngx-material-file-input';  
import { MasterRoutingModule } from './master-routing.module'; 
import { CustomerComponent } from './customer/customer.component';
import { AddCustomerComponent } from './customer/add-customer/add-customer.component';
import { InsurancebranchComponent } from './insurancebranch/insurancebranch.component';
import { MasterService } from 'src/app/app-services/master-service/master.service';
import { TeammemberComponent } from './teammember/teammember.component';

@NgModule({
  declarations: [  
    CustomerComponent,
    AddCustomerComponent,
    InsurancebranchComponent,
    TeammemberComponent,
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFileInputModule
  ],
  providers:[MasterService]
})
export class MasterModule { }
