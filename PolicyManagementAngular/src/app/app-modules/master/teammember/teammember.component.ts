import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime } from 'rxjs/operators';
import { ICommonDto } from 'src/app/app-entites/dtos/common/common-dto';
import { IDataTableDto } from 'src/app/app-entites/dtos/common/data-table-dto';
import { IDropDownDto } from 'src/app/app-entites/dtos/common/drop-down-dto';
import { ICommonService } from 'src/app/app-services/common-service/abstracts/common.iservice';
import { MasterService } from 'src/app/app-services/master-service/master.service';
import { CommonFunction } from 'src/app/shared/utilities/helpers/common-function';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-teammember',
  templateUrl: './teammember.component.html',
  styleUrls: ['./teammember.component.css']
})
export class TeammemberComponent implements OnInit {

  @ViewChild(MatPaginator) _paginator!: MatPaginator;
    teammemberform = new FormGroup({
    teamMemberName: new FormControl('',[Validators.required]),
    designationId: new FormControl('',[Validators.required]),
    userRoleId: new FormControl(''),
    departmentId: new FormControl(''),
    reportedToId: new FormControl(''),
    userPassword: new FormControl(''),  
    teamMemberAddress: new FormControl(''),  
    teamMemberPhone1: new FormControl(''),  
    teamMemberPhone2: new FormControl(''),  
    teamMemberMobile1: new FormControl('',[Validators.required,Validators.pattern('^[1-9][0-9]+$'),Validators.minLength(10), Validators.maxLength(10)]),  
    teamMemberMobile2: new FormControl('',[Validators.pattern('^[1-9][0-9]+$'),Validators.minLength(10), Validators.maxLength(10)]),  
    teamMemberEmail1: new FormControl('',[Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]),  
    teamMemberEmail2: new FormControl('',[Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]),  
    isMotor: new FormControl(''),  
    isHealth: new FormControl(''),  
    isCommercial: new FormControl(''),  
    isLife: new FormControl(''),  
    isTelecaller: new FormControl(''),  
    isFos: new FormControl(''),  
    isActive: new FormControl(true),  
    branchId:new FormControl(''),
    userId:new FormControl(''),
    teamMemberId:new FormControl(''),
    teamMemberDOB:new FormControl(''),
    teamMemberDOJ:new FormControl('')
  });
  
  public _designation: IDropDownDto<number>[] = [];
  public _department: IDropDownDto<number>[] = [];
  public _roles: IDropDownDto<number>[] = [];
  public _teammembers: IDropDownDto<number>[] = [];
  public  _branchId: number;
  public _teamMemberData: MatTableDataSource<any> = new MatTableDataSource<any>();
  public _length: number = 0;
  public _pageSize: number = 20;
  public _pageNumber: number = 0;
  public _input: string = "";
  public _showAll: boolean =false;
  displayedColumns: string[] = [
    'TeamMemberName',
    'TeamMemberMobile2',
    'TeamMemberMobile1',
    'TeamMemberPhone1',
    'TeamMemberPhone2',
    'TeamMemberEmail1',
    'TeamMemberEmail2',
    'ISTelecaller',
    'IsCommercial',
    'IsHealth',
    'IsMotor',
    'IsLife',
    'DepartmentId',
    'DesignationId',
    'teamMemberDOJ',
    
    'teamMemberDOB',
    'Modify'
  ];
  constructor(private commonService : ICommonService, private masterSerivice :MasterService,private  commonFunction :CommonFunction) { }

  async ngOnInit(): Promise<void> {
    this._branchId = parseInt(sessionStorage.getItem("branchId") as string);
    await this.getDepartment();
    await this.getDesignation();
    await this.getAllTeamMembers();
    await this.getUserRole();
    await this.getTeamMember();
  }

  
  getDesignation(): any {
    this.commonService.getDesignation().subscribe((response: IDropDownDto<number>[]) => {
      this._designation  = response;
    });
  }
  getDepartment(): any {
    this.commonService.getDepartment().subscribe((response: IDropDownDto<number>[]) => {
      this._department  = response;
    });
  }
  getUserRole(): any {
    this.commonService.getUserRole(this._branchId).subscribe((response: IDropDownDto<number>[]) => {
      this._roles  = response;
    });
  }
  getAllTeamMembers(): any {
    this.commonService.getAllTeamMembers(0, this._branchId).subscribe((response: IDropDownDto<number>[]) => {
      this._teammembers  = response;
    });
  }

  reset(){
    this.teammemberform.reset();
  }

  createTeamMember(){
    this.teammemberform.patchValue({
      teamMemberDOB : this.commonFunction.formatDate(this.teammemberform.value.teamMemberDOB),
      teamMemberDOJ : this.commonFunction.formatDate(this.teammemberform.value.teamMemberDOJ),
      branchId : this._branchId
    });
    

    this.masterSerivice.createTeamMember(this.teammemberform.getRawValue()).subscribe((response: ICommonDto<any>) => {
      if (response.IsSuccess) {
        this.getTeamMember();
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
  

  pageChanged(event: PageEvent): void {
    this._pageNumber = event.pageIndex;
  }

  getTeamMember(): any {
    
    this.masterSerivice.getTeamMember(this._branchId).subscribe((response: IDataTableDto<any[]>) => {
      this._length = response.TotalCount;
      response.Data.forEach(y=>{
        y.DepartmentName = this._department.find(x=>x.Value ==  y.DepartmentId)?.Name,
        y.DesignationName = this._department.find(x=>x.Value ==  y.DesignationId)?.Name
      })
      this._teamMemberData = new MatTableDataSource(response.Data);
      
      this._teamMemberData.paginator = this._paginator;
      this._teamMemberData._updateChangeSubscription(); // <-- Refresh the datasource

    });
  }


  
  editTeamMember(data:any){
    let obj = Object.assign({}, data);
    const lowerCaseFormValues:any =this.commonFunction.lowerCaseFirstCharacter(obj);
    this.teammemberform.patchValue({
      isTelecaller : data.ISTelecaller,
      isFos : data.ISFOS,
    });
    this.teammemberform.patchValue(lowerCaseFormValues);
  }

  iTeamFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._teamMemberData.filter = filterValue.trim().toLowerCase();
  }

}
