import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICommonService } from 'src/app/app-services/common-service/abstracts/common.iservice';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public _branchName: string='';
  public _loggedInUserName: string = '';
  public _role: string = '';

  constructor(private router: Router,private commonService: ICommonService) { }

  ngOnInit() {
    this._branchName = sessionStorage.getItem('branchName') as string;
  }

  ngAfterViewInit() {
    this.commonService.getLoggedInUserDetail().subscribe((response) => {
      this._loggedInUserName = response.LoginUserFullName;
      this._role = response.LoginUserRole;
    });
  }

  public logout() {
    sessionStorage.clear();
    window.location.reload(); 
  }

}