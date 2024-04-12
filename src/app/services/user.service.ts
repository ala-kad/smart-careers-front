import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  listUsers(): Observable<any> {
    const  users =   this.http.get('http://localhost:3000/users/');
    return users ;
  }

  showUser(id: any): Observable<any>{
    return this.http.get(`http://localhost:3000/users/${id}`);
  }

  editUser(id: any, update: any): Observable<any> {
    console.log(update);

    const res = this.http.patch(`http://localhost:3000/users/${id}`, update);
    return res;
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(`http://localhost:3000/users/${id}`);
  }

  getEnabledUsers(): Observable<any> {
    return this.http.get(`http://localhost:3000/users/enabled`);
  }

  disableUser(userId: any): Observable<any> {
    return this.http.patch(`http://localhost:3000/users/${userId}/disable`, {})
  }
}
