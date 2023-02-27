import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url: string = "`${environment.apiUrl}/login`;"
  constructor(private http:HttpClient) {}

  login(user: any): Observable<any>{
    return this.http.post(this.url, user)
  }
  register(user: any): Observable<any>{
    return this.http.post(this.url, user)
  }
}
