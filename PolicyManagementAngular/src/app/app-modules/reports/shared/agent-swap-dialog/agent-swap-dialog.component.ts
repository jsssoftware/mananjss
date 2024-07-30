import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICommonDto } from 'src/app/app-entites/dtos/common/common-dto';
import { IDropDownDto } from 'src/app/app-entites/dtos/common/drop-down-dto';
import { ICommonService } from 'src/app/app-services/common-service/abstracts/common.iservice';
import { ReportService } from 'src/app/app-services/report-service/report.service';
import { Vertical } from 'src/app/shared/utilities/enums/enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agent-swap-dialog',
  templateUrl: './agent-swap-dialog.component.html',
  styleUrls: ['./agent-swap-dialog.component.css']
})
export class AgentSwapDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private commonService: ICommonService,
  private reportService: ReportService,
  public dialogRef: MatDialogRef<AgentSwapDialogComponent>
) { }
  public _policyData: any;
  public _vertical: any;
  public _teleCallers: any;
  public _references: any;
  public _fosNames: any;
  public _branchId: any;
  public _posDatas: any;
  public _products: IDropDownDto<number>[] = [];
  public _plans: IDropDownDto<number>[] = [];

  async ngOnInit(): Promise<void> {
    this._policyData = this.data.policyData;
    this._vertical = this.data.vertical;
    this._branchId = sessionStorage.getItem("branchId");
    await this.getTeleCallers(this._branchId);
    await this.getReferences(this._branchId);
    await this.getFosNames(this._branchId);
    await this.getPos(this._branchId);
    this.agentswapmasterform.get("policyRemarks").setValue(this._policyData.PolicyRemarks);

  }

  
  agentswapmasterform = new FormGroup({
    referenceId: new FormControl(''),
    teleCallerId: new FormControl(''),
    fosId: new FormControl(''),
    posNameId: new FormControl(''),
    policyRemarks: new FormControl(''),
    policyId: new FormControl(''),
    branchId: new FormControl(''),
    pos: new FormControl(''),
    fos: new FormControl(''),
    tellecaller: new FormControl(''),
    reference: new FormControl(''),
  });

  
  getTeleCallers(branchId: number): any {
    this.commonService.getTeleCallers(Vertical.Motor, branchId).subscribe((response: any) => {
      this._teleCallers = response;
      this.agentswapmasterform.get("teleCallerId").setValue(this._policyData.TeleCallerId);

    });
  }

  getReferences(branchId: number): any {
    this.commonService.getReferences(branchId).subscribe((response: any) => {
      this._references = response;
      this.agentswapmasterform.get("referenceId").setValue(this._policyData.ReferenceId);
    });
  }

  getFosNames(branchId: number): any {
    this.commonService.getFosNames(Vertical.Motor, branchId).subscribe((response: any) => {
      this._fosNames = response;
      this.agentswapmasterform.get("fosId").setValue(this._policyData.FOSId);
    });
  }

  
  getPos(branchId: number): void {
    this.commonService.getPos(Vertical.Motor, branchId).subscribe((response: IDropDownDto<number>[]) => {
      this._posDatas = response;
      this.agentswapmasterform.get("posNameId").setValue(this._policyData.POSId);
    })
  }


 
  
  submit(){
    this.agentswapmasterform.get("branchId").setValue(this._branchId);
    let pos =  this._posDatas.find(x=>x.Value == this.agentswapmasterform.value.posNameId)?.Name;
    let tellecaller =  this._teleCallers.find(x=>x.Value == this.agentswapmasterform.value.teleCallerId)?.Name;
    let reference =  this._references.find(x=>x.Value == this.agentswapmasterform.value.referenceId)?.Name;
    let fos =  this._fosNames.find(x=>x.Value == this.agentswapmasterform.value.fosId)?.Name;
    this.agentswapmasterform.get("pos").setValue(pos);
    this.agentswapmasterform.get("tellecaller").setValue(tellecaller);
    this.agentswapmasterform.get("reference").setValue(reference);
    this.agentswapmasterform.get("fos").setValue(fos);
    this.agentswapmasterform.get("policyId").setValue(this._policyData.PolicyId);
    this.reportService.updateAgentSwap(this.agentswapmasterform.getRawValue()).subscribe((response: ICommonDto<any>) => {
      if (response.IsSuccess) {
        Swal.fire({
          icon: 'success',
          title: 'Done',
          text: response.Message,
        }).then((result) => {
          if (result.isConfirmed) {
            this.reset();
            this.dialogRef.close()
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
    this.agentswapmasterform.reset();
  }

}
