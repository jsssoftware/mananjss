import { Component, OnInit } from '@angular/core'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { 
  public showLoginRouter: boolean = true;
  constructor() {
  }

  ngOnInit(): void {
    this.isLoggedIn();
  }

  isLoggedIn() {
    if (sessionStorage.getItem('oauth-token') != null) {
      this.showLoginRouter = false;
    }
    else {
      this.showLoginRouter = true;
    }
  }

}
