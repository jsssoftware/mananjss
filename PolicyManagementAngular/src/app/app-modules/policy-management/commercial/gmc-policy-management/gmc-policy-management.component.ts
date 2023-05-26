import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gmc-policy-management',
  templateUrl: './gmc-policy-management.component.html',
  styleUrls: ['./gmc-policy-management.component.css']
})
export class GmcPolicyManagementComponent implements OnInit {
  public Vertical: string = "Gmc";

  constructor() { }

  ngOnInit(): void {
  }

}
