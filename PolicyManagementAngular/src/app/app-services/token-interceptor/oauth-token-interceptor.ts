import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class OAuthTokenInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = sessionStorage.getItem('oauth-token');

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(request).pipe(catchError(err => {

      if (err.status === 401 || err.status === 403 || (err.status === 400 && err.error.error === "invalid_grant")) {
        sessionStorage.removeItem('oauth-token');
        Swal.fire({
          icon: 'error',
          title: "Sorry",
          text: "Invalid Credentials"
        });
        this.router.navigate(["/login"]);
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}