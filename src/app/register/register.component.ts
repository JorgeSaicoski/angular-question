import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string;
  password: string;
  passwordConfirm: string

  constructor() {
    this.password = ""
    this.passwordConfirm = ""
    this.email = ""
  }
  onSubmit(){
    console.log(this.email)
    console.log(this.password)
  }

}
