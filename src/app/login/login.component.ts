import { Component } from '@angular/core';
import {UsersService} from "../../services/users/users.service";
import {User} from "../../models/user/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string;
  password: string;

  constructor(
    public userService:UsersService
  ) {
    this.password = ""
    this.email = ""
  }
  onSubmit(){
    const user = {
      email: this.email,
      password: this.password
    }
    this.userService.login(user).subscribe((data: User)=>{
      console.log(data)
    })
  }

}
