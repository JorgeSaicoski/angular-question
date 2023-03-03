import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../../services/users/users.service";
import {User} from "../../../models/user/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    public userService:UsersService,
    private cookieService: CookieService
  ) {}

  ngOnInit():void{
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onSubmit():void{
    this.userService.login(this.loginForm.value).subscribe(
      (response: any)=>{
        this.cookieService.set('token', response.token);
        this.cookieService.set('user', JSON.stringify(response.user));
      },
      (error) => {
        this.errorMessage = error.error.message;
      }
    )
  }

}
