import { Component } from '@angular/core';
import {UsersService} from "../../services/users/users.service";
import {User} from "../../models/user/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string;
  password: string;
  passwordConfirm: string
  user: User = null as any

  constructor(
    public userService: UsersService
  ) {
    this.password = ""
    this.passwordConfirm = ""
    this.email = ""
  }

  onSubmit() {
    const user = {email: this.email, password: this.password};
    this.userService.register(user).subscribe((data: User) => {
      this.user = data
    })
  }
}
