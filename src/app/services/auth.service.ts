import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { decode } from 'json-web-token';
import { jwtDecode } from "jwt-decode";
import { admin } from 'googleapis/build/src/apis/admin';

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

  isGuest(): boolean {
    if(!this.isAuthenticatedFun()){
      return true;
    }
    return false;
  }


  isAdmin(): boolean {
    if(this.isAuthenticatedFun() && this.getUserRole()==='admin'){
      return true;
    }
    return false;
  }

  isRecruiter(): boolean {
    if(this.isAuthenticatedFun() && this.getUserRole()==='recruiter'){
      return true;
    }
    return false;
  }

  getUserCrendentials (): any {
    const token = localStorage.getItem('TOKEN');
    if(token){
      return jwtDecode(token);
    }else {
      return 'Error';
    }
  }

  getUserRole (): string {
    const accessToken = this.getUserCrendentials();
    if (accessToken.role.length > 1) {
      return  'recruiter';
    }
      return 'admin';
    }

}
