import { Injectable } from "@angular/core";
import { SearchPolicyType, SearchPolicyTypeName } from "../enums/enum";

@Injectable()
export class CommonFunction {

    public getTitle(_policyTypeId:number): string { 
        let _headerTitle ='';
        switch (_policyTypeId){
            case SearchPolicyType.Motor_New: 
              _headerTitle =SearchPolicyTypeName.Motor_New
            break;
            case SearchPolicyType.Motor_Renew:  
              _headerTitle =SearchPolicyTypeName.Motor_Renew
            break;
            case SearchPolicyType.Motor_Incomplete: 
              _headerTitle =SearchPolicyTypeName.Motor_Incomplete
            break;
            case SearchPolicyType.Motor_Correction: 
             _headerTitle =SearchPolicyTypeName.Motor_Correction
            break;
            case SearchPolicyType.Motor_Verify: 
              _headerTitle =SearchPolicyTypeName.Motor_Verify
            break;
            case SearchPolicyType.Motor_Modify: 
              _headerTitle =SearchPolicyTypeName.Motor_Modify
            break;
            case SearchPolicyType.Motor_View: 
              _headerTitle =SearchPolicyTypeName.Motor_View
            break;
            case SearchPolicyType.Motor_rollover: 
              _headerTitle =SearchPolicyTypeName.Motor_rollover
            break;
          }
          return _headerTitle; 
    }

    public keyUpMaxValue(event:any,maxValue:number) {
      var specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete','.'];
      if (specialKeys.indexOf(event.key) !== -1) {
        return;
      }
      if (parseFloat(event.target.value) > maxValue) {
        event.preventDefault();
    }
    }
    public lowerCaseFirstCharacter(obj:any) {
      const lowerCaseFormValues:any = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const lowerCaseKey = key.charAt(0).toLowerCase() + key.slice(1);
          lowerCaseFormValues[lowerCaseKey] = obj[key];
        }
      }
      return lowerCaseFormValues;

  }

  public formatDate(d: Date) {
    if(d&& d!= null){
    d = new Date(d);   
    var convertDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() - d.getTimezoneOffset()).toISOString();
    return convertDate
    }
    return null;
  }

  public formatDateString(d: Date) {
    if(d&& d!= null){
    d = new Date(d);   
    var convertDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() - d.getTimezoneOffset()).toISOString();
    return convertDate
    }
    return null;
  }
}