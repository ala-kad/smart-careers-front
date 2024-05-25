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

  registerCandidate(User: any): Observable<any> {
    return this.http.post('http://localhost:3000/users/candidate', User);
  }

  registerRecruiter(Recruiter: any): Observable<any> {
    return this.http.post('http://localhost:3000/users/recruiter', Recruiter);
  }

  login(email: string, password: string): Observable<any>{
   
    return this.http.post('http://localhost:3000/users/login', {email, password});
  }

  setLocalStorageToken(value:  any) { 
    localStorage.setItem('TOKEN', value);

  }
  logout() {
    localStorage.removeItem('TOKEN');
  }

  isAuthenticatedFun(): boolean {
    return !!localStorage.getItem('TOKEN');
  }

  getUserCrendentials (): any {
    const token = localStorage.getItem('TOKEN');
    if(token){
      return jwtDecode(token);
    }else {
      return 'Error';
    }
  }

  getUserRole (): any {
    const accessToken = this.getUserCrendentials();
    return accessToken.role;
  }

  isGuest(): boolean {
    if(!this.isAuthenticatedFun()){
      return true;
    }
    return false;
  }

  isAdmin(): boolean {
    if(this.isAuthenticatedFun() && this.getUserRole().includes('admin')){
      return true;
    }
    return false;
  }

  isRecruiter(): boolean {
    if(this.isAuthenticatedFun() && this.getUserRole().includes('recruiter')){
      return true;
    }
    return false;
  }

  isCandidate(): boolean {
    if(this.isAuthenticatedFun() && this.getUserRole().includes('candidate')){
      return true;
    }
    return false;
  }


}
