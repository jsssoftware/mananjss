import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReportsRoutingModule } from './report-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/common-module/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { ReportService } from 'src/app/app-services/report-service/report.service';
import { CommonService } from 'src/app/app-services/common-service/common.service';
import { ReconuploadComponent } from './motor/reconupload/reconupload.component';
import { RecondownloadComponent } from './motor/recondownload/recondownload.component';
import { RecondownloadRetailComponent } from './retail/recondownload/recondownload.component';
import { ReconuploadRetailComponent } from './retail/reconupload/reconupload.component';
import { MotherreportComponent } from './motor/motherreport/motherreport.component';
import { RetailMotherreportComponent } from './retail/retail-motherreport/retail-motherreport.component';
import { RenewalPerfomanceMotorComponent } from './motor/renewal-perfomance-motor/renewal-perfomance-motor.component';
import { AgentSwappingComponent } from './motor/agent-swapping/agent-swapping.component';
import { AgentSwapDialogComponent } from './shared/agent-swap-dialog/agent-swap-dialog.component';
import { RenewalDumpComponent } from './shared/renewal-dump/renewal-dump.component';
import { CustomerClusterComponent } from './shared/customer-cluster/customer-cluster.component';
import { PosPerfomanceComponent } from './shared/pos-perfomance/pos-perfomance.component';
import { LostDataCallingComponent } from './shared/lost-data-calling/lost-data-calling.component';
import { PendingQcComponent } from './shared/pending-qc/pending-qc.component';
import { RECReportComponent } from './motor/rec-report/rec-report.component';

@NgModule({
  declarations: [
    ReconuploadComponent,
    RecondownloadComponent,
    RecondownloadRetailComponent,
    ReconuploadRetailComponent,
    MotherreportComponent,
    RetailMotherreportComponent,
    RenewalPerfomanceMotorComponent,
    AgentSwappingComponent,
    AgentSwapDialogComponent,
    RenewalDumpComponent,
    CustomerClusterComponent,
    PosPerfomanceComponent,
    LostDataCallingComponent,
    PendingQcComponent,
    RECReportComponent
  ],

  imports: [
    CommonModule,
    ReportsRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFileInputModule
  ],
  providers:[ReportService,CommonService,DatePipe]
})
export class ReportsModule { }
