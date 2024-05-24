import { Injectable, Input, Output, EventEmitter  } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  @Output() dataEmitter = new EventEmitter<string>();

  private formOneValueSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public formOneValue$: Observable<any> = this.formOneValueSubject.asObservable();

  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();

  public eventEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private http: HttpClient
  ) { }

  getJobsList(status: string): Observable<any> {
    let params = new HttpParams().set('status', status)
    return this.http.get('http://localhost:3000/jobs/', { params: params });
  }

  getJobDetails(id: Number): Observable<any> {
    return this.http.get(`http://localhost:3000/jobs/${id}`);
  }

  getJobQuestions(id: any): Observable<any> {
    return this.http.get(`http://localhost:3000/jobs/${id}/questions`);
  }

  deleteJob(id: any): Observable<any> {
    return this.http.delete(`http://localhost:3000/jobs/${id}`);
  }

  publishJobOffer(id: any, {}): Observable<any> {
    return this.http.patch(`http://localhost:3000/jobs/publish/${id}`, {});
  }

  postNewJobOffer (body: any, recruiterId: any): Observable<any> {
    let params = new HttpParams(); 
    params = params.append('recruiterId', recruiterId);
    return this.http.post(`http://localhost:3000/jobs/`, body, { params: params });
  }

  generateTextFromGenIA(body: any): Observable<any> {
    console.log(body);

    return this.http.post(`http://localhost:3000/jobs/genIA`, body, {responseType: 'json'});
  }

  shareData(data: string) {
    this.dataEmitter.emit(data);
  }

  triggerSubmit() {

  }

  submitFormOne(value: any): void {
    console.log(value);

    this.formOneValueSubject.next(value);
  }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

}
