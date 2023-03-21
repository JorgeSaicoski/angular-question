import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../../services/users/users.service";
import {User} from "../../../models/user/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { CookieService } from 'ngx-cookie-service';
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UsersService,
    private cookieService: CookieService
  ) { }

  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      username:["", Validators.required],
      email:["", Validators.required, Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator })
  }
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) { // Use optional chaining operator
      confirmPassword?.setErrors({ mismatch: true }); // Use optional chaining operator
    } else {
      confirmPassword?.setErrors(null); // Use optional chaining operator
    }
  }

  onSubmit() {
    const user = this.registerForm.value as User;
    user.name=user.username
    this.authService.register(user).subscribe(
      (response: any)=>{
        this.cookieService.set('token', response.token);
        this.authService.getCurrentUser()
      },
      (error) => console.log(error)
    );
  }
}
