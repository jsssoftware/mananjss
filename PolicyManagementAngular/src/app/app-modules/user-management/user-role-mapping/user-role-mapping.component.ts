import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ICommonDto } from 'src/app/app-entites/dtos/common/common-dto';
import { IDropDownDto } from 'src/app/app-entites/dtos/common/drop-down-dto';
import { IUserRoleModel } from 'src/app/app-entites/models/usermanagement/user-role-model';
import { UserService } from 'src/app/app-services/user-management-service/user.service';

@Component({
  selector: 'app-user-role-mapping',
  templateUrl: './user-role-mapping.component.html',
  styleUrls: ['./user-role-mapping.component.css']
})
export class UserRoleMappingComponent implements OnInit {
  public _branchId : string;
  public _userRoleId : number;

  constructor(
    private  _userService: UserService,

  ) {
    this._branchId = sessionStorage.getItem("branchId");

   }
  public _userRole: IDropDownDto<number>[] = [];
  public _userModels: IUserRoleModel[] = [];
  public _userModel: IUserRoleModel;

  public _formLists: any[] = [];

  ngOnInit(): void {
    this.getAllRoles();
    this.getAllUserForm();
  }

  getAllRoles(){
    this._userService.getUserRole(this._branchId).subscribe((response: IDropDownDto<number>[]) => {
      this._userRole = response;
    });
  }
  getAllUserForm(){
    this._userService.getFormList().subscribe((response: any[]) => {
      this._formLists = response;
    });
  }

  public onSelectionChanged(arg: MatCheckboxChange, obj:any) {
    
    if(arg.checked){
      this._userModel= {
        UserRoleId : this._userRoleId,
        FormId:obj.FormId,
        BranchId:Number(this._branchId)
      }
      this._userModels.push(this._userModel);
    }else{
      const indexToRemove = this._userModels.findIndex((pl) => pl.FormId ===obj.FormId);
      this._userModels.splice(indexToRemove, 1);
    }
   }

   createUserRights(){
    this._userService.createUserRights(this._userModels).subscribe((response: ICommonDto<any>) => {
      //this._userRole = response;
    });
 }

 reset(){
  this._userModels= [];
 }

}
