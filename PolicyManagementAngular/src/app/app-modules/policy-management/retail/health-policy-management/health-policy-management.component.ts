import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-health-policy-management',
  templateUrl: './health-policy-management.component.html',
  styleUrls: ['./health-policy-management.component.css']
})
export class HealthPolicyManagementComponent implements OnInit {
  public Vertical:string="Health";
  constructor( 
    ) { 

  }

  ngOnInit(): void {
  }

}
