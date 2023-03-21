import { Component } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor(
    public authService: AuthService,
    private router: Router

  ) {}
  public logout() {
    this.authService.logout()
    this.router.navigate(['/login']);
  }


}

