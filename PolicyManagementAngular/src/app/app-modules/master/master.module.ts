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
import { PosComponent } from './pos/pos.component';
import { PoscontactComponent } from './poscontact/poscontact.component';
import { InsurancecompanyComponent } from './insurancecompany/insurancecompany.component';
import { ClusterComponent } from './cluster/cluster.component';
import { PlanComponent } from './plan/plan.component';
import { AddonplanComponent } from './addonplan/addonplan.component';
import { ManufactureComponent } from './manufacture/manufacture.component';
import { VehiclemodelComponent } from './vehiclemodel/vehiclemodel.component';
import { AddonridercomboComponent } from './addonridercombo/addonridercombo.component';
import { VariantmasterComponent } from './variantmaster/variantmaster.component';
import { BankmasterComponent } from './bankmaster/bankmaster.component';
import { CitymasterComponent } from './citymaster/citymaster.component';
import { ProductmasterComponent } from './productmaster/productmaster.component';
import { InspectionMasterComponent } from './inspection/inspection.component';
import { PostypeComponent } from './postype/postype.component';
import { PoscategoryComponent } from './poscategory/poscategory.component';
import { RefrencemasterComponent } from './refrencemaster/refrencemaster.component';
import { RtozonemasterComponent } from './rtozonemaster/rtozonemaster.component';
import { FinancemasterComponent } from './financemaster/financemaster.component';
import { DepartmentComponent } from './department/department.component';
import { DesignationComponent } from './designation/designation.component';
import { IndustryComponent } from './industry/industry.component';
import { ProfessionComponent } from './profession/profession.component';

@NgModule({
  declarations: [  
    CustomerComponent,
    AddCustomerComponent,
    InsurancebranchComponent,
    TeammemberComponent,
    PosComponent,
    PoscontactComponent,
    InsurancecompanyComponent,
    ClusterComponent,
    PlanComponent,
    AddonplanComponent,
    ManufactureComponent,
    VehiclemodelComponent,
    AddonridercomboComponent,
    VariantmasterComponent,
    BankmasterComponent,
    CitymasterComponent,
    ProductmasterComponent,
    InspectionMasterComponent,
    PostypeComponent,
    PoscategoryComponent,
    RefrencemasterComponent,
    RtozonemasterComponent,
    FinancemasterComponent,
    DepartmentComponent,
    DesignationComponent,
    IndustryComponent,
    ProfessionComponent,
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
