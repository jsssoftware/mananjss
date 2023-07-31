import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liabality-policy-management',
  templateUrl: './liabality-policy-management.component.html',
  styleUrls: ['./liabality-policy-management.component.css']
})
export class LiabalityPolicyManagementComponent implements OnInit {
  public Vertical: string = "Liability";

  constructor() { }

  ngOnInit(): void {
  }

}
