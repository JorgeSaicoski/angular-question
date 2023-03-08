import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {User} from "../../models/user/user";
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import {UsersService} from "../users/users.service";



interface DecodedToken {
  username: string;
  email: string;
  admin: boolean
}
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    private cookieService: CookieService,
    private jwtHelper: JwtHelperService,
    private userService: UsersService
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
    console.log(this.currentUserSubject)
    this.currentUserSubject.next(user);
  }

  public isAdmin(): boolean {
    const token = this.cookieService.get('token');
    if (!token) {
      return false;
    }
    const decodedToken = jwt_decode(token) as DecodedToken;
    return decodedToken.admin;
  }

}
