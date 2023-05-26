import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marine-policy-management',
  templateUrl: './marine-policy-management.component.html',
  styleUrls: ['./marine-policy-management.component.css']
})
export class MarinePolicyManagementComponent implements OnInit {
  public Vertical: string = "Marine";

  constructor() { }

  ngOnInit(): void {
  }

}
