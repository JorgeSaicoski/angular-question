import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from "../../models/user/user";
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {BehaviorSubject, catchError, Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl: string = "http://localhost:5050/auth"
  private email: string;
  constructor(private http: HttpClient, private router: Router) {
    this.email = '';
  }


  public register(user: User): Observable<User>{
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      map((response:any) => {
        this.email = response.email
        this.router.navigate(['/courses'])
        return response;
      })
    );
  }

  public getUserByUsername(username: string): Observable<User> {
    const url = `${this.apiUrl}/full/${username}`;
    return this.http.get<User>(url).pipe(
      map((user: User) => {
        if (user&&user.username) {
          return user;
        }
        return null as any;
      }),
    );
  }


}
