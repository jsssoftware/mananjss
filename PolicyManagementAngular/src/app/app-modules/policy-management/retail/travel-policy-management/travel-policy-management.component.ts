import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-travel-policy-management',
  templateUrl: './travel-policy-management.component.html',
  styleUrls: ['./travel-policy-management.component.css']
})
export class TravelPolicyManagementComponent implements OnInit {
  public Vertical:string="Travel";

  constructor() { }

  ngOnInit(): void {
  }

}
