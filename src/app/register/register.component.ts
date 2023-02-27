import { Component } from '@angular/core';
import {UsersService} from "../../services/users/users.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string;
  password: string;
  passwordConfirm: string

  constructor(
    public userService: UsersService
  ) {
    this.password = ""
    this.passwordConfirm = ""
    this.email = ""
  }

  onSubmit() {
    const user = {email: this.email, password: this.password};
    this.userService.register(user).subscribe((data: any) => {
      console.log(data)
    })
  }
}
