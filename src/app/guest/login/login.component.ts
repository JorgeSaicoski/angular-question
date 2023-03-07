import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../../services/users/users.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    public userService:UsersService,
    private cookieService: CookieService,
    private router: Router
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
        localStorage.setItem('token', response.token);
        this.router.navigate(['/courses'])
      },
      (error) => {
        this.errorMessage = error.error.message;
      }
    )
  }

}
