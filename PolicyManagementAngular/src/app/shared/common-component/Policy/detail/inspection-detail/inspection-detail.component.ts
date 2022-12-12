import { Component, OnInit, Input, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPolicyInspectionDto } from 'src/app/app-entites/dtos/common/policy-inspection-dto';
import { ICommonService } from 'src/app/app-services/common-service/abstracts/common.iservice';

@Component({
  selector: 'app-inspection-detail',
  templateUrl: './inspection-detail.component.html',
  styleUrls: ['./inspection-detail.component.css']
})
export class InspectionDetailComponent implements OnInit, AfterViewInit {

  public _inspectionId: number;
  public _verticalId: number;
  public _inspection?: IPolicyInspectionDto;

  constructor(private commonService: ICommonService,
    private dialogRef: MatDialogRef<InspectionDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    dialogRef.disableClose = true;
    this._inspectionId = data.inspectionId;
    this._verticalId = data.verticalId;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getInspection();
  }

  getInspection(): void {
    this.commonService.getInspectionById(this._inspectionId).subscribe((response: IPolicyInspectionDto) => {
      this._inspection = response;
    });
  }

}
