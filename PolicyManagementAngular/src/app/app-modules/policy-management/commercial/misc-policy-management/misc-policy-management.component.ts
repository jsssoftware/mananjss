import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-misc-policy-management',
  templateUrl: './misc-policy-management.component.html',
  styleUrls: ['./misc-policy-management.component.css']
})
export class MiscPolicyManagementComponent implements OnInit {
  public Vertical: string = "Misc";

  constructor() { }

  ngOnInit(): void {
  }

}
