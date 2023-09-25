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
@Component({
  selector: 'app-insurancecompany',
  templateUrl: './insurancecompany.component.html',
  styleUrls: ['./insurancecompany.component.css']
})
export class InsurancecompanyComponent implements OnInit {
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  insuranceCompanyform = new FormGroup({
    InsuranceCompanyId :new FormControl(''),
    InsuranceCompanyName :new FormControl(''),
    CompanyCode: new FormControl('',[Validators.required]),
    IsMotor: new FormControl(''),  
    IsHealth:new FormControl(''),
    IsCommercial:new FormControl(''),
    IsLife:new FormControl(''),
    BranchId:new FormControl(''),
    Website1:new FormControl(''),
    Website2:new FormControl(''),
    IsActive:new FormControl(true),
  })
  constructor() { }

  ngOnInit(): void {
  }

}
