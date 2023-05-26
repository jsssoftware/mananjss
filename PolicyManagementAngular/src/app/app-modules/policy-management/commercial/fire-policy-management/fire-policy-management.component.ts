import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fire-policy-management',
  templateUrl: './fire-policy-management.component.html',
  styleUrls: ['./fire-policy-management.component.css']
})
export class FirePolicyManagementComponent implements OnInit {
  public Vertical: string = "Fire";

  constructor() { }

  ngOnInit(): void {
  }

}
