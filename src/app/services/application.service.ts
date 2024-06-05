import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  
  constructor(
    private http: HttpClient,
  ) { }

  applyForJob(formData: FormData, candidateId: any, jobId: any): Observable<any> { 
    let params = new HttpParams() ; 
    params = params.append('candidateId', candidateId);
    params = params.append('jobId', jobId);
    return this.http.post('http://localhost:3000/applications/upload-cv/', formData,  { params: params });
  }

  sendReposnses (responses: string[], candidateId: any, jobId: any): Observable<any> { 
    let params = new HttpParams() ; 
    params = params.append('candidateId', candidateId);
    params = params.append('jobId', jobId);
    return this.http.post('http://localhost:3000/applications/responses/', { responses },  { params: params });
  }

  submitJobApplication(candidateId: any, jobId: any): Observable<any> { 
    let params = new HttpParams() ; 
    params = params.append('candidateId', candidateId);
    params = params.append('jobId', jobId);
    return this.http.get('http://localhost:3000/applications/apply/', {params: params});
  }
  
  getApplicationsByCandidateId(candidateId: any) { 
    let params = new HttpParams();
    params = params.append('candidateId', candidateId);
    return this.http.get(`http://localhost:3000/applications/`, { params })
  }

  checkIfCandidateApplied(jobId: any, candidateId: any): Observable<any>{
    let params = new HttpParams();
    params = params.append('jobId', jobId);
    params = params.append('candidateId', candidateId);
    return this.http.get(`http://localhost:3000/applications/check-if-applied`, { params: params });
  }
}
