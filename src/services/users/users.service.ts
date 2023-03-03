import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import {User} from "../../models/user/user";
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl: string = "http://localhost:5050/auth"
  private username: string;
  constructor(private http: HttpClient, private router: Router) {
    this.username = '';
  }

  public login(user: User): Observable<User>{
    return this.http.post(`${this.apiUrl}/login`, user).pipe(
      map((response:any) => {
        console.log(response)
        return response;
      })
    );
  }
  public register(user: User): Observable<User>{
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      map((response:any) => {
        console.log(response)
        return response;
      })
    );
  }
  getUsername(): string {
    return this.username;
  }
}
