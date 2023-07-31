import { Component, Input, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { MotorService } from 'src/app/app-services/motor-service/motor.service';
import { AuthorizationService } from 'src/app/shared/auth-guard/authorization-service';
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
  isShowNewPolicy:boolean = false;
  isShowRollover:boolean = false;
  isShowRenew:boolean = false;
  isShowDataEntryIncomplete:boolean = false;
  isShowDataEntryCorrection:boolean = false;
  isShowDataEntryVerify:boolean = false;
  isShowDataEntryModify:boolean = false;
  isShowViewPolicy:boolean = false;

  constructor(private router: Router,private route: ActivatedRoute,private motorservice:MotorService,
    private authorizationServie :AuthorizationService) { 
    
  }

  ngOnInit(): void {
   
    this.newPolicyContent ="New "+ this.MenuVertical +" Policy Data Entry";
    this.checkAccessRights()

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
    if(this.MenuVertical=='Engineering')
    {
      this.verticalData = Vertical.Engineering; 
      this.motorservice.vertical$.next("Engineering")
    }
    if(this.MenuVertical=='Fire')
    {
      this.verticalData = Vertical.Fire; 
      this.motorservice.vertical$.next("Fire")
    }
    if(this.MenuVertical=='Marine')
    {
      this.verticalData = Vertical.Marine; 
      this.motorservice.vertical$.next("Marine")
    }
    if(this.MenuVertical=='Misc')
    {
      this.verticalData = Vertical.Misc; 
      this.motorservice.vertical$.next("Miscellaneous")
    }
    if(this.MenuVertical=='Liability')
    {
      this.verticalData = Vertical.Liabality; 
      this.motorservice.vertical$.next("Liability")
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

  checkAccessRights(){
    let credentials :any = this.authorizationServie.credentials;

    if (typeof credentials === 'string') {
      var authCredentails = JSON.parse(credentials);
    }else{
      authCredentails = credentials;
    }
  //  var  cred= authCredentails.find((x:any)=>x.DisplayName.includes("Motor"));
    authCredentails.forEach((element:any) => {
      let vertical =  this.MenuVertical;	
      if(this.MenuVertical=='Personal Accident')
      {
        vertical = "PA";
      }
      let menuNameNewDataEntry = "mnu"+ vertical+ "NewDataEntry";
      let menuNameDataIncomplete = "mnu"+ vertical+ "DataIncomplete";
      let menuNameVerifyDataEntry = "mnu"+ vertical+ "VerifyDataEntry";
      let menuNameModifyEntry = "mnu"+ vertical+ "ModifyEntry";
      let menuNameViewPolicy = "mnu"+ vertical+ "ViewPolicy";
      let menuNameRenewDataEntry = "mnu"+ vertical+ "RenewEntry";
      let menuNameDataCorrection = "mnu"+ vertical+ "DataCorrection";
      let menuNameRolloverEntry = "mnu"+ vertical+ "RolloverEntry";
      if(element?.DisplayName == menuNameNewDataEntry){
        this.isShowNewPolicy =  true;
      }  
      if(element?.DisplayName == menuNameDataIncomplete){
        this.isShowDataEntryIncomplete =  true;
      }  
      if(element?.DisplayName == menuNameVerifyDataEntry){
        this.isShowDataEntryVerify =  true;
      }  
      if(element?.DisplayName == menuNameModifyEntry){
        this.isShowDataEntryModify =  true;
      }  
      if(element?.DisplayName == menuNameRenewDataEntry){
        this.isShowRenew =  true;
      }  
     
      if(element?.DisplayName == menuNameDataCorrection){
        this.isShowDataEntryCorrection =  true;
      }  
     
      if(element?.DisplayName == menuNameRolloverEntry){
        this.isShowRollover =  true;
      }  
      if(element?.DisplayName == menuNameViewPolicy){
        this.isShowViewPolicy =  true;
      }  
     
    });
    
  }
}
