import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth-guard/auth.guard';
import { ClusterComponent } from './cluster/cluster.component';
import { AddCustomerComponent } from './customer/add-customer/add-customer.component';
import { CustomerComponent } from './customer/customer.component';
import { InsurancebranchComponent } from './insurancebranch/insurancebranch.component';
import { InsurancecompanyComponent } from './insurancecompany/insurancecompany.component';
import { PlanComponent } from './plan/plan.component';
import { PosComponent } from './pos/pos.component';
import { PoscontactComponent } from './poscontact/poscontact.component';
import { TeammemberComponent } from './teammember/teammember.component';

const routes: Routes = [
    {
        path: 'master', canActivateChild: [AuthGuard],
        children: [
            {
                path: 'customer',
                component: CustomerComponent,
            },
            {
                path: 'add-customer/:name',
                component: AddCustomerComponent,
            },
            {
                path: 'edit-customer',
                component: AddCustomerComponent,
            },
            {
                path: 'customer/:policyType/:verticalType',
                component: CustomerComponent,
            },
            {
                path: 'add-customer',
                component: AddCustomerComponent,
            },
            {
                path: 'insurancebranch',
                component: InsurancebranchComponent,
            },
            {
                path: 'teammember',
                component: TeammemberComponent
            },
            {
                path: 'posmaster',
                component: PosComponent
            },
            {
                path: 'poscontact',
                component: PoscontactComponent
            },
            {
                path: 'insurancecompany',
                component: InsurancecompanyComponent
            },
            {
                path: 'cluster',
                component: ClusterComponent
            },
            {
                path: 'plan',
                component: PlanComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MasterRoutingModule { }
