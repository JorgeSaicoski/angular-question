import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {User} from "../../models/user/user";
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode from 'jwt-decode';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {UsersService} from "../users/users.service";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";



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
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public isLoggedIn(): boolean {
    return true
  }
  getCurrentUser(): any {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    const jwtHelper = new JwtHelperService();
    const userId = jwtHelper.decodeToken(token).data._id;
    const userData = this.userService.getUserByID(userId)
    this.currentUserSubject.next(userData);
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
        this.getCurrentUser()
      })
    );
  }
  public register(user: User): Observable<User>{
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      map((response:any) => {
        this.router.navigate(['/courses'])
        return response;
      })
    );
  }

}
