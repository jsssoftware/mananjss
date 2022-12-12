import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormMode } from 'src/app/shared/utilities/enums/enum';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigate(route: number) {
    if (route == FormMode.Add) {
      this.router.navigate(["/subsystem/claims-search-policy"]);
    }
    else {
      this.router.navigate(["/subsystem/search-claims", route]);
    }

  }
}
