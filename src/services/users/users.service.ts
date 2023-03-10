import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from "../../models/user/user";
import { map } from 'rxjs/operators';
import {BehaviorSubject, catchError, Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl: string = "http://localhost:5050/users"
  private email: string;
  constructor(private http: HttpClient) {
    this.email = '';
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
  public getUserByID(id: string): Observable<User> {
    const url = `${this.apiUrl}/id/${id}`;
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
