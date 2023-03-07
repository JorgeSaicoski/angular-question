import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {User} from "../../models/user/user";
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';


interface DecodedToken {
  username: string;
  email: string
}
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private cookieService: CookieService) {
    this.currentUserSubject = new BehaviorSubject<any>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public isLoggedIn(): boolean {
    return true
  }
  getUserFromToken(token: string): User {
    const decodedToken = jwt_decode(token) as DecodedToken;
    const user: User = {
      username: decodedToken.username,
      email: decodedToken.email,
      password: ""
    };
    return user;
  }
  public setCurrentUser(user: any) {
    console.log(this.currentUserSubject)
    this.currentUserSubject.next(user);
  }

}
