import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth-guard/auth.guard';
import { AddCustomerComponent } from './customer/add-customer/add-customer.component';
import { CustomerComponent } from './customer/customer.component';
import { InsurancebranchComponent } from './insurancebranch/insurancebranch.component';
import { PosComponent } from './pos/pos.component';
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
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MasterRoutingModule { }
