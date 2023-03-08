import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Question} from "../../models/questions/questions";
import {catchError, Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private apiUrl: string = "http://localhost:5050/questions"
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private email: string;
  constructor(private http: HttpClient, private router: Router) {
    this.email = '';
  }
  public createQuestion(): Observable<Question> {
    const url = `${this.apiUrl}/all`;
    return this.http.post<Question>(url, this.httpOptions).pipe(
      map((response: Question) => {
        if(response) {
          return response;
        }
        return null as any;
      }),

    );
  }

}

