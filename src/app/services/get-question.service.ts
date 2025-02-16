import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetQuestionService {
  private apiUrl = "https://gist.githubusercontent.com/cmota/f7919cd962a061126effb2d7118bec72/raw/";

  constructor(private http: HttpClient) { }

  getRandomQuestions(limit: number = 10): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((questions: any[]) => {
        return questions.slice(0, limit);
      })
    );
  }
}
