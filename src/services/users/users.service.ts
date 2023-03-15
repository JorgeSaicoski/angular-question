import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from "../../models/user/user";
import { map } from 'rxjs/operators';
import {BehaviorSubject, catchError, Observable} from 'rxjs';
import {Pager} from "../../models/query/pager/pager";
import {Filter} from "../../models/query/filter/filter";
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
  public getFilterUsers(filter: Filter, query: any): Observable<Pager> {
    console.log("here")
    const url = `${this.apiUrl}/filter?page=${filter.page}&limit=${filter.limit}&sort=${filter.sort}&order=${filter.order}`;
    return this.http.post<Pager>(url, JSON.stringify(query)).pipe(
      map((response: Pager) => {
        if (response && response.docs.length > 0) {
          response.docs = response.docs as User[];
          return response;
        }
        return new Pager();
      })
    );
  }
}
