import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AuthService} from "../../../services/auth/auth.service";


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
    public authService:AuthService,
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
    console.log(this.loginForm.value);

    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(() => {
      this.router.navigate(['/courses']);
    });

  }

}
