import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime } from 'rxjs/operators';
import { ICommonDto } from 'src/app/app-entites/dtos/common/common-dto';
import { IDataTableDto } from 'src/app/app-entites/dtos/common/data-table-dto';
import { IDropDownDto } from 'src/app/app-entites/dtos/common/drop-down-dto';
import { UserService } from 'src/app/app-services/user-management-service/user.service';
import { VerticalSegment } from 'src/app/shared/utilities/enums/enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.css']
})
export class ManageRolesComponent implements OnInit {
  @ViewChild(MatPaginator) _paginator!: MatPaginator;


  public _branchId : string;
  public _branchname :any = sessionStorage.getItem("branchName");
  public _mobileNumber :number;
  public _isPasswordInValid :boolean = false;
  public _emailId :string;
  public _roleData: MatTableDataSource<any> = new MatTableDataSource<any>();
  public _length: number = 0;
  public _pageSize: number = 20;
  public _pageNumber: number = 0;
  public _input: string = "";
  public _showAll: boolean =false;
  verticalId:string[] = [];

  displayedColumns: string[] = [
    'RoleName',
    'Seniority',
    'Vertical',
    'IsActive',
    'Modify'
  ];
  manageRoleform = new FormGroup({
    branchId: new FormControl(''),
    userRoleName: new FormControl('',[Validators.required]),
    levelNumber: new FormControl('',[Validators.required]),
    isMotor: new FormControl(''),
    isRetail: new FormControl(''),
    isCommercial: new FormControl(''),
    isActive: new FormControl(true),
    userRoleId: new FormControl(''),
    verticalId:  new FormControl('')

  });
  constructor(private  _userService: UserService,) {
    this._branchId = sessionStorage.getItem("branchId");
    this._branchname = sessionStorage.getItem("branchName");
    this.manageRoleform.patchValue({
      "branchId":this._branchId
    });

   }

  ngOnInit(): void {
    this.getRoles()
  }

  getRoles(): void {
    this._userService.getRoles(this._branchId).pipe(debounceTime(200)).subscribe((response: IDataTableDto<any[]>) => {
      this._roleData = new MatTableDataSource(response.Data);
      this._length = response.TotalCount;
      this._roleData = new MatTableDataSource(response.Data);
      this._roleData.paginator = this._paginator;
    });
  }

  pageChanged(event: PageEvent): void {
    this._pageNumber = event.pageIndex;
  }

  createRole(){
    this.verticalIdArray();
    this._userService.createRole(this.manageRoleform.value).subscribe((response: ICommonDto<any>) => {
      if (response.IsSuccess) {
        this.getRoles();
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
    this.manageRoleform.reset();
  }

  editRole(data :any){
    this.manageRoleform.patchValue({
      branchId: data?.BranchId,
      userRoleId: data?.RoleId,
      isActive: data?.IsActive,
      userRoleName:  data?.RoleName
  });
  let roleArr:any[] =  data?.VerticalData?.split(',');
  if(roleArr.includes(VerticalSegment.Motor.toString())){
    this.manageRoleform.patchValue({
      isMotor: true
    });

  }
  if(roleArr.includes(VerticalSegment.Commercial.toString())){
    this.manageRoleform.patchValue({
      isCommercial: true
    });

  }
  if(roleArr.includes(VerticalSegment.Retail.toString())){
    this.manageRoleform.patchValue({
      isRetail: true
    });

  }
  this._mobileNumber =  data?.MobileNumber
  this._emailId =  data?.EmailId

}

verticalIdArray(){
  if(this.manageRoleform.value.isMotor){
    this.verticalId.push(VerticalSegment.Motor.toString());
  }
  if(this.manageRoleform.value.isRetail){
    this.verticalId.push(VerticalSegment.Retail.toString());
  }
  if(this.manageRoleform.value.isCommercial){
    this.verticalId.push(VerticalSegment.Commercial.toString());
  }

  this.manageRoleform.patchValue({
    "verticalId":this.verticalId
  });
}
  
}
