import { Component, Input, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { MotorService } from 'src/app/app-services/motor-service/motor.service';
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
  newPolicyContent:string = "New Policy Data Entry";

  constructor(private router: Router,private route: ActivatedRoute,private motorservice:MotorService) { }

  ngOnInit(): void {
    if(this.MenuVertical=='Motor')
    {
      this.newPolicyContent ="New Motor Policy Data Entry";
    }
    if(this.MenuVertical=='Health')
    {
      this.newPolicyContent ="New Health Policy Data Entry";
    }
    if(this.MenuVertical=='Personal Accident')
    {
      this.newPolicyContent ="New Personal Accident Policy Data Entry";
    }
    if(this.MenuVertical=='Travel')
    {
      this.newPolicyContent ="New Travel Policy Data Entry";
    }
  }

  routeWithEnum(enumName: string) {

    if(this.MenuVertical=='Motor')
    {
      this.verticalData = Vertical.Motor;
      this.motorservice.vertical$.next("MOTOR")
    }
    if(this.MenuVertical=='Health')
    {
      this.verticalData = Vertical.Health; 
      this.motorservice.vertical$.next("HEALTH")
    }
    if(this.MenuVertical=='Personal Accident')
    {
      this.verticalData = Vertical.Pesonal_Accident; 
      this.motorservice.vertical$.next("Pesonal_Accident")
    }
    if(this.MenuVertical=='Travel')
    {
      this.verticalData = Vertical.Travel; 
      this.motorservice.vertical$.next("Travel")
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
