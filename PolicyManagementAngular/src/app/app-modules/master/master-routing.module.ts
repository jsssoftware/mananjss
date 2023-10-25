import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth-guard/auth.guard';
import { AddonplanComponent } from './addonplan/addonplan.component';
import { AddonridercomboComponent } from './addonridercombo/addonridercombo.component';
import { BankmasterComponent } from './bankmaster/bankmaster.component';
import { CitymasterComponent } from './citymaster/citymaster.component';
import { ClusterComponent } from './cluster/cluster.component';
import { AddCustomerComponent } from './customer/add-customer/add-customer.component';
import { CustomerComponent } from './customer/customer.component';
import { DepartmentComponent } from './department/department.component';
import { DesignationComponent } from './designation/designation.component';
import { FinancemasterComponent } from './financemaster/financemaster.component';
import { IndustryComponent } from './industry/industry.component';
import { InspectionMasterComponent } from './inspection/inspection.component';
import { InsurancebranchComponent } from './insurancebranch/insurancebranch.component';
import { InsurancecompanyComponent } from './insurancecompany/insurancecompany.component';
import { ManufactureComponent } from './manufacture/manufacture.component';
import { PlanComponent } from './plan/plan.component';
import { PosComponent } from './pos/pos.component';
import { PoscategoryComponent } from './poscategory/poscategory.component';
import { PoscontactComponent } from './poscontact/poscontact.component';
import { PostypeComponent } from './postype/postype.component';
import { ProductmasterComponent } from './productmaster/productmaster.component';
import { ProfessionComponent } from './profession/profession.component';
import { RtozonemasterComponent } from './rtozonemaster/rtozonemaster.component';
import { TeammemberComponent } from './teammember/teammember.component';
import { VariantmasterComponent } from './variantmaster/variantmaster.component';
import { VehiclemodelComponent } from './vehiclemodel/vehiclemodel.component';

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
            },
            {
                path: 'addonplan',
                component: AddonplanComponent
            },
            {
                path: 'manufacture',
                component: ManufactureComponent
            },
            {
                path: 'vehiclemodel',
                component: VehiclemodelComponent
            },
            {
                path: 'addonridercombo',
                component: AddonridercomboComponent
            },
            {
                path: 'varient',
                component: VariantmasterComponent
            },
            {
                path: 'bank',
                component: BankmasterComponent
            },
            {
                path: 'city',
                component: CitymasterComponent
            },
            {
                path: 'product',
                component: ProductmasterComponent
            },
            {
                path: 'inspection',
                component: InspectionMasterComponent
            },
            {
                path: 'postype',
                component: PostypeComponent
            },
            {
                path: 'poscategory',
                component: PoscategoryComponent
            },
            {
                path: 'rtozone',
                component: RtozonemasterComponent
            }
            ,
            {
                path: 'finance',
                component: FinancemasterComponent
            }
            ,
            {
                path: 'department',
                component: DepartmentComponent
            }
            ,
            {
                path: 'designation',
                component: DesignationComponent
            }
            ,
            {
                path: 'industry',
                component: IndustryComponent
            }
            ,
            {
                path: 'profession',
                component: ProfessionComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MasterRoutingModule { }
