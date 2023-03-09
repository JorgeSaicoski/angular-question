import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {User} from "../../models/user/user";
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode from 'jwt-decode';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {UsersService} from "../users/users.service";
import {HttpClient} from "@angular/common/http";



interface DecodedToken {
  username: string;
  email: string;
  admin: boolean
}
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl: string = "http://localhost:5050/auth"

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    private cookieService: CookieService,
    private jwtHelper: JwtHelperService,
    private userService: UsersService,
    private http: HttpClient,
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public isLoggedIn(): boolean {
    return true
  }
  public getCurrentUser(): Observable<User> {
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token) as DecodedToken;
      return this.userService.getUserByUsername(decodedToken.username);
    } else {
      return null as any;
    }
  }
  public setCurrentUser(user: any) {
    this.currentUserSubject.next(user);
    return this.currentUser
  }

  public isAdmin(): boolean {
    const token = this.cookieService.get('token');
    if (!token) {
      return false;
    }
    const decodedToken = jwt_decode(token) as DecodedToken;
    return decodedToken.admin;
  }
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        const token = response.token;
        localStorage.setItem('token', token);
      })
    );
  }

}
