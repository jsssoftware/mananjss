import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; 
import { AppComponent } from './app.component'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './shared/common-module/material-module';
import { Services } from './app-services/register.service';
import { LoginComponent } from './shared/common-component/login/login.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { AuthGuard } from './shared/auth-guard/auth.guard';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { CommonFunction } from 'src/app/shared/utilities/helpers/common-function'; 
import { HeaderComponent } from './shared/common-component/layout/header/header.component';
import { TopMenuComponent } from './shared/common-component/layout/top-menu/top-menu.component';
import { MenuItemComponent } from './shared/common-component/layout/menu-item/menu-item.component'; 
import { SubSystemModule } from './app-modules/sub-system/subsystem.module';
import { MasterModule } from './app-modules/master/master.module';
import { SystemInitialModule } from './app-modules/dashboard/systeminitial.module';
import { PolicyManagementModule } from './app-modules/policy-management/policymanagement.module'; 
import { LoaderInterceptor } from './shared/common-component/loader/loaderInterceptor';
import {MatListModule} from '@angular/material/list';
import { UserManagementModule } from './app-modules/user-management/user-management.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,  
    HeaderComponent,
    TopMenuComponent,
    MenuItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    SystemInitialModule,
    PolicyManagementModule,
    SubSystemModule,
    MasterModule,
    MaterialFileInputModule,
    UserManagementModule
  ],
  providers: [CommonFunction, Services, AuthGuard, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService,
    {  
      provide: HTTP_INTERCEPTORS,  
      useClass: LoaderInterceptor,  
      multi: true  
    }  
  ],
  bootstrap: [AppComponent],
  exports: []

})
export class AppModule { }
