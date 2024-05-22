import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {


  constructor(
    private http: HttpClient,
  ) { }


  sendJobApplication(formData: FormData, body: any, candidateId: any, jobId: any): Observable<any> { 
    let params = new HttpParams();
    params.append('userId', candidateId);
    params.append('jobId', jobId);

    /**
     * let params = new FormData();
      params.append('userId', candidateId);
      params.append('jobId', jobId);
      params.append('file', selectedFile, selectedFile.name);
     */
    return this.http.post(`http://localhost:3000/applications/`, body, { params } );
  }

  sendApplication(formData: FormData, body: any, candidateId: any, jobId: any): Observable<any> { 
    console.log(formData);

    let headers = new HttpHeaders ({
      'Content-Type': 'multipart/form-data',
    });

    let params = new HttpParams();
    params.append('userId', candidateId);
    params.append('jobId', jobId);

    Object.keys(body).forEach(key => {
      formData.append(key, body[key]);
    });

    /**
     * let params = new FormData();
      params.append('userId', candidateId);
      params.append('jobId', jobId);
      params.append('file', selectedFile, selectedFile.name);
     */
    return this.http.post(`http://localhost:3000/applications/`, formData, { params, headers } );
  }

  getApplicationsByCandidateId(candidateId: any) { 
    let params = new HttpParams();
    params = params.append('candidateId', candidateId);
    return this.http.get(`http://localhost:3000/applications/`, { params })
  }
}
