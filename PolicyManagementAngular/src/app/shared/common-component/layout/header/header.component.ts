import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICommonService } from 'src/app/app-services/common-service/abstracts/common.iservice';
import { SessionStorageManagementService } from 'src/app/shared/auth-guard/session-storage-management.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public _branchName: string='';
  public _loggedInUserName: string = '';
  public _userDetails: any;
  public _permission: string = '';
  public _role: string = '';

  constructor(private router: Router,private commonService: ICommonService,private sessionStorage :SessionStorageManagementService) { }

  ngOnInit() {
    this._branchName = sessionStorage.getItem('branchName') as string;
    this._userDetails = JSON.parse((sessionStorage.getItem("userDetails")));
    this._loggedInUserName = this._userDetails?.LoginUserFullName;
    this._role = this._userDetails?.LoginUserRole;
  }

  ngAfterViewInit() {
   /*  this.commonService.getLoggedInUserDetail().subscribe((response) => {
      this._role = response.LoginUserRole;
      this._loggedInUserName = response.LoginUserFullName; 
    this.sessionStorage.setItem("userDetails", response)
    this.sessionStorage.setItem("credentialsKey", response.LoginUserPermission)
/*     });
 */  }

  public logout() {
    sessionStorage.clear();
    window.location.reload(); 
  }

}