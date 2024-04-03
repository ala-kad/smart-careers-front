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
    console.log(users);

    return users ;
  }
}
