import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth-guard/auth.guard';
import { MotherreportComponent } from './motor/motherreport/motherreport.component';
import { RecondownloadComponent } from './motor/recondownload/recondownload.component';
import { ReconuploadComponent } from './motor/reconupload/reconupload.component';
import { RecondownloadRetailComponent } from './retail/recondownload/recondownload.component';
import { ReconuploadRetailComponent } from './retail/reconupload/reconupload.component';
import { RetailMotherreportComponent } from './retail/retail-motherreport/retail-motherreport.component';
import { RenewalPerfomanceMotorComponent } from './motor/renewal-perfomance-motor/renewal-perfomance-motor.component';

const routes: Routes = [
    {
        path: 'reports', canActivateChild: [AuthGuard],
        children: [
            {
                path: 'recondownload',
                component: RecondownloadComponent,
            },
            {
                path: 'reconupload',
                component: ReconuploadComponent,
            },
            {
                path: 'recondownloadretail',
                component: RecondownloadRetailComponent,
            },
            {
                path: 'reconuploadretail',
                component: ReconuploadRetailComponent,
            },
            {
                path: 'motherreportmotor',
                component: MotherreportComponent,
            },
            {
                path: 'motherreportretail',
                component: RetailMotherreportComponent,
            },
            {
                path: 'renewalperfomancemotor',
                component: RenewalPerfomanceMotorComponent,
            },
          
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportsRoutingModule { }
