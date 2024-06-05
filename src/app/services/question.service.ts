import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private http: HttpClient
  ) { }

  createQuestionnaire(questions: []): Observable<any> { 
    console.log(questions)
    return this.http.post(`http://localhost:3000/questions/add`, { questions })
  }
}
