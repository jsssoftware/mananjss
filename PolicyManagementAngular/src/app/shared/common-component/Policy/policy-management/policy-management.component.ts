import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PolicyManagement, SearchPolicyType, Vertical } from 'src/app/shared/utilities/enums/enum';
@Component({
  selector: 'app-policy-management',
  templateUrl: './policy-management.component.html',
  styleUrls: ['./policy-management.component.css']
})
export class PolicyManagementComponent implements OnInit {
  @Input('MenuVertical') public MenuVertical:string='';
  verticalData :Vertical = Vertical.Motor;
  panelOpenState = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  routeWithEnum(enumName: string) {

    if(this.MenuVertical=='Motor')
    {
      this.verticalData = Vertical.Motor;
    }
    else if(this.MenuVertical=='Health')
    {
      this.verticalData = Vertical.Health; 
    }

    switch (enumName) {
      case "New":
        this.router.navigate(["/master/customer/" + SearchPolicyType.Motor_New + "/" +this.verticalData + ""]);
        break;
      case "Renew":
        this.router.navigate(["/user/search-policy/" + SearchPolicyType.Motor_Renew + "/" +this.verticalData + ""]);
        break;
      case "Incomplete":
        this.router.navigate(["/user/search-policy/" + SearchPolicyType.Motor_Incomplete + "/" + this.verticalData+ ""]);
        break;
      case "Correction":
        this.router.navigate(["/user/search-policy/" + SearchPolicyType.Motor_Correction + "/" + this.verticalData+ ""]);
        break;
      case "Verify":
        this.router.navigate(["/user/search-policy/" + SearchPolicyType.Motor_Verify + "/" + this.verticalData + ""]);
        break;
      case "Modify":
        this.router.navigate(["/user/search-policy/" + SearchPolicyType.Motor_Modify + "/" + this.verticalData + ""]);
        break;
      case "View":
        this.router.navigate(["/user/search-policy/" + SearchPolicyType.Motor_View + "/" + this.verticalData+ ""]);
        break;
      case "rollover":
        this.router.navigate(["/master/customer/" + SearchPolicyType.Motor_rollover + "/" +this.verticalData + ""]);

    }
  }
}
