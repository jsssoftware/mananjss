import { AfterViewInit, Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPolicyVoucherDto } from 'src/app/app-entites/dtos/common/policy-voucher-dto';
import { ICommonService } from 'src/app/app-services/common-service/abstracts/common.iservice';

@Component({
  selector: 'app-voucher-detail',
  templateUrl: './voucher-detail.component.html',
  styleUrls: ['./voucher-detail.component.css']
})
export class VoucherDetailComponent implements OnInit, AfterViewInit {

  public _voucherId: number;
  public _verticalId: number;
  public _voucher?: IPolicyVoucherDto;

  constructor(private commonService: ICommonService,
    private dialogRef: MatDialogRef<VoucherDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    dialogRef.disableClose = true;
    this._voucherId = data.voucherId;
    this._verticalId = data.verticalId;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getVoucher();
  }

  getVoucher(): void {
    this.commonService.getVoucherById(this._voucherId).subscribe((response: IPolicyVoucherDto) => {
      this._voucher = response;
    });
  }
}
