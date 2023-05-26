import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-engineering-policy-management',
  templateUrl: './engineering-policy-management.component.html',
  styleUrls: ['./engineering-policy-management.component.css']
})
export class EngineeringPolicyManagementComponent implements OnInit {
  public Vertical: string = "Engineering";
  constructor() { }

  ngOnInit(): void {
  }

}
