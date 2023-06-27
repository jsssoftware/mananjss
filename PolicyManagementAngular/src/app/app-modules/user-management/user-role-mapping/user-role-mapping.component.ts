import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ICommonDto } from 'src/app/app-entites/dtos/common/common-dto';
import { IDropDownDto } from 'src/app/app-entites/dtos/common/drop-down-dto';
import { IUserRoleModel } from 'src/app/app-entites/models/usermanagement/user-role-model';
import { UserService } from 'src/app/app-services/user-management-service/user.service';
import Swal from 'sweetalert2';

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
      if (response.IsSuccess) {
        Swal.fire({
          icon: 'success',
          title: 'Done',
          text: response.Message,
        }).then((result) => {
          if (result.isConfirmed) {
            this.reset();
          };
        })
      }
      else {
        if (response.Response == null) {
          Swal.fire({
            icon: 'error',
            title: 'Sorry',
            text: response.Message,
          });
        }
        else {
          if (response.Response.IsError) {
            Swal.fire({
              icon: 'error',
              title: 'Sorry',
              text: response.Message,
            });
          }
          else {
            Swal.fire({
              title: 'Warning',
              text: response.Message,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes, Save it!',
              cancelButtonText: 'Cancel'
            }).then(async (result) => {
              if (result.isConfirmed) {
                

              }
            })
          }
        }
      }
    });
 }

 reset(){
  this._userModels= [];
 }

}
