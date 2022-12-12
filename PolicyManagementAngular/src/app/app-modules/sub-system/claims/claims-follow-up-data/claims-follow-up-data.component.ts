import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IFollowUpDto } from 'src/app/app-entites/dtos/claims/follow-up-dto';
import { IClaimsService } from 'src/app/app-services/claims/abstracts/claims.iservice';

@Component({
  selector: 'app-claims-follow-up-data',
  templateUrl: './claims-follow-up-data.component.html',
  styleUrls: ['./claims-follow-up-data.component.css']
})
export class ClaimsFollowUpDataComponent implements OnInit {

  public _claimsId: number = 0;
  public _claimsFollowUpData: IFollowUpDto[] = [];
  public displayedColumns: string[] = [
    'followUpReason',
    'followUpDate'
  ];
  public isLoading: boolean = false;
  constructor(private claimsService: IClaimsService,
    private dialogRef: MatDialogRef<ClaimsFollowUpDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    dialogRef.disableClose = true;
    this._claimsId = data.claimsId
  }

  ngOnInit(): void {
    this.getClaimsFollowUpData(this._claimsId);
  }

  ngAfterViewInit(): void {

  }

  getClaimsFollowUpData(claimsId: number): void {
    this.isLoading = true;
    this.claimsService.getClaimsFollowUpDataByClaimsId(claimsId).subscribe((response: IFollowUpDto[]) => {
      this._claimsFollowUpData = response;
      this.isLoading = false;
    });
  }

}
