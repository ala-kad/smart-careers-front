import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any>{
    return this.http.post('http://localhost:3000/users/login', {email, password});
  }

  register(User: any): Observable<any> {
    return this.http.post('http://localhost:3000/users/', User);
  }

  registerRecruiter(Recruiter: any): Observable<any> {
    return this.http.post('http://localhost:3000/users/recruiter', Recruiter);
  }

  logout() {
    localStorage.removeItem('TOKEN');
  }

  isAuthenticatedFun(): boolean {
    return !!localStorage.getItem('TOKEN');
  }

}
