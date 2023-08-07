import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ICommonDto } from 'src/app/app-entites/dtos/common/common-dto';
import { IDropDownDto } from 'src/app/app-entites/dtos/common/drop-down-dto';
import { IUserRoleModel } from 'src/app/app-entites/models/usermanagement/user-role-model';
import { UserService } from 'src/app/app-services/user-management-service/user.service';
import Swal from 'sweetalert2';
export interface Permission {
  id: number;
  children?: Permission[];
  name?: boolean;
  MenuCode: number
  showChildren?: boolean;
  checkedid: boolean
}
@Component({
  selector: 'app-user-role-mapping',
  templateUrl: './user-role-mapping.component.html',
  styleUrls: ['./user-role-mapping.component.css']
})

export class UserRoleMappingComponent implements OnInit {
  public _branchId: string;
  public _userRoleId: number;

  permissions: Permission[];
  columnsToDisplay: string[] = ['name', 'checkbox'];
  parentColumn: string[] = ['name', 'checkbox'];
  childColumn: string[] = ['name', 'checkbox'];
  initializePermissions(permissions: Permission[]): void {
    permissions.forEach(permission => {
      permission.showChildren = false;
      if (!permission.children) {
        permission.children = [];
      } else {
        this.initializePermissions(permission.children);
      }
    });
  }
  toggleChildVisibility(permission: Permission): void {
    permission.showChildren = !permission.showChildren;
  }

  renderPermissions(permissions: Permission[], level: number): Permission[] {
    const renderedPermissions: Permission[] = [];

    permissions.forEach(permission => {
      renderedPermissions.push(permission);
      if (permission.showChildren) {
        const nestedPermissions = this.renderPermissions(permission.children, level + 1);
        renderedPermissions.push(...nestedPermissions);
      }
    });

    return renderedPermissions;
  }
  constructor(
    private _userService: UserService,

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

  permissionMap: Map<number, number[]> = new Map<number, number[]>();


  getAllRoles() {
    this._userService.getUserRole(this._branchId).subscribe((response: IDropDownDto<number>[]) => {
      this._userRole = response.filter(x=>x.Name?.toLowerCase() != 'admin'&& x.Name?.toLowerCase() !='business head');
    });
  }
  getUpdatedRole() {
    this._userService.getRoleUpdated(this._branchId,this._userRoleId).subscribe((response: any[]) => {
      this.permissions = response;
      this.initializePermissions(this.permissions);
    });
  }
  getAllUserForm() {
    this._userService.getFormList().subscribe((response: any[]) => {
      this.permissions = response;
      this.initializePermissions(this.permissions);
    });
  }

  public onSelectionChanged(arg: MatCheckboxChange, obj: any) {

    if (arg.checked) {
      this._userModel = {
        UserRoleId: this._userRoleId,
        FormId: obj.id,
        BranchId: Number(this._branchId)
      }
      this._userModels.push(this._userModel);
    } else {
      const indexToRemove = this._userModels.findIndex((pl) => pl.FormId === obj.FormId);
      this._userModels.splice(indexToRemove, 1);
    }
  }

  createUserRights() {
    this.getAllCheckedValue();
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

  reset() {
    this._userModels = [];
    this.permissions = [];
    this._userRoleId = 0;
  }
  level: number = 0; // Set the initial value of level

  toggleChildCheck(arg: MatCheckboxChange, permission: any): void {
    if (permission.children && permission.children.length > 0) {
      if (permission.children.children && permission.children.children.length > 0) {
        const checkedid = permission.children.checkedid;
        this.toggleChildren(permission.children, checkedid);
        this.level = 1
        return
      }
      // If the permission has children, toggle the state of the children checkboxes
      const checkedid = permission.checkedid;
      this.level = 2
      this.toggleChildren(permission, checkedid);

    } else {
      // If the permission is a child, update its parent's state
      this.updateParentCheck(permission);
    }
  }

  selectedformData(arg: MatCheckboxChange, permission: any) {

    /*   this.permissions.filter(x=>{
        if(x.)
      }) */
    if (arg.checked) {
      this._userModel = {
        UserRoleId: this._userRoleId,
        FormId: permission.id,
        BranchId: Number(this._branchId)
      }
      this._userModels.push(this._userModel);
    } else {
      const indexToRemove = this._userModels.findIndex((pl) => pl.FormId === permission.id);
      this._userModels.splice(indexToRemove, 1);
    }
  }

  toggleChildren(permission: any, checkedid: boolean): void {
    permission.children.forEach((child: any) => {
      child.checkedid = checkedid;
      if (child.children && child.children.length > 0) {
        // Recursively toggle the state of the grandchildren checkboxes
        this.toggleChildren(child, checkedid);
      }
    });
  }

  updateParentCheck(permission: any): void {
    if (permission?.grandParentId !== -1 && permission?.parentId !== -1) {
      var parent = this.findChild(permission);
    } else {
      var parent = this.findParent(permission);
    }

    if (parent) {
      const checkedChildren = parent.children.filter((child: any) => child.checkedid);
      parent.checkedid = checkedChildren.length > 0;
      // Update the parent's state recursively
      this.updateParentCheck(parent);

    }
  }



  updateAncestorParents(permission: any): void {
    const ancestor = this.findParent(permission);
    if (ancestor) {
      this.updateParentCheck(ancestor);
      this.updateAncestorParents(ancestor);
    }
  }

  findParent(permission: any): any {
    const parentId = permission.parentId;
    if (!parentId) {
      return null;
    }
    return this.permissions.find((p: any) => p.id === parentId);
  }


  findChild(permission: any): any {
    const parentId = permission.parentId;
    let foundChild: any = null;

    this.permissions.forEach((permission: any) => {
      const child = permission.children.find((c: any) => c.id === parentId);
      if (child) {
        foundChild = child;
        return true; // Exit the loop
      }
      return false;
    });
    return foundChild;
  }


  getAllCheckedValue() {
    this.permissions.forEach(grandParent => {
      if (grandParent.checkedid) {
        this._userModel = {
          UserRoleId: this._userRoleId,
          FormId: grandParent.id,
          BranchId: Number(this._branchId)
        }
        this._userModels.push(this._userModel);
        grandParent.children?.forEach(parent => {
          if (parent.checkedid) {
            this._userModel = {
              UserRoleId: this._userRoleId,
              FormId: parent.id,
              BranchId: Number(this._branchId)
            }
            this._userModels.push(this._userModel)
          }

          parent.children?.forEach(child => {
            if (child.checkedid) {
              this._userModel = {
                UserRoleId: this._userRoleId,
                FormId: child.id,
                BranchId: Number(this._branchId)
              }
              this._userModels.push(this._userModel)
            }
          })

        })
      }
    })
  }
}

  
