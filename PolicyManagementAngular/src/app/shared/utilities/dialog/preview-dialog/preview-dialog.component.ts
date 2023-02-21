import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";


@Component({
  selector: 'app-preview-dialog',
  templateUrl: './preview-dialog.component.html',
  styleUrls: ['./preview-dialog.component.css']
})
export class PreviewDialogComponent implements OnInit {
  public _url : any;

  constructor(private dialogRef: MatDialogRef<PreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _sanitizer: DomSanitizer
    ) { 
      this._url = data.url;

  }

  ngOnInit(): void {
    console.log(this.data)

  }

}
