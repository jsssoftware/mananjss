import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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



@NgModule({
  declarations: [
    ReconuploadComponent,
    RecondownloadComponent,
    RecondownloadRetailComponent,
    ReconuploadRetailComponent
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
  providers:[ReportService,CommonService]
})
export class ReportsModule { }
