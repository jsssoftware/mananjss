import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core'; 
import { LoaderService } from './shared/common-component/loader/loader-service.service';
LoaderService
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit{ 
  public showLoginRouter: boolean = true;
  constructor(private loaderService: LoaderService, private renderer: Renderer2) {
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

  ngAfterViewInit() {
    this.loaderService.httpProgress().subscribe((status: boolean) => {
      if (status) {
        this.renderer.addClass(document.body, 'cursor-loader');
      } else {
        this.renderer.removeClass(document.body, 'cursor-loader');
      }
    });
  }

}
