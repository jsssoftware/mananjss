import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime } from 'rxjs/operators';
import { ICommonDto } from 'src/app/app-entites/dtos/common/common-dto';
import { IDataTableDto } from 'src/app/app-entites/dtos/common/data-table-dto';
import { IDropDownDto } from 'src/app/app-entites/dtos/common/drop-down-dto';
import { UserService } from 'src/app/app-services/user-management-service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit,AfterViewInit {
  @ViewChild(MatPaginator) _paginator!: MatPaginator;


  public _branchId : string;
  public _branchname :any = sessionStorage.getItem("branchName");
  public _mobileNumber :number;
  public _isPasswordInValid :boolean = false;
  public _emailId :string;
  public _teamMember: IDropDownDto<number>[] = [];
  public _reportedBy: IDropDownDto<number>[] = [];
  public _userRole: IDropDownDto<number>[] = [];
  public _userData: MatTableDataSource<any> = new MatTableDataSource<any>();
  public _length: number = 0;
  public _pageSize: number = 20;
  public _pageNumber: number = 0;
  public _input: string = "";
  public _showAll: boolean =false;

  displayedColumns: string[] = [
    'BranchName',
    'UserName',
    'TeamMember',
    'UserRole',
    'ReportedTo',
    'Seniority',
    'MobileNumber',
    'EmailId',
    'IsActive',
    'IsLocked',
    'Modify'
  ];
  manageuserform = new FormGroup({
    branchId: new FormControl(''),
    teamMemberId: new FormControl('',[Validators.required]),
    userRoleId: new FormControl('',[Validators.required]),
    userPassword: new FormControl('',[Validators.required]),
    confirmPassword: new FormControl('',[Validators.required]),
    reportedTo: new FormControl('',[Validators.required]),
    userName: new FormControl('',[Validators.required]),  
    userId: new FormControl('',[Validators.required]),  
    isLocked: new FormControl(''),  
    isActive: new FormControl(true),  
  });
  constructor(
    private  _userService: UserService,
  ) { 
    this._branchId = sessionStorage.getItem("branchId");
    this._branchname = sessionStorage.getItem("branchName");
    this.manageuserform.patchValue({
      "branchId":this._branchId
    });
  }

  ngOnInit(): void {
  }

  async ngAfterViewInit(): Promise<void> {
    await this.getUserRole();
    await this.getTeamMember();
    await this.getUsers();
  }

  getUserRole(): any {
    this._userService.getUserRole(this._branchId).subscribe((response: IDropDownDto<number>[]) => {
      this._userRole = response;
    });
  }
  savedTeamMember : IDropDownDto<number>[] = [];;
  getTeamMember(): void {
    this._userService.getTeamMember(this._branchId).subscribe((response: IDropDownDto<number>[]) => {
      this._teamMember = response;
      this.savedTeamMember =  response
    });
  }
  
  getUsers(): void {
    this._userService.getUsers(this._branchId).pipe(debounceTime(200)).subscribe((response: IDataTableDto<any[]>) => {
      this._userData = new MatTableDataSource(response.Data);
      console.log(this._userData)
      this._length = response.TotalCount;
      this._userData = new MatTableDataSource(response.Data);
      this._userData.paginator = this._paginator;
      this._reportedBy = this._teamMember.filter(x => response.Data.filter(y => y.TeamMemberId == x.Value).length);

      this._teamMember =  this._teamMember.filter(x => !response.Data.filter(y => y.TeamMemberId == x.Value).length);
    });
  }


  pageChanged(event: PageEvent): void {
    this._pageNumber = event.pageIndex;
  }

  reset(){
    this.manageuserform.controls.teamMemberId.enable();

    this.manageuserform.reset();
    this._mobileNumber =  null;
    this._emailId =  "";
  }
  


  pwdConfirming() {
    this._isPasswordInValid = false;
      if (this.manageuserform.get('userPassword').value !== this.manageuserform.get('confirmPassword').value) 
         {this._isPasswordInValid = true};
    
  }

  editUser(data :any){
      let teamdata =  this.savedTeamMember.find(x=>x.Value == data?.TeamMemberId)
      this._teamMember.push(teamdata)
      this.manageuserform.patchValue({
        branchId: data?.BranchId,
        teamMemberId: data?.TeamMemberId,
        userRoleId: data?.UserRoleId,
        userPassword: data?.UserPassword,
        confirmPassword: data?.UserPassword,
        reportedTo: data?.ReportedTo,
        userName: data?.UserName,  
        userId: data?.UserId,  
        isLocked: data?.IsLocked,  
        isActive: data?.IsActive 
    });
    this.manageuserform.controls.teamMemberId.disable();
    this._mobileNumber =  data?.MobileNumber
    this._emailId =  data?.EmailId

  }
  deleteUser(data :any){
     

  }

  getTeamMemberId(teamMemberId :any){
    //debugger
    this._userService.getTeamMemberById(teamMemberId).subscribe((response: any) => {
      this._mobileNumber = response?.TeamMemberMobile1;
      this._emailId = response?.TeamMemberEmail1;
    });
  }

  createUser(){
    this._userService.createUser(this.manageuserform.value).subscribe((response: ICommonDto<any>) => {
      if (response.IsSuccess) {
        this.getUsers();
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
}
