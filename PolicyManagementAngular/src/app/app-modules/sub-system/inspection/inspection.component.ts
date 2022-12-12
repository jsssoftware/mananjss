import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormMode } from 'src/app/shared/utilities/enums/enum';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.css']
})
export class InspectionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigate(route: number) {
    if (route == FormMode.Add) {
      this.router.navigate(["/subsystem/inspection", route, 0]);
    }
    else {
      this.router.navigate(["/subsystem/inspection-search", route]);
    }
  }
}
