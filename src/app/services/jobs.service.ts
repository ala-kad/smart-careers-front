import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(
    private http: HttpClient
  ) { }

  getJobsList(status: string): Observable<any> {
    let params = new HttpParams().set('status', status)
    console.log(status);

    return this.http.get('http://localhost:3000/jobs/', { params: params });
  }

  getJobDetails(id: Number): Observable<any> {
    return this.http.get(`http://localhost:3000/jobs/${id}`);
  }

  deleteJob(id: any): Observable<any> {
    return this.http.delete(`http://localhost:3000/jobs/${id}`);
  }

  publishJobOffer(id: any, {}): Observable<any> {
    return this.http.patch(`http://localhost:3000/jobs/publish/${id}`, {});
  }

}
