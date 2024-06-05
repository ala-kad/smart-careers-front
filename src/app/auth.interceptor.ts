import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const loginUrl = '/login'; // Adjust this to match your actual login URL

    // Check if the request URL is the login URL
    if (request.url.includes(loginUrl)) {
      return next.handle(request);
    }

    let token = localStorage.getItem('TOKEN');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token expired or unauthorized
          this.handleAuthError();
        }
        return throwError(error);
      })
    );
  }

  private handleAuthError() {
    // Clear any stored tokens
    localStorage.removeItem('TOKEN');
    
    // Notify the user (could be a toast notification or alert)
    alert('Your session has expired. Please log in again.');

    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
