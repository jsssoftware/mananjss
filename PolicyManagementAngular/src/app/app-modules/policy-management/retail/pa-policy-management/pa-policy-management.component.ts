import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pa-policy-management',
  templateUrl: './pa-policy-management.component.html',
  styleUrls: ['./pa-policy-management.component.css']
})
export class PaPolicyManagementComponent implements OnInit {
  public Vertical:string="Personal Accident";

  constructor() { }

  ngOnInit(): void {
  }

}
