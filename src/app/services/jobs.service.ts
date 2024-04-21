import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(
    private http: HttpClient
  ) { }

  getJobsList():Observable<any> {
    return this.http.get('http://localhost:3000/jobs/');
  }


  getJobDetails(id: Number):Observable<any> {
    return this.http.get(`http://localhost:3000/jobs/${id}`);
  }

}
